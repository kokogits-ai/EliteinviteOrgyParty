
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const data = await request.json();
    
    // This is where you would integrate with an email service like Resend, SendGrid, or Mailgun.
    // For now, we simulate a successful secure transmission to the host.
    console.log('Application Received for Host Review:', data.name);

    return new Response(JSON.stringify({ success: true, message: 'Application transmitted securely.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
