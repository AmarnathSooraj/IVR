import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const calls = await client.calls.list({ limit: 50 });
    
    // Map Twilio call objects to a simpler format for our UI
    const logs = calls.map(call => ({
      id: call.sid,
      caller: call.from,
      to: call.to,
      status: call.status,
      startTime: call.startTime,
      duration: call.duration ? `${call.duration}s` : 'active',
      direction: call.direction,
      price: call.price ? `${call.price} ${call.priceUnit}` : 'N/A'
    }));

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching Twilio logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
