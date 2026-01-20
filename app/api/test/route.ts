import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    sid: process.env.TWILIO_ACCOUNT_SID ? "Loaded" : "Missing",
    token: process.env.TWILIO_AUTH_TOKEN ? "Loaded" : "Missing",
    number: process.env.TWILIO_PHONE_NUMBER ? "Loaded" : "Missing",
  });
}
