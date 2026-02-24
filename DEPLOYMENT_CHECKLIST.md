# 🚀 Quick Deployment Checklist

## Before Deployment
- [ ] Test app works locally (backend + frontend)
- [ ] All medications and contacts features work
- [ ] WhatsApp connection works on local

## GitHub Setup
- [ ] Create GitHub account
- [ ] Create new repository "tablet-reminder"
- [ ] Push code to GitHub

## Backend Deployment (Render.com)
- [ ] Sign up on Render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variable: `NODE_ENV=production`
- [ ] Add environment variable: `PORT=10000`
- [ ] Deploy and wait for "Live" status
- [ ] Copy backend URL (e.g., https://tablet-reminder-backend.onrender.com)
- [ ] Open Logs and scan WhatsApp QR code
- [ ] Verify "WhatsApp authenticated successfully" message

## Frontend Configuration
- [ ] Create `frontend/.env.production` file
- [ ] Add `REACT_APP_API_URL=your-backend-url` to .env.production
- [ ] Commit and push changes to GitHub

## Frontend Deployment (Render.com)
- [ ] Create new Static Site on Render
- [ ] Connect same GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Set build command: `npm install && npm run build`
- [ ] Set publish directory: `build`
- [ ] Deploy and wait for "Live" status
- [ ] Copy frontend URL (e.g., https://tablet-reminder-app.onrender.com)

## Keep Alive Setup (Free 24/7)
- [ ] Sign up on UptimeRobot.com
- [ ] Create new HTTP(s) monitor
- [ ] Set URL: `your-backend-url/api/health`
- [ ] Set interval: 5 minutes
- [ ] Activate monitor

## Testing Deployed App
- [ ] Open frontend URL in browser
- [ ] Check WhatsApp status shows "Connected"
- [ ] Add a test contact
- [ ] Send test message - verify received on WhatsApp
- [ ] Add a medication with a soon-approaching time
- [ ] Wait for scheduled time and verify reminder received

## Update Environment Variables (if needed)
Backend on Render:
- [ ] Add `FRONTEND_URL=your-frontend-url` to backend environment

## Share & Use
- [ ] Bookmark frontend URL
- [ ] Share URL with family members
- [ ] Add all actual contacts
- [ ] Add all medications with correct schedules
- [ ] Monitor for a day to ensure reminders work

## Ongoing Maintenance
- [ ] Check UptimeRobot shows service is up
- [ ] Verify WhatsApp stays connected (check weekly)
- [ ] Update medications as needed
- [ ] Add/remove contacts as needed

## If Something Goes Wrong
- [ ] Check Render logs for errors
- [ ] Verify WhatsApp is still connected
- [ ] Rescan QR code if WhatsApp disconnected
- [ ] Restart Render service if needed
- [ ] Check UptimeRobot is active

## Optional: Upgrade to Paid (for 100% reliability)
- [ ] Upgrade Render to Starter plan ($7/month)
- [ ] No more sleeping issues
- [ ] Faster performance
- [ ] Better support

---

**Save These URLs:**
- Frontend: ___________________________________
- Backend: ___________________________________
- Render Dashboard: https://dashboard.render.com
- UptimeRobot: https://uptimerobot.com/dashboard

**Deployment Date:** ___________________

**Last WhatsApp QR Scan:** ___________________
