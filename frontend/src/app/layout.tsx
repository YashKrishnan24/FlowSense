import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowSense | AI-Powered UX Intelligence",
  description: "Analyze. Understand. Improve. AI-powered UX intelligence for modern digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans")}>
        <body className={`${inter.className} bg-background text-foreground`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
