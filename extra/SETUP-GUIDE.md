# 🎯 FoundersKick - Complete Setup Guide

## 📋 What You're Building

A **fully functional social media platform** where:
- Users see a **landing page** first
- They **sign up/sign in** with email, Google, GitHub, or phone
- After auth, they access their **personalized dashboard**
- They can **list startups**, **search** by location, **follow founders**, and **chat in real-time**

**NO dummy data** - everything connects to your real backend!

---

## 🚀 Step-by-Step Setup (10 Minutes)

### Step 1: Create Project Folders

```bash
# Create main project folder
mkdir founderskick
cd founderskick

# Create backend and frontend folders
mkdir backend frontend
```

### Step 2: Backend Setup

```bash
cd backend

# Copy these files into backend folder:
# - server.js
# - package.json
# - .env.example

# Rename .env.example to .env
cp .env.example .env

# Edit .env file with your settings:
nano .env
```

**Minimum .env configuration:**
```env
MONGODB_URI=mongodb://localhost:27017/foundersKick
JWT_SECRET=my-super-secret-key-12345
PORT=5000
CLIENT_URL=http://localhost:3000
```

```bash
# Install dependencies
npm install

# Start backend (keep this terminal open)
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Step 3: Frontend Setup

**Open a NEW terminal:**

```bash
cd founderskick/frontend

# Copy these files into frontend folder:
# - founderskick-complete.jsx
# - main-updated.jsx (rename to main.jsx)
# - index.html
# - vite.config.js
# - frontend-package.json (rename to package.json)

# Your frontend/src folder should have:
# - founderskick-complete.jsx
# - main.jsx

# Install dependencies
npm install

# Start frontend
npm run dev
```

You should see:
```
VITE ready in 500ms
➜  Local:   http://localhost:3000
```

### Step 4: Access the App

Open **http://localhost:3000** in your browser!

---

## 🎬 User Flow Demo

### 1. Landing Page
- You'll see the FoundersKick homepage
- Features showcase
- Click **"Get Started"** button

### 2. Authentication
- Modal appears with signup/signin options
- Choose your method:
  - **Email/Password** - Quick signup
  - **Google** - One-click (requires OAuth setup)
  - **GitHub** - For developers (requires OAuth setup)
  - **Phone** - SMS-based (simplified for demo)

### 3. Dashboard Access
After successful auth, you're redirected to your dashboard with 3 tabs:

**📊 Discover Tab:**
- Browse all startups
- Search by name/description
- Filter by location
- Click "View Details" on any startup

**👥 Network Tab:**
- Find other founders
- Follow/connect with users
- Send direct messages
- See online status

**💬 Messages Tab:**
- Real-time chat
- Online status indicators
- Send messages instantly
- View conversation history

### 4. Add Your Startup
- Click **"Add Startup"** in header
- Fill in:
  - Name & tagline
  - Description
  - Category & stage
  - Funding & valuation
  - Location
  - Team size
  - What you're looking for
  - Upload images (optional)
- Submit to launch!

---

## 🔍 Testing Checklist

### Test 1: Registration
```
1. Click "Get Started"
2. Enter name, email, password
3. Click "Sign Up"
4. You should be redirected to dashboard
```

### Test 2: Create Startup
```
1. Click "Add Startup" in header
2. Fill required fields (marked with *)
3. Upload 1-2 images
4. Click "Launch Startup"
5. Startup appears in Discover tab
```

### Test 3: Search by Location
```
1. Go to Discover tab
2. Enter a location in filter box
3. Only startups from that location show
```

### Test 4: Follow Users
```
1. Go to Network tab
2. Find a user
3. Click follow button
4. Button changes to "Following"
```

### Test 5: Real-time Chat
```
1. Open app in TWO browser windows
2. Sign up as TWO different users
3. User A goes to Network, messages User B
4. User B sees message instantly in Messages tab
5. Reply from User B
6. User A sees reply in real-time
```

---

## 📁 File Organization

Your final folder structure should look like:

```
founderskick/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── node_modules/
│   └── uploads/           (created automatically)
│
└── frontend/
    ├── src/
    │   ├── founderskick-complete.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── node_modules/
    └── dist/              (created on build)
```

---

## 🔧 Database Setup Options

### Option A: Local MongoDB (Easiest for testing)

```bash
# Install MongoDB
# macOS:
brew install mongodb-community

# Ubuntu:
sudo apt-get install mongodb

# Start MongoDB
mongod

# In .env:
MONGODB_URI=mongodb://localhost:27017/foundersKick
```

### Option B: MongoDB Atlas (Free Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. In .env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foundersKick
```

---

