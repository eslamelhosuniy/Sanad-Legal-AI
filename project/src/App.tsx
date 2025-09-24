import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import MainDashboard from './pages/MainDashboard';
import ConsultationPage from './pages/ConsultationPage';
import DocumentAnalysis from './pages/DocumentAnalysis';
import LegalResearch from './pages/LegalResearch';
import LawyersDashboard from './pages/LawyersDashboard';
import PrivacyPage from './pages/PrivacyPage';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-neutral-darker transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/documents" element={<DocumentAnalysis />} />
            <Route path="/research" element={<LegalResearch />} />
            <Route path="/lawyers" element={<LawyersDashboard />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;