import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import './App.css'
import Login from './components/Login'
import ProfilePage from "./components/Profile"
import Leaderboard from './components/Leaderboards'
import Dashboard from './components/Dashboard'
import Challenge from './components/Challenge'
import SocialFeed from './components/SocialFeed'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<><Dashboard /><Navigation /></>} />
          <Route path="/profile" element={<><ProfilePage /><Navigation /></>} />
          <Route path="/leaderboard" element={<><Leaderboard /><Navigation /></>} />
          <Route path="/challenge/:id" element={<><Challenge /><Navigation /></>} />
          <Route path="/social" element={<><SocialFeed /><Navigation /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App