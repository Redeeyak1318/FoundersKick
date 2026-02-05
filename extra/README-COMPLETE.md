# FoundersKick 🚀

**A fully functional social media platform for entrepreneurs and startup founders to connect, collaborate, and share their startup ideas.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🌟 Live Features

### **Complete User Flow:**
1. **🏠 Landing Page** - Professional homepage with features showcase
2. **🔐 Authentication** - Sign up/Sign in with multiple options
3. **📊 Dashboard** - Personalized user dashboard after login
4. **🚀 Startup Listing** - Add and discover startups
5. **👥 Networking** - Follow founders and build connections
6. **💬 Real-time Chat** - Message other entrepreneurs instantly

### **Authentication Methods:**
- ✅ **Email & Password** - Traditional signup/signin
- ✅ **Google OAuth** - One-click Google login
- ✅ **GitHub OAuth** - Developer-friendly GitHub auth
- ✅ **Phone Number** - SMS-based authentication

### **Core Functionality:**
- 📝 **Startup Profiles** - Create detailed profiles with images, funding, valuation
- 🔍 **Search & Filter** - Find startups and founders by location
- 👤 **User Profiles** - Complete profiles with bio and location
- 💬 **Real-time Messaging** - Chat with online status indicators
- 🤝 **Follow System** - Follow/connect with other founders
- 📸 **Image Uploads** - Upload startup pictures and profile avatars
- 🌍 **Location-based Discovery** - Find startups in your area

---

## 🎯 What Makes This Different?

### **Production-Ready Features:**
- ✅ **No Dummy Data** - Connects to real backend API
- ✅ **Proper Auth Flow** - Secure JWT-based authentication
- ✅ **Database Integration** - MongoDB for persistent storage
- ✅ **File Uploads** - Real image upload functionality
- ✅ **Real-time Updates** - Socket.io for live messaging
- ✅ **Responsive Design** - Works on all devices
- ✅ **Professional UI** - Minimal, bold, gradient design

### **User Experience:**
1. Users land on **homepage** → See features and call-to-action
2. Click "Get Started" → **Auth modal** appears with signup/signin
3. After authentication → Redirected to **personalized dashboard**
4. Can browse **startups**, connect with **founders**, send **messages**
5. Add their own **startup** with images and details
6. Search by **location** to find local entrepreneurs

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Code editor

### 1. Backend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - MINIMUM required:
MONGODB_URI=mongodb://localhost:27017/foundersKick
JWT_SECRET=your-super-secret-key-change-this
PORT=5000

# Start backend
npm run dev
```

### 2. Frontend Setup

```bash
# Create frontend folder
mkdir frontend
cd frontend

# Copy frontend files:
# - founderskick-complete.jsx
# - main-updated.jsx (rename to main.jsx)
# - index.html
# - vite.config.js
# - frontend-package.json (rename to package.json)

# Install dependencies
npm install

