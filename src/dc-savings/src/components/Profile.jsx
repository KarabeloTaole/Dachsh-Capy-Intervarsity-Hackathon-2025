 import React, { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode] = useState(true); 



  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
    <div className={`h-screen w-screen font-libre relative overflow-hidden transition-all duration-500 ${
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
      <div className="relative h-screen w-screen flex flex-col items-center justify-start px-4 py-8">
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