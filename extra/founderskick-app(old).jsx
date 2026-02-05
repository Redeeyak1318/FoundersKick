import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageCircle, Users, Briefcase, Plus, Send, Image, MapPin, TrendingUp, DollarSign, Calendar, LogOut, Menu, X, Phone, Github, Mail, Bell, Settings, User, Building2, Target, Zap, Check } from 'lucide-react';

// Mock Data Store (In production, replace with MongoDB + Node.js backend)
const mockUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', avatar: '👩‍💼', bio: 'Tech entrepreneur | AI enthusiast', location: 'San Francisco, CA', online: true },
  { id: 2, name: 'Alex Kumar', email: 'alex@example.com', avatar: '👨‍💻', bio: 'Full-stack developer | Startup founder', location: 'Bangalore, India', online: false },
  { id: 3, name: 'Maria Garcia', email: 'maria@example.com', avatar: '👩‍🔬', bio: 'BioTech innovator', location: 'Boston, MA', online: true },
  { id: 4, name: 'James Wilson', email: 'james@example.com', avatar: '👨‍💼', bio: 'Serial entrepreneur | Angel investor', location: 'London, UK', online: false },
];

const mockStartups = [
  {
    id: 1,
    name: 'AI Vision Pro',
    founder: 'Sarah Chen',
    founderId: 1,
    tagline: 'Computer vision for retail analytics',
    description: 'Leveraging AI to provide real-time customer insights for brick-and-mortar stores',
    category: 'AI & ML',
    stage: 'Seed',
    funding: '$500K',
    valuation: '$5M',
    location: 'San Francisco, CA',
    image: '🤖',
    founded: '2024',
    teamSize: 5,
    lookingFor: ['Co-founder', 'Investors']
  },
  {
    id: 2,
    name: 'EcoCharge',
    founder: 'Alex Kumar',
    founderId: 2,
    tagline: 'Sustainable EV charging network',
    description: 'Building solar-powered EV charging stations across urban areas',
    category: 'Clean Energy',
    stage: 'Pre-Seed',
    funding: '$250K',
    valuation: '$2M',
    location: 'Bangalore, India',
    image: '⚡',
    founded: '2025',
    teamSize: 3,
    lookingFor: ['Engineers', 'Partnerships']
  },
  {
    id: 3,
    name: 'BioSync',
    founder: 'Maria Garcia',
    founderId: 3,
    tagline: 'Personalized medicine platform',
    description: 'Using genomics to create tailored treatment plans',
    category: 'HealthTech',
    stage: 'Series A',
    funding: '$3M',
    valuation: '$15M',
    location: 'Boston, MA',
    image: '🧬',
    founded: '2023',
    teamSize: 12,
    lookingFor: ['Medical advisors', 'Series B investors']
  },
];

