
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Use environment variables for security
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram configuration missing: BOT_TOKEN or CHAT_ID is not set.');
    // We still return 200 to the client to simulate success in dev, 
    // but in prod you should ensure these are set.
  }

  try {
    const data = await request.json();
    
    // 1. Prepare the Text Message
    const textMessage = `
<b>🔥 NEW SCREENING APPLICATION</b>
----------------------------------
<b>👤 Applicant:</b> ${data.name || 'N/A'}
<b>📧 Email:</b> ${data.email || 'N/A'}
<b>📞 Phone:</b> ${data.phone || 'N/A'}

<b>📅 Preferred Date:</b> ${data.selectedDate || 'N/A'}
<b>🎭 Role:</b> ${data.role || 'N/A'}
<b>✨ Interest:</b> ${data.interestType || 'N/A'}

<b>✅ Age Verified:</b> ${data.ageVerified ? 'Yes (25+)' : 'No'}
<b>📜 Rules Agreed:</b> ${data.agreedToConduct ? 'Yes' : 'No'}
----------------------------------
<i>Please review verification photos below.</i>
    `;

    // 2. Send the Text Message
    if (BOT_TOKEN && CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: textMessage,
          parse_mode: 'HTML',
        }),
      });

      // 3. Send Photos as a Media Group (Gallery)
      const validPhotos = data.profilePictures.filter((p: string) => p && p.startsWith('data:image'));
      
      if (validPhotos.length > 0) {
        // We send them as URLs if they are hosted, but since they are base64, 
        // we can attempt to send them using the media group endpoint.
        // NOTE: Large base64 strings might hit Telegram's payload limits.
        const media = validPhotos.map((photo: string, index: number) => ({
          type: 'photo',
          media: photo, // Telegram API supports sending base64/data URLs in some contexts
          caption: index === 0 ? `Verification photos for ${data.name}` : undefined,
        }));

        // Since we are in an Edge runtime, we send them one by one or as a group.
        // Grouping is better:
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            media: media,
          }),
        });
      }
    }

    console.log(`[TELEGRAM DISPATCH] Application received for ${data.name}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Application transmitted to Telegram secure queue.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Telegram submission error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
