# 🏥 Dr. Md. Barkot Ali - Professional Website

**Project Name:** Dr. Barkot Ali - Child Specialist Khulna  
**Built with:** Vite + React + TanStack Router + Firebase  
**Deployed on:** Vercel  

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm or Bun package manager

### Installation

```bash
# Install dependencies
npm install

# Setup .env.local
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚀 Deployment on Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Step 2: Import on Vercel
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select `dorcor-barkot-ali` repository
4. Click "Import"

### Step 3: Add Environment Variables
In Vercel Dashboard → **Settings → Environment Variables**, add these 7 variables:

```
VITE_FIREBASE_API_KEY=AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek
VITE_FIREBASE_AUTH_DOMAIN=de-barkot-ali-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=de-barkot-ali-web
VITE_FIREBASE_STORAGE_BUCKET=de-barkot-ali-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=392212737235
VITE_FIREBASE_APP_ID=1:392212737235:web:9018d9f385f4332ce17826
VITE_FIREBASE_MEASUREMENT_ID=G-EFFCTX7JEW
```

### Step 4: Deploy
Click "Deploy" button - your site will be live in ~2 minutes! 🎉

---

## 📁 Project Structure

```
dorcor-barkot-ali/
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── firebase.ts     # Firebase initialization
│   │   ├── data.ts         # Data types & defaults
│   │   └── utils.ts        # Utility functions
│   ├── routes/             # TanStack Router pages
│   ├── router.tsx          # Router configuration
│   └── styles.css          # Global styles
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── vercel.json            # Vercel deployment config
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variables template
└── .env.local             # Local environment (gitignored)
```

---

## 🔧 Technologies

- **Frontend:** React 19 + TypeScript
- **Routing:** TanStack Router v1
- **UI Components:** Radix UI + Shadcn/UI
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Forms:** React Hook Form + Zod
- **Build Tool:** Vite
- **Hosting:** Vercel
- **Server Runtime:** Cloudflare Workers (via Wrangler)

---

## 📚 Documentation

- [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) - Deployment guide
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase configuration
- [QUICK_START.md](./QUICK_START.md) - Quick setup guide
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment checklist

---

## 🎯 Features

✅ Responsive design  
✅ Firebase integration  
✅ Admin panel for content management  
✅ Appointment scheduling  
✅ WhatsApp integration  
✅ Multi-language support  
✅ Fast performance (Vite)  
✅ SEO optimized  

---

## 📞 Contact

**Dr. Md. Barkot Ali**  
Child & Adolescent Health Specialist  
Khulna, Bangladesh

- 🌐 Website: [drbarkotali.com](#)
- 📱 WhatsApp: +880 1712-050951
- 📧 Email: [contact info here]

---

## 📝 License

This project is proprietary and confidential.

---

**Last Updated:** April 17, 2026  
**Status:** ✅ Production Ready
