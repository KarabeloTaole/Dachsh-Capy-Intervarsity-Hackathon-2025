//this is the social feed where users can interact with eachh other
import { useState } from 'react';

const SocialFeed = ({ onBack }) => {
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
  };

  const filteredFeed = filter === 'all' ? feed : feed.filter(post => {
    if (filter === 'challenges') return post.type === 'challenge';
    if (filter === 'savings') return post.type === 'savings';
    if (filter === 'achievements') return post.type === 'milestone' || post.type === 'goal';
    return true;
  });