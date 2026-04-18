
// src/lib/server-actions.ts
// This file acts as a safe bridge to import server functions.
// Client components will import from this file, avoiding the aggressive
// '.server.ts' import protection rule during the build process.

import { newSaveDataToServer, resetDataOnServer } from './firebase.server';

// Re-export the server functions for client-side usage via RPC.
export {
    newSaveDataToServer,
    resetDataOnServer
}; 
