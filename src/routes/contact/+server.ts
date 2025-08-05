// src/routes/contact/+server.ts
import { serverClient } from '$lib/utils/sanity.server';
import { json } from '@sveltejs/kit';



export async function POST({ request }) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const res = await serverClient.create({
      _type: "contactRegistration",
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: new Date().toISOString(),
    });

    return json({ success: true, id: res._id }, { status: 200 });
  } catch (err) {
    console.error("Form submission error:", err);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}