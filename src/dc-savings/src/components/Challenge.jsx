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
  

};