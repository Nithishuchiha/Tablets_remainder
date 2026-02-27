# Twilio WhatsApp Setup Guide

## Why Twilio Instead of whatsapp-web.js?

**whatsapp-web.js** requires:
- Chrome/Chromium browser (200+ MB)
- Puppeteer dependencies (100+ MB)
- Complex setup on cloud platforms
- QR code scanning every time
- Unstable in production

**Twilio WhatsApp API** provides:
- ✅ Pure REST API - no browsers needed
- ✅ Works instantly on any platform (Render, Heroku, etc.)
- ✅ More reliable and production-ready
- ✅ Official WhatsApp Business API
- ✅ No QR codes, no Chrome/Puppeteer headaches

## Setup Instructions

### Step 1: Create Twilio Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account (includes $15 trial credit)
3. Verify your email and phone number

### Step 2: Get Twilio WhatsApp Sandbox

1. Log in to [Twilio Console](https://www.twilio.com/console)
2. Navigate to **Messaging** → **Try it out** → **Send a WhatsApp message**
3. You'll see:
   - **Sandbox number**: `+1 415 523 8886` (or your region's number)
   - **Join code**: Something like `join <your-code>`
4. Send the join code to the sandbox number from WhatsApp to connect your number

### Step 3: Get Your Credentials

1. Go to [Twilio Console Dashboard](https://www.twilio.com/console)
2. Copy these values:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click to reveal)
3. Get your WhatsApp number from **Messaging** → **Try it out** → **Send a WhatsApp message**
   - Usually: `+14155238886` (US sandbox)

### Step 4: Configure Your Application

#### For Local Development:

Create `backend/.env` file:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

#### For Render Deployment:

1. Go to your Render service dashboard
2. Click on **Environment** section
3. Add these environment variables:
   - `TWILIO_ACCOUNT_SID` = Your Account SID
   - `TWILIO_AUTH_TOKEN` = Your Auth Token
   - `TWILIO_WHATSAPP_NUMBER` = +14155238886

### Step 5: Test It

1. Start your server:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. Add a contact with your WhatsApp number (must start with country code, e.g., +919876543210)

3. Use the test message feature in the app

## Phone Number Format

WhatsApp numbers must include country code:
- ✅ Correct: `+919876543210` (India)
- ✅ Correct: `+14155551234` (USA)
- ❌ Wrong: `9876543210` (missing country code)
- ❌ Wrong: `+91 98765 43210` (has spaces)

## Twilio Sandbox Limitations

The free sandbox has some limitations:
- Recipients must "join" your sandbox first (send join code)
- Sandbox number is shared
- Good for development and testing

## Upgrading to Production (Optional)

For production use:
1. Request WhatsApp Business profile approval
2. Get your own WhatsApp number
3. Remove sandbox limitations
4. Cost: Pay-as-you-go (~$0.005 per message)

## Cost Estimate

Twilio trial includes $15 credit:
- WhatsApp messages: ~$0.005 per message
- With $15 credit: ~3,000 messages
- Perfect for personal use and testing

## Troubleshooting

### Error: "Unable to create record"
- Ensure recipient has joined your sandbox
- Verify phone number format includes `+` and country code

### Error: "Authenticate request failed"
- Check Account SID and Auth Token are correct
- Ensure no extra spaces in credentials

### Messages not received
- Ensure recipient has sent the join code to sandbox
- Check phone number format
- Verify Twilio account is not suspended

## Need Help?

- Twilio Documentation: [https://www.twilio.com/docs/whatsapp](https://www.twilio.com/docs/whatsapp)
- Support: support@twilio.com
