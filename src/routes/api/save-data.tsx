
// src/routes/api/save-data.tsx
import { newSaveDataToServer } from '@/lib/firebase.server';

// Use the handler created by createServerFn for saving data
export const POST = newSaveDataToServer.handler;
