import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function TermsPage() {
  return (
    <div className={`min-h-screen bg-[#FDFDFB] text-[#2A3439] p-8 md:p-16 ${mono.className}`}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#E88C56] hover:underline mb-8 inline-block transition-all hover:-translate-x-1">&larr; Back to Home</Link>
        <h1 className="text-4xl font-extrabold mb-8">Terms of Service</h1>
        <div className="space-y-6 text-[#5E6D76] leading-relaxed">
          <p><strong>Last Updated:</strong> January 1, 2026</p>
          <p>Welcome to FlowSense. By using our website and AI analysis tools, you agree to comply with and be bound by the following terms and conditions.</p>
          
          <h2 className="text-2xl font-bold text-[#2A3439] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using FlowSense, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Service.</p>
          
          <h2 className="text-2xl font-bold text-[#2A3439] mt-8 mb-4">2. User Uploads</h2>
          <p>You retain all rights to the images and designs you upload. You are responsible for ensuring you have the legal right to upload and analyze any content submitted to FlowSense.</p>
          
          <p className="mt-12 text-sm italic">This is a placeholder terms of service for the MVP.</p>
        </div>
      </div>
    </div>
  );
}
