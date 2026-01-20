import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import RootLayoutClient from "./layout-client";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veda CEV: Smart IVR for Colleges",
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
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900`}>
        <AppProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}
