import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Leaderboard = ({ onBack }) => {
  const [timeFilter] = useState('monthly');
  const [categoryFilter] = useState('all');

  // Mock leaderboard data for different time periods genrated by Claude
  const leaderboardData = {
    weekly: [
      { rank: 1, username: 'challenge_king', saved: 285, change: '+2', badge: '👑', level: 'Gold', streak: 7 },
      { rank: 2, username: 'savings_pro', saved: 220, change: '0', badge: '🥈', level: 'Silver', streak: 6 },
      { rank: 3, username: 'you', saved: 195, change: '+1', badge: '🥉', level: 'Bronze', streak: 5 },
      { rank: 4, username: 'money_master', saved: 180, change: '-1', badge: '🏅', level: 'Bronze', streak: 4 },
      { rank: 5, username: 'coin_collector', saved: 165, change: '0', badge: '🏅', level: 'Bronze', streak: 3 }
    ],
    monthly: [
      { rank: 1, username: 'challenge_king', saved: 1250, change: '0', badge: '👑', level: 'Gold', streak: 28 },
      { rank: 2, username: 'savings_pro', saved: 890, change: '0', badge: '🥈', level: 'Silver', streak: 15 },
      { rank: 3, username: 'money_master', saved: 675, change: '+1', badge: '🥉', level: 'Silver', streak: 12 },
      { rank: 4, username: 'you', saved: 520, change: '-1', badge: '🏅', level: 'Bronze', streak: 8 },
      { rank: 5, username: 'coin_collector', saved: 445, change: '0', badge: '🏅', level: 'Bronze', streak: 6 },
      { rank: 6, username: 'penny_pincher', saved: 380, change: '+2', badge: '🏅', level: 'Bronze', streak: 4 },
      { rank: 7, username: 'budget_boss', saved: 315, change: '-1', badge: '🏅', level: 'Bronze', streak: 3 },
      { rank: 8, username: 'cash_saver', saved: 280, change: '-1', badge: '🏅', level: 'Bronze', streak: 2 },
      { rank: 9, username: 'new_starter', saved: 180, change: 'new', badge: '🌟', level: 'Bronze', streak: 1 }
    ],
    allTime: [
      { rank: 1, username: 'challenge_king', saved: 8750, change: '0', badge: '👑', level: 'Gold', streak: 28 },
      { rank: 2, username: 'savings_pro', saved: 6420, change: '0', badge: '🥈', level: 'Silver', streak: 15 },
      { rank: 3, username: 'money_master', saved: 4890, change: '0', badge: '🥉', level: 'Silver', streak: 12 },
      { rank: 4, username: 'coin_collector', saved: 3650, change: '+1', badge: '🏅', level: 'Bronze', streak: 6 },
      { rank: 5, username: 'you', saved: 3420, change: '-1', badge: '🏅', level: 'Bronze', streak: 8 },
      { rank: 6, username: 'penny_pincher', saved: 2890, change: '0', badge: '🏅', level: 'Bronze', streak: 4 }
    ]
  };

  const categoryData = {
    all: leaderboardData[timeFilter],
    emergency: [
      { rank: 1, username: 'safety_first', saved: 2500, badge: '🛡️', category: 'Emergency Fund' },
      { rank: 2, username: 'prepared_saver', saved: 2200, badge: '⚡', category: 'Emergency Fund' },
      { rank: 3, username: 'you', saved: 1800, badge: '🥉', category: 'Emergency Fund' }
    ],
    investment: [
      { rank: 1, username: 'challenge_king', saved: 5500, badge: '📈', category: 'Investments' },
      { rank: 2, username: 'stock_master', saved: 4200, badge: '💎', category: 'Investments' },
      { rank: 3, username: 'crypto_king', saved: 3800, badge: '₿', category: 'Investments' }
    ],
    vacation: [
      { rank: 1, username: 'travel_bug', saved: 3200, badge: '✈️', category: 'Vacation' },
      { rank: 2, username: 'wanderlust', saved: 2800, badge: '🌍', category: 'Vacation' },
      { rank: 3, username: 'you', saved: 2400, badge: '🏖️', category: 'Vacation' }
    ]
  };


  const getCurrentUserData = () => {
    const data = categoryFilter === 'all' ? leaderboardData[timeFilter] : categoryData[categoryFilter];
    return data.find(user => user.username === 'you') || data.find(user => user.username.includes('you'));
  };

  const currentUser = getCurrentUserData();
  const displayData = categoryFilter === 'all' ? leaderboardData[timeFilter] : categoryData[categoryFilter];

  return (
    <div className="min-h-screen bg-gray-50 font-libre">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-light-purple">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-dark-purple">Leaderboard 🏆</h1>
                <p className="text-sm text-purple">See how you stack up against other savers</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Your Rank</p>
              <p className="text-2xl font-bold text-light-purple">#{currentUser?.rank || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Leaderboard */}
          <div className="xl:col-span-3 space-y-6">
            {/* Top 3 Podium */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-6">Top Performers</h3>
              <div className="flex justify-center items-end space-x-8">
                {/* 2nd Place */}
                {displayData[1] && (
                  <div className="text-center">
                    <div className="w-20 h-16 bg-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-3xl">{displayData[1].badge}</span>
                    </div>
                    <div className="bg-gray-300 px-4 py-3 rounded-b-lg">
                      <p className="font-semibold text-gray-800">{displayData[1].username}</p>
                      <p className="text-lg font-bold text-gray-600">R{displayData[1].saved}</p>
                      <p className="text-sm text-gray-500">#2</p>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {displayData[0] && (
                  <div className="text-center">
                    <div className="w-24 h-20 bg-yellow rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-4xl">{displayData[0].badge}</span>
                    </div>
                    <div className="bg-yellow px-6 py-4 rounded-b-lg">
                      <p className="font-bold text-dark-purple">{displayData[0].username}</p>
                      <p className="text-xl font-bold text-dark-purple">R{displayData[0].saved}</p>
                      <p className="text-sm text-dark-purple">#1</p>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {displayData[2] && (
                  <div className="text-center">
                    <div className="w-20 h-12 bg-orange-400 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-3xl">{displayData[2].badge}</span>
                    </div>
                    <div className="bg-orange-400 px-4 py-3 rounded-b-lg">
                      <p className="font-semibold text-white">{displayData[2].username}</p>
                      <p className="text-lg font-bold text-white">R{displayData[2].saved}</p>
                      <p className="text-sm text-white">#3</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;