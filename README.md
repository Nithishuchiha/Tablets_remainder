# 💊 Tablet Reminder - WhatsApp Medication Reminder App

A full-stack application that sends automated WhatsApp reminders to help your family members never miss their medication. Built with React, Node.js, and WhatsApp Web integration.

## 🌟 Features

- ✅ **Automated WhatsApp Reminders**: Send medication reminders via WhatsApp at scheduled times
- 💊 **Medication Management**: Add, edit, and track multiple medications with different schedules
- 👥 **Family Contacts**: Manage multiple family members who should receive reminders
- 📊 **Dashboard**: View medication schedule and reminder statistics
- 🔔 **Customizable Schedules**: Set multiple reminder times for each medication
- 📱 **Test Messages**: Send test WhatsApp messages to verify connectivity
- 🎨 **Modern UI**: Clean and intuitive user interface
- ☁️ **Cloud-Ready**: Deploy to run 24/7 even when your laptop is off

## 🚀 Deployment Options

### Local Usage
Run on your laptop - perfect for testing and setup.

### Cloud Deployment (24/7 Operation)
Deploy to cloud platforms to run continuously without your laptop:
- **Free Option**: Render.com + UptimeRobot (100% free)
- **Paid Option**: $7/month for guaranteed always-on service

📖 **[Complete Deployment Guide →](DEPLOY_STEP_BY_STEP.md)**

## 🏗️ Tech Stack

### Frontend
- React 18
- React Router
- Axios
- CSS3 with modern animations

### Backend
- Node.js
- Express.js
- WhatsApp Web.js (WhatsApp integration)
- Node-cron (Scheduling)
- JSON file storage

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A phone with WhatsApp installed
- Internet connection

## 🚀 Installation & Setup

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

**Important**: When you first run the backend, a QR code will appear in the terminal. Scan this QR code with your WhatsApp mobile app:
1. Open WhatsApp on your phone
2. Go to Settings → Linked Devices
3. Click "Link a Device"
4. Scan the QR code from the terminal

### Start Frontend

Open a new terminal:

```bash
# In the frontend folder
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 📖 How to Use

### Step 1: Add Family Contacts
1. Navigate to the **Contacts** tab
2. Click **"+ Add Contact"**
3. Enter contact details:
   - **Name**: Family member's name (e.g., "Dad")
   - **Phone**: Country code + number without spaces (e.g., `919876543210` for India)
   - **Relation**: Optional (e.g., "Father")
4. Click **"Add Contact"**
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

### WhatsApp Not Connecting
- Make sure you've scanned the QR code
- Check if WhatsApp Web is working on your phone
- Restart the backend server and scan again
- Ensure your phone has internet connection

### Reminders Not Sending
- Verify WhatsApp status indicator is green in the app header
- Check that medications are marked as "Active"
- Ensure phone numbers are in correct format
- Check backend terminal for error messages

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Make sure you're using Node.js v14 or higher

## 🎯 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Email notifications
- Mobile app version
- Medication history tracking
- Multiple language support
- Notification customization

## ⚠️ Important Notes

1. **WhatsApp Connection**: The app needs to maintain an active WhatsApp Web session. Keep the backend server running.
2. **Data Storage**: Currently uses JSON file storage. For production, consider using a database.
3. **Server Uptime**: For 24/7 reminders, deploy the backend to a cloud service (Heroku, AWS, etc.)
4. **WhatsApp Terms**: Ensure you comply with WhatsApp's Terms of Service when using this app.

## 📄 License

This project is created for personal use to help family members manage medications effectively.

## 🙏 Credits

Built with love to help ensure family members never miss their important medications.

---

**Made with ❤️ for family health**
