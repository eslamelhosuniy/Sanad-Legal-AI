import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import MainDashboard from "./pages/MainDashboard";
import ConsultationPage from "./pages/ConsultationPage";
import DocumentAnalysis from "./pages/DocumentAnalysis";
import LegalResearch from "./pages/LegalResearch";
import LawyersDashboard from "./pages/LawyersDashboard";
import PrivacyPage from "./pages/PrivacyPage";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import WaitingVerifyEmail from "./pages/WaitingVerifyEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ConsultationHistory from "./pages/ConsultationHistory";

function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-white dark:bg-neutral-darker transition-colors duration-300">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify_email" element={<VerifyEmail />} />
                <Route
                  path="/waiting_verify_email"
                  element={<WaitingVerifyEmail />}
                />
                <Route
                  path="/reset_password"
                  element={
                    <ProtectedRoute>
                      <ResetPassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consultation/:id"
                  element={
                    <ProtectedRoute>
                      <ConsultationPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consultation"
                  element={
                    <ProtectedRoute>
                      <ConsultationPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/documents"
                  element={
                    <ProtectedRoute>
                      <DocumentAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/research"
                  element={
                    <ProtectedRoute>
                      <LegalResearch />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lawyers"
                  element={
                    <ProtectedRoute>
                      <LawyersDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consultation-history"
                  element={
                    <ProtectedRoute>
                      <ConsultationHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <ProtectedRoute>
                      <PrivacyPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App;
