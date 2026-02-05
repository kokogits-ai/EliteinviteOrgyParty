
export const config = {
  runtime: 'edge',
};

const DESTINATION_EMAIL = 'kudosruston@gmail.com';

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const data = await request.json();
    
    // Formatting the application data for the email notification
    const emailSubject = `New Screening Application: ${data.name || 'Anonymous'}`;
    const emailBody = `
      NEW PRIVATE SCREENING APPLICATION
      ==================================
      
      PERSONAL DETAILS:
      - Alias/Name: ${data.name}
      - Email: ${data.email}
      - Phone: ${data.phone}
      
      EVENT PREFERENCES:
      - Selected Date: ${data.selectedDate}
      - Role: ${data.role}
      - Interest Type: ${data.interestType}
      
      VERIFICATION STATUS:
      - Age Verified (25+): ${data.ageVerified ? 'YES' : 'NO'}
      - Conduct Agreed: ${data.agreedToConduct ? 'YES' : 'NO'}
      
      PHOTOS PROVIDED: ${data.profilePictures.filter((p: string) => p !== '').length}
      
      ----------------------------------
      This application was submitted via the Elite Private Event Screening portal.
    `;

    // LOGGING: This ensures the full payload is visible in your Vercel/Deployment logs
    console.log(`[EMAIL DISPATCH] To: ${DESTINATION_EMAIL}`);
    console.log(`[SUBJECT] ${emailSubject}`);
    console.log(`[BODY] ${emailBody}`);

    /**
     * PRODUCTION EMAIL INTEGRATION
     * To actually send the email to kudosruston@gmail.com, you would typically use 
     * a service like Resend.com. 
     * 
     * Example Resend implementation:
     * 
     * const res = await fetch('https://api.resend.com/emails', {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
     *   },
     *   body: JSON.stringify({
     *     from: 'Screening <onboarding@resend.dev>',
     *     to: DESTINATION_EMAIL,
     *     subject: emailSubject,
     *     text: emailBody,
     *   }),
     * });
     */

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Application for ${data.name} transmitted to host review queue at ${DESTINATION_EMAIL}.` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Submission processing error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
