//this is the social feed where users can interact with eachh other
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialFeed = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(''); // the useState for posts
  const [filter, setFilter] = useState('all');
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [newComment, setNewComment] = useState('');

  // Mock social feed data - provided by claude
  const feedData = [
    {
      id: 1,
      user: 'challenge_king',
      avatar: '👑',
      level: 'Gold',
      action: 'completed',
      type: 'challenge',
      content: 'September Savings Sprint',
      amount: 525,
      timestamp: '2 hours ago',
      likes: 12,
      comments: [
        { user: 'savings_pro', text: 'Congrats! Amazing achievement! 🎉', time: '1 hour ago' },
        { user: 'you', text: 'Wow, that\'s inspiring! How did you do it?', time: '45 min ago' }
      ],
      liked: false
    },
    {
      id: 2,
      user: 'savings_pro',
      avatar: '⭐',
      level: 'Silver',
      action: 'saved',
      type: 'savings',
      content: 'Emergency Fund',
      amount: 75,
      timestamp: '4 hours ago',
      likes: 8,
      comments: [
        { user: 'money_master', text: 'Great job staying consistent!', time: '3 hours ago' }
      ],
      liked: true,
      note: 'Skipped eating out this week and saved the money instead!'
    },
    {
      id: 3,
      user: 'you',
      avatar: '🎯',
      level: 'Bronze',
      action: 'achieved',
      type: 'milestone',
      content: 'First R500 milestone',
      amount: 500,
      timestamp: '6 hours ago',
      likes: 15,
      comments: [
        { user: 'challenge_king', text: 'Welcome to the R500 club! 🎊', time: '5 hours ago' },
        { user: 'coin_collector', text: 'First of many! Keep it up!', time: '4 hours ago' },
        { user: 'penny_saver', text: 'So motivating! I\'m at $300 now 💪', time: '3 hours ago' }
      ],
      liked: false
    },
    {
      id: 4,
      user: 'money_master',
      avatar: '💎',
      level: 'Silver',
      action: 'started',
      type: 'challenge',
      content: 'October Investment Challenge',
      amount: null,
      timestamp: '8 hours ago',
      likes: 6,
      comments: [],
      liked: false,
      description: 'Who wants to join me in investing $200 this month? Let\'s grow our money! 📈'
    },
    {
      id: 5,
      user: 'penny_saver',
      avatar: '🥉',
      level: 'Bronze',
      action: 'reached',
      type: 'goal',
      content: 'Vacation Fund Goal',
      amount: 1200,
      timestamp: '12 hours ago',
      likes: 20,
      comments: [
        { user: 'travel_lover', text: 'Where are you planning to go? ✈️', time: '10 hours ago' },
        { user: 'penny_saver', text: 'Thinking Japan! Been saving for 2 years 🗾', time: '9 hours ago' }
      ],
      liked: true,
      achievement: 'Vacation Fund Master'
    },
    {
      id: 6,
      user: 'new_joiner',
      avatar: '🌟',
      level: 'Bronze',
      action: 'joined',
      type: 'welcome',
      content: 'DC Savings community',
      amount: null,
      timestamp: '1 day ago',
      likes: 25,
      comments: [
        { user: 'you', text: 'Welcome! Feel free to ask any questions 😊', time: '20 hours ago' },
        { user: 'challenge_king', text: 'Great to have you here! 👋', time: '18 hours ago' }
      ],
      liked: true,
      welcomeMessage: 'Excited to start my savings journey with all of you!'
    }
  ];

  const [feed, setFeed] = useState(feedData);

  const friends = [
    { username: 'challenge_king', avatar: '👑', status: 'online', streak: 28 },
    { username: 'savings_pro', avatar: '⭐', status: 'online', streak: 15 },
    { username: 'money_master', avatar: '💎', status: 'away', streak: 12 },
    { username: 'coin_collector', avatar: '🏅', status: 'offline', streak: 8 },
    { username: 'penny_saver', avatar: '🥉', status: 'online', streak: 6 }
  ];

  const trendingChallenges = [
    { name: 'October Investment Challenge', participants: 15, prize: 'R100 bonus' },
    { name: 'No-Spend November', participants: 23, prize: 'Gold Badge' },
    { name: 'Emergency Fund Sprint', participants: 8, prize: 'R50 bonus' }
    ];

};

