
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
    
    // Formatting the application data for host review
    const emailPayload = {
      to: DESTINATION_EMAIL,
      subject: `New Application: ${data.name || 'Anonymous Guest'}`,
      body: `
        NEW PRIVATE EVENT SCREENING
        ===========================
        
        GUEST DETAILS:
        - Name/Alias: ${data.name}
        - Email: ${data.email}
        - Phone: ${data.phone}
        
        PREFERENCES:
        - Arrival: ${data.selectedDate}
        - Role: ${data.role}
        - Interest: ${data.interestType}
        
        ABOUT THE FUN / INTERESTS:
        "${data.aboutMe || 'No description provided'}"
        
        VERIFICATION:
        - 25+ Age Verified: ${data.ageVerified ? 'YES' : 'NO'}
        - Rules Agreed: ${data.agreedToConduct ? 'YES' : 'NO'}
        
        ---------------------------
        This applicant is waiting for your approval.
      `
    };

    // LOGGING: This makes the submission visible in the server logs
    console.log(`[SUBMISSION DISPATCH] Sending to ${DESTINATION_EMAIL}`, emailPayload);

    /**
     * NOTE: To actually deliver this to Gmail, you should integrate an 
     * email provider like Resend (resend.com) and add your API Key to environment variables.
     */
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Application details logged for host review.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Submission Processing Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
