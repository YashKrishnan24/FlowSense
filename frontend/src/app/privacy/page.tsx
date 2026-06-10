import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function PrivacyPage() {
  return (
    <div className={`min-h-screen bg-[#FDFDFB] text-[#2A3439] p-8 md:p-16 ${mono.className}`}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#E88C56] hover:underline mb-8 inline-block transition-all hover:-translate-x-1">&larr; Back to Home</Link>
        <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-[#5E6D76] leading-relaxed">
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>At FlowSense, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our AI design auditing tools.</p>
          
          <h2 className="text-2xl font-bold text-[#2A3439] mt-8 mb-4">1. Information We Collect</h2>
          <p>We only collect the screenshots you explicitly upload for analysis, along with basic account information required to provide our service (email, name).</p>
          
          <h2 className="text-2xl font-bold text-[#2A3439] mt-8 mb-4">2. How We Use Your Data</h2>
          <p>Your uploaded images are processed by our AI models solely to generate your UX audit reports. We do not use your private designs to train public AI models.</p>
          
          <p className="mt-12 text-sm italic">This is a placeholder privacy policy for the MVP.</p>
        </div>
      </div>
    </div>
  );
}
