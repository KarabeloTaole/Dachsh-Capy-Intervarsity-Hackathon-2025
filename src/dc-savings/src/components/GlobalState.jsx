// globalState.js - Simple global state management
class GlobalState {
  constructor() {
    // Initialize from localStorage or use defaults
    const saved = typeof window !== 'undefined' ? localStorage.getItem('appState') : null;
    this.state = saved ? JSON.parse(saved) : this.getDefaultState();
    this.listeners = new Set();
  }

  getDefaultState() {
    return {
      // Theme
      darkMode: false,
      
      // User Profile
      user: {
        name: "Karabelo Taole",
        username: "you",
        email: "karabelo@email.com",
        phone: "+27 123 456 789",
        bio: "Passionate saver working towards financial freedom! 💪",
        location: "Johannesburg, South Africa",
        joinDate: "January 2024",
        avatar: "👤",
        
        // Financial data
        savings: {
          current: 1520,
          goal: 2500,
          emergency: 1800,
          investment: 0,
          vacation: 2400,
          streak: 8,
        },
        
        // Rankings
        rank: {
          weekly: { rank: 3, saved: 195, change: '+1', level: 'Bronze' },
          monthly: { rank: 4, saved: 520, change: '-1', level: 'Bronze' },
          allTime: { rank: 5, saved: 3420, change: '-1', level: 'Bronze' },
        },
        
        // Social
        friends: 12,
        achievements: [
          { name: 'Streak Master', earned: true, date: '2024-08-15' },
          { name: 'Goal Crusher', earned: true, date: '2024-07-20' },
          { name: 'Top 3 Finisher', earned: false },
          { name: 'Consistent Saver', earned: true, date: '2024-06-10' }
        ],
        
        // Settings
        settings: {
          notifications: true,
          emailUpdates: true,
          privacy: 'friends',
        }
      }
    };
  }

  // Subscribe to state changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Update state and notify listeners
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.saveToStorage();
    this.listeners.forEach(callback => callback(this.state));
  }

  // Update nested properties
  updateUser(updates) {
    this.setState({
      user: { ...this.state.user, ...updates }
    });
  }

  updateUserSavings(updates) {
    this.setState({
      user: {
        ...this.state.user,
        savings: { ...this.state.user.savings, ...updates }
      }
    });
  }

  updateUserSettings(updates) {
    this.setState({
      user: {
        ...this.state.user,
        settings: { ...this.state.user.settings, ...updates }
      }
    });
  }

  addSavings(amount, category = 'current') {
    const currentSavings = this.state.user.savings[category] || 0;
    this.updateUserSavings({
      [category]: currentSavings + amount
    });
  }


  getState() {
    return this.state;
  }

  saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appState', JSON.stringify(this.state));
    }
  }

  // Reset everything
  reset() {
    this.state = this.getDefaultState();
    this.saveToStorage();
    this.listeners.forEach(callback => callback(this.state));
  }
}


export const globalState = new GlobalState();


import { useState, useEffect } from 'react';

export const useGlobalState = () => {
  const [state, setState] = useState(globalState.getState());

  useEffect(() => {
    const unsubscribe = globalState.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    // Current state
    ...state,
    
    // Update functions
    updateUser: (updates) => globalState.updateUser(updates),
    updateUserSavings: (updates) => globalState.updateUserSavings(updates),
    updateUserSettings: (updates) => globalState.updateUserSettings(updates),
    addSavings: (amount, category) => globalState.addSavings(amount, category),
    toggleDarkMode: () => globalState.toggleDarkMode(),
    setDarkMode: (value) => globalState.setState({ darkMode: value }),
    
    // Utility
    reset: () => globalState.reset(),
  };
};