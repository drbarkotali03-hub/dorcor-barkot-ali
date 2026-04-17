# ✅ VERCEL DEPLOYMENT CHECKLIST

**আপনার Deployment Success এর জন্য এই Checklist use করুন।**

---

## Phase 1️⃣: Preparation (Git)

- [ ] GitHub Account আছে
- [ ] Project সব Files সহ GitHub এ push করা আছে
- [ ] `git log` দিয়ে last commit দেখা যাচ্ছে

```bash
# Check করতে এটা run করুন:
git log --oneline -3
```

---

## Phase 2️⃣: Vercel Setup

### 2.1 - Project Import
- [ ] Vercel Dashboard এ লগইন করেছি
- [ ] `dorcor-barkot-ali` project import করছি (या ইতিমধ্যে import করা আছে)
- [ ] Project Dashboard খুলতে পারছি

### 2.2 - Build Settings Configure

**Settings → Build and Deployment → এ যান এবং এই values দিন:**

- [ ] **Framework Preset:** `Vite` selected
- [ ] **Build Command:** `npm run build`
- [ ] **Output Directory:** `dist`
- [ ] **Install Command:** `npm install`
- [ ] **Node Version:** `18.x` or `20.x`

```
⚠️ এই ৫টি setting MUST আছে!
```

- [ ] "Save" button ক্লিক করেছি

### 2.3 - Environment Variables Check

**Settings → Environment Variables → যান এবং verify করুন:**

**এই ৭টি variables থাকতে হবে:**

- [ ] `VITE_FIREBASE_API_KEY` = `AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` = `de-barkot-ali-web.firebaseapp.com`
- [ ] `VITE_FIREBASE_PROJECT_ID` = `de-barkot-ali-web`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` = `de-barkot-ali-web.firebasestorage.app`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` = `392212737235`
- [ ] `VITE_FIREBASE_APP_ID` = `1:392212737235:web:9018d9f385f4332ce17826`
- [ ] `VITE_FIREBASE_MEASUREMENT_ID` = `G-EFFCTX7JEW`

```
🔒 All variables visible = All Environments selected?
```

---

## Phase 3️⃣: Deployment

### 3.1 - Initial Deploy (যদি এখনও Deploy না হয়ে থাকে)

- [ ] কোন deployment history দেখা যাচ্ছে (Deployments tab এ)
- [ ] একটি "Deploy" বা "Redeploy" button আছে ডাশবোর্ডে
- [ ] Deploy button ক্লিক করেছি

### 3.2 - Redeploy (আপডেট Deploy করতে)

- [ ] **Deployments** ট্যাব এ গেছি
- [ ] সবচেয়ে recent deployment খুঁজেছি (উপরে থাকবে)
- [ ] right side এ **"..."** (three dots) দেখছি
- [ ] **"Redeploy"** option ক্লিক করেছি

### 3.3 - Build Progress Monitor করছি

- [ ] Deployment status দেখা যাচ্ছে:
  - [ ] 🟡 Yellow = Building (চলছে)
  - [ ] 🟢 Green = Success! 
  - [ ] 🔴 Red = Failed

- [ ] Build time: সাধারণত **2-5 মিনিট** লাগে

---

## Phase 4️⃣: Success Verification

### ✅ যদি Green (Success) দেখেন:

- [ ] একটি **URL** পাচ্ছেন যেমন: `https://dorcor-barkot-ali.vercel.app`
- [ ] সেই URL কপি করেছি
- [ ] নতুন tab এ paste করে visit করেছি
- [ ] 🎉 আপনার website live!

### ❌ যদি Red (Failed) দেখেন:

- [ ] Deployment এ ক্লিক করেছি
- [ ] **"Logs"** বা **"Build Logs"** ট্যাব খুঁজেছি
- [ ] Error message পড়েছি
- [ ] [TROUBLESHOOTING](#troubleshooting) section দেখেছি

---

## 🔧 TROUBLESHOOTING

### Problem 1: "Cannot find module"

```
❌ Error: Cannot find module 'firebase'
```

**Solution:**
```bash
# Local এ:
npm install firebase
npm run build
```

---

### Problem 2: "Build failed"

```
❌ Error: npm run build failed
```

**Solution:**
1. Environment variables সব সঠিক কিনা check করুন
2. Vercel এ rebuild করুন

---

### Problem 3: "Framework not detected"

```
❌ Warning: Could not detect framework
```

**Solution:**
- Settings → Build and Deployment
- Framework manually select করুন: **Vite**

---

### Problem 4: "Timeout"

```
❌ Build timeout after 45 minutes
```

**Solution:**
- Redeploy করুন
- Dependencies check করুন

---

## 📞 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Project Settings:** https://vercel.com/drbarkotali03-hub/dorcor-barkot-ali/settings
- **GitHub Repo:** https://github.com/drbarkotali03-hub/dorcor-barkot-ali
- **Firebase Console:** https://console.firebase.google.com

---

## 🎯 Final Status

| Task | Status |
|------|--------|
| Project imported | ⏳ |
| Build Settings | ⏳ |
| Environment Variables | ✅ |
| Deployment | ⏳ |
| Website Live | ⏳ |

---

**এই Checklist Follow করলে Deploy 100% হয়ে যাবে!** 🚀
