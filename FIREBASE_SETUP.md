# Firebase Environment Variables - Vercel Setup Guide

আপনার Firebase credentials সফলভাবে সেটআপ করা হয়েছে। এখন Vercel এ যোগ করুন।

## 📋 আপনার Firebase Credentials

```
Project: de-barkot-ali-web
```

| Variable Name | Value |
|---|---|
| VITE_FIREBASE_API_KEY | AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek |
| VITE_FIREBASE_AUTH_DOMAIN | de-barkot-ali-web.firebaseapp.com |
| VITE_FIREBASE_PROJECT_ID | de-barkot-ali-web |
| VITE_FIREBASE_STORAGE_BUCKET | de-barkot-ali-web.firebasestorage.app |
| VITE_FIREBASE_MESSAGING_SENDER_ID | 392212737235 |
| VITE_FIREBASE_APP_ID | 1:392212737235:web:9018d9f385f4332ce17826 |
| VITE_FIREBASE_MEASUREMENT_ID | G-EFFCTX7JEW |

## ✅ Vercel এ কনফিগার করুন

### ধাপ ১: Vercel Dashboard এ যান
1. https://vercel.com/dashboard এ লগইন করুন
2. আপনার প্রজেক্ট খুলুন (dorcor-barkot-ali)
3. **Settings** ট্যাব ক্লিক করুন

### ধাপ ২: Environment Variables যোগ করুন
1. **Environment Variables** সেকশন খুঁজুন
2. নিচের প্রতিটি variable একবার করে যোগ করুন:

```
Key: VITE_FIREBASE_API_KEY
Value: AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek
```

```
Key: VITE_FIREBASE_AUTH_DOMAIN
Value: de-barkot-ali-web.firebaseapp.com
```

```
Key: VITE_FIREBASE_PROJECT_ID
Value: de-barkot-ali-web
```

```
Key: VITE_FIREBASE_STORAGE_BUCKET
Value: de-barkot-ali-web.firebasestorage.app
```

```
Key: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 392212737235
```

```
Key: VITE_FIREBASE_APP_ID
Value: 1:392212737235:web:9018d9f385f4332ce17826
```

```
Key: VITE_FIREBASE_MEASUREMENT_ID
Value: G-EFFCTX7JEW
```

### ধাপ ৩: সব variables যোগ করার পর
- প্রতিটির জন্য "Add" বাটন ক্লিক করুন
- সব সেভ হয়ে যাবে

### ধাপ ৪: Re-deploy করুন
1. Vercel Dashboard > আপনার প্রজেক্ট
2. **Deployments** ট্যাব খুলুন
3. সর্বশেষ deployment এর right side এ তিন ডট (...) ক্লিক করুন
4. **Redeploy** নির্বাচন করুন

এই সব করলে আপনার প্রজেক্ট সম্পূর্ণরূপে কাজ করবে!

---

## 🔒 Security তথ্য

- **API Key Public নয়**: এই API Key শুধু Frontend এ ব্যবহার করা হয়, এটি safe রাখতে পারেন
- **Environment Variables Sensitive**: কখনও GitHub এ commit করবেন না - Vercel e করুন
- **.env.example**: এটি Template - actual secrets এ রাখা নেই

## 🧪 লোকালি টেস্ট করুন

।env ফাইল তৈরি করুন `.env.local`:

```bash
cp .env.example .env.local
```

এরপর:
```bash
npm run dev
```

---

✅ **আপনি সব কিছু করতে পারেন!** Firebase এখন সাথে integrated আছে।
