import { NextResponse } from 'next/server';
import { INITIAL_STUDENTS, INITIAL_STAFF } from '@/lib/constants';

/**
 * Vapi Server Endpoint
 * 
 * This endpoint can be used as the "Server URL" in your Vapi Assistant settings.
 * Whenever Vapi needs to fetch information (via Tools or dynamic prompts),
 * it will call this endpoint.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Vapi request received:', body);

    // Default structure for Vapi tool calls or assistant requests
    const collegeData = {
      name: "Your College Name",
      context: "This is a virtual assistant for the college.",
      students: INITIAL_STUDENTS,
      staff: INITIAL_STAFF
    };

    // If Vapi is calling this as a 'Server URL' for an assistant
    return NextResponse.json({
      role: 'system',
      content: `You are a college assistant. Here are the college details:
      Students: ${JSON.stringify(collegeData.students)}
      Staff: ${JSON.stringify(collegeData.staff)}
      Please use this information to answer caller questions accurately.`
    });

  } catch (error) {
    console.error('Vapi Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
