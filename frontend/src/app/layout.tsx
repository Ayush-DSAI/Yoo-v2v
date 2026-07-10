import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AEGIS - Predict. Protect. Prevent.",
  description: "AI-powered global safety and protective intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070A13] text-[#F3F4F6] font-body selection:bg-[#4FACFE]/30 selection:text-white">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