# Start frontend
npm run dev
```

### 3. Access Application

- Frontend: **http://localhost:3000**
- Backend: **http://localhost:5000**

---

## 🗂️ Project Structure

```
founderskick/
├── backend/
│   ├── server.js                    # Express server with all APIs
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables
│   └── uploads/                     # Uploaded files directory
│
├── frontend/
│   ├── src/
│   │   ├── founderskick-complete.jsx   # Main React app
│   │   └── main.jsx                    # React entry point
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   └── index.html                      # HTML template
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register with email/password
POST   /api/auth/login             # Login with email/password
POST   /api/auth/phone             # Phone number authentication
GET    /auth/google                # Google OAuth
GET    /auth/github                # GitHub OAuth
```

### Users
```
GET    /api/users/me               # Get current user
PUT    /api/users/me               # Update profile
POST   /api/users/avatar           # Upload avatar
GET    /api/users/search           # Search users by location/query
GET    /api/users/:userId          # Get user by ID
```

### Startups
```
POST   /api/startups               # Create startup (with images)
GET    /api/startups               # Get all startups (with filters)
GET    /api/startups/:id           # Get startup by ID
PUT    /api/startups/:id           # Update startup
DELETE /api/startups/:id           # Delete startup
```

### Connections
```
POST   /api/connections/request    # Send follow request
POST   /api/connections/accept/:id # Accept connection
```

### Messages
```
GET    /api/conversations          # Get all conversations
GET    /api/messages/:userId       # Get messages with user
POST   /api/messages               # Send message (with file)
```

---

## 🎨 Design System

### Color Palette
```css
Primary Gradient: from-purple-600 to-blue-600
Background: from-purple-50 via-blue-50 to-indigo-50
```

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, 700-900 weight
- Body: Regular, 400-600 weight

### Components
- **Rounded Corners**: 12px-24px (rounded-xl, rounded-2xl)
- **Shadows**: Soft elevation with hover effects
- **Transitions**: Smooth 300ms animations
- **Gradients**: Professional purple-to-blue theme

---

## 🚀 Deployment Guide

### Option 1: Heroku (Easiest)

**Backend:**
```bash
heroku create founderskick-api
heroku addons:create mongolab
heroku config:set JWT_SECRET="your-secret"
git push heroku main
```

**Frontend:**
```bash
heroku create founderskick-web
heroku buildpacks:set mars/create-react-app
git subtree push --prefix frontend heroku main
```

### Option 2: Railway (Recommended)

1. Go to [Railway.app](https://railway.app/)
2. Connect GitHub repository
3. Deploy backend service
4. Add MongoDB database
5. Deploy frontend service
6. Set environment variables

### Option 3: Render

1. Create account at [Render.com](https://render.com/)
2. New Web Service → Connect repo
3. Configure build/start commands
4. Add environment variables
5. Deploy (automatic SSL included)

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.**

---

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/foundersKick
# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/foundersKick

# Security
JWT_SECRET=generate-a-strong-random-key-here
PORT=5000

# OAuth (Optional - for Google/GitHub login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📱 App Flow

### 1. Landing Page
- Hero section with value proposition
- Feature highlights
- "Get Started" CTA button
- Footer with branding

### 2. Authentication
- Modal popup for signup/signin
- Toggle between modes
- Multiple auth options
- Form validation
- Error handling

### 3. Dashboard
- **Discover Tab**: Browse all startups with search/filter
- **Network Tab**: Find and follow founders
- **Messages Tab**: Real-time chat interface
- Profile menu with settings and logout

### 4. Creating Content
- "Add Startup" button in header
- Modal form with all startup details
- Image upload (up to 5 images)
- Form validation
- Success confirmation

### 5. Networking
- View user profiles
- Follow/unfollow functionality
- Send direct messages
- Online status indicators

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Lucide Icons** - Icon library
- **Tailwind CSS** - Utility-first styling
- **Fetch API** - HTTP requests

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database & ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Socket.io** - Real-time messaging
- **Passport.js** - OAuth strategies

---

## 🧪 Testing the App

### 1. Create First User
```
1. Open http://localhost:3000
2. Click "Get Started"
3. Fill signup form
4. Submit to create account
```

### 2. Add a Startup
```
1. Click "Add Startup" in header
2. Fill all required fields
3. Upload images (optional)
4. Submit to create startup
```

### 3. Test Search
```
1. Go to "Discover" tab
2. Enter search query or location
3. Results update in real-time
```

### 4. Test Networking
```
1. Go to "Network" tab
2. Find other users
3. Click "Follow" button
4. Click "Message" to chat
```

### 5. Test Messaging
```
1. Go to "Messages" tab
2. Select a conversation
3. Type and send messages
4. Messages appear in real-time
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - Bcrypt encryption
- ✅ **CORS Protection** - Controlled cross-origin requests
- ✅ **Input Validation** - Server-side validation
- ✅ **SQL Injection Prevention** - Mongoose ODM protection
- ✅ **XSS Protection** - React automatic escaping
- ✅ **File Upload Limits** - Max 10MB per file

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
```bash
# Check if backend is running
lsof -i :5000

# Restart backend
npm run dev
```

### "MongoDB connection failed"
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### "Auth not working"
```
- Verify JWT_SECRET in .env
- Check OAuth credentials
- Clear browser cookies/localStorage
- Check backend logs for errors
```

### "Images not uploading"
```bash
# Create uploads directory
mkdir uploads
chmod 755 uploads

# Check Multer configuration in server.js
```

---

## 📈 Roadmap

### Phase 1 (Current) ✅
- Landing page
- Authentication system
- Startup CRUD operations
- User profiles
- Basic messaging

### Phase 2 (Planned)
- [ ] Advanced search filters
- [ ] Startup analytics dashboard
- [ ] Email notifications
- [ ] Investment tracking
- [ ] Team collaboration tools

### Phase 3 (Future)
- [ ] Video calls integration
- [ ] Document sharing
- [ ] Calendar & scheduling
- [ ] AI-powered matching
- [ ] Mobile apps (iOS/Android)

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 📧 Support

- **Email**: support@founderskick.com
- **Twitter**: [@founderskick](https://twitter.com/founderskick)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/founderskick/issues)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for flexible data storage
- Socket.io for real-time capabilities
- Lucide for beautiful icons
- The entire open-source community

---

**Built with ❤️ for entrepreneurs, by entrepreneurs**

🚀 **Start building your startup network today!**
