import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const digits = formData.get('Digits');

    const twiml = new twilio.twiml.VoiceResponse();

    if (digits === '1') {
      // Student Details path
      const gather = twiml.gather({
        input: ['speech'],
        action: '/api/twilio/handle-speech',
        language: 'en-US',
        speechTimeout: 'auto',
      });
      gather.say('Please say the name of the student you want to inquire about.');
      
      // Fallback if no speech detected
      twiml.say('I did not hear the name. Please try again.');
      twiml.redirect('/api/twilio/voice');
    } else if (digits === '2') {
      const assistantId = process.env.VAPI_ASSISTANT_ID;
      
      if (!assistantId) {
        twiml.say('I\'m sorry, the college assistant is not configured correctly.');
        twiml.redirect('/api/twilio/voice');
      } else {
        twiml.say('Connecting you now.');
        // Vapi expects a POST request with the call details
        twiml.redirect({ method: 'POST' }, `https://api.vapi.ai/webhook/twilio?assistantId=${assistantId}`);
      }
    } else if (digits === '3') {
      twiml.say('Connecting you to the staff contact number.');
      // Ensure the number is dialable. NOTE: In trial accounts, this must be a verified number.
      twiml.dial('+918156831156');
    } else {
      twiml.say('Returning to main menu.');
      twiml.redirect('/api/twilio/voice');
    }

    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Menu Error:', error);
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('there is server problem in this and please try again');
    twiml.redirect('/api/twilio/voice');
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
