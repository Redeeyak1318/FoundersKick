import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageCircle, Users, Briefcase, Plus, Send, Image, MapPin, TrendingUp, DollarSign, Calendar, LogOut, Menu, X, Phone, Github, Mail, Bell, Settings, User, Building2, Target, Zap, Check, ArrowRight, Star, Heart, UserPlus, UserCheck, Filter, Edit, Trash2, Eye, Share2 } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'https://founderskick.onrender.com';

// API Helper Functions
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// Landing Page Component
const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FoundersKick
              </h1>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Entrepreneurs Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Share your startup ideas, discover innovative projects, and collaborate with founders around the globe. Build the future together.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Start Your Journey
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="text-purple-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Showcase Your Startup</h3>
            <p className="text-gray-600">
              Create detailed profiles with funding info, team details, and growth metrics. Let investors and partners discover you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Network & Collaborate</h3>
            <p className="text-gray-600">
              Connect with like-minded entrepreneurs, find co-founders, and build meaningful partnerships across the globe.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-time Messaging</h3>
            <p className="text-gray-600">
              Chat instantly with founders, share ideas, and collaborate on projects with our real-time messaging platform.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Join Now
              </div>
              <p className="text-gray-600">Active Entrepreneurs</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Start Today
              </div>
              <p className="text-gray-600">Funded Startups</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Build Together
              </div>
              <p className="text-gray-600">Countries Represented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold">FoundersKick</h3>
          </div>
          <p className="text-gray-400">© 2025 FoundersKick. Built for entrepreneurs, by entrepreneurs.</p>
        </div>
      </footer>
    </div>
  );
};

