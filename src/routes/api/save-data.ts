
import { APIEvent, json } from '@tanstack/start/server';
import { saveDataToServer } from '@/lib/firebase.server';
import { type SiteData } from '@/lib/data';

export async function POST(event: APIEvent) {
  try {
    const data = await event.request.json() as SiteData;
    const result = await saveDataToServer(data);
    if (result.success) {
      return json({ success: true, message: result.message });
    }
    return json({ success: false, message: result.message }, { status: 400 });
  } catch (error: any) {
    return json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
