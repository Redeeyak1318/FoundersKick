# FoundersKick 🚀 - Enhanced Version

**A complete social media platform for entrepreneurs with advanced startup discovery, filtering, and interest management.**

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🌟 NEW Features in Enhanced Version

### **1. Explore Section with Advanced Filters** 🔍
- **Stage Filter**: Filter by startup stages
  - 💡 **Idea** - Just an idea, looking for validation
  - 🚀 **MVP** - Minimum Viable Product built
  - 📈 **Traction** - Early customers and revenue
  - 🌱 **Growing** - Scaling and expanding
  
- **Sort Options**:
  - 🕐 **Newest** - Most recently added startups
  - ❤️ **Most Liked** - Startups with most likes
  - 👥 **Most Followed** - Startups from most followed founders
  - 🔥 **Most Popular** - Combination of likes and follows

### **2. Enhanced Startup Creation Form** 📝
Complete professional startup profile with:
- **Logo/Photo Upload** - Company branding
- **Basic Information**:
  - Startup name
  - Tagline
  - Current stage (dropdown)
  - Location
- **Problem & Solution**:
  - Problem statement
  - Your solution
- **Market & Strategy**:
  - Target market
  - Go-to-market strategy
- **Skills & Team**:
  - Skills needed (comma separated)
  - Team size
- **Visibility Toggle** - Control who can see your startup

### **3. My Startups Section** 💼
- View all your created startups
- Edit startup details
- Delete startups
- Add multiple startups
- Track performance (likes, views)

### **4. My Interests Section** ⭐
Two dedicated subsections:
- **Liked Startups** ❤️ - All startups you've liked
- **Following Startups** 👥 - Startups from founders you follow

---

## 🎯 Complete User Journey

### 1. **Landing Page** 🏠
- Professional homepage with feature showcase
- Call-to-action buttons
- Features grid
- Statistics section

### 2. **Authentication** 🔐
- Email/Password signup
- Google OAuth
- GitHub OAuth  
- Phone number authentication

### 3. **Dashboard Navigation** 📊
Five main sections:

#### **Explore Tab** ✨
- Discover all startups with advanced filters
- Search by keyword
- Filter by location
- Filter by stage (Idea, MVP, Traction, Growing)
- Sort by newest, most liked, most followed, popular
- Like startups
- View detailed startup profiles

#### **My Startups Tab** 💼
- View all your startups
- Create new startup
- Edit existing startups
- Delete startups
- Track engagement

#### **My Interests Tab** ⭐
- **Liked Startups**: See all startups you've liked
- **Following Startups**: See startups from founders you follow
- Easy access to your saved content

#### **Network Tab** 👥
- Find other entrepreneurs
- Follow/unfollow founders
- Send direct messages
- See online status
- Search by location

#### **Messages Tab** 💬
- Real-time chat
- Online status indicators
- Message history
- Typing indicators
- Media file sharing

---

## 🎨 Startup Stages System

Visual stage indicators with unique colors and icons:

| Stage | Icon | Color | Description |
|-------|------|-------|-------------|
| **Idea** | 💡 | Yellow | Concept stage, seeking validation |
| **MVP** | 🚀 | Blue | Product built, early testing |
| **Traction** | 📈 | Green | Customers acquired, revenue coming |
| **Growing** | 🌱 | Purple | Scaling operations, expansion |

---

## 📦 Installation & Setup

### Prerequisites
```bash
# Required
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn
```

### Quick Start

#### 1. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start backend
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend

# Install dependencies  
npm install

# Start development server
npm run dev
```

#### 3. Access Application
- Frontend: **http://localhost:3000**
- Backend API: **http://localhost:5000**

---

## 🗂️ Project Structure

```
founderskick-enhanced/
│
├── backend/
│   ├── server.js              # Express server with enhanced APIs
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── uploads/               # Uploaded files (logos, images)
│
├── frontend/
│   ├── src/
│   │   ├── founderskick-enhanced.jsx   # Enhanced React app
│   │   └── main.jsx                    # Entry point
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   └── index.html                      # HTML template
│
└── README-ENHANCED.md         # This file
```

---

## 🔌 Enhanced API Endpoints

### New Startup Endpoints

```http
# Get user's own startups
GET /api/startups/my-startups
Authorization: Bearer <token>

# Like/Unlike a startup
POST /api/startups/:startupId/like
Authorization: Bearer <token>

# Get liked startups
GET /api/startups/liked
Authorization: Bearer <token>

# Get following startups (from connected founders)
GET /api/startups/following
Authorization: Bearer <token>

# Get all startups with advanced filters
GET /api/startups?search=ai&location=SF&stage=MVP&sort=most-liked
```

### Enhanced Startup Creation

```http
POST /api/startups
Authorization: Bearer <token>
Content-Type: multipart/form-data

Fields:
- logo: File (image)
- name: String *
- tagline: String *
- stage: String * (Idea/MVP/Traction/Growing)
- problemStatement: String *
- solution: String *
- targetMarket: String *
- goToMarketStrategy: String
- skillsNeeded: JSON Array
- location: String *
- teamSize: Number
- visibility: Boolean
```

---

## 💡 Feature Highlights

### 1. **Smart Filtering**
```javascript
// Filter by multiple criteria
GET /api/startups?
  stage=MVP&
  location=San Francisco&
  sort=most-liked