## 🌐 OAuth Setup (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Credentials → Create OAuth 2.0 Client ID
4. Authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
5. Copy Client ID & Secret to .env:
```env
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
```

### GitHub OAuth

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. New OAuth App
3. Authorization callback: `http://localhost:5000/auth/github/callback`
4. Copy to .env:
```env
GITHUB_CLIENT_ID=your-github-id
GITHUB_CLIENT_SECRET=your-github-secret
```

---

## 🐛 Common Issues & Fixes

### "Cannot connect to backend"
```bash
# Check backend is running:
lsof -i :5000

# If not running:
cd backend
npm run dev
```

### "MongoDB connection error"
```bash
# Check MongoDB is running:
sudo systemctl status mongod

# Start if stopped:
sudo systemctl start mongod

# OR use MongoDB Atlas (cloud) instead
```

### "Port already in use"
```bash
# Kill process on port:
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Then restart servers
```

### "Module not found"
```bash
# Reinstall dependencies:
cd backend && npm install
cd frontend && npm install
```

### "Images not uploading"
```bash
# Backend folder needs uploads directory:
cd backend
mkdir uploads
chmod 755 uploads
```

---

## 🎨 Customization Tips

### Change App Name
Search and replace "FoundersKick" with your name in:
- `founderskick-complete.jsx`
- `index.html`
- `README.md`

### Change Colors
In `founderskick-complete.jsx`, find:
```javascript
from-purple-600 to-blue-600
```

Replace with your colors:
```javascript
from-pink-600 to-orange-600    // Pink to Orange
from-green-600 to-teal-600     // Green to Teal
from-red-600 to-yellow-600     // Red to Yellow
```

### Add New Fields
In `CreateStartupModal`, add to `formData`:
```javascript
const [formData, setFormData] = useState({
  // existing fields...
  website: '',        // Add website
  twitter: '',        // Add Twitter
  linkedin: '',       // Add LinkedIn
});
```

---

## 📊 Data Flow

### Creating a Startup
```
User fills form → Submit
    ↓
Frontend sends POST to /api/startups
    ↓
Backend validates data
    ↓
Saves to MongoDB
    ↓
Returns startup object
    ↓
Frontend refreshes list
```

### Real-time Messaging
```
User types message → Send
    ↓
Frontend sends to Socket.io
    ↓
Backend broadcasts to receiver
    ↓
Receiver gets instant notification
    ↓
Message appears in both chats
```

---

## 🚀 Next Steps

### 1. Deploy to Production
- See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide
- Recommended: Railway or Render (easiest)
- Don't forget to set production env variables!

### 2. Add More Features
- Email notifications
- Password reset
- Profile pictures
- Startup analytics
- Investment tracking

### 3. Optimize Performance
- Add Redis for caching
- Implement pagination
- Optimize images
- Add CDN for assets

---

## 📚 Documentation

- **README-COMPLETE.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide for all platforms
- **QUICKSTART.md** - 5-minute quick start
- **api.js** - API helper functions reference

---

## 💡 Pro Tips

1. **Keep backend running** - Frontend needs API to function
2. **Use two browser windows** - Test messaging between users
3. **Clear localStorage** - If auth issues persist
4. **Check browser console** - Shows API errors
5. **Monitor server logs** - Shows backend errors

---

## ✅ Success Checklist

Before considering setup complete, verify:

- [ ] Backend server running on port 5000
- [ ] Frontend dev server running on port 3000
- [ ] MongoDB connected (see backend logs)
- [ ] Can access landing page
- [ ] Can sign up new user
- [ ] Redirected to dashboard after auth
- [ ] Can create a new startup
- [ ] Startup appears in Discover tab
- [ ] Can search by location
- [ ] Can follow other users
- [ ] Can send messages
- [ ] Images upload successfully

---

## 🆘 Need Help?

If you're stuck:
1. Check the error message in console/terminal
2. Review this setup guide
3. Check [README-COMPLETE.md](README-COMPLETE.md)
4. Ensure all files are in correct locations
5. Verify .env variables are set

Common fixes solve 90% of issues:
- Restart both servers
- Clear browser cache/localStorage
- Reinstall node_modules
- Check MongoDB is running

---

## 🎉 Congratulations!

You now have a **fully functional social media platform** for entrepreneurs!

**What you've built:**
- ✅ Landing page with features
- ✅ Complete authentication system
- ✅ User dashboard with 3 tabs
- ✅ Startup CRUD operations
- ✅ Location-based search
- ✅ Follow/networking system
- ✅ Real-time messaging
- ✅ Image upload functionality
- ✅ Professional responsive design

**Start inviting users and building your entrepreneur community!** 🚀