const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: feed.length + 1,
        user: 'you',
        avatar: '🎯',
        level: 'Bronze',
        action: 'shared',
        type: 'post',
        content: newPost,
        amount: null,
        timestamp: 'just now',
        likes: 0,
        comments: [],
        liked: false
      };
      setFeed([post, ...feed]);
      setNewPost('');
      alert('Posted successfully! 🎉');
    }
  };

  const handleLike = (postId) => {
    setFeed(feed.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId) => {
    if (newComment.trim()) {
      setFeed(feed.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, { user: 'you', text: newComment, time: 'just now' }]
            }
          : post
      ));
      setNewComment('');
      setShowCommentBox(null);
    }
  };

  const getActionText = (post) => {
    switch (post.action) {
      case 'completed': return `🏆 completed the ${post.content}`;
      case 'saved': return `💰 saved $${post.amount} to ${post.content}`;
      case 'achieved': return `🎯 achieved ${post.content}`;
      case 'started': return `🚀 started ${post.content}`;
      case 'reached': return `🎉 reached ${post.content} with $${post.amount}`;
      case 'joined': return `🌟 joined ${post.content}`;
      case 'shared': return `💭 shared a thought`;
      default: return post.content;
    }

  const filteredFeed = filter === 'all' ? feed : feed.filter(post => {
    if (filter === 'challenges') return post.type === 'challenge';
    if (filter === 'savings') return post.type === 'savings';
    if (filter === 'achievements') return post.type === 'milestone' || post.type === 'goal';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-libre main-content">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-light-purple">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-dark-blue">Social Feed 🌟</h1>
                <p className="text-sm text-purple">See what your saving friends are up to</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-600">Online Friends</p>
                <p className="text-lg font-bold text-green-500">{friends.filter(f => f.status === 'online').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="xl:col-span-3 space-y-6">
            {/* Create Post */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Share Your Progress 📝</h3>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-light-purple rounded-full flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's your latest savings win? Share with the community!"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-light-purple focus:ring-4 focus:ring-light-purple/20 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <span className="text-sm text-gray-500">💰 Add amount</span>
                      <span className="text-sm text-gray-500">🏷️ Add tags</span>
                    </div>
                    <button
                      onClick={handlePost}
                      className="bg-light-purple hover:bg-purple text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Filters */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'all' ? 'bg-light-purple text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Activity
                </button>
                <button 
                  onClick={() => setFilter('challenges')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'challenges' ? 'bg-light-purple text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏆 Challenges
                </button>
                <button 
                  onClick={() => setFilter('savings')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'savings' ? 'bg-light-purple text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💰 Savings
                </button>
                <button 
                  onClick={() => setFilter('achievements')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === 'achievements' ? 'bg-light-purple text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎯 Achievements
                </button>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {filteredFeed.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">{post.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {post.user === 'you' ? 'You' : post.user}
                            <span className="ml-2 text-xs bg-light-purple/20 text-light-purple px-2 py-1 rounded-full">
                              {post.level}
                            </span>
                          </p>
                          <p className="text-gray-600">{getActionText(post)}</p>
                          <p className="text-sm text-gray-400">{post.timestamp}</p>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      {post.note && (
                        <p className="text-gray-700 mb-2">{post.note}</p>
                      )}
                      {post.description && (
                        <p className="text-gray-700 mb-2">{post.description}</p>
                      )}
                      {post.welcomeMessage && (
                        <p className="text-gray-700 mb-2 italic">"{post.welcomeMessage}"</p>
                      )}
                      {post.achievement && (
                        <div className="bg-yellow/10 p-3 rounded-lg mb-2">
                          <p className="text-yellow font-semibold">🏆 Achievement Unlocked: {post.achievement}</p>
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors duration-300 ${
                            post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <span>{post.liked ? '❤️' : '🤍'}</span>
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button 
                          onClick={() => setShowCommentBox(showCommentBox === post.id ? null : post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-light-purple transition-colors duration-300"
                        >
                          <span>💬</span>
                          <span className="font-medium">{post.comments.length}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-light-purple transition-colors duration-300">
                          <span>🔗</span>
                          <span className="font-medium">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="px-6 pb-4 border-t border-gray-50">
                      <div className="space-y-3 mt-4">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-sm">
                                {comment.user === 'you' ? '🎯' : 
                                 comment.user === 'challenge_king' ? '👑' :
                                 comment.user === 'savings_pro' ? '⭐' : '💎'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-sm text-gray-800">
                                  {comment.user === 'you' ? 'You' : comment.user}
                                </p>
                                <p className="text-gray-700">{comment.text}</p>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{comment.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comment Input */}
                  {showCommentBox === post.id && (
                    <div className="px-6 pb-4 border-t border-gray-50">
                      <div className="flex space-x-3 mt-4">
                        <div className="w-8 h-8 bg-light-purple rounded-full flex items-center justify-center">
                          <span className="text-sm text-white">🎯</span>
                        </div>
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-light-purple focus:ring-2 focus:ring-light-purple/20"
                            onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            className="bg-light-purple hover:bg-purple text-white px-4 py-2 rounded-lg transition-colors duration-300"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Friends */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Friends Online</h3>
              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{friend.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-green-500' :
                          friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{friend.username}</p>
                        <p className="text-xs text-gray-500">{friend.streak} day streak</p>
                      </div>
                    </div>
                    <button className="text-light-purple hover:text-purple transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-light-purple/10 hover:bg-light-purple/20 text-light-purple font-semibold py-2 rounded-lg transition-all duration-300">
                View All Friends
              </button>
            </div>

            {/* Trending Challenges */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Trending Challenges 🔥</h3>
              <div className="space-y-3">
                {trendingChallenges.map((challenge, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800">{challenge.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">{challenge.participants} participants</span>
                      <span className="text-sm font-medium text-light-purple">{challenge.prize}</span>
                    </div>
                    <button className="w-full mt-2 bg-light-purple hover:bg-purple text-white py-1 rounded text-sm transition-colors duration-300">
                      Join Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Highlights */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">This Week's Highlights ✨</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-yellow/10 rounded-lg">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-sm font-medium text-gray-800">Top Saver</p>
                  <p className="text-lg font-bold text-yellow">challenge_king</p>
                  <p className="text-xs text-gray-600">$285 this week</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🔥</div>
                  <p className="text-sm font-medium text-gray-800">Longest Streak</p>
                  <p className="text-lg font-bold text-green-600">challenge_king</p>
                  <p className="text-xs text-gray-600">28 days strong</p>
                </div>

                <div className="text-center p-4 bg-purple/10 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-medium text-gray-800">Goal Achiever</p>
                  <p className="text-lg font-bold text-purple">penny_saver</p>
                  <p className="text-xs text-gray-600">Vacation fund complete!</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-light-purple hover:bg-purple text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  Create Challenge
                </button>
                <button className="w-full bg-yellow hover:bg-yellow/80 text-dark-blue font-semibold py-3 rounded-lg transition-all duration-300">
                  Invite Friends
                </button>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300">
                  Find Friends
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-dark-blue mb-4">Community Stats 📊</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members:</span>
                  <span className="font-semibold text-dark-blue">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Challenges:</span>
                  <span className="font-semibold text-light-purple">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Saved:</span>
                  <span className="font-semibold text-green-600">$2.3M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span className="font-semibold text-yellow">$45.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SocialFeed;