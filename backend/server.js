const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration for production and development
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5000',
            process.env.FRONTEND_URL, // Add your frontend URL in .env
        ].filter(Boolean);
        
        // In production, allow any origin (or specify your frontend URL)
        if (process.env.NODE_ENV === 'production' || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now, restrict in production if needed
        }
    },
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// WhatsApp Client Setup
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    }
});

let isWhatsAppReady = false;

// QR Code Generation for WhatsApp Web
client.on('qr', (qr) => {
    console.log('\n📱 Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Client is ready!');
    isWhatsAppReady = true;
});

client.on('authenticated', () => {
    console.log('✅ WhatsApp authenticated successfully!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
    isWhatsAppReady = false;
});

client.on('disconnected', (reason) => {
    console.log('❌ WhatsApp disconnected:', reason);
    isWhatsAppReady = false;
});

// Initialize WhatsApp client
client.initialize();

// Data storage file path
const DATA_FILE = path.join(__dirname, 'medications.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        medications: [],
        contacts: []
    }, null, 2));
}

// Helper functions
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { medications: [], contacts: [] };
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Send WhatsApp message function
const sendWhatsAppMessage = async (phoneNumber, message) => {
    if (!isWhatsAppReady) {
        throw new Error('WhatsApp is not ready. Please scan the QR code first.');
    }

    try {
        // Format phone number (remove any non-digit characters)
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const chatId = `${formattedNumber}@c.us`;
        
        await client.sendMessage(chatId, message);
        console.log(`✅ Message sent to ${phoneNumber}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send message to ${phoneNumber}:`, error);
        throw error;
    }
};

// Schedule reminder check
const scheduleReminders = () => {
    // Check every minute for due reminders
    cron.schedule('* * * * *', () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const data = readData();
        
        data.medications.forEach(async (med) => {
            if (med.active && med.times.includes(currentTime)) {
                const message = `🔔 *Medication Reminder*\n\n💊 *${med.name}*\n📋 Dosage: ${med.dosage}\n⏰ Time: ${currentTime}\n\n${med.notes ? `📝 Note: ${med.notes}\n\n` : ''}Please take your medication now! 🙏`;
                
                // Send to all contacts
                for (const contact of data.contacts) {
                    try {
                        await sendWhatsAppMessage(contact.phone, message);
                    } catch (error) {
                        console.error(`Failed to send reminder for ${med.name} to ${contact.name}`);
                    }
                }
            }
        });
    });
    
    console.log('📅 Reminder scheduler started');
};

// Start the scheduler
scheduleReminders();

// API Routes

// Get WhatsApp status
app.get('/api/whatsapp/status', (req, res) => {
    res.json({ ready: isWhatsAppReady });
});

// Get all medications
app.get('/api/medications', (req, res) => {
    const data = readData();
    res.json(data.medications);
});

// Add new medication
app.post('/api/medications', (req, res) => {
    const data = readData();
    const newMedication = {
        id: Date.now().toString(),
        name: req.body.name,
        dosage: req.body.dosage,
        times: req.body.times, // Array of times like ["08:00", "14:00", "20:00"]
        notes: req.body.notes || '',
        active: true,
        createdAt: new Date().toISOString()
    };
    
    data.medications.push(newMedication);
    writeData(data);
    res.status(201).json(newMedication);
});

// Update medication
app.put('/api/medications/:id', (req, res) => {
    const data = readData();
    const index = data.medications.findIndex(m => m.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Medication not found' });
    }
    
    data.medications[index] = {
        ...data.medications[index],
        ...req.body,
        id: req.params.id // Ensure ID doesn't change
    };
    
    writeData(data);
    res.json(data.medications[index]);
});

// Delete medication
app.delete('/api/medications/:id', (req, res) => {
    const data = readData();
    data.medications = data.medications.filter(m => m.id !== req.params.id);
    writeData(data);
    res.json({ message: 'Medication deleted successfully' });
});

// Get all contacts
app.get('/api/contacts', (req, res) => {
    const data = readData();
    res.json(data.contacts);
});

// Add new contact
app.post('/api/contacts', (req, res) => {
    const data = readData();
    const newContact = {
        id: Date.now().toString(),
        name: req.body.name,
        phone: req.body.phone, // Format: country code + number (e.g., 919876543210)
        relation: req.body.relation || '',
        createdAt: new Date().toISOString()
    };
    
    data.contacts.push(newContact);
    writeData(data);
    res.status(201).json(newContact);
});

// Delete contact
app.delete('/api/contacts/:id', (req, res) => {
    const data = readData();
    data.contacts = data.contacts.filter(c => c.id !== req.params.id);
    writeData(data);
    res.json({ message: 'Contact deleted successfully' });
});

// Send test message
app.post('/api/test-message', async (req, res) => {
    const { phone, message } = req.body;
    
    try {
        await sendWhatsAppMessage(phone, message);
        res.json({ success: true, message: 'Test message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        whatsapp: isWhatsAppReady,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log('\n⏳ Waiting for WhatsApp connection...\n');
});
