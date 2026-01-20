<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `API_KEY` in [.env.local](.env.local) to your Gemini API key (also set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`)
3. Run the app:
   `npm run dev`

## Twilio Integration

To connect your Twilio phone number to this IVR:

1. **Expose your local server:** Use a tool like `ngrok` to expose your local Next.js server (e.g., `ngrok http 3000`).
2. **Configure Twilio Webhook:**
   - Go to your Twilio Console -> Phone Numbers -> Active Numbers.
   - Select your number.
   - Under "Voice & Fax", set "A CALL COMES IN" to `Webhook`.
   - Set the URL to `https://your-ngrok-url.ngrok-free.app/api/twilio/voice`.
   - Set the method to `HTTP POST`.
3. **Save configuration:** Now, when you call your Twilio number, it will be handled by the Gemini-powered IVR.
