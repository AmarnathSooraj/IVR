import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import RootLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "EduCall AI: Smart IVR for Colleges",
  description: "An AI-powered Interactive Voice Response (IVR) SaaS for college staff to manage student queries, automate responses using Gemini Live, and streamline call forwarding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <AppProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}
