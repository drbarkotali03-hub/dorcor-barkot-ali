# Vercel Deployment Guide - Dr. Barkot Ali Website

এই গাইডে আপনার Vercel ডিপ্লয়মেন্টের সম্পূর্ণ প্রক্রিয়া দেখানো হয়েছে।

## স্টেপ ১: Git রিপোজিটরি চেক করুন

প্রথমে নিশ্চিত করুন যে আপনার কোড GitHub এ আপস্ট্রিম করা হয়েছে:

```bash
git status
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## স্টেপ ২: Vercel এ প্রজেক্ট তৈরি করুন

1. https://vercel.com এ যান
2. আপনার GitHub অ্যাকাউন্ট দিয়ে সাইন আপ / লগইন করুন
3. "Add New..." > "Project" ক্লিক করুন
4. আপনার রিপোজিটরি সার্চ করুন এবং "Import" ক্লিক করুন

## স্টেপ ৩: বিল্ড সেটিংস (অপশনাল)

বেশিরভাগ সেটিংস স্বয়ংক্রিয়ভাবে সনাক্ত হয়ে যাবে কারণ `vercel.json` ফাইল আছে:

- **Build Command**: `bun run build`
- **Output Directory**: `dist`

## স্টেপ ৪: Firebase সেটআপ (Firebase ব্যবহার করলে)

Firebase ডেটাবেস ব্যবহার করতে চাইলে:

### Firebase Console থেকে Credentials পান:

1. https://console.firebase.google.com এ যান
2. আপনার প্রজেক্ট খুলুন
3. **Project Settings** (⚙️) > **Service Accounts** > **Web** এ যান
4. आपcopy করুন:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
   - `measurementId`

### Vercel এ Environment Variables যোগ করুন:

Vercel Dashboard > আপনার প্রজেক্ট > **Settings** > **Environment Variables**

নিচের Key-Value pairs যোগ করুন:

```
VITE_FIREBASE_API_KEY = আপনার_api_key
VITE_FIREBASE_AUTH_DOMAIN = আপনার_auth_domain
VITE_FIREBASE_PROJECT_ID = আপনার_project_id
VITE_FIREBASE_STORAGE_BUCKET = আপনার_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID = আপনার_messaging_sender_id
VITE_FIREBASE_APP_ID = আপনার_app_id
VITE_FIREBASE_MEASUREMENT_ID = আপনার_measurement_id
```

## স্টেপ ৫: ডিপ্লয় করুন

সব সেটিংস যোগ করার পর:

1. Vercel Dashboard > আপনার প্রজেক্ট
2. **Deploy** বাটন ক্লিক করুন অথবা স্বয়ংক্রিয় ডিপ্লয়মেন্ট হবে যখন আপনি `main` branch এ push করবেন

## সাধারণ সমস্যা এবং সমাধান

### সমস্যা ১: বিল্ড ব্যর্থ হয় ("bun run build failed")
```bash
# লোকালি টেস্ট করুন:
bun install
bun run build
```

### সমস্যা ২: Firebase Functions প্রয়োজন হলে
যদি অ্যাডভান্সড ব্যাকেন্ড প্রয়োজন হয তাহলে **Vercel Functions** ব্যবহার করুন (`api/` ফোল্ডারে TypeScript/JavaScript ফাইল যোগ করুন)

### সমস্যা ৩: Static বনাম Server-Side Rendering
এই প্রজেক্ট static frontend এবং client-side rendering ব্যবহার করে - কোন বিশেষ কনফিগারেশন প্রয়োজন নেই।

## স্থানীয়ভাবে পরীক্ষা করুন

ডিপ্লয় করার আগে লোকালি পরীক্ষা করুন:

```bash
bun install
bun run build
bun run preview
```

এরপর http://localhost:4173 (বা যে পোর্ট দেখায়) এ ভিজিট করুন।

---

**সাহায্য প্রয়োজন?**
- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs
