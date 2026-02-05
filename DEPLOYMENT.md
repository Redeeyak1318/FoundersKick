# 🚀 FoundersKick Deployment Guide

This guide covers deploying FoundersKick to various platforms. Choose the platform that best fits your needs.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Platform Deployments](#platform-deployments)
   - [Heroku](#heroku)
   - [Railway](#railway)
   - [Render](#render)
   - [Vercel + Railway](#vercel--railway)
   - [AWS](#aws)
   - [DigitalOcean](#digitalocean)
4. [Database Setup](#database-setup)
5. [Domain Configuration](#domain-configuration)
6. [SSL/HTTPS Setup](#sslhttps-setup)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ Git installed and repository created
- ✅ Node.js 18+ installed
- ✅ MongoDB Atlas account (or local MongoDB for testing)
- ✅ OAuth credentials (Google, GitHub)
- ✅ Domain name (optional but recommended)

---

## Environment Setup

### 1. Create Production Environment Variables

Create a `.env.production` file:

```env
# Production Configuration
NODE_ENV=production
PORT=5000

# Database - Use MongoDB Atlas for production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foundersKick?retryWrites=true&w=majority

# JWT Secret - Generate new one for production
JWT_SECRET=your-super-secure-production-secret-key

# Frontend URL - Update with your production domain
CLIENT_URL=https://founderskick.com

# OAuth Credentials
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
GITHUB_CLIENT_ID=your-production-github-client-id
GITHUB_CLIENT_SECRET=your-production-github-client-secret

# Optional Services
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

### 2. Update OAuth Redirect URIs

For each OAuth provider, add production redirect URIs:

**Google OAuth:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to: APIs & Services > Credentials
- Edit your OAuth 2.0 Client ID
- Add authorized redirect URIs:
  - `https://api.founderskick.com/auth/google/callback`
  - `https://founderskick.com/auth/google/callback`

**GitHub OAuth:**
- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Edit your OAuth App
- Update Authorization callback URL:
  - `https://api.founderskick.com/auth/github/callback`

---

## Platform Deployments

### Heroku

**Best for:** Simple deployment with built-in PostgreSQL/MongoDB add-ons

#### Backend Deployment

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create founderskick-api

# Add MongoDB add-on
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set GOOGLE_CLIENT_ID="your-google-id"
heroku config:set GOOGLE_CLIENT_SECRET="your-google-secret"
heroku config:set GITHUB_CLIENT_ID="your-github-id"
heroku config:set GITHUB_CLIENT_SECRET="your-github-secret"
heroku config:set CLIENT_URL="https://founderskick.herokuapp.com"
heroku config:set NODE_ENV=production

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# View logs
heroku logs --tail
```

#### Frontend Deployment

```bash
# Create frontend app
heroku create founderskick-frontend

# Set build pack
heroku buildpacks:set mars/create-react-app

# Set environment
heroku config:set VITE_API_URL="https://founderskick-api.herokuapp.com"

# Deploy
git subtree push --prefix frontend heroku main
```

---

### Railway

**Best for:** Modern deployment with automatic GitHub integration

#### Setup

1. Go to [Railway.app](https://railway.app/)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your FoundersKick repository

#### Backend Configuration

1. In Railway dashboard, click on your service
2. Go to "Variables" tab
3. Add all environment variables:
   ```
   MONGODB_URI
   JWT_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GITHUB_CLIENT_ID
   GITHUB_CLIENT_SECRET
   CLIENT_URL
   PORT=5000
   ```
4. Go to "Settings" → "Networking"
5. Generate a domain (e.g., founderskick-api.up.railway.app)

#### Frontend Configuration

1. Create new service for frontend
2. Set root directory to `/frontend`
3. Add environment variables:
   ```
   VITE_API_URL=https://founderskick-api.up.railway.app
   ```
4. Generate domain for frontend

#### Add MongoDB

1. Click "New" → "Database" → "Add MongoDB"
2. Railway will auto-generate connection string
3. Copy `MONGO_URL` to your backend's `MONGODB_URI`

---

### Render

**Best for:** Free tier with automatic SSL

#### Backend Setup

1. Go to [Render.com](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** founderskick-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free or Starter

5. Add Environment Variables in dashboard:
   ```
   MONGODB_URI
   JWT_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GITHUB_CLIENT_ID
   GITHUB_CLIENT_SECRET
   CLIENT_URL
   ```

#### Frontend Setup

1. Create new Static Site
2. Configure:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
3. Add Environment Variable:
   ```
   VITE_API_URL=https://founderskick-api.onrender.com
   ```

---

### Vercel + Railway

**Best for:** Optimal frontend performance with Railway backend

#### Backend on Railway

Follow Railway instructions above for backend.

#### Frontend on Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Set environment variables
vercel env add VITE_API_URL production
# Enter: https://founderskick-api.up.railway.app

# Deploy to production
vercel --prod
```

**Or via Vercel Dashboard:**
1. Go to [Vercel.com](https://vercel.com/)
2. Import Git Repository
3. Set Root Directory: `frontend`
4. Framework Preset: Vite
5. Add Environment Variable:
   - `VITE_API_URL` = your Railway backend URL
6. Deploy

---

### AWS

**Best for:** Enterprise-scale deployment with full control

#### Using AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js founderskick-api

# Create environment
eb create founderskick-production

# Set environment variables
eb setenv MONGODB_URI="your-mongodb-uri" \
  JWT_SECRET="your-secret" \
  GOOGLE_CLIENT_ID="your-id" \
  # ... other variables

# Deploy
eb deploy

# Open in browser
eb open
```

#### Using AWS ECS (Docker)

```bash
# Build and push Docker image
docker build -f Dockerfile.backend -t founderskick-api .
docker tag founderskick-api:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/founderskick-api:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/founderskick-api:latest

# Create ECS cluster and service via AWS Console or CLI
```

---

### DigitalOcean

**Best for:** Affordable VPS with Docker support

#### Using App Platform

1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Create New App → GitHub
3. Select repository
4. Configure:
   - **Resource Type:** Web Service
   - **Environment Variables:** Add all required vars
   - **HTTP Port:** 5000
5. Deploy

#### Using Droplet (VPS)

```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt-get update
apt-get install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# Clone repository
cd /var/www
git clone https://github.com/yourusername/founderskick.git
cd founderskick

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start server.js --name founderskick-api
pm2 startup
pm2 save

# Install Nginx
apt-get install -y nginx

# Configure Nginx
nano /etc/nginx/sites-available/founderskick
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name api.founderskick.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/founderskick /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Install SSL certificate
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d api.founderskick.com
```

---

## Database Setup

### MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster or choose paid tier
3. Database Access:
   - Create database user
   - Set strong password
4. Network Access:
   - Add IP: `0.0.0.0/0` (allow all) OR
   - Add specific IPs of your deployment platform
5. Connect:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this as `MONGODB_URI`

---

## Domain Configuration

### Custom Domain Setup

1. **Buy domain** from Namecheap, GoDaddy, or Google Domains

2. **Add DNS records:**

   For **frontend** (founderskick.com):
   - Type: A or CNAME
   - Name: @
   - Value: Your frontend platform's IP/domain

   For **API** (api.founderskick.com):
   - Type: A or CNAME
   - Name: api
   - Value: Your backend platform's IP/domain

3. **Platform-specific instructions:**

   **Vercel:**
   - Settings → Domains → Add Domain
   - Follow verification steps

   **Railway:**
   - Settings → Networking → Custom Domain
   - Add domain and verify

   **Render:**
   - Settings → Custom Domain
   - Add domain with automatic SSL

---

## SSL/HTTPS Setup

Most modern platforms (Vercel, Railway, Render, Heroku) provide **automatic SSL**.

### Manual SSL (for VPS/Droplet)

Using Let's Encrypt (free):

```bash
# Install Certbot
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d founderskick.com -d www.founderskick.com -d api.founderskick.com

# Auto-renewal
certbot renew --dry-run
```

---

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] OAuth redirect URIs updated
- [ ] Database accessible from deployment
- [ ] File uploads working (test image upload)
- [ ] Real-time chat working (test messaging)
- [ ] HTTPS/SSL enabled
- [ ] Custom domain configured (if applicable)
- [ ] Error monitoring setup (Sentry, LogRocket)
- [ ] Analytics added (Google Analytics, Mixpanel)
- [ ] CDN configured for static assets (Cloudflare)

---

## Monitoring & Maintenance

### Set up monitoring:

1. **Backend Health:**
   - Use platform's built-in monitoring
   - Set up UptimeRobot for uptime monitoring
   - Configure alerts for downtime

2. **Error Tracking:**
   ```bash
   npm install @sentry/node
   ```
   Add to server.js:
   ```javascript
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: "your-sentry-dsn" });
   ```

3. **Performance Monitoring:**
   - Enable New Relic or DataDog
   - Monitor API response times
   - Track database query performance

---

## Troubleshooting

### Common Issues:

**MongoDB Connection Error:**
```
Error: MongoNetworkError: connection timed out
```
Solution: Check IP whitelist in MongoDB Atlas

**OAuth Redirect Error:**
```
Error: redirect_uri_mismatch
```
Solution: Verify redirect URIs match exactly in OAuth settings

**Build Failed:**
```
Error: Cannot find module 'xyz'
```
Solution: Ensure all dependencies in package.json, run `npm install`

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change PORT in environment variables or kill existing process

---

## Support

Need help? Check out:
- [GitHub Issues](https://github.com/yourusername/founderskick/issues)
- [Documentation](https://docs.founderskick.com)
- Email: devops@founderskick.com

---

**🎉 Congratulations! Your FoundersKick platform is now live!**
