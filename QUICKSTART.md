# 🚀 FoundersKick - Quick Start Guide

Get your FoundersKick platform running in **5 minutes**!

## 📋 What You'll Need

- Node.js 18+ installed ([Download](https://nodejs.org/))
- MongoDB running locally OR MongoDB Atlas account ([Free Signup](https://www.mongodb.com/cloud/atlas))
- A code editor (VS Code recommended)

## ⚡ Super Fast Setup

### Option 1: Local Development (Fastest)

```bash
# 1. Create project directory
mkdir founderskick && cd founderskick

# 2. Copy all files to this directory
# (Use the files you downloaded from this chat)

# 3. Install dependencies
npm install

# 4. Create .env file
cp .env.example .env

# 5. Edit .env file (use any text editor)
# MINIMUM required:
#   MONGODB_URI=mongodb://localhost:27017/foundersKick
#   JWT_SECRET=my-super-secret-key-12345

# 6. Start MongoDB (if using local MongoDB)
mongod
# OR skip if using MongoDB Atlas

# 7. Start the server
npm run dev

# 8. In a NEW terminal, start frontend
cd frontend  # (create this folder and move frontend files there)
npm install
npm run dev
```

**Done!** Open http://localhost:3000

---

## 📁 File Organization

Organize your files like this:

```
founderskick/
├── server.js              # Backend server
├── package.json           # Backend dependencies
├── .env                   # Your environment variables
├── .gitignore            # Git ignore rules
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
└── frontend/             # Create this folder
    ├── src/
    │   ├── founderskick-app.jsx
    │   ├── main.jsx
    │   └── api.js
    ├── package.json      # (rename frontend-package.json to this)
    ├── vite.config.js
    └── index.html
```

---

## 🔧 Minimal .env Configuration

Create a `.env` file with these **essential** variables:

```env
# Database - Choose ONE:
# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/foundersKick

# Option B: MongoDB Atlas (cloud - free tier available)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foundersKick

# Security - Generate a random string
JWT_SECRET=change-this-to-a-random-string-abc123xyz

# URLs (for local development)
CLIENT_URL=http://localhost:3000
PORT=5000
```

**That's it!** OAuth is optional for initial testing.

---

## 🎯 Quick Test

Once running, you can:

1. **Sign up** with email/password (no OAuth needed initially)
2. **Create your profile** with location
3. **Add a startup** with details and images
4. **Search for founders** by location
5. **Send messages** in real-time

---

## 🔐 Adding OAuth (Optional - for Production)

### Google OAuth Setup (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add redirect URI: `http://localhost:5000/auth/google/callback`
5. Copy Client ID and Secret to `.env`:
```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret-here
```

### GitHub OAuth Setup (3 minutes)

1. Go to [GitHub Settings → Developer Settings](https://github.com/settings/developers)
2. New OAuth App
3. Authorization callback: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Secret to `.env`:
```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret
```

---

## 🐛 Troubleshooting

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running:
mongod

# OR use MongoDB Atlas (cloud) instead
```

### "Port 5000 already in use"
```bash
# Change port in .env:
PORT=5001

# OR kill existing process:
lsof -ti:5000 | xargs kill -9
```

### "Module not found"
```bash
# Reinstall dependencies:
rm -rf node_modules
npm install
```

### "Cannot access localhost:3000"
```bash
# Make sure frontend dev server is running:
cd frontend
npm run dev
```

---

## 📱 Features Checklist

After setup, verify these features work:

- ✅ User registration and login
- ✅ Profile creation with avatar upload
- ✅ Create startup with images
- ✅ Search startups by location
- ✅ Real-time messaging
- ✅ Online status indicators
- ✅ File sharing in chat
- ✅ Location-based discovery

---

## 🎨 Customization Tips

### Change Color Scheme

In `founderskick-app.jsx`, find and replace:

```javascript
// Current: Purple to Blue gradient
from-purple-600 to-blue-600

// Change to any colors:
from-pink-600 to-orange-600    // Pink to Orange
from-green-600 to-teal-600     // Green to Teal
from-red-600 to-rose-600       // Red to Rose
```

### Change App Name

Search and replace "FoundersKick" with your name throughout the files.

---

## 📚 Next Steps

1. ✅ Get it running locally (you're here!)
2. 📖 Read full [README.md](README.md) for details
3. 🚀 Deploy to production (see [DEPLOYMENT.md](DEPLOYMENT.md))
4. 🎨 Customize design and features
5. 📈 Add analytics and monitoring

---

## 🆘 Need Help?

- Check [README.md](README.md) for full documentation
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Common issues usually solved by:
  1. Checking .env variables
  2. Ensuring MongoDB is running
  3. Reinstalling node_modules
  4. Using correct ports (3000 frontend, 5000 backend)

---

## 💡 Pro Tips

**For Development:**
- Use `npm run dev` (auto-restart on changes)
- Keep MongoDB running in a separate terminal
- Check console for errors

**For Testing:**
- Create multiple user accounts
- Test chat between accounts (use different browsers or incognito)
- Upload various image formats
- Try location-based search

**For Production:**
- Use MongoDB Atlas (cloud database)
- Set strong JWT_SECRET
- Enable OAuth for better UX
- Use environment variables for all secrets

---

**🎉 That's it! You now have a full-featured social platform for entrepreneurs!**

Happy coding! 🚀
