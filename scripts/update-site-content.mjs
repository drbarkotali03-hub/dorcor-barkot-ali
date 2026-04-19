import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBOIyDRJ8WFswTudCGNfDoCa7sw82kUeek',
  authDomain: 'de-barkot-ali-web.firebaseapp.com',
  databaseURL: 'https://de-barkot-ali-web-default-rtdb.firebaseio.com',
  projectId: 'de-barkot-ali-web',
  storageBucket: 'de-barkot-ali-web.firebasestorage.app',
  messagingSenderId: '392212737235',
  appId: '1:392212737235:web:9018d9f385f4332ce17826',
  measurementId: 'G-EFFCTX7JEW',
};

const imageUrl = 'https://i.postimg.cc/Hsjjj4TD/Round-Photo-Apr192026-193207.png';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, 'site', 'data');

async function run() {
  console.log('Fetching current site data...');
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log('No document found at site/data. It will be created with the provided values.');
  } else {
    console.log('Current document exists. Updating fields...');
  }

  await setDoc(docRef, {
    doctor: { imageUrl },
    settings: { logo: imageUrl },
  }, { merge: true });

  const updatedSnap = await getDoc(docRef);
  if (!updatedSnap.exists()) {
    throw new Error('Failed to read back updated document.');
  }

  const updated = updatedSnap.data();
  console.log('Updated document data:');
  console.log(JSON.stringify({
    doctor: { imageUrl: updated?.doctor?.imageUrl },
    settings: { logo: updated?.settings?.logo },
  }, null, 2));
}

run().catch((err) => {
  console.error('Update script failed:', err);
  process.exit(1);
});