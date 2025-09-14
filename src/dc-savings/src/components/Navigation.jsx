import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/social', label: 'Social', icon: '🌟' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-t-4 border-light-purple fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-3 px-4 transition-all duration-300 ${
                isActive(item.path)
                  ? 'text-light-purple bg-light-purple/10 transform scale-105'
                  : 'text-gray-600 hover:text-light-purple hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
