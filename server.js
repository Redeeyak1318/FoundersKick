// server.js - Backend for FoundersKick
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));


// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, sparse: true },
  password: { type: String },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  authProvider: { type: String, enum: ['email', 'google', 'github', 'phone'], default: 'email' },
  googleId: String,
  githubId: String,
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Startup Schema
const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  stage: { type: String, enum: ['Idea', 'MVP', 'Traction', 'Growing'], default: 'Idea' },
  funding: { type: String, default: '$0' },
  valuation: { type: String, default: '$0' },
  location: { type: String, required: true },
  logo: { type: String },
  images: [{ type: String }],
  founded: { type: String, default: new Date().getFullYear().toString() },
  teamSize: { type: Number, default: 1 },
  lookingFor: [{ type: String }],
  problemStatement: { type: String, required: true },
  solution: { type: String, required: true },
  targetMarket: { type: String, required: true },
  goToMarketStrategy: { type: String },
  skillsNeeded: [{ type: String }],
  visibility: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  website: String,
  linkedin: String,
  twitter: String,
  createdAt: { type: Date, default: Date.now }
});

const Startup = mongoose.model('Startup', startupSchema);

// Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  fileUrl: String,
  fileType: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  updatedAt: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

// Connection Request Schema
const connectionRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Invalid file type!');
    }
  }
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Passport Configuration for OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value,
          authProvider: 'google'
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (!user) {
        user = await User.create({
          name: profile.displayName || profile.username,
          email: profile.emails[0].value,
          githubId: profile.id,
          avatar: profile.photos[0].value,
          authProvider: 'github'
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Authentication Routes

// Email/Password Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: 'email'
    });
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Email/Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    // Update online status
    user.isOnline = true;
    await user.save();
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        isOnline: user.isOnline
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Phone Number Authentication (simplified - in production use Twilio/Firebase)
app.post('/api/auth/phone', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    // In production, verify OTP with Twilio/Firebase
    // For now, simplified implementation
    
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = await User.create({
        name: 'User_' + phone.slice(-4),
        phone,
        authProvider: 'phone'
      });
    }
    
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    user.isOnline = true;
    await user.save();
    
    res.json({
      message: 'Phone authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// GitHub OAuth Routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// User Routes

// Get current user profile
app.get('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('connections', 'name email avatar bio location isOnline');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
app.put('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const { name, bio, location } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, bio, location },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload user avatar
app.post('/api/users/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const avatarUrl = `/uploads/${req.file.filename}`;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'Avatar uploaded successfully', avatar: avatarUrl, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search users by location
app.get('/api/users/search', authenticateToken, async (req, res) => {
  try {
    const { query, location } = req.query;
    
    let searchQuery = {};
    
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }
    
    const users = await User.find(searchQuery)
      .select('-password')
      .limit(50);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('connections', 'name email avatar bio location isOnline');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Startup Routes

// Create a startup
app.post('/api/startups', authenticateToken, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 5 }]), async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      category,
      stage,
      funding,
      valuation,
      location,
      founded,
      teamSize,
      lookingFor,
      problemStatement,
      solution,
      targetMarket,
      goToMarketStrategy,
      skillsNeeded,
      visibility,
      website,
      linkedin,
      twitter
    } = req.body;
    
    const logo = req.files['logo'] ? `/uploads/${req.files['logo'][0].filename}` : null;
    const images = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : [];
    
    const startup = await Startup.create({
      name,
      tagline,
      description,
      founder: req.user.userId,
      category,
      stage,
      funding,
      valuation,
      location,
      logo,
      images,
      founded,
      teamSize,
      lookingFor: JSON.parse(lookingFor || '[]'),
      problemStatement,
      solution,
      targetMarket,
      goToMarketStrategy,
      skillsNeeded: JSON.parse(skillsNeeded || '[]'),
      visibility: visibility === 'true' || visibility === true,
      website,
      linkedin,
      twitter
    });
    
    await startup.populate('founder', 'name email avatar bio location');
    
    res.status(201).json({
      message: 'Startup created successfully',
      startup
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all startups
app.get('/api/startups', async (req, res) => {
  try {
    const { search, location, category, stage, sort } = req.query;
    
    let query = { visibility: true };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { problemStatement: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (stage) {
      query.stage = stage;
    }
    
    let sortOption = { createdAt: -1 }; // default: newest
    
    if (sort === 'most-liked') {
      sortOption = { likes: -1, createdAt: -1 };
    } else if (sort === 'most-followed') {
      sortOption = { followers: -1, createdAt: -1 };
    } else if (sort === 'popular') {
      sortOption = { likes: -1, followers: -1, createdAt: -1 };
    }
    
    const startups = await Startup.find(query)
      .populate('founder', 'name email avatar bio location')
      .sort(sortOption)
      .limit(50);
    
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get startup by ID
app.get('/api/startups/:startupId', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId)
      .populate('founder', 'name email avatar bio location isOnline');
    
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update startup
app.put('/api/startups/:startupId', authenticateToken, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId);
    
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    
    if (startup.founder.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this startup' });
    }
    
    const updatedStartup = await Startup.findByIdAndUpdate(
      req.params.startupId,
      req.body,
      { new: true }
    ).populate('founder', 'name email avatar bio location');
    
    res.json(updatedStartup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete startup
app.delete('/api/startups/:startupId', authenticateToken, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId);
    
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    
    if (startup.founder.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this startup' });
    }
    
    await Startup.findByIdAndDelete(req.params.startupId);
    
    res.json({ message: 'Startup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's own startups
app.get('/api/startups/my-startups', authenticateToken, async (req, res) => {
  try {
    const startups = await Startup.find({ founder: req.user.userId })
      .populate('founder', 'name email avatar bio location')
      .sort({ createdAt: -1 });
    
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a startup
app.post('/api/startups/:startupId/like', authenticateToken, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId);
    
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    
    const alreadyLiked = startup.likedBy.includes(req.user.userId);
    
    if (alreadyLiked) {
      // Unlike
      startup.likedBy = startup.likedBy.filter(id => id.toString() !== req.user.userId);
      startup.likes = Math.max(0, startup.likes - 1);
    } else {
      // Like
      startup.likedBy.push(req.user.userId);
      startup.likes += 1;
    }
    
    await startup.save();
    
    res.json({ 
      message: alreadyLiked ? 'Startup unliked' : 'Startup liked',
      likes: startup.likes,
      liked: !alreadyLiked
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get liked startups
app.get('/api/startups/liked', authenticateToken, async (req, res) => {
  try {
    const startups = await Startup.find({ likedBy: req.user.userId })
      .populate('founder', 'name email avatar bio location')
      .sort({ createdAt: -1 });
    
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get following startups (startups from founders you're connected with)
app.get('/api/startups/following', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    const startups = await Startup.find({ 
      founder: { $in: currentUser.connections },
      visibility: true
    })
      .populate('founder', 'name email avatar bio location')
      .sort({ createdAt: -1 });
    
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Connection Routes

// Send connection request
app.post('/api/connections/request', authenticateToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    
    if (req.user.userId === receiverId) {
      return res.status(400).json({ message: 'Cannot send connection request to yourself' });
    }
    
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { sender: req.user.userId, receiver: receiverId },
        { sender: receiverId, receiver: req.user.userId }
      ]
    });
    
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }
    
    const connectionRequest = await ConnectionRequest.create({
      sender: req.user.userId,
      receiver: receiverId
    });
    
    await connectionRequest.populate('sender receiver', 'name email avatar bio location');
    
    // Emit socket event to receiver
    io.to(receiverId).emit('connectionRequest', connectionRequest);
    
    res.status(201).json({
      message: 'Connection request sent',
      connectionRequest
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Accept connection request
app.post('/api/connections/accept/:requestId', authenticateToken, async (req, res) => {
  try {
    const connectionRequest = await ConnectionRequest.findById(req.params.requestId);
    
    if (!connectionRequest) {
      return res.status(404).json({ message: 'Connection request not found' });
    }
    
    if (connectionRequest.receiver.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    connectionRequest.status = 'accepted';
    await connectionRequest.save();
    
    // Add to each other's connections
    await User.findByIdAndUpdate(connectionRequest.sender, {
      $addToSet: { connections: connectionRequest.receiver }
    });
    
    await User.findByIdAndUpdate(connectionRequest.receiver, {
      $addToSet: { connections: connectionRequest.sender }
    });
    
    // Emit socket event
    io.to(connectionRequest.sender.toString()).emit('connectionAccepted', connectionRequest);
    
    res.json({ message: 'Connection request accepted', connectionRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Messaging Routes

// Get conversations
app.get('/api/conversations', authenticateToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.userId
    })
    .populate('participants', 'name email avatar bio location isOnline')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });
    
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get messages in a conversation
app.get('/api/messages/:userId', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.userId }
      ]
    })
    .sort({ createdAt: 1 })
    .limit(100);
    
    // Mark messages as read
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user.userId, isRead: false },
      { isRead: true }
    );
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message
app.post('/api/messages', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    
    const messageData = {
      sender: req.user.userId,
      receiver: receiverId,
      text: text || ''
    };
    
    if (req.file) {
      messageData.fileUrl = `/uploads/${req.file.filename}`;
      messageData.fileType = req.file.mimetype;
    }
    
    const message = await Message.create(messageData);
    await message.populate('sender receiver', 'name email avatar');
    
    // Update or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.userId, receiverId] }
    });
    
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.userId, receiverId],
        lastMessage: message._id
      });
    } else {
      conversation.lastMessage = message._id;
      conversation.updatedAt = Date.now();
      await conversation.save();
    }
    
    // Emit socket event to receiver
    io.to(receiverId).emit('newMessage', message);
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Socket.io Real-time Chat
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // User joins with their ID
  socket.on('join', (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    
    // Update user online status
    User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: Date.now() })
      .then(() => {
        // Broadcast online status to all connected users
        io.emit('userOnline', { userId, isOnline: true });
      });
  });
  
  // Typing indicator
  socket.on('typing', ({ receiverId, isTyping }) => {
    const receiverSocketId = connectedUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('userTyping', {
        userId: socket.userId,
        isTyping
      });
    }
  });
  
  // Send message in real-time
  socket.on('sendMessage', async (messageData) => {
    try {
      const message = await Message.create(messageData);
      await message.populate('sender receiver', 'name email avatar');
      
      const receiverSocketId = connectedUsers.get(messageData.receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', message);
      }
      
      // Send confirmation to sender
      socket.emit('messageSent', message);
    } catch (error) {
      socket.emit('messageError', error.message);
    }
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
      
      // Update user online status
      User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: Date.now()
      }).then(() => {
        // Broadcast offline status
        io.emit('userOffline', { userId: socket.userId, isOnline: false });
      });
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FoundersKick API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
