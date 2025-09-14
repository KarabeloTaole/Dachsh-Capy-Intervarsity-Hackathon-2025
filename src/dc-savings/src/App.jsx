import React, { useState } from 'react'
import './index.css'
import './App.css'
import Login from './components/Login'
import ProfilePage from "./components/Profile";
import Leaderboard from './components/Leaderboards';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToLeaderboard = () => {
    setCurrentPage('leaderboard');
  };

  const handleBackToProfile = () => {
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          onLogout={handleLogout}
          onNavigateToLeaderboard={handleNavigateToLeaderboard}
        />
      )}
      {currentPage === 'leaderboard' && (
        <Leaderboard onBack={handleBackToProfile} />
      )}
    </>
  );
}

export default App