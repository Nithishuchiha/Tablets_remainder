# Tablet Reminder - Render Deployment

## Backend Service Configuration

```yaml
# For Render.com deployment
services:
  - type: web
    name: tablet-reminder-backend
    env: node
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

## Steps:

1. **Connect GitHub**: Link your repository to Render
2. **Create Web Service**: Choose "Web Service" from dashboard
3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Deploy**: Click deploy and wait
5. **Get URL**: Copy your service URL (e.g., https://tablet-reminder-backend.onrender.com)
6. **Scan QR**: Check logs for QR code and scan with WhatsApp

## Frontend Configuration

1. Create `.env.production` in frontend folder:
```
REACT_APP_API_URL=https://tablet-reminder-backend.onrender.com
```

2. Deploy as Static Site:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

## Important Notes

- Free tier services sleep after 15 minutes of inactivity
- Use UptimeRobot to keep service awake (ping every 5 min)
- WhatsApp session persists on server (no need to re-scan unless disconnected)
- For production (24/7): Upgrade to Render's paid tier ($7/month)
