# Vercel Deployment Checklist

আপনার প্রজেক্ট Vercel ডিপ্লয়মেন্টের জন্য প্রস্তুত। নিচে দেখুন কি কি তৈরি হয়েছে এবং করতে হবে।

## ✅ ইতিমধ্যে সম্পন্ন

1. **vercel.json** - Vercel বিল্ড কনফিগারেশন তৈরি করা হয়েছে
   - Build command: `bun run build`
   - Output directory: `dist`
   - Firebase env variables প্লেসহোল্ডার যোগ করা হয়েছে

2. **.env.example** - এনভায়রনমেন্ট ভেরিয়েবলের উদাহরণ চিহ্নিত করা হয়েছে

3. **VERCEL_DEPLOY.md** - সম্পূর্ণ বাংলা গাইড

## 📝 পরবর্তী ধাপ

### ধাপ ১: Git এ কমিট করুন
```bash
cd /workspaces/dorcor-barkot-ali/barkatali-5b74b618
git add .
git commit -m "Setup Vercel deployment configuration"
git push origin main
```

### ধাপ ২: Vercel এ প্রজেক্ট ইম্পোর্ট করুন

1. https://vercel.com এ যান
2. GitHub এ লগইন করুন
3. "Add New" → "Project" ক্লিক করুন
4. আপনার repo খুঁজুন এবং "Import" করুন
5. সেটিংস দেখুন - বেশিরভাগ স্বয়ংক্রিয় হবে

### ধাপ ৩: Firebase (যদি প্রয়োজন হয়)

Firebase ব্যবহার করতে চাইলে:

1. Firebase Console খুলুন: https://console.firebase.google.com
2. আপনার প্রজেক্ট নির্বাচন করুন
3. **Project Settings** (⚙️ আইকন) ক্লিক করুন
4. **Service Accounts** ট্যাব খুলুন
5. **Web** -> config কপি করুন:

```javascript
// এখানে থেকে নিচের মান কপি করুন:
const firebaseConfig = {
  apiKey: "আপনার_API_KEY",
  authDomain: "আপনার_AUTH_DOMAIN",
  projectId: "আপনার_PROJECT_ID",
  storageBucket: "আপনার_STORAGE_BUCKET",
  messagingSenderId: "আপনার_MESSAGING_SENDER_ID",
  appId: "আপনার_APP_ID",
  measurementId: "আপনার_MEASUREMENT_ID"
};
```

6. Vercel Dashboard > আপনার প্রজেক্ট > **Settings** > **Environment Variables**
7. প্রতিটি Firebase config ভেরিয়েবল যোগ করুন

### ধাপ ৪: ডিপ্লয়

সব কিছু সেটআপ করার পর:
- Vercel স্বয়ংক্রিয়ভাবে ডিপ্লয় করবে যখন আপনি `main` branch এ পুশ করবেন
- অথবা ম্যানুয়ালি Vercel Dashboard এ "Deploy" ক্লিক করুন

## 🧪 লোকালি টেস্ট করুন (ডিপ্লয়ের আগে)

```bash
# ডিপেন্ডেন্সি ইনস্টল করুন
bun install

# বিল্ড করুন
bun run build

# প্রিভিউ করুন
bun run preview
```

এরপর http://localhost:4173 এ চেক করুন

## ⚠️ গুরুত্বপূর্ণ নোট

- **bun vs npm**: এই প্রজেক্ট `bun` ব্যবহার করে - Vercel স্বয়ংক্রিয়ভাবে ডিটেক্ট করবে
- **Environment Variables**: Firebase ছাড়া এই প্রজেক্ট ভাল কাজ করে (localStorage ব্যবহার করে)
- **Static Hosting**: এটি একটি static frontend - কোন ডাটাবেস ছাড়াই কাজ করে

---

**কোন প্রশ্ন?** VERCEL_DEPLOY.md ফাইল দেখুন বা Firebase console থেকে credentials পান।
