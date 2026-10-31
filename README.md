# 🏛️ JanSeva — Multilingual Citizen Services & Grievance Portal

**JanSeva** is a modern, responsive, and multilingual public-services assistant designed to empower citizens to discover public services, submit grievances securely, track resolution status, and interact via voice in **English**, **Hindi (हिन्दी)**, and **Telugu (తెలుగు)**.

---

## 🌟 Key Features

### 1. 🔍 Searchable Public Services Directory
- **20 Curated Services** spanning 7 vital civic categories (Certificates, Welfare & Pensions, Land & Revenue, Utilities, Urban Grievances, Healthcare, Education).
- **Official Source Citations**: Every service cites its official government portal, content language, and last-reviewed date.
- **Strict Hallucination Prevention**: Requirements, fees, or timelines not confirmed by the source are explicitly badged as *"Not confirmed in the available source."*

### 2. 🤖 Source-Grounded AI Assistant & 🎙️ Multilingual Voice
- **Strict Grounding**: Answers only from verified service records with direct citation links.
- **Conversational Clarification**: Prompts citizens with concise follow-up questions when inquiries are ambiguous.
- **Unsupported Query Detection**: Politely declines to invent rules for unsupported topics and directs citizens to appropriate offices.
- **Voice Input (STT)**: Dedicated one-click microphone controls for **English (`en-IN`)**, **Hindi (`hi-IN`)**, and **Telugu (`te-IN`)**.
- **Telugu Morphological Stemming**: Resolves spoken inflectional suffixes (e.g. `కార్డుకు`, `దీపాలు`, `పెన్షన్లు`) to ensure spoken queries match official records.

### 3. 📝 Anonymous & Protected Grievance Redressal
- **Privacy-by-Design**: Submissions require only essential incident details (Category, Area, Description, Attachment); no unnecessary PII (phone/email) is collected.
- **Cryptographic PIN Security**: Access credentials are encrypted with salted **SHA-256 hashes**. Plaintext PINs are never stored or logged.
- **Rate-Limiting Protection**: PIN tracking attempts are capped with automatic lockouts to prevent brute-force attacks.

### 4. 👤 Citizen Dashboard & One-Click Demo Auth
- **Citizen Account**: Track active submissions without needing to re-enter PINs.
- **Demo Accounts Pre-Configured**:
  - **Citizen Demo**: `citizen@demo.gov.in` / `CitizenDemo@2026` (Preloaded with sample municipal requests)
  - **Staff Demo**: `staff@demo.gov.in` / `StaffDemo@2026` (Access to server-protected staff queue)
- **HTTP-Only Cookies & HMAC Session Tokens**: Server-verified session tokens for seamless, secure navigation.

### 5. 🛡️ Server-Protected Staff Review Queue
- **Staff Operations**: Update grievance statuses (`Submitted`, `Under review`, `In progress`, `Resolved`, `Closed`) and record audit notes.
- **Server-Side Authorization**: Enforced at the API route level with HTTP 401/403 protection.
- **Transparency**: Clearly marked as demo workflow actions.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+)
- `npm` or `pnpm`

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/thaherbashadudekula-web/JanSeva.git
cd JanSeva

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Automated End-to-End Testing
JanSeva includes an automated test suite verifying all 18 core citizen and staff journeys:

```bash
node test-e2e.js
```

### Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
├── public/                 # Static assets (hero backgrounds, svg patterns)
├── src/
│   ├── app/
│   │   ├── api/            # Route handlers (auth, assistant, grievance, services, staff)
│   │   ├── assistant/      # AI Assistant & Voice interface
│   │   ├── dashboard/      # Citizen dashboard
│   │   ├── grievance/      # Submission & PIN tracking pages
│   │   ├── login/          # Demo authentication page
│   │   ├── services/       # Service directory & details
│   │   ├── staff/          # Staff review queue
│   │   ├── globals.css     # Responsive design system & micro-interactions
│   │   └── layout.tsx      # Root layout with Language & Auth providers
│   ├── components/         # Header, Footer, Disclaimer Banner
│   ├── data/               # Persistent JSON demo storage (db.json)
│   └── lib/
│       ├── assistant/      # Grounding engine & stemmers
│       ├── auth/           # React AuthContext
│       ├── hooks/          # useSpeechToText hook
│       ├── i18n/           # English, Hindi, Telugu translation dictionaries
│       ├── security/       # Crypto hashing & HMAC session tokens
│       ├── services/       # 20 curated public service records
│       └── storage/        # Storage types & file adapter
└── test-e2e.js             # Automated 18-step verification suite
```

---

## 🔒 Security & Privacy Notice
This platform is a demonstration civic portal. All grievance records and status updates operate within a local demo environment. No official submissions are made to real-world government departments.

