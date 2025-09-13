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

};