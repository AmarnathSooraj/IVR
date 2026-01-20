import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST() {
  const twiml = new twilio.twiml.VoiceResponse();
  
  let greeting = "Thank you for calling. Press 1 for student details, Press 2 for general information, or press 3 to contact the staff.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Create a professional 1-sentence greeting for a college. It MUST include: Press 1 for student records, Press 2 for college details, and Press 3 to contact the staff.");
    const response = await result.response;
    greeting = response.text().trim();
  } catch (error) {
    console.error('Gemini Greeting Error:', error);
  }

  const gather = twiml.gather({
    input: ['dtmf'],
    numDigits: 1,
    action: '/api/twilio/handle-menu',
    timeout: 5,
  });
  
  gather.say(greeting);

  // Fallback if no input
  twiml.say("I didn't receive any selection. Please try calling back later.");
  twiml.hangup();

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
