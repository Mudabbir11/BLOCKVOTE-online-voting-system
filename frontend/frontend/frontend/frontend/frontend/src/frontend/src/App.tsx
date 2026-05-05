import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<VoterRegistration />} />
        <Route path="/login" element={<VoterLogin />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/profile" element={<VoterProfile />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

// 1. HOME PAGE
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-12 flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🗳️</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            BLACKVOTE
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            The most secure voting platform powered by <strong>Blockchain</strong> and <strong>Biometrics</strong>
          </p>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {[
              { icon: '🔐', title: 'Biometric Security', desc: 'Face + Fingerprint verification' },
              { icon: '⛓️', title: 'Blockchain Immutable', desc: 'Votes cannot be altered' },
              { icon: '👁️', title: '100% Transparent', desc: 'Real-time verifiable results' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:border-blue-400 transition-all hover:scale-105">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-200">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => navigate('/register')} className="btn-large-primary">
              📝 Register to Vote
            </button>
            <button onClick={() => navigate('/results')} className="btn-large-secondary">
              📊 View Results
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// 2. SHARED HEADER
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Register', path: '/register' },
    { label: 'Login', path: '/login' },
    { label: 'Results', path: '/results' },
    { label: 'Admin', path: '/admin' }
  ];

  return (
    <header className="backdrop-blur-2xl bg-black/40 sticky top-0 z-50 px-6 py-6 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <span className="text-2xl font-bold">🗳️</span>
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              BLACKVOTE
            </h1>
            <p className="text-blue-400 text-sm font-bold">Secure Voting Platform</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-2">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-500/20 border-2 border-blue-400 shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 border border-white/30 hover:bg-white/20'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

// 3. VOTER REGISTRATION
const VoterRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', wallet: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simulate biometric data
      const biometricData = crypto.getRandomValues(new Uint8Array(32));
      
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
