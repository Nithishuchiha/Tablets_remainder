# 💊 Tablet Reminder - WhatsApp Medication Reminder App

A full-stack application that sends automated WhatsApp reminders to help your family members never miss their medication. Built with React, Node.js, and Twilio WhatsApp API.

## 🌟 Features

- ✅ **Automated WhatsApp Reminders**: Send medication reminders via WhatsApp at scheduled times
- 💊 **Medication Management**: Add, edit, and track multiple medications with different schedules
- 👥 **Family Contacts**: Manage multiple family members who should receive reminders
- 📊 **Dashboard**: View medication schedule and reminder statistics
- 🔔 **Customizable Schedules**: Set multiple reminder times for each medication
- 📱 **Test Messages**: Send test WhatsApp messages to verify connectivity
- 🎨 **Modern UI**: Clean and intuitive user interface
- ☁️ **Cloud-Ready**: Deploy to Render (or any cloud platform) - no Chrome/Puppeteer needed!

## 🚀 Quick Start

### 1. Clone & Install
```bash
# Clone repository
git clone <your-repo-url>
cd Tablets_remainder

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Twilio WhatsApp (FREE)
See **[TWILIO_SETUP.md](TWILIO_SETUP.md)** for detailed instructions.

Quick version:
1. Sign up at [twilio.com/try-twilio](https://www.twilio.com/try-twilio) (Free $15 credit)
2. Get your Account SID and Auth Token
3. Connect to WhatsApp Sandbox
4. Add credentials to `.env` file

### 3. Configure Environment
Create `backend/.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

### 4. Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Access at: `http://localhost:3000`

## 🏗️ Tech Stack

### Frontend
- React 18
- React Router
- Axios
- CSS3 with modern animations

### Backend
- Node.js
- Express.js
- Twilio WhatsApp API (Cloud-native, no Chrome needed!)
- Node-cron (Scheduling)
- JSON file storage

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Twilio account (free tier available)
- WhatsApp on your phone
- Internet connection

## ☁️ Deploy to Render (FREE)

### 1. Clone or Navigate to the Project

```bash
cd d:\All_React_app\Tablets_remainder
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd ../backend
copy .env.example .env
```

Edit `.env` if needed (default settings work fine):
```
PORT=5000
NODE_ENV=development
```

## 🎮 Running the Application

### Start Backend Server

```bash
# In the backend folder
cd backend
npm start
```

The backend will start and connect to Twilio. If credentials are configured, you'll see:
```
✅ Twilio WhatsApp configured successfully
🚀 Server running on port 5000
```

If not configured, it runs in demo mode (logs messages without sending).

### Start Frontend

Open a new terminal:

```bash
# In the frontend folder
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 📖 How to Use

### Step 1: Setup Twilio (One-time)
Follow the **[TWILIO_SETUP.md](TWILIO_SETUP.md)** guide to:
1. Create free Twilio account ($15 credit)
2. Connect to WhatsApp Sandbox
3. Add credentials to `.env` file

### Step 2: Add Family Contacts
1. Navigate to the **Contacts** tab
2. Click **"+ Add Contact"**
3. Enter contact details:
   - **Name**: Family member's name (e.g., "Dad")
   - **Phone**: Must include `+` and country code (e.g., `+919876543210` for India)
   - **Relation**: Optional (e.g., "Father")
4. Click **"Add Contact"**

**Important**: Recipients must join your Twilio sandbox first (send the join code to the sandbox number).
5. Use the **"Test"** button to verify WhatsApp connectivity

### Step 2: Add Medications
1. Navigate to the **Medications** tab
2. Click **"+ Add Medication"**
3. Enter medication details:
   - **Name**: Medicine name (e.g., "Aspirin")
   - **Dosage**: Amount to take (e.g., "1 tablet, 500mg")
   - **Times**: Click to add multiple reminder times
   - **Notes**: Optional special instructions
   - **Active**: Keep checked to enable reminders
4. Click **"Add Medication"**

### Step 3: Automated Reminders
- Reminders are sent automatically at the scheduled times
- All contacts will receive WhatsApp messages for each medication
- View the next reminder on the Dashboard

## 📱 Phone Number Format

**Important**: Phone numbers must include the country code without + or spaces:

✅ **Correct**:
- India: `919876543210`
- USA: `1234567890`
- UK: `441234567890`

❌ **Incorrect**:
- `+91 98765 43210`
- `98765 43210`
- `+1-234-567-890`

## 📝 Example WhatsApp Message

When a reminder triggers, family members receive:

```
🔔 *Medication Reminder*

💊 *Aspirin*
📋 Dosage: 1 tablet, 500mg
⏰ Time: 08:00

📝 Note: Take with food

Please take your medication now! 🙏
```

## 🛠️ Project Structure

```
Tablets_remainder/
├── backend/
│   ├── server.js          # Express server & WhatsApp integration
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   ├── .gitignore        # Git ignore file
│   └── medications.json   # Data storage (auto-generated)
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js      # Main dashboard
    │   │   ├── Dashboard.css
    │   │   ├── Medications.js    # Medication management
    │   │   ├── Medications.css
    │   │   ├── Contacts.js       # Contact management
    │   │   └── Contacts.css
    │   ├── App.js           # Main app component
    │   ├── App.css          # Global styles
    │   ├── index.js         # Entry point
    │   └── index.css        # Base styles
    └── package.json         # Frontend dependencies
```

## 🔧 Troubleshooting

### WhatsApp Messages Not Sending
- **Verify Twilio Setup**: Check [TWILIO_SETUP.md](TWILIO_SETUP.md)
- **Check Credentials**: Ensure Account SID and Auth Token are correct in `.env`
- **Sandbox Join**: Recipients must send the join code to sandbox number first
- **Phone Format**: Must include `+` and country code (e.g., `+919876543210`)
- **Check Logs**: Backend terminal will show detailed error messages

### "Unable to create record" Error
- Recipient hasn't joined Twilio sandbox
- Send the join code (e.g., `join <code>`) to `+14155238886` first

### Backend Shows "Demo Mode"
- Twilio credentials not configured
- Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_WHATSAPP_NUMBER` to `.env`

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Make sure you're using Node.js v14 or higher

## 🚀 Deploying to Render

1. Push your code to GitHub
2. Create account on [render.com](https://render.com)
3. Create new Web Service from GitHub repo
4. Render will auto-detect `render.yaml`
5. Add environment variables in Render dashboard:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_NUMBER`
6. Deploy! ✅

No Chrome, no Puppeteer, no headaches! 🎉

## 🎯 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- SMS fallback option
- Email notifications
- Mobile app version
- Medication history tracking
- Multiple language support
- Notification customization
- Upgrade to production WhatsApp Business API

## ⚠️ Important Notes

1. **Twilio Sandbox**: Free tier requires recipients to join sandbox first (development/testing)
2. **Data Storage**: Currently uses JSON file storage. For production, consider using a database.
3. **Server Uptime**: Deploy to Render or similar for 24/7 reminders
4. **WhatsApp Terms**: Ensure you comply with WhatsApp's Terms of Service
5. **Costs**: Twilio includes $15 free credit (~3,000 messages). After that, ~$0.005 per message

## 📚 Documentation

- **[TWILIO_SETUP.md](TWILIO_SETUP.md)** - Complete Twilio WhatsApp setup guide
- **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** - Deploy to Render guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide

## 📄 License

This project is created for personal use to help family members manage medications effectively.

## 🙏 Credits

Built with love to help ensure family members never miss their important medications.

---

**Made with ❤️ for family health**
