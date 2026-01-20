// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { INITIAL_STUDENTS, INITIAL_STAFF } from '@/lib/constants';

// 1. You MUST name this function POST
export async function POST(request: Request) {
  try {
    // 2. This is how you read the data Vapi sends
    const body = await request.json(); 

    // Handle Assistant Data Request from Vapi
    if (body.message?.type === 'assistant-request') {
      return NextResponse.json({
        assistant: {
          model: {
            messages: [
              {
                role: 'system',
                content: `You are a college assistant. Databases:
                Students: ${JSON.stringify(INITIAL_STUDENTS)}
                Staff: ${JSON.stringify(INITIAL_STAFF)}`
              }
            ]
          }
        }
      });
    }

    // Identify end of call
    if (body.message?.type === 'end-of-call-report') {
       console.log("Call Summary:", body.message.summary);
    }

    // 4. You MUST return a Response so Vapi knows it succeeded
    return NextResponse.json({ message: "Data received" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}