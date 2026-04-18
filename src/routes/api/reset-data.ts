
import { APIEvent, json } from '@tanstack/start/server';
import { resetDataOnServer } from '@/lib/firebase.server';

export async function POST(event: APIEvent) {
  try {
    const result = await resetDataOnServer();
    if (result.success) {
      return json({ success: true, message: result.message });
    }
    return json({ success: false, message: result.message }, { status: 400 });
  } catch (error: any) {
    return json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
