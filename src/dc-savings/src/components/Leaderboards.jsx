import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Leaderboard = ({ onBack }) => {
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');

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

  const trendData = [
    { month: 'May', challenge_king: 1100, savings_pro: 780, you: 420 },
    { month: 'Jun', challenge_king: 1180, savings_pro: 820, you: 450 },
    { month: 'Jul', challenge_king: 1220, savings_pro: 850, you: 480 },
    { month: 'Aug', challenge_king: 1240, savings_pro: 870, you: 500 },
    { month: 'Sep', challenge_king: 1250, savings_pro: 890, you: 520 }
  ];


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
            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-dark-purple mb-2">Filter Rankings</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setTimeFilter('weekly')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        timeFilter === 'weekly' 
                          ? 'bg-light-purple text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      This Week
                    </button>
                    <button 
                      onClick={() => setTimeFilter('monthly')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        timeFilter === 'monthly' 
                          ? 'bg-light-purple text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      This Month
                    </button>
                    <button 
                      onClick={() => setTimeFilter('allTime')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        timeFilter === 'allTime' 
                          ? 'bg-light-purple text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Time
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-dark-purple mb-2">Category</h4>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="emergency">Emergency Fund</option>
                    <option value="investment">Investments</option>
                    <option value="vacation">Vacation Fund</option>
                  </select>
                </div>
              </div>
            </div>

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

            {/* Full Rankings */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-4">Complete Rankings</h3>
              <div className="space-y-2">
                {displayData.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                      user.username === 'you' || user.username.includes('you')
                        ? 'bg-light-purple/20 border-2 border-light-purple transform scale-105' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        user.rank === 1 ? 'bg-yellow text-dark-purple' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-orange-400' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {user.rank}
                      </div>
                      <span className="text-2xl">{user.badge}</span>
                      <div>
                        <p className={`font-semibold ${
                          user.username === 'you' || user.username.includes('you') ? 'text-light-purple' : 'text-gray-800'
                        }`}>
                          {user.username} {(user.username === 'you' || user.username.includes('you')) && '(You)'}
                        </p>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span>{user.level} Level</span>
                          {user.streak && <span>🔥 {user.streak} days</span>}
                          {user.category && <span>📁 {user.category}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-dark-purple">R{user.saved}</p>
                      <div className="flex items-center space-x-2">
                        {user.change && user.change !== '0' && (
                          <span className={`text-sm font-medium ${
                            user.change.startsWith('+') ? 'text-green-600' : 
                            user.change.startsWith('-') ? 'text-red-600' : 
                            'text-blue-600'
                          }`}>
                            {user.change === 'new' ? 'NEW' : `${user.change} from last ${timeFilter.slice(0, -2)}`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trends Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-4">Savings Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="challenge_king" stroke="#FFCC00" strokeWidth={3} name="Challenge King" />
                  <Line type="monotone" dataKey="savings_pro" stroke="#471396" strokeWidth={2} name="Savings Pro" />
                  <Line type="monotone" dataKey="you" stroke="#B13BFF" strokeWidth={3} name="You" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Performers by Category */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-4">Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={displayData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="saved" fill="#B13BFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Position Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-light-purple">
              <h3 className="text-lg font-semibold text-dark-purple mb-3">Your Position</h3>
              {currentUser && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-light-purple rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">{currentUser.badge}</span>
                  </div>
                  <p className="text-2xl font-bold text-dark-purple">Rank #{currentUser.rank}</p>
                  <p className="text-lg font-semibold text-light-purple">R{currentUser.saved} saved</p>
                  <div className="mt-3 p-3 bg-light-purple/10 rounded-lg">
                    <p className="text-sm font-medium text-purple">{currentUser.level} Level</p>
                    {currentUser.streak && <p className="text-xs text-gray-600">{currentUser.streak} day streak</p>}
                  </div>
                  {currentUser.change && currentUser.change !== '0' && (
                    <div className="mt-2">
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        currentUser.change.startsWith('+') ? 'bg-green-100 text-green-800' : 
                        currentUser.change.startsWith('-') ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {currentUser.change === 'new' ? 'New Entry!' : `${currentUser.change} this ${timeFilter.slice(0, -2)}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;