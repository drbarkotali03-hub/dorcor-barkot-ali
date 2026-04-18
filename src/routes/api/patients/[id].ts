
import { APIEvent, json } from '@tanstack/start/server';
import { deletePatient } from '@/lib/firebase.server';

export async function DELETE(event: APIEvent & { params: { id: string } }) {
  try {
    const id = event.params.id;
    const result = await deletePatient(id);
    return json(result);
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}
