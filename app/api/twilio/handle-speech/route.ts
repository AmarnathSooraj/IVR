import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { INITIAL_STAFF, INITIAL_STUDENTS } from '@/lib/constants';

export async function POST(req: Request) {
  const formData = await req.formData();
  const transcript = formData.get('SpeechResult') as string;

  if (!transcript) {
    const response = new twilio.twiml.VoiceResponse();
    response.say('I didn\'t catch that. Please try saying the name again.');
    response.gather({
      input: ['speech'],
      action: '/api/twilio/handle-speech',
      language: 'en-US',
      speechTimeout: 'auto',
    });
    return new NextResponse(response.toString(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemInstruction = `
      You are a helpful AI IVR system for a college. 
      Current Students in Database: ${JSON.stringify(INITIAL_STUDENTS)}
      Available Staff members: ${JSON.stringify(INITIAL_STAFF)}
      
      GUIDELINES:
      1. Role: Assist users with student information and staff forwarding.
      2. Student Info: When a user mentions a student's name, search for them in the database and provide their details (GPA, Attendance, Course) immediately.
      3. Assistance: Give precise info about GPA, attendance, or fees from the student list.
      4. Call Forwarding: If user says "agent", "human", or names a specific staff member like "${INITIAL_STAFF[0]?.name}", say "I am forwarding your call to [Name] in the [Department] department. Please hold."
      5. Always be polite and professional.
      6. KEEP RESPONSES CONCISE for voice output.

      If you decide to forward the call, your response MUST contain the exact phrase "FORWARD_TO: [STAFF_NAME]".
    `;

    const result = await model.generateContent([
      systemInstruction,
      `User said: "${transcript}"`
    ]);

    const aiResponse = result.response.text();
    const twiml = new twilio.twiml.VoiceResponse();

    // Check for forwarding instruction
    const forwardRegex = /FORWARD_TO:\s*([^]+)/i;
    const forwardMatch = forwardRegex.exec(aiResponse);
    if (forwardMatch) {
      const staffName = forwardMatch[1].trim();
      const staff = INITIAL_STAFF.find(s => s.name.toLowerCase().includes(staffName.toLowerCase()));

      if (staff?.phoneNumber) {
        twiml.say(aiResponse.replace(/FORWARD_TO:.*$/i, '').trim());
        twiml.dial(staff.phoneNumber);
      } else {
        twiml.say(aiResponse.replace(/FORWARD_TO:.*$/i, '').trim());
        twiml.say(`I tried to forward you to ${staffName}, but I couldn't find their contact information.`);
        twiml.gather({
          input: ['speech'],
          action: '/api/twilio/handle-speech',
          language: 'en-US',
        });
      }
    } else {
      twiml.say(aiResponse);
      twiml.gather({
        input: ['speech'],
        action: '/api/twilio/handle-speech',
        language: 'en-US',
      });
    }

    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Error in handle-speech:', error);
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('there is server problem in this and please try again');
    twiml.pause({ length: 1 });
    twiml.redirect('/api/twilio/voice'); // Send them back to the start instead of hanging up
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