// Auth Modal Component
const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const payload = mode === 'signup' 
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const data = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleGithubAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiCall('/api/auth/phone', {
        method: 'POST',
        body: JSON.stringify({ phone: formData.phone, otp: '123456' }), // In production, implement real OTP
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {mode === 'signin' ? 'Welcome Back' : 'Join FoundersKick'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all duration-300"
          >
            <Mail className="text-red-500" size={20} />
            <span className="font-semibold text-gray-700">Continue with Google</span>
          </button>

          <button
            onClick={handleGithubAuth}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
          >
            <Github className="text-white" size={20} />
            <span className="font-semibold text-white">Continue with GitHub</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or use phone</span>
          </div>
        </div>

        {/* Phone Auth */}
        <form onSubmit={handlePhoneAuth} className="space-y-3">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            <Phone size={20} />
            Continue with Phone
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const [startups, setStartups] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateStartup, setShowCreateStartup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const messagesEndRef = useRef(null);

  // Fetch data on mount
  useEffect(() => {
    if (activeTab === 'discover') {
      fetchStartups();
    } else if (activeTab === 'network') {
      fetchUsers();
    } else if (activeTab === 'messages') {
      fetchConversations();
    }
  }, [activeTab, searchQuery, locationFilter]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

 const fetchStartups = async () => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (locationFilter) params.append('location', locationFilter);

    const data = await fetch(
      `${API_BASE_URL}/api/startups?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Cache-Control': 'no-cache',
        },
      }
    ).then(res => res.json());

    setStartups(data);
  } catch (error) {
    console.error('Error fetching startups:', error);
  }
};


 const fetchUsers = async () => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (locationFilter) params.append('location', locationFilter);

    const data = await apiCall(`/api/users/search?${params}`);

    console.log("CURRENT USER:", currentUser);
    console.log("ALL USERS:", data);

    const filtered = data.filter(user =>
    user._id !== currentUser._id
    );


    setUsers(filtered);

  } catch (error) {
    console.error("fetchUsers error:", error);
  }
};


  const fetchConversations = async () => {
    try {
      const data = await apiCall('/api/conversations');
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const data = await apiCall(`/api/messages/${userId}`);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    try {
      const formData = new FormData();
      formData.append('receiverId', selectedChat.id);
      formData.append('text', messageText);

      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send message');

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setMessageText('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFollowUser = async (userId) => {
    try {
      await apiCall('/api/connections/request', {
        method: 'POST',
        body: JSON.stringify({ receiverId: userId }),
      });
      setFollowedUsers(new Set([...followedUsers, userId]));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const StartupCard = ({ startup }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {startup.images && startup.images.length > 0 ? (
        <img src={`${API_BASE_URL}${startup.images[0]}`} alt={startup.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center text-6xl">
          🚀
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{startup.name}</h3>
            <p className="text-purple-600 font-semibold text-sm">{startup.tagline}</p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
            {startup.stage}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{startup.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-purple-500" />
            <span>{startup.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign size={16} className="text-green-500" />
            <span>{startup.funding} raised • {startup.valuation} valuation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-blue-500" />
            <span>{startup.teamSize} team members</span>
          </div>
        </div>

        {startup.lookingFor && startup.lookingFor.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {startup.lookingFor.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm">
            View Details
          </button>
          <button className="px-3 py-2 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user }) => {
    const isFollowed = followedUsers.has(user._id);
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            {user.avatar ? (
              <img src={`${API_BASE_URL}${user.avatar}`} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl text-white">
                {user.name.charAt(0)}
              </div>
            )}
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.bio || 'Entrepreneur'}</p>
          </div>
        </div>
        {user.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin size={16} className="text-purple-500" />
            <span>{user.location}</span>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedChat({ id: user._id, name: user.name, avatar: user.avatar, online: user.isOnline })}
            className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm"
          >
            Message
          </button>
          <button
            onClick={() => handleFollowUser(user._id)}
            disabled={isFollowed}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              isFollowed
                ? 'bg-green-50 text-green-600 border-2 border-green-200'
                : 'border-2 border-purple-200 text-purple-600 hover:bg-purple-50'
            }`}
          >
            {isFollowed ? <UserCheck size={18} /> : <UserPlus size={18} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FoundersKick
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'discover'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="inline mr-2" size={18} />
                Discover
              </button>
              <button
                onClick={() => setActiveTab('network')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'network'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="inline mr-2" size={18} />
                Network
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'messages'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="inline mr-2" size={18} />
                Messages
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateStartup(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus size={18} />
                Add Startup
              </button>
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl hover:shadow-lg transition-shadow text-white font-bold">
                  {currentUser.name.charAt(0)}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
                    <Settings size={16} />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => { setActiveTab('discover'); setShowMobileMenu(false); }}
                className="w-full text-left px-4 py-3 rounded-lg font-semibold bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Briefcase size={18} />
                Discover Startups
              </button>
              <button
                onClick={() => { setActiveTab('network'); setShowMobileMenu(false); }}
                className="w-full text-left px-4 py-3 rounded-lg font-semibold bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Users size={18} />
                Network
              </button>
              <button
                onClick={() => { setActiveTab('messages'); setShowMobileMenu(false); }}
                className="w-full text-left px-4 py-3 rounded-lg font-semibold bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Messages
              </button>
              <button
                onClick={() => { setShowCreateStartup(true); setShowMobileMenu(false); }}
                className="w-full text-left px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Add Startup
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        {(activeTab === 'discover' || activeTab === 'network') && (
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'discover' ? 'startups' : 'founders'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors shadow-sm"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Discover Startups</h2>
              <div className="text-sm text-gray-500">
                {startups.length} {startups.length === 1 ? 'startup' : 'startups'} found
              </div>
            </div>
            {startups.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl text-gray-500 mb-4">No startups yet</p>
                <button
                  onClick={() => setShowCreateStartup(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Be the first to add a startup!
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startups.map((startup) => (
                  <StartupCard key={startup._id} startup={startup} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Network Tab */}
        {activeTab === 'network' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Network</h2>
              <div className="text-sm text-gray-500">
                {users.length} {users.length === 1 ? 'founder' : 'founders'} found
              </div>
            </div>
            {users.length === 0 ? (
              <div className="text-center py-20">
                <Users size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl text-gray-500">No founders found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Chat List */}
            <div className={`lg:col-span-1 ${selectedChat ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                <div className="overflow-y-auto h-full">
                  {conversations.length === 0 ? (
                    <div className="text-center py-20">
                      <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500">No conversations yet</p>
                      <p className="text-sm text-gray-400 mt-2">Start chatting with founders!</p>
                    </div>
                  ) : (
                    conversations.map((conv) => {
                    if (!conv.participants) return null;

                    const otherUser = conv.participants.find(
                      p => p && p._id !== currentUser._id
                    );

                    if (!otherUser) return null;



                      return (
                        <button
                          key={conv._id}
                          onClick={() => setSelectedChat({ id: otherUser._id, name: otherUser.name, avatar: otherUser.avatar, online: otherUser.isOnline })}
                          className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <div className="relative">
                            {otherUser?.avatar ? (
                              <img src={`${API_BASE_URL}${otherUser.avatar}`} alt={otherUser.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl text-white">
                                {otherUser?.name?.charAt(0) || "?"}
                              </div>
                            )}
                            {otherUser.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
                            <p className="text-sm text-gray-500 truncate">Click to view messages</p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className={`lg:col-span-2 ${selectedChat ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center'}`}>
              {selectedChat ? (
                <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedChat(null)} className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors">
                        <X size={24} />
                      </button>
                      <div className="relative">
                        {selectedChat.avatar ? (
                          <img src={`${API_BASE_URL}${selectedChat.avatar}`} alt={selectedChat.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl text-white">
                            {selectedChat.name.charAt(0)}
                          </div>
                        )}
                        {selectedChat.online && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.length === 0 ? (
                      <div className="text-center py-20">
                        <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No messages yet</p>
                        <p className="text-sm text-gray-400 mt-2">Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`flex ${msg.sender === currentUser._id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                              msg.sender === currentUser._id
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-white text-gray-900 shadow-md'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === currentUser._id ? 'text-purple-100' : 'text-gray-500'}`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Create Startup Modal */}
      {showCreateStartup && (
        <CreateStartupModal
          currentUser={currentUser}
          onClose={() => setShowCreateStartup(false)}
          onSuccess={() => {
            setShowCreateStartup(false);
            fetchStartups();
          }}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// Create Startup Modal Component
const CreateStartupModal = ({ currentUser, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    category: '',
    stage: 'Pre-Seed',
    funding: '',
    valuation: '',
    location: '',
    teamSize: 1,
    lookingFor: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Submit clicked"); // debug
    console.log("Submitting startup...");

    setLoading(true);
    setError('');

    try {

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('tagline', formData.tagline);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('stage', formData.stage);
      submitData.append('funding', formData.funding);
      submitData.append('valuation', formData.valuation);
      submitData.append('location', formData.location);
      submitData.append('teamSize', formData.teamSize);
      submitData.append('lookingFor', JSON.stringify(formData.lookingFor.split(',').map(s => s.trim())));

      images.forEach(image => {
        submitData.append('images', image);
      });

      const response = await fetch(`${API_BASE_URL}/api/startups`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: submitData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create startup');
      }

      await onSuccess();
    } 
    catch (err) {
        console.error("CREATE STARTUP ERROR:", err);
        setError(err.message || "Unknown error");
    }
    finally {
      setLoading(false);
    }
    };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Launch Your Startup
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Startup Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your startup name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline *</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              required
              placeholder="One-line description"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Tell us about your startup"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="e.g., AI & ML, FinTech"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stage *</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option>Idea</option>
                <option>Pre-Seed</option>
                <option>Seed</option>
                <option>Series A</option>
                <option>Series B</option>
                <option>Series C+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Raised</label>
              <input
                type="text"
                name="funding"
                value={formData.funding}
                onChange={handleInputChange}
                placeholder="e.g., $500K"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Valuation</label>
              <input
                type="text"
                name="valuation"
                value={formData.valuation}
                onChange={handleInputChange}
                placeholder="e.g., $5M"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="City, Country"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Looking For (comma separated)</label>
            <input
              type="text"
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleInputChange}
              placeholder="e.g., Co-founder, Investors, Engineers"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">You can upload up to 5 images</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Creating...'
            ) : (
              <>
                <Check size={20} />
                Launch Startup
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main App Component
export default function FoundersKickApp() {
  const [appState, setAppState] = useState('landing'); // 'landing', 'auth', 'dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
  const initAuth = async () => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      // fetch current user from backend
      const user = await apiCall("/api/users/me");

      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setAppState("dashboard");
    } catch (err) {
      console.error("Auth restore failed:", err);
      localStorage.clear();
    }
  };

  initAuth();
}, []);


  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAppState('dashboard');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setAppState('landing');
  };

  if (appState === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </>
    );
  }

  if (appState === 'dashboard' && currentUser) {
    return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return null;
}
