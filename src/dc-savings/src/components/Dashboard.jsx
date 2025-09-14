import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "./GlobalState";
import Confetti from "react-confetti";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateUserSavings } = useGlobalState();
  const [newSavings, setNewSavings] = useState("");
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Simplified user data
  const currentUser = {
    displayName: user.name || "Karabelo",
    level: "Bronze Explorer",
    levelNum: 1,
    xp: 450,
    xpToNext: 1000,
    totalSaved: user.savings.current,
    monthlyGoal: user.savings.goal,
    rank: user.rank.weekly.rank,
    streak: user.savings.streak,
    coins: 125,
    gems: 8,
  };

  // Simple quests data
  const quests = [
    {
      id: 1,
      title: "First Steps",
      description: "Save your first R50",
      reward: "50 XP + 25 Coins",
      progress: 45,
      target: 50,
      rarity: "common",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Save for 7 days straight",
      reward: "100 XP + Streak Shield",
      progress: currentUser.streak,
      target: 7,
      rarity: "uncommon",
    },
    {
      id: 3,
      title: "Goal Progress",
      description: "Reach 50% of monthly goal",
      reward: "75 XP + 5 Gems",
      progress: Math.round((currentUser.totalSaved / currentUser.monthlyGoal) * 100),
      target: 50,
      rarity: "rare",
    },
  ];

  const achievements = [
    { name: "First Coin", icon: "🪙", unlocked: true },
    { name: "Streak Starter", icon: "🔥", unlocked: currentUser.streak > 0 },
    { name: "Goal Crusher", icon: "🎯", unlocked: currentUser.totalSaved > 1000 },
  ];

  const handleAddSavings = () => {
    if (newSavings && parseFloat(newSavings) > 0) {
      // Update global state with new savings
      updateUserSavings({
        current: user.savings.current + parseFloat(newSavings)
      });
      
      alert(`Amazing! You've saved R${newSavings}! 💰`);
      setNewSavings("");
      
      // Check for level up
      if (Math.random() > 0.7) {
        setShowLevelUpModal(true);
      }
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common": return "border-gray-300 bg-gray-50";
      case "uncommon": return "border-green-300 bg-green-50";
      case "rare": return "border-blue-300 bg-blue-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-libre relative main-content">
      {showLevelUpModal && <Confetti recycle={false} numberOfPieces={200} />}

      {/* HEADER */}
      <div className="bg-gradient-dark shadow-xl relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-light-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{currentUser.levelNum}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Welcome back, {currentUser.displayName}! 🚀
                </h1>
                <p className="text-white/80 text-lg">{currentUser.level}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <span>🪙</span>
                    <span className="text-yellow font-bold">{currentUser.coins}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💎</span>
                    <span className="text-white font-bold">{currentUser.gems}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🔥</span>
                    <span className="text-white font-bold">{currentUser.streak}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <p className="text-sm opacity-80">Rank #{currentUser.rank}</p>
                <p className="text-2xl font-bold">R{currentUser.totalSaved}</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="bg-yellow hover:bg-yellow/80 text-dark-blue px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-secondary transition-all duration-1000"
              style={{ width: `${(currentUser.xp / currentUser.xpToNext) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-white text-sm mt-1">
            <span>Level {currentUser.levelNum}</span>
            <span>{currentUser.xp} / {currentUser.xpToNext} XP</span>
            <span>Level {currentUser.levelNum + 1}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-dark-blue mb-2">💰 Total Savings</h3>
                <p className="text-3xl font-bold text-light-purple">R{currentUser.totalSaved}</p>
                <p className="text-sm text-gray-600">Goal: R{currentUser.monthlyGoal}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-dark-blue mb-2">🔥 Streak</h3>
                <p className="text-3xl font-bold text-yellow">{currentUser.streak} days</p>
                <p className="text-sm text-gray-600">Keep it up!</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-dark-blue mb-2">🏆 Rank</h3>
                <p className="text-3xl font-bold text-purple">#{currentUser.rank}</p>
                <p className="text-sm text-gray-600">Weekly ranking</p>
              </div>
            </div>

            {/* Add Savings Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-blue mb-4">Add New Savings</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={newSavings}
                  onChange={(e) => setNewSavings(e.target.value)}
                  placeholder="Enter amount (R)"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300"
                />
                <button
                  onClick={handleAddSavings}
                  className="bg-light-purple hover:bg-purple text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Add Savings 💰
                </button>
              </div>
            </div>

            {/* Quests */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-blue mb-4">Active Quests</h3>
              <div className="space-y-4">
                {quests.map((quest) => (
                  <div key={quest.id} className={`p-4 rounded-lg border-2 ${getRarityColor(quest.rarity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{quest.title}</h4>
                        <p className="text-sm text-gray-600">{quest.description}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{quest.reward}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-light-purple h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {quest.progress} / {quest.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-yellow/10' : 'bg-gray-50'
                  }`}>
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className={`font-medium ${achievement.unlocked ? 'text-dark-blue' : 'text-gray-500'}`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-light-purple hover:bg-purple text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  👤 View Profile
                </button>
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="w-full bg-yellow hover:bg-yellow/80 text-dark-blue font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  🏆 Leaderboard
                </button>
                <button
                  onClick={() => navigate('/social')}
                  className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  🌟 Social Feed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6">
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 rounded-full bg-gradient-primary text-white text-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all"
        >
          {fabOpen ? "✖️" : "➕"}
        </button>
        {fabOpen && (
          <div className="absolute bottom-16 right-0 space-y-3">
            <button
              onClick={() => navigate('/challenge/1')}
              className="w-12 h-12 rounded-full bg-yellow text-dark-blue font-bold shadow-md hover:scale-105"
              title="Challenges"
            >
              🏆
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="w-12 h-12 rounded-full bg-purple text-white font-bold shadow-md hover:scale-105"
              title="Leaderboard"
            >
              🥇
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-12 h-12 rounded-full bg-light-purple text-white font-bold shadow-md hover:scale-105"
              title="Profile"
            >
              👤
            </button>
            <button
              onClick={() => navigate('/social')}
              className="w-12 h-12 rounded-full bg-green-400 text-white font-bold shadow-md hover:scale-105"
              title="Social Feed"
            >
              🌟
            </button>
          </div>
        )}
      </div>

      {/* Level-Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <h2 className="text-3xl font-bold text-light-purple mb-4">🎉 Level Up!</h2>
            <p className="text-gray-700 mb-6">
              Congrats, {currentUser.displayName}! You've unlocked a new level.
            </p>
            <button
              onClick={() => setShowLevelUpModal(false)}
              className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Awesome! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;