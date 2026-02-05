# FoundersKick 🚀

A modern social media platform for entrepreneurs and startup founders to connect, collaborate, and share their startup ideas.

![FoundersKick Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=FoundersKick)

## ✨ Features

### 🎯 Core Features
- **Startup Profiles**: Create detailed profiles for your startup with images, funding details, and valuation
- **Founder Discovery**: Search and connect with entrepreneurs based on location and interests
- **Real-time Chat**: Message other founders instantly with online status indicators and media file sharing
- **Location-based Search**: Find startups and founders in your area
- **Networking**: Send connection requests and build your entrepreneur network

### 🔐 Authentication
- **Google OAuth**: Sign in with your Google account
- **GitHub OAuth**: Sign in with your GitHub account
- **Phone Number**: SMS-based authentication
- Secure JWT-based session management

### 💬 Messaging System
- **Real-time chat** powered by Socket.io
- **Online status indicators** (green dot when online)
- **Typing indicators** to show when someone is typing
- **Media file sharing** (images, PDFs, documents)
- **Read receipts** for messages
- **Conversation history** with last message preview

### 🎨 Design
- **Minimal & Bold** aesthetic with professional gradient backgrounds
- **Responsive design** - works on mobile, tablet, and desktop
- **Smooth animations** and transitions
- **Modern UI** with Lucide icons

## 🛠️ Tech Stack

### Frontend
- **React 18** with modern hooks
- **Lucide React** for beautiful icons
- **Tailwind CSS** for styling (via utility classes)
- **Socket.io Client** for real-time features
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Passport.js** for OAuth (Google, GitHub)
- **Multer** for file uploads
- **Bcrypt** for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/founderskick.git
cd founderskick
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your credentials
nano .env
```

**Important Environment Variables:**
```env
# Required
MONGODB_URI=mongodb://localhost:27017/foundersKick
JWT_SECRET=your-super-secret-jwt-key

# OAuth (Get from respective platforms)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional
CLIENT_URL=http://localhost:3000
PORT=5000
```

### 3. Frontend Setup

```bash
# Install frontend dependencies
npm install
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod --dbpath /path/to/your/data/directory
```

**MongoDB Atlas:**
- Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 5. Run the Application

**Development Mode:**

```bash
# Terminal 1 - Start backend server
npm run dev

# Terminal 2 - Start frontend (in a new terminal)
cd frontend
npm run dev
```

**Production Mode:**
```bash
# Backend
npm start

# Frontend (build first)
npm run build
npm run preview
```

The application will be available at:
- Frontend: `http://localhost:5173` (Vite dev server) or `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 🔑 Setting Up OAuth

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - Your production URL callback
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - Application name: FoundersKick
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

### Phone Authentication (Optional)
For production phone authentication, integrate Twilio:
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token
3. Get a Twilio phone number
4. Add credentials to `.env`

## 📁 Project Structure

```
founderskick/
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   └── uploads/               # Uploaded files directory
│
├── frontend/
│   ├── src/
│   │   ├── founderskick-app.jsx   # Main React component
│   │   ├── App.jsx            # App entry point
│   │   └── main.jsx           # React DOM entry
│   ├── package.json           # Frontend dependencies
│   ├── index.html             # HTML template
│   └── vite.config.js         # Vite configuration
│
└── README.md                  # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/phone` - Phone number authentication
- `GET /auth/google` - Google OAuth login
- `GET /auth/github` - GitHub OAuth login

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `POST /api/users/avatar` - Upload user avatar
- `GET /api/users/search?query=&location=` - Search users
- `GET /api/users/:userId` - Get user by ID

### Startups
- `POST /api/startups` - Create a startup (with images)
- `GET /api/startups` - Get all startups (with filters)
- `GET /api/startups/:startupId` - Get startup by ID
- `PUT /api/startups/:startupId` - Update startup
- `DELETE /api/startups/:startupId` - Delete startup

### Connections
- `POST /api/connections/request` - Send connection request
- `POST /api/connections/accept/:requestId` - Accept connection request

### Messages
- `GET /api/conversations` - Get all conversations
- `GET /api/messages/:userId` - Get messages with a user
- `POST /api/messages` - Send a message (with file upload)

### Socket.io Events
- `join` - User joins with their ID
- `typing` - Emit typing indicator
- `sendMessage` - Send a message in real-time
- `newMessage` - Receive new message
- `userOnline` - User comes online
- `userOffline` - User goes offline

## 🎨 Customization

### Changing Colors
The app uses a purple-to-blue gradient theme. To customize:

1. **In the React component**, search for:
```javascript
// Find and replace gradient classes
from-purple-600 to-blue-600  // Primary gradient
from-purple-500 to-blue-500  // Secondary gradient
```

2. **Add your colors**:
```javascript
from-pink-600 to-orange-600  // Example custom gradient
```

### Adding New Features
1. Add new routes in `server.js`
2. Create MongoDB schemas for new data models
3. Update the React component with new UI components
4. Add Socket.io events for real-time features

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create a new app
heroku create founderskick-api

# Add MongoDB Atlas add-on or use your own MongoDB URI
heroku addons:create mongolab

# Set environment variables
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set GOOGLE_CLIENT_ID=your-google-id
# ... set all other env variables

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# Add VITE_API_URL pointing to your backend URL
```

### Alternative Platforms
- **Backend**: Railway, Render, DigitalOcean, AWS
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use strong JWT secrets** - Generate with `openssl rand -hex 32`
3. **Enable CORS** only for your frontend domain in production
4. **Use HTTPS** in production
5. **Implement rate limiting** for API endpoints
6. **Validate all inputs** on backend
7. **Sanitize user uploads**
8. **Keep dependencies updated** - Run `npm audit fix`

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check connection
mongosh
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm run dev
```

### OAuth Redirect Issues
- Ensure redirect URIs match exactly in OAuth provider settings
- Check that `CLIENT_URL` in `.env` is correct
- Clear browser cookies and try again

### File Upload Not Working
```bash
# Create uploads directory
mkdir uploads

# Set permissions
chmod 755 uploads
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, reach out to:
- Email: support@founderskick.com
- Twitter: [@founderskick](https://twitter.com/founderskick)

## 🙏 Acknowledgments

- React and the amazing React community
- MongoDB for the flexible database
- Socket.io for real-time capabilities
- Lucide for beautiful icons

---

**Built with ❤️ for the startup community**

🚀 Start connecting with entrepreneurs today at [FoundersKick](https://founderskick.com)!
