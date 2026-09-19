# 🌾 RaithuSahay – Smart Crop Care & Direct Market Access

RaithuSahay (రైతుసహాయ్) is a farmer-focused digital platform designed to help farmers with crop disease detection, treatment guidance, market access, cold storage, logistics, and agricultural support services.

The platform is designed with a **mobile-first, multilingual, low-connectivity-friendly approach** to make agricultural technology easier and more accessible for rural farmers.

---

## 🎯 Problem Statement

Farmers often face several challenges:

- Difficulty identifying crop diseases quickly
- Lack of region-specific treatment information
- Limited access to reliable market prices
- Difficulty finding buyers and FPOs
- Lack of convenient cold-storage facilities
- Transportation and logistics challenges
- Poor internet connectivity in rural areas
- Language and accessibility barriers
- Limited access to government agricultural schemes
- Difficulty accessing trusted local agricultural support

RaithuSahay brings these services together in a single platform.

---

## 🚀 Key Features

### 🌱 1. AI Crop Disease Detection

Farmers can upload or capture a photo of a crop leaf.

The system provides:

- Disease identification
- Observed symptoms
- Severity information
- Confidence information
- Immediate recommended actions
- Treatment guidance

The application also provides appropriate diagnostic disclaimers and can provide fallback guidance when network connectivity is limited.

---

### 💊 2. Crop Treatment Guide

Farmers can access treatment recommendations including:

- Organic remedies
- Biological control methods
- Chemical treatment information
- Dosage guidance
- Application timing
- Safety information
- Pre-harvest waiting periods

---

### 🌦️ 3. Preventive Crop Care

The platform supports preventive agricultural guidance such as:

- Weather-based advisories
- Pest and disease prevention
- Crop-care recommendations
- Regional agricultural guidance

The goal is to help farmers take action before crop problems become severe.

---

### 🛒 4. Market Price Discovery

Farmers can view agricultural market prices including:

- Minimum price
- Modal price
- Maximum price
- Market trends
- Regional mandi information

Farmers can use market information when deciding where and when to sell their produce.

---

### 🤝 5. Buyer & FPO Connection

Farmers can connect with:

- Buyers
- Farmer Producer Organizations (FPOs)
- Institutional purchasers

The platform supports direct communication through contact and inquiry options.

---

### ❄️ 6. Cold Storage

Farmers can find suitable cold-storage facilities based on their produce requirements.

The cold-storage module includes:

- Facility information
- Temperature range
- Humidity information
- Storage capacity
- Storage duration
- Estimated storage cost
- Booking/request functionality

---

### 🚛 7. Logistics & Transportation

Farmers can find transportation options for moving their produce.

Supported transport examples include:

- Tata Ace
- Small commercial vehicles
- Larger transport vehicles
- Cold/refrigerated transport

The application provides estimated transportation costs based on factors such as distance and vehicle type.

---

### 📡 8. Low-Connectivity & Offline Support

Rural connectivity can be unreliable.

RaithuSahay follows an offline-first approach for important workflows.

The application supports:

- Local data persistence
- Draft preservation
- Pending synchronization
- Retry after connectivity is restored
- Request status tracking
- Manual synchronization
- Duplicate-submission protection

Typical request states include:

**Draft → Pending Sync → Syncing → Synced**

This helps prevent farmers from losing information when their internet connection is interrupted.

---

### 🔐 9. Authentication & Authorization

The application includes role-based access control.

Supported roles include:

- 👨‍🌾 Farmer
- 🏢 Buyer / FPO
- 🚛 Trader / Service Provider
- ⚙️ Administrator

Users should only be able to access functionality appropriate to their assigned role.

---

### 🗣️ 10. Multilingual Support

RaithuSahay is designed to support multiple languages:

- English
- Telugu (తెలుగు)
- Hindi (हिन्दी)

The application also includes voice-oriented accessibility features to make the platform easier to use for farmers who prefer speaking rather than typing.

---

### 🎙️ 11. Voice & Accessibility

The platform includes voice-oriented functionality with:

- Speech recognition
- Speech synthesis
- Voice input
- Text-input fallback
- Microphone permission handling
- Recognition error handling

Regional dialect support is treated as an experimental accessibility feature with standard Telugu fallback.

---

### 👩‍🌾 12. Women Farmers & SHG Support

The application includes functionality for women farmers and Self-Help Groups (SHGs).

Features include:

- SHG connections
- Collective produce pooling
- Collective agricultural activities
- Custom machinery/service support

---

### 🏛️ 13. Government Schemes & Agricultural Support

The platform provides information about agricultural schemes and subsidies.

Information can include:

- Scheme category
- Administering authority
- Benefits
- Eligibility
- Required documents
- Local agricultural assistance centers

The application can also help users locate relevant local agricultural support centers.

---

## 👥 User Roles

### Farmer

Farmers can access:

- Dashboard
- Disease detection
- Treatment guides
- Market prices
- Buyer/FPO connections
- Cold storage
- Logistics
- Preventive care
- Government schemes
- Women/SHG services
- Requests and synchronization

### Buyer / FPO

Buyers and FPOs can:

- View farmer produce
- Review produce lots
- Connect with farmers
- Express purchase interest
- Manage procurement activities

### Trader / Service Provider

Service providers can manage:

- Produce arrivals
- Transport/service requests
- Agricultural logistics activities
- Transaction/service information

### Administrator

Administrators can monitor:

- Users
- Agricultural services
- System activity
- Synchronization activity
- AI-related diagnostics
- Platform operations

---

## 🏗️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Responsive mobile-first UI

### Backend

- Node.js
- Express
- TypeScript

### AI

- Google Gemini API
- AI-assisted crop image analysis
- Rule-based agricultural fallback guidance

### Storage

- LocalStorage / IndexedDB-based persistence
- Server-side API synchronization

### Accessibility

- Speech Recognition
- Speech Synthesis
- Multilingual interface
- Mobile-first design

---

## 📂 Project Structure

```text
RaithuSahay/
│
├── src/
│   ├── components/
│   ├── data/
│   ├── i18n/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
│
├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .env.example
