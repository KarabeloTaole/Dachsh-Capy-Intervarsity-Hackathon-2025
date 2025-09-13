 import React, { useState } from "react";

export default function ProfilePage({ onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    name: "Karabelo Taole",
    email: "karabelo@email.com",
    phone: "+27 123 456 789",
    bio: "Passionate saver working towards financial freedom! 💪",
    location: "Johannesburg, South Africa",
    joinDate: "January 2024",
    avatar: "👤",
    savings: 1520,
    goal: 2500,
    rank: 3,
    friends: 12,
  });

  const progress = (userProfile.savings / userProfile.goal) * 100;

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
    <div className={`min-h-screen font-libre relative overflow-hidden transition-all duration-500 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Floating decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-lightPurple rounded-full animate-bounce opacity-20"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-yellow rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple rounded-full animate-ping opacity-10"></div>
        <div className="absolute bottom-20 right-32 w-8 h-8 bg-lightPurple rounded-full animate-bounce opacity-25"></div>
      </div>

      {/* Main Profile Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-8">
        <div className="max-w-4xl w-full space-y-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
              Profile Management
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-lightPurple'}`}>
              Manage your account and preferences
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className={`flex rounded-2xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-lightPurple text-white shadow-lg transform scale-105'
                      : darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-darkBlue hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-slideUp">
              {/* Profile Header Card */}
              <div className={`rounded-3xl p-8 border-2 shadow-xl transform hover:shadow-2xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="text-6xl bg-lightPurple rounded-full w-20 h-20 flex items-center justify-center">
                      {userProfile.avatar}
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                        {userProfile.name}
                      </h2>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-lightPurple'} font-medium`}>
                        Member since {userProfile.joinDate}
                      </p>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                        Rank #{userProfile.rank} • {userProfile.friends} friends
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-yellow hover:bg-purple hover:text-white text-darkBlue px-6 py-2 rounded-xl font-bold transition-all transform hover:scale-105"
                  >
                    {isEditing ? '💾 Save' : '✏️ Edit'}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <p className={`text-sm mb-2 font-medium ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                    Savings Progress
                  </p>
                  <div className={`w-full rounded-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-darkBlue/20'}`}>
                    <div
                      className="bg-yellow h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-darkBlue'}`}>
                    R{userProfile.savings} / R{userProfile.goal}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className={`rounded-3xl p-8 border-2 shadow-xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', field: 'name', value: userProfile.name },
                    { label: 'Email', field: 'email', value: userProfile.email },
                    { label: 'Phone', field: 'phone', value: userProfile.phone },
                    { label: 'Location', field: 'location', value: userProfile.location }
                  ].map((item) => (
                    <div key={item.field}>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.label}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleProfileUpdate(item.field, e.target.value)}
                          className={`w-full p-3 rounded-xl border-2 focus:border-lightPurple focus:outline-none transition-all ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-200 text-darkBlue'
                          }`}
                        />
                      ) : (
                        <p className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-darkBlue'}`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      className={`w-full p-3 rounded-xl border-2 focus:border-lightPurple focus:outline-none transition-all h-24 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-200 text-darkBlue'
                      }`}
                    />
                  ) : (
                    <p className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-darkBlue'}`}>
                      {userProfile.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-slideUp">
              <div className={`rounded-3xl p-8 border-2 shadow-xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                  App Settings
                </h3>
                
                <div className="space-y-6">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-lightPurple/10">
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                        🌙 Dark Mode
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-14 h-8 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-lightPurple' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                        darkMode ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-slideUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Total Saved', value: `R${userProfile.savings}`, icon: '💰' },
                  { label: 'Days Active', value: '245', icon: '📅' },
                  { label: 'Goal Progress', value: `${Math.round(progress)}%`, icon: '🎯' },
                  { label: 'Friends', value: userProfile.friends, icon: '👥' }
                ].map((stat, i) => (
                  <div key={i} className={`rounded-3xl p-6 border-2 shadow-xl transition-all duration-300 hover:shadow-2xl ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <h4 className={`font-bold text-2xl ${darkMode ? 'text-white' : 'text-darkBlue'}`}>
                        {stat.value}
                      </h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="text-center">
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 mr-4"
            >
              🚪 Log Out
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}