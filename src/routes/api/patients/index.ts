
import { APIEvent, json } from '@tanstack/start/server';
import { getPatients, addPatient } from '@/lib/firebase.server';

export async function GET(event: APIEvent) {
  try {
    const patients = await getPatients();
    return json(patients);
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function POST(event: APIEvent) {
  try {
    const body = await event.request.json();
    const newPatient = await addPatient({ name: body.name });
    return json(newPatient, { status: 201 });
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}
