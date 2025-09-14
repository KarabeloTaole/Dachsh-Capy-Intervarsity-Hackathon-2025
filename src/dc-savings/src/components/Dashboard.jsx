import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Confetti from "react-confetti";

const UnifiedDashboard = ({ username, onLogout, onNavigate }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [newSavings, setNewSavings] = useState("");
  const [savingsCategory, setSavingsCategory] = useState("");
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [animatingXP, setAnimatingXP] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // User profiles
  const userProfiles = {
    alex_saver: {
      displayName: "Alex",
      level: "Bronze Explorer",
      levelNum: 1,
      xp: 450,
      xpToNext: 1000,
      totalSaved: 245.5,
      monthlyGoal: 500,
      rank: 8,
      totalUsers: 12,
      streak: 3,
      coins: 125,
      gems: 8,
      powerUps: ["2x XP Boost", "Streak Shield"],
    },
    savings_pro: {
      displayName: "Pro Saver",
      level: "Silver Guardian",
      levelNum: 15,
      xp: 2890,
      xpToNext: 3500,
      totalSaved: 890.75,
      monthlyGoal: 1000,
      rank: 2,
      totalUsers: 12,
      streak: 15,
      coins: 890,
      gems: 45,
      powerUps: ["3x XP Boost", "Goal Multiplier", "Lucky Charm"],
    },
    challenge_king: {
      displayName: "Challenge King",
      level: "Gold Champion",
      levelNum: 28,
      xp: 8250,
      xpToNext: 10000,
      totalSaved: 1250,
      monthlyGoal: 1200,
      rank: 1,
      totalUsers: 12,
      streak: 28,
      coins: 2850,
      gems: 125,
      powerUps: [
        "Legendary Multiplier",
        "Master's Focus",
        "Crown Blessing",
        "XP Storm",
      ],
    },
  };

  const currentUser = userProfiles[username] || userProfiles.alex_saver;

  // Quests
  const questsByLevel = {
    1: [
      {
        id: 1,
        title: "First Steps",
        description: "Save your first $50",
        reward: "50 XP + 25 Coins",
        progress: 45,
        target: 50,
        type: "daily",
        rarity: "common",
      },
      {
        id: 2,
        title: "Week Warrior",
        description: "Save for 7 days straight",
        reward: "100 XP + Streak Shield",
        progress: 3,
        target: 7,
        type: "weekly",
        rarity: "uncommon",
      },
      {
        id: 3,
        title: "Category Explorer",
        description: "Save to 3 different categories",
        reward: "75 XP + 5 Gems",
        progress: 2,
        target: 3,
        type: "challenge",
        rarity: "rare",
      },
    ],
    15: [
      {
        id: 1,
        title: "Silver Sprint",
        description: "Save R200 this week",
        reward: "200 XP + 100 Coins",
        progress: 150,
        target: 200,
        type: "daily",
        rarity: "uncommon",
      },
      {
        id: 2,
        title: "Consistency Master",
        description: "Maintain 20-day streak",
        reward: "500 XP + Goal Multiplier",
        progress: 15,
        target: 20,
        type: "weekly",
        rarity: "rare",
      },
      {
        id: 3,
        title: "Investment Pioneer",
        description: "Allocate R500 to investments",
        reward: "300 XP + 20 Gems",
        progress: 400,
        target: 500,
        type: "challenge",
        rarity: "epic",
      },
    ],
    28: [
      {
        id: 1,
        title: "Gold Rush",
        description: "Save R500 this week",
        reward: "1000 XP + 500 Coins",
        progress: 425,
        target: 500,
        type: "daily",
        rarity: "epic",
      },
      {
        id: 2,
        title: "Legendary Streak",
        description: "Achieve 30-day streak",
        reward: "2000 XP + Crown Blessing",
        progress: 28,
        target: 30,
        type: "weekly",
        rarity: "legendary",
      },
      {
        id: 3,
        title: "Empire Builder",
        description: "Reach R2000 total saved",
        reward: "5000 XP + 100 Gems",
        progress: 1250,
        target: 2000,
        type: "challenge",
        rarity: "legendary",
      },
    ],
  };

  const currentQuests =
    questsByLevel[currentUser.levelNum] || questsByLevel[1];

  const achievements = [
    { name: "First Coin", icon: "🪙", unlocked: true, rarity: "common" },
    { name: "Streak Starter", icon: "🔥", unlocked: true, rarity: "uncommon" },
    {
      name: "Goal Crusher",
      icon: "🎯",
      unlocked: currentUser.levelNum >= 15,
      rarity: "rare",
    },
    {
      name: "Investment Master",
      icon: "📈",
      unlocked: currentUser.levelNum >= 15,
      rarity: "epic",
    },
    {
      name: "Savings Legend",
      icon: "👑",
      unlocked: currentUser.levelNum >= 28,
      rarity: "legendary",
    },
  ];

  const savingsData = [
    { date: "Sep 8", amount: currentUser.totalSaved * 0.6, xp: 50 },
    { date: "Sep 9", amount: currentUser.totalSaved * 0.7, xp: 75 },
    { date: "Sep 10", amount: currentUser.totalSaved * 0.8, xp: 100 },
    { date: "Sep 11", amount: currentUser.totalSaved * 0.9, xp: 125 },
    { date: "Sep 12", amount: currentUser.totalSaved, xp: 150 },
  ];

  const leaderboardData = [
    {
      rank: 1,
      username: "challenge_king",
      saved: 1250,
      level: "Gold Champion",
      trend: "up",
    },
    {
      rank: 2,
      username: "savings_pro",
      saved: 890,
      level: "Silver Guardian",
      trend: "up",
    },
    {
      rank: 3,
      username: "money_master",
      saved: 675,
      level: "Silver Guardian",
      trend: "down",
    },
    {
      rank: 4,
      username: username === "alex_saver" ? "alex_saver" : "coin_collector",
      saved: username === "alex_saver" ? 245 : 520,
      level: "Bronze Explorer",
      trend: "up",
    },
  ];

  const categoryData = [
    {
      name: "Emergency Fund",
      value: currentUser.totalSaved * 0.4,
      color: "#B13BFF",
    },
    { name: "Vacation Fund", value: currentUser.totalSaved * 0.3, color: "#FFCC00" },
    { name: "Investments", value: currentUser.totalSaved * 0.2, color: "#471396" },
    { name: "Fun Money", value: currentUser.totalSaved * 0.1, color: "#090040" },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50";
      case "uncommon":
        return "border-green-300 bg-green-50";
      case "rare":
        return "border-blue-300 bg-blue-50";
      case "epic":
        return "border-purple-300 bg-purple-50";
      case "legendary":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "shadow-lg shadow-yellow-400/50 animate-pulse";
      case "epic":
        return "shadow-lg shadow-purple-400/50";
      case "rare":
        return "shadow-md shadow-blue-400/30";
      default:
        return "shadow-md";
    }
  };

  const handleAddSavings = () => {
    if (newSavings && parseFloat(newSavings) > 0) {
      setAnimatingXP(true);
      setTimeout(() => {
        setAnimatingXP(false);
        if (
          currentUser.xp + parseFloat(newSavings) * 2 >=
          currentUser.xpToNext
        ) {
          setShowLevelUpModal(true);
        }
      }, 1000);
      alert(
        `Amazing! You've saved $${newSavings}! 💰\n+${
          parseFloat(newSavings) * 2
        } XP earned! ⭐`
      );
      setNewSavings("");
      setSavingsCategory("");
    }
  };

  const questProgress = (p, t) => (p / t) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-libre relative">
      {showLevelUpModal && <Confetti recycle={false} numberOfPieces={500} />}

      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 shadow-xl relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-2xl">
                    {currentUser.levelNum >= 28
                      ? "👑"
                      : currentUser.levelNum >= 15
                      ? "⭐"
                      : "🎯"}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {currentUser.levelNum}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Welcome back, {currentUser.displayName}!{" "}
                  <span className="ml-2 animate-bounce">🚀</span>
                </h1>
                <p className="text-purple-200 text-lg">{currentUser.level}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <span>🪙</span>
                    <span className="text-yellow-300 font-bold">
                      {currentUser.coins}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💎</span>
                    <span className="text-white font-bold">
                      {currentUser.gems}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🔥</span>
                    <span className="text-white font-bold">
                      {currentUser.streak}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <p className="text-sm opacity-80">Rank #{currentUser.rank}</p>
                <p className="text-2xl font-bold">${currentUser.totalSaved}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-yellow-400 to-purple-300 transition-all duration-1000 ${
                animatingXP ? "animate-pulse" : ""
              }`}
              style={{
                width: `${(currentUser.xp / currentUser.xpToNext) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-white text-sm mt-1">
            <span>Level {currentUser.levelNum}</span>
            <span>
              {currentUser.xp} / {currentUser.xpToNext} XP
            </span>
            <span>Level {currentUser.levelNum + 1}</span>
          </div>
        </div>
      </div>

      

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setFabOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white text-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all"
        >
          {fabOpen ? "✖️" : "➕"}
        </button>
        {fabOpen && (
          <div className="absolute bottom-16 right-0 space-y-3">
            <button
              onClick={() => onNavigate && onNavigate("challenges")}
              className="w-12 h-12 rounded-full bg-yellow-400 text-purple-900 font-bold shadow-md hover:scale-105"
              title="Challenges"
            >
              🏆
            </button>
            <button
              onClick={() => onNavigate && onNavigate("leaderboard")}
              className="w-12 h-12 rounded-full bg-purple-400 text-white font-bold shadow-md hover:scale-105"
              title="Leaderboard"
            >
              🥇
            </button>
            <button
              onClick={() => onNavigate && onNavigate("profile")}
              className="w-12 h-12 rounded-full bg-green-400 text-white font-bold shadow-md hover:scale-105"
              title="Profile"
            >
              👤
            </button>
          </div>
        )}
      </div>

      {/* Level-Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              🎉 Level Up!
            </h2>
            <p className="text-gray-700 mb-6">
              Congrats, {currentUser.displayName}! You’ve unlocked a new level.
            </p>
            <button
              onClick={() => setShowLevelUpModal(false)}
              className="bg-gradient-to-r from-purple-400 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Awesome! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedDashboard;
