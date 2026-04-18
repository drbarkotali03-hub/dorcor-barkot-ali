
// src/routes/api/reset-data.tsx
import { resetDataOnServer } from '@/lib/firebase.server';

// Use the handler created by createServerFn
export const POST = resetDataOnServer.handler;
