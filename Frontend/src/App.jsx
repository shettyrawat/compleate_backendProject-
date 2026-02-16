import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SetPassword from './pages/SetPassword';
import JobList from './pages/JobList';
import AddJob from './pages/AddJob';
import ResumeAnalysis from './pages/ResumeAnalysis';
import MockInterview from './pages/MockInterview';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
import ChatBot from './components/ChatBot';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <div className="app-container" style={{ padding: '0 1rem' }}>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '2rem auto' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<ProtectedRoute><SetPassword /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
          <Route path="/jobs/add" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalysis /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/dashboard" element={<Navigate to="/jobs" />} />
        </Routes>
      </main>
      <ChatBot />
    </div>
  );
}

export default App;
