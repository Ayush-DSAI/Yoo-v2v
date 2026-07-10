import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "AEGIS - Predict. Protect. Prevent.",
  description: "AI-powered personal safety platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
