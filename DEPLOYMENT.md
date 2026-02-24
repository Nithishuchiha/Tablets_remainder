# 🚀 Deployment Guide - 24/7 Operation

This guide will help you deploy your Tablet Reminder app to run 24/7 even when your laptop is off.

## 📋 Deployment Overview

To run the app 24/7, you need:
1. **Backend** deployed to a cloud server (keeps WhatsApp connected)
2. **Frontend** deployed to a hosting service (accessible from anywhere)

## 🎯 Recommended Free Options

### Option 1: Render.com (Recommended - Easiest)
**Free tier includes:**
- Backend hosting (Node.js)
- Static site hosting (React)
- Automatic deployments from GitHub
- SSL certificates

### Option 2: Railway.app
**Free tier includes:**
- $5 monthly credit
- Easy deployment
- Good for Node.js apps

### Option 3: Heroku + Netlify
**Note:** Heroku removed free tier, but offers $5/month Eco plan

---

## 🔥 EASIEST METHOD: Deploy to Render.com

### Prerequisites
1. Create a GitHub account (if you don't have one)
2. Create a Render.com account (https://render.com - free)
3. Push your code to GitHub

---

## Step 1: Push Code to GitHub

### 1.1 Initialize Git (if not already done)

```powershell
# In your project root
cd D:\All_React_app\Tablets_remainder
git init
git add .
git commit -m "Initial commit - Tablet Reminder App"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "tablet-reminder"
3. Don't initialize with README (we already have one)

### 1.3 Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/tablet-reminder.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Login to Render
- Go to https://render.com
- Sign up/Login with GitHub

### 2.2 Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `tablet-reminder-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 2.3 Add Environment Variables
In Render dashboard, add:
- `NODE_ENV` = `production`
- `PORT` = `5000`

### 2.4 Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes first time)
- **Save your backend URL**: `https://tablet-reminder-backend.onrender.com`

### 2.5 Scan WhatsApp QR Code
1. Go to your Render dashboard
2. Click on "Logs" tab
3. Look for the QR code in ASCII format
4. Scan it with WhatsApp on your phone
5. The session will persist on the server!

---

## Step 3: Deploy Frontend to Render

### 3.1 Update Frontend API URL

**Edit frontend/src files to use your backend URL instead of localhost**

You'll need to update all API calls to use your Render backend URL.

### 3.2 Create Static Site on Render
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `tablet-reminder-app`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### 3.3 Deploy
- Click "Create Static Site"
- Your app will be live at: `https://tablet-reminder-app.onrender.com`

---

## 🌟 Alternative: Railway.app Deployment

### Backend Deployment on Railway

1. **Sign up**: https://railway.app
2. **New Project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Configure**:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
5. **Add environment variables**:
   - `NODE_ENV=production`
6. **Deploy** and get your URL

### Frontend on Netlify

1. **Sign up**: https://netlify.com
2. **New site from Git**
3. **Configure**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. **Deploy**

---

## ⚙️ Important Configuration Changes for Production

### Backend Changes Needed:

1. **Add CORS configuration** for your frontend URL
2. **Health check endpoint** (already included)
3. **WhatsApp session persistence** (already configured with LocalAuth)

### Frontend Changes Needed:

1. **Update API endpoints** to use production backend URL instead of localhost

---

## 🔒 Security Considerations

1. **Never commit .env files** (already in .gitignore)
2. **Use environment variables** for sensitive data
3. **Enable authentication** for production (future enhancement)
4. **Whitelist frontend URL** in CORS settings

---

## 💰 Cost Analysis

### Free Options:
- **Render.com**: Free tier available (may sleep after inactivity)
- **Railway.app**: $5/month credit free

### Paid Options (for always-on):
- **Render.com**: $7/month (prevents sleeping)
- **Railway.app**: $5/month credit included
- **Heroku**: $5/month Eco Dyno
- **DigitalOcean**: $4/month Droplet
- **AWS EC2**: Free tier 1 year (t2.micro)

---

## 🚨 Important Notes for 24/7 Operation

### WhatsApp Session Management
- **First Deployment**: You'll need to scan QR code once
- **Session Persists**: The auth session is saved in the server
- **If Disconnected**: Check Render logs and rescan if needed
- **Keep Session Alive**: The server must stay running

### Free Tier Limitations
- **Render Free**: Services sleep after 15 min inactivity
- **Solution**: Upgrade to paid tier ($7/month) for 24/7
- **Alternative**: Use a cron job to ping your service every 10 minutes

### Keeping Free Service Awake (Hack)
Use a service like **UptimeRobot** (free) to ping your backend every 5 minutes:
1. Sign up at https://uptimerobot.com
2. Add your backend URL
3. Set check interval to 5 minutes
4. This prevents it from sleeping!

---

## 📱 After Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and connected to backend
- [ ] WhatsApp QR code scanned
- [ ] WhatsApp shows "Connected" in app
- [ ] Test message sent successfully
- [ ] Medications and contacts added
- [ ] Test reminder received at scheduled time
- [ ] (Optional) UptimeRobot monitoring configured

---

## 🛠️ Troubleshooting

### Backend Won't Start
- Check Render logs for errors
- Verify all dependencies in package.json
- Check environment variables

### WhatsApp Won't Connect
- Check if QR code appears in logs
- Rescan if session expired
- Restart the service

### Frontend Can't Connect to Backend
- Verify CORS settings
- Check API URL in frontend code
- Ensure backend is running

### Free Service Keeps Sleeping
- Set up UptimeRobot monitoring
- Or upgrade to paid tier ($7/month)

---

## 🎉 Success!

Once deployed, your app will:
✅ Run 24/7 without your laptop
✅ Send WhatsApp reminders automatically
✅ Be accessible from any device
✅ Keep your dad healthy! 💊

---

## Need Help?

Common issues and solutions are in the main README.md
For cloud-specific issues, check the provider's documentation:
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- Netlify: https://docs.netlify.com