```

### 2. **Like System**
```javascript
// Like increases visibility
POST /api/startups/:id/like
// Response includes updated like count
{
  likes: 42,
  liked: true
}
```

### 3. **Visibility Control**
```javascript
// Founders can control who sees their startup
visibility: true  // Public
visibility: false // Private (only you can see)
```

### 4. **Stage-based Discovery**
```javascript
// Find startups at specific stages
- Idea: Early validation, looking for co-founders
- MVP: Built product, seeking feedback
- Traction: Have customers, looking to scale
- Growing: Established, seeking partnerships
```

---

## 🎨 UI/UX Enhancements

### Visual Stage Badges
```jsx
<StageBadge stage="MVP" />
// Renders: 🚀 MVP (in blue)

<StageBadge stage="Growing" />
// Renders: 🌱 Growing (in purple)
```

### Smart Sorting
- **Newest**: Latest additions first
- **Most Liked**: Popular startups based on likes
- **Most Followed**: From well-connected founders
- **Popular**: Combined engagement score

### Empty States
- Helpful messages when no content
- Clear call-to-action buttons
- Suggestions for next steps

---

## 🔧 Environment Variables

```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/foundersKick
JWT_SECRET=your-super-secret-key
PORT=5000
CLIENT_URL=http://localhost:3000

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
GITHUB_CLIENT_ID=your-github-id
GITHUB_CLIENT_SECRET=your-github-secret
```

---

## 📊 Database Schema Updates

### Enhanced Startup Model
```javascript
{
  name: String,
  tagline: String,
  stage: String, // 'Idea', 'MVP', 'Traction', 'Growing'
  problemStatement: String,
  solution: String,
  targetMarket: String,
  goToMarketStrategy: String,
  skillsNeeded: [String],
  location: String,
  logo: String,
  visibility: Boolean,
  likes: Number,
  likedBy: [ObjectId],
  followers: [ObjectId],
  createdAt: Date
}
```

---

## 🧪 Testing Guide

### Test Scenario 1: Explore with Filters
```
1. Navigate to Explore tab
2. Select stage: "MVP"
3. Enter location: "San Francisco"
4. Sort by: "Most Liked"
5. See filtered results
```

### Test Scenario 2: Create Startup
```
1. Click "Add Startup"
2. Upload logo
3. Fill all required fields:
   - Name, tagline, stage
   - Problem statement, solution
   - Target market
   - Location
4. Add skills needed
5. Toggle visibility ON
6. Submit
7. See startup in "My Startups"
```

### Test Scenario 3: Like & Interest Management
```
1. Go to Explore
2. Like 3-5 startups
3. Navigate to "My Interests"
4. See liked startups in "Liked Startups" section
5. Follow founders
6. See their startups in "Following Startups"
```

---

## 🚀 Deployment

Same deployment options as before:
- Heroku
- Railway
- Render
- Vercel + Railway
- AWS
- DigitalOcean

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🎯 Key Improvements Summary

| Feature | Before | After |
|---------|--------|-------|
| **Startup Stages** | Generic "stage" field | 4 defined stages with icons |
| **Filtering** | Basic search | Multi-criteria with sorting |
| **Startup Form** | Simple form | Comprehensive 10+ fields |
| **User Content** | Mixed view | Separate "My Startups" section |
| **Interests** | No tracking | Dedicated "My Interests" with 2 tabs |
| **Visibility** | Always public | Toggle public/private |
| **Engagement** | None | Like system with counts |

---

## 📈 Usage Statistics Tracking

The enhanced version tracks:
- Likes per startup
- Follower counts
- Popular startups
- Trending stages
- Active locations

---

## 🛠️ Customization

### Change Stage Options
Edit the stage enum in `server.js`:
```javascript
stage: { 
  type: String, 
  enum: ['Idea', 'MVP', 'Traction', 'Growing', 'Your-Custom-Stage'],
  default: 'Idea' 
}
```

### Modify Sort Options
Add new sorting in frontend:
```javascript
<option value="custom-sort">🎯 Your Custom Sort</option>
```

### Add New Filters
Extend the query builder:
```javascript
if (newFilter) {
  query.yourField = { $regex: newFilter, $options: 'i' };
}
```

---

## 🐛 Troubleshooting

### "Stage filter not working"
```bash
# Check MongoDB enum values match frontend
# Restart backend after schema changes
npm run dev
```

### "Likes not updating"
```bash
# Verify authentication token
# Check browser console for errors
# Ensure backend API is running
```

### "My Startups empty"
```bash
# Verify user is authenticated
# Check founder field in startup documents
# Ensure at least one startup is created
```

---

## 📝 Changelog

### Version 2.0.0 (Enhanced)
- ✅ Added Explore section with advanced filters
- ✅ Implemented stage-based classification (Idea, MVP, Traction, Growing)
- ✅ Added sort options (newest, most liked, most followed, popular)
- ✅ Enhanced startup creation form with 10+ fields
- ✅ Added My Startups section
- ✅ Added My Interests section (Liked & Following)
- ✅ Implemented like system
- ✅ Added visibility toggle
- ✅ Improved UI with stage badges
- ✅ Added logo upload functionality

### Version 1.0.0 (Original)
- Basic startup listing
- User authentication
- Simple messaging
- Network features

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- [ ] Add startup analytics dashboard
- [ ] Implement commenting system
- [ ] Add bookmark feature
- [ ] Create notification system
- [ ] Build recommendation engine
- [ ] Add video pitch uploads

---

## 📄 License

MIT License - see LICENSE file

---

## 📧 Support

- Email: support@founderskick.com
- GitHub Issues: Report bugs
- Documentation: Full guides included

---

## 🙏 Acknowledgments

Special thanks to all entrepreneurs using FoundersKick to build their dreams!

---

**🚀 Start discovering amazing startups today!**

Ready to launch your startup or find your next co-founder? Get started now!
