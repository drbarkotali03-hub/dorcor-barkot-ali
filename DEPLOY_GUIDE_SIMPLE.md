# 🚀 VERCEL DEPLOYMENT - সহজ ৫ ধাপ

## ⚠️ গুরুত্বপূর্ণ: এই ধাপগুলি ঠিক এই ক্রমে করুন

---

## 📱 STEP 1: Vercel Dashboard খুলুন

1. এই লিংক কপি করুন: `https://vercel.com/dashboard`
2. Browser এ paste করুন এবং Enter চাপুন
3. আপনার GitHub account দিয়ে লগইন করুন

---

## 🔍 STEP 2: আপনার Project খুঁজুন

**Dashboard এ আপনি একটি প্রজেক্ট দেখবেন:**
- **নাম:** `dorcor-barkot-ali`
- এটার উপর ক্লিক করুন

---

## ⚙️ STEP 3: Build Settings Configure করুন

**আপনার Project এ এখানে যান:**
1. **Settings** ট্যাব (উপরে navbar তে)
2. বাম সাইড থেকে **"Build and Deployment"** খুঁজুন এবং ক্লিক করুন

**এখানে এই ৪টি জিনিস ফিল করুন:**

```
✏️ Framework:           Vite
✏️ Build Command:       npm run build
✏️ Output Directory:    dist
✏️ Install Command:     npm install
```

(**NB:** যদি অনেক setting দেখা যায় তাহলে এই ৪টাই খোঁজুন এবং আপডেট করুন)

**বাটন খুঁজুন:** "Save" বা "Update" ক্লিক করুন

---

## 🔑 STEP 4: Environment Variables আছে কিনা Check করুন

1. বাম সাইড থেকে **"Environment Variables"** ক্লিক করুন
2. এই **সাতটি variables** দেখবেন - এগুলি আছে কিনা যাচাই করুন:

```
✓ VITE_FIREBASE_API_KEY
✓ VITE_FIREBASE_AUTH_DOMAIN
✓ VITE_FIREBASE_PROJECT_ID
✓ VITE_FIREBASE_STORAGE_BUCKET
✓ VITE_FIREBASE_MESSAGING_SENDER_ID
✓ VITE_FIREBASE_APP_ID
✓ VITE_FIREBASE_MEASUREMENT_ID
```

**সব ৭টি variables দেখা যাচ্ছে?** ✅ হ্যাঁ → STEP 5 এ যান

---

## 🎯 STEP 5: Redeploy করুন (এটাই শেষ!)

1. **"Deployments"** ট্যাব ক্লিক করুন (উপরে navbar তে)
2. সবচেয়ে উপরে যে deployment আছে তার **right side এ (...)** খুঁজুন
3. **"Redeploy"** ক্লিক করুন

**✅ DONE!** এখন অপেক্ষা করুন ১-২ মিনিট। Deploy হয়ে যাবে!

---

## ✅ কীভাবে জানব Deploy হয়েছে?

Vercel Dashboard এ deployment status দেখবেন:
- 🟡 **Yellow** = Building... (চলছে)
- 🟢 **Green** = Deploy successful! (সফল!)
- 🔴 **Red** = Failed (এরর হয়েছে)

---

## 🌍 আপনার Live Website URL পাবেন

Deploy successful হলে আপনি একটি **URL দেখবেন যেমন:**

```
https://your-project-name.vercel.app
```

এটাই আপনার **live website**! এটা open করলেই আপনার সাইট দেখতে পাবেন!

---

## 🆘 যদি Red (Error) দেখেন?

**Logs দেখুন:**
1. Failed deployment এ ক্লিক করুন
2. "Logs" ট্যাব খুঁজুন
3. Error message পড়ুন

**Common errors:**
- ❌ `npm run build failed` → Firebase API issue
- ❌ `Cannot find module` → Dependencies issue
- ❌ `Port already in use` → Restart করুন

---

## 💡 টিপস

✅ Environment Variables সব ঠিক আছে কিনা ডাবল চেক করুন  
✅ Build Settings ঠিক মত configure করা আছে কিনা দেখুন  
✅ Redeploy করার আগে সব Settings Save করুন  

---

**এটুকুই! আর কিছু নেই। শুধু এই steps follow করুন।** 🎉
