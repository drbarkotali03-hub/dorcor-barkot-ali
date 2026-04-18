import { resetData } from '../src/lib/data';
import { db } from '../src/lib/firebase';
import { get, ref } from 'firebase/database';

async function seed() {
  console.log('Seeding database...');
  await resetData();
  console.log('Database seeded successfully!');
  
  // We need to end the process manually because the Firebase connection keeps it alive.
  process.exit(0);
}

seed();
