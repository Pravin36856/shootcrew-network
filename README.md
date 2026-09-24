# ShootCrew Connect 📸
### Central India's #1 Freelance Photographer & Cameraman Booking Network
**(Gondia, Nagpur, Bhandara, Balaghat & Vidarbha Region)**

ShootCrew Connect is a complete web application built specifically for wedding photographers, digital photo studios, and freelance crew operators.

---

## 🌟 Key Features Built According to Requirements:

### 1. 📍 City & Village Wise Filtering:
- **Gondia Selection**: Shows all photographers, drone pilots, and operators in Gondia (Rail Toli, Ramnagar, Kudwa, Goregaon, Tirora, Amgaon).
- **Nagpur Selection**: Shows all talent in Nagpur (Dharampeth, Sitabuldi, Manish Nagar, Wardhaman Nagar, etc.).
- Also includes Bhandara, Balaghat, Raipur, and custom villages.

### 2. 📅 "Konsi Date Ko Khali Hai" (Availability Calendar Filter):
- Studios can pick the exact wedding shoot date (e.g. `2026-11-15`).
- The application **instantly filters only those cameramen who have marked themselves as Available (Khali)** on that date!
- Dedicated **"Khali Dates"** tab where cameramen can click on upcoming dates to toggle between **Khali (Green)** and **Busy (Red)**.

### 3. 📷 "Camere Ke Sath" vs "Without Camera" (Exposing Only):
- **With Camera (कैमरे के साथ)**: Displays exact camera body, lenses, drone model (e.g., Sony A7IV + 24-70 GM II, Sony FX3, DJI Mavic 3 Pro) with full gear day rates.
- **Without Camera (सिर्फ ऑपरेटर / एक्सपोजिंग)**: For skilled boys who operate studio cameras at economical day rates (₹1,200 - ₹1,500/day).
- 1-click filter toggle to switch between **With Camera** and **Without Camera**.

### 4. 🎭 All Specialized Photography Categories:
- **Traditional Photographer** (स्टिल फोटोग्राफर)
- **Traditional Videographer** (वीडियो ग्राफर)
- **Candid / Cinematographer** (सिनेमैटोग्राफर)
- **Drone Pilot / Operator** (ड्रोन वाला)
- **Reel Maker / Mobile Shooter** (इंस्टाग्राम रील मेकर)
- **LED Wall Operator** (एलईडी वॉल वाला)
- **Album Designer & Video Editor** (एडिटर)

### 5. 💰 Application Owner Fees & Monetization:
- **Crew Registration Fee**: Set to ₹299 (customizable in Admin).
- **Live UPI QR Code & UPI ID**: Crew pays fee directly to your GooglePay/PhonePe UPI ID during registration and submits the 12-digit UTR.
- **Admin Revenue Dashboard**:
  - Live revenue counter (`Total Crew × ₹299`)
  - One-click profile verification badge
  - Customize registration fee amount anytime
  - Change receiving UPI ID & QR Code

### 6. 📱 Direct WhatsApp & Call Booking:
- Main photographers can click **"Book Crew"**, select shift (Full Day, Morning Vidhi, Evening Baarat), venue, and send a pre-formatted message straight to the cameraman's WhatsApp!

---

## 🚀 How to Run Locally:

The app is already compiled and running on:
**[http://127.0.0.1:5173/](http://127.0.0.1:5173/)**

If you need to start it again in the future:
```bash
cd C:\Users\ABC\.gemini\antigravity\scratch\cameracrew-network
npm run dev
```

To create a production build:
```bash
npm run build
```
The production files will be in `dist/`.