// Authentication Component
const AuthModal = ({ onClose, onLogin }) => {
  const [authMethod, setAuthMethod] = useState('email');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAuth = (method) => {
    // In production, implement actual OAuth and phone verification
    const mockUser = mockUsers[0];
    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Join FoundersKick
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-8">Connect with entrepreneurs and bring your startup ideas to life</p>

        <div className="space-y-4">
          <button
            onClick={() => handleAuth('google')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all duration-300 group"
          >
            <Mail className="text-red-500" size={20} />
            <span className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">Continue with Google</span>
          </button>

          <button
            onClick={() => handleAuth('github')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 border-2 border-gray-900 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
          >
            <Github className="text-white" size={20} />
            <span className="font-semibold text-white">Continue with GitHub</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleAuth('phone')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
            >
              <Phone size={20} />
              Continue with Phone
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to FoundersKick's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

// Startup Card Component
const StartupCard = ({ startup, onViewDetails, currentUser }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="h-48 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center text-8xl">
        {startup.image}
      </div>
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

        <div className="flex flex-wrap gap-2 mb-4">
          {startup.lookingFor.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={() => onViewDetails(startup)}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Chat Component
const ChatInterface = ({ selectedChat, currentUser, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: selectedChat.id, text: "Hey! I saw your startup profile. Love the concept!", time: '10:30 AM', read: true },
    { id: 2, sender: currentUser.id, text: "Thanks! I'd love to hear your thoughts on collaboration.", time: '10:32 AM', read: true },
    { id: 3, sender: selectedChat.id, text: "Absolutely! Do you have time for a call this week?", time: '10:35 AM', read: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: currentUser.id,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: messages.length + 2,
          sender: selectedChat.id,
          text: "That sounds great! Let me check my calendar.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        sender: currentUser.id,
        text: `📎 ${file.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        isFile: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
              {selectedChat.avatar}
            </div>
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                msg.sender === currentUser.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-white text-gray-900 shadow-md'
              } ${msg.isFile ? 'border-2 border-dashed' : ''}`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === currentUser.id ? 'text-purple-100' : 'text-gray-500'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-3 rounded-2xl bg-white shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
          >
            <Image size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function FoundersKickApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateStartup, setShowCreateStartup] = useState(false);
  const [newStartup, setNewStartup] = useState({
    name: '',
    tagline: '',
    description: '',
    category: '',
    stage: 'Pre-Seed',
    funding: '',
    valuation: '',
    location: '',
    teamSize: 1,
  });

  useEffect(() => {
    // Auto-show auth modal if not logged in
    if (!currentUser) {
      setShowAuthModal(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAuthModal(true);
  };

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.founder.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || startup.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || user.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleCreateStartup = () => {
    // In production, send to backend API
    console.log('Creating startup:', newStartup);
    setShowCreateStartup(false);
    setNewStartup({
      name: '',
      tagline: '',
      description: '',
      category: '',
      stage: 'Pre-Seed',
      funding: '',
      valuation: '',
      location: '',
      teamSize: 1,
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
        )}
      </div>
    );
  }

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
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
                  activeTab === 'messages'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="inline mr-2" size={18} />
                Messages
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowCreateStartup(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus size={18} />
                Add Startup
              </button>
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl hover:shadow-lg transition-shadow">
                  {currentUser.avatar}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block">
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
                    onClick={handleLogout}
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

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Discover Startups</h2>
              <div className="text-sm text-gray-500">{filteredStartups.length} startups found</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup) => (
                <StartupCard
                  key={startup.id}
                  startup={startup}
                  currentUser={currentUser}
                  onViewDetails={(s) => console.log('View details:', s)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Network Tab */}
        {activeTab === 'network' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Network</h2>
              <div className="text-sm text-gray-500">{filteredUsers.length} founders found</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl">
                        {user.avatar}
                      </div>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.bio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin size={16} className="text-purple-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedChat(user)}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      Message
                    </button>
                    <button className="px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                      <Users size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                  {mockUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedChat(user)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                        selectedChat?.id === user.id ? 'bg-purple-50' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        {user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <span className="text-xs text-gray-500">10:35 AM</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">Hey! I saw your startup...</p>
                      </div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className={`lg:col-span-2 ${selectedChat ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center'}`}>
              {selectedChat ? (
                <ChatInterface
                  selectedChat={selectedChat}
                  currentUser={currentUser}
                  onBack={() => setSelectedChat(null)}
                />
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Launch Your Startup
              </h2>
              <button
                onClick={() => setShowCreateStartup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Startup Name</label>
                <input
                  type="text"
                  value={newStartup.name}
                  onChange={(e) => setNewStartup({ ...newStartup, name: e.target.value })}
                  placeholder="Enter your startup name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={newStartup.tagline}
                  onChange={(e) => setNewStartup({ ...newStartup, tagline: e.target.value })}
                  placeholder="One-line description"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newStartup.description}
                  onChange={(e) => setNewStartup({ ...newStartup, description: e.target.value })}
                  placeholder="Tell us about your startup"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={newStartup.category}
                    onChange={(e) => setNewStartup({ ...newStartup, category: e.target.value })}
                    placeholder="e.g., AI & ML, FinTech"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stage</label>
                  <select
                    value={newStartup.stage}
                    onChange={(e) => setNewStartup({ ...newStartup, stage: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
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
                    value={newStartup.funding}
                    onChange={(e) => setNewStartup({ ...newStartup, funding: e.target.value })}
                    placeholder="e.g., $500K"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Valuation</label>
                  <input
                    type="text"
                    value={newStartup.valuation}
                    onChange={(e) => setNewStartup({ ...newStartup, valuation: e.target.value })}
                    placeholder="e.g., $5M"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newStartup.location}
                    onChange={(e) => setNewStartup({ ...newStartup, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                  <input
                    type="number"
                    value={newStartup.teamSize}
                    onChange={(e) => setNewStartup({ ...newStartup, teamSize: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <Image size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button
                onClick={handleCreateStartup}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Launch Startup
              </button>
            </div>
          </div>
        </div>
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
}
