//this is our challenge screen where users can keep track of their challenge progress
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ChallengeDetail = ({ challengeId, onBack }) => {
    const [newProgress, setNewProgress] = useState(''); //these states will help me manage user input and progress notes
  const [progressNote, setProgressNote] = useState('');

  // Mock challenge data - provided by Claude as stated in our read me
  const challengeData = {
    id: challengeId || 'challenge_001',
    title: 'September Savings Sprint',
    description: 'Save R500 in September and compete with friends!',
    target: 500,
    duration: 30,
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    creator: 'savings_pro',
    status: 'active',
    daysLeft: 18,
    totalParticipants: 6,
    prize: '🏆 Winner gets R50 bonus + Gold Badge'
  };

  const participants = [ //this is the mock data for the participants in the challenge
    { rank: 1, username: 'challenge_king', progress: 425, percentage: 85, trend: '+R75', avatar: '👑', isCurrentUser: false },
    { rank: 2, username: 'you', progress: 380, percentage: 76, trend: '+R60', avatar: '🎯', isCurrentUser: true },
    { rank: 3, username: 'savings_pro', progress: 350, percentage: 70, trend: '+R45', avatar: '⭐', isCurrentUser: false },
    { rank: 4, username: 'money_master', progress: 280, percentage: 56, trend: '+R40', avatar: '💎', isCurrentUser: false },
    { rank: 5, username: 'penny_saver', progress: 220, percentage: 44, trend: '+R30', avatar: '🥉', isCurrentUser: false },
    { rank: 6, username: 'new_joiner', progress: 150, percentage: 30, trend: '+R25', avatar: '🌟', isCurrentUser: false }
  ];

  const progressHistory = [
    { date: '2025-09-01', you: 50, challenge_king: 60, savings_pro: 45 },
    { date: '2025-09-03', you: 120, challenge_king: 140, savings_pro: 110 },
    { date: '2025-09-05', you: 180, challenge_king: 210, savings_pro: 165 },
    { date: '2025-09-08', you: 250, challenge_king: 280, savings_pro: 230 },
    { date: '2025-09-10', you: 320, challenge_king: 350, savings_pro: 295 },
    { date: '2025-09-12', you: 380, challenge_king: 425, savings_pro: 350 }
  ];

  const dailyActivity = [
    { date: 'Sep 10', activity: 'You saved R60 - Emergency Fund', time: '2 days ago' },
    { date: 'Sep 11', activity: 'challenge_king added R75 - Investment', time: '1 day ago' },
    { date: 'Sep 12', activity: 'savings_pro saved R55 - Vacation Fund', time: '6 hours ago' },
    { date: 'Sep 12', activity: 'money_master joined the challenge!', time: '4 hours ago' }
  ];
  
  const handleAddProgress = () => {
    if (newProgress && parseFloat(newProgress) > 0) {
      alert(`Great progress! You've added $${newProgress} to the challenge!${progressNote ? ` Note: ${progressNote}` : ''}`);
      setNewProgress('');
      setProgressNote('');
    }
  };

  const currentUser = participants.find(p => p.isCurrentUser);

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
                <h1 className="text-2xl font-bold text-dark-purple">{challengeData.title}</h1>
                <p className="text-sm text-purple">{challengeData.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{challengeData.daysLeft} days left</p>
              <p className="text-lg font-bold text-purple">{challengeData.status.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Challenge Overview */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-light-purple/10 rounded-lg">
                  <p className="text-2xl font-bold text-light-purple">${challengeData.target}</p>
                  <p className="text-sm text-gray-600">Target Amount</p>
                </div>
                <div className="text-center p-4 bg-yellow/10 rounded-lg">
                  <p className="text-2xl font-bold text-yellow">{challengeData.totalParticipants}</p>
                  <p className="text-sm text-gray-600">Participants</p>
                </div>
                <div className="text-center p-4 bg-purple/10 rounded-lg">
                  <p className="text-2xl font-bold text-purple">{challengeData.daysLeft}</p>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                </div>
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{currentUser?.percentage}%</p>
                  <p className="text-sm text-gray-600">Your Progress</p>
                </div>
              </div>

              {/* Prize Section */}
              <div className="bg-gradient-to-r from-yellow/20 to-yellow/10 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-dark-purple mb-2">🏆 Challenge Prize</h3>
                <p className="text-gray-700">{challengeData.prize}</p>
              </div>

              {/* Your Progress */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-purple mb-3">Your Challenge Progress</h3>
                <div className="bg-gray-100 rounded-full h-6 mb-2">
                  <div 
                    className="bg-gradient-to-r from-light-purple to-purple h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-4"
                    style={{ width: `${currentUser?.percentage}%` }}
                  >
                    <span className="text-white text-sm font-semibold">${currentUser?.progress}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress: ${currentUser?.progress} / ${challengeData.target}</span>
                  <span>Rank: #{currentUser?.rank} of {challengeData.totalParticipants}</span>
                </div>
              </div>

              {/* Add Progress Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-dark-purple mb-4">Update Your Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Saved ($)</label>
                    <input
                      type="number"
                      value={newProgress}
                      onChange={(e) => setNewProgress(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                    <input
                      type="text"
                      value={progressNote}
                      onChange={(e) => setProgressNote(e.target.value)}
                      placeholder="What did you save for?"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddProgress}
                  className="w-full mt-4 bg-light-purple hover:bg-purple text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Update Progress 🚀
                </button>
              </div>
            </div>

            {/* Progress Comparison Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-4">Progress Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="you" stroke="#B13BFF" strokeWidth={3} name="You" />
                  <Line type="monotone" dataKey="challenge_king" stroke="#FFCC00" strokeWidth={2} name="Challenge King" />
                  <Line type="monotone" dataKey="savings_pro" stroke="#471396" strokeWidth={2} name="Savings Pro" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dark-purple mb-4">Recent Challenge Activity</h3>
              <div className="space-y-3">
                {dailyActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-light-purple/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.activity}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants Leaderboard */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-purple mb-4">Challenge Leaderboard</h3>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div 
                    key={participant.rank}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      participant.isCurrentUser 
                        ? 'bg-light-purple/20 border-2 border-light-purple' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{participant.avatar}</span>
                        <div>
                          <p className={`font-medium ${participant.isCurrentUser ? 'text-light-purple' : 'text-gray-800'}`}>
                            {participant.username} {participant.isCurrentUser && '(You)'}
                          </p>
                          <p className="text-sm text-gray-500">Rank #{participant.rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-dark-purple">${participant.progress}</p>
                        <p className="text-sm text-green-600">{participant.trend}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-light-purple h-2 rounded-full transition-all duration-500"
                        style={{ width: `${participant.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-purple mb-4">Challenge Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator:</span>
                  <span className="font-medium text-dark-purple">{challengeData.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium text-dark-purple">{challengeData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium text-dark-purple">{challengeData.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-dark-purple">{challengeData.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600 capitalize">{challengeData.status}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-purple mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-light-purple hover:bg-purple text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  Share Challenge
                </button>
                <button className="w-full bg-yellow hover:bg-yellow/80 text-dark-purple font-semibold py-3 rounded-lg transition-all duration-300">
                  Invite Friends
                </button>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300">
                  View All Challenges
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};