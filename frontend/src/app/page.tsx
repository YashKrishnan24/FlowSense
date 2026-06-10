"use client";

import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { CheckCircle2, FileSearch, Sparkles, Upload } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });

// Animation helper variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  return (
    <div className={`flex flex-col min-h-screen bg-[#F8F9FA] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(232,140,86,0.12),rgba(248,249,250,0))] text-[#1E252B] selection:bg-[#F2A97E] selection:text-white ${mono.className}`}>
      
      {/* Background Grid Pattern for UI/UX feel */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navbar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex items-center justify-between py-5 px-8 md:px-16 bg-white/60 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="flex items-center space-x-3 group cursor-pointer w-48">
          <img src="https://i.pinimg.com/736x/06/fc/42/06fc420ed3b8827cfa5db4dbca00af9f.jpg" alt="FlowSense Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
          <span className="font-bold text-xl tracking-tight text-[#1E252B]">FlowSense</span>
        </div>
        
        {/* Centered Interactive Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10 text-sm font-bold text-[#5E6D76]">
          <Link href="#features" className="hover:text-[#E88C56] transition-colors hover:scale-105 transform inline-block">Features</Link>
          <Link href="#how-it-works" className="hover:text-[#E88C56] transition-colors hover:scale-105 transform inline-block">How it Works</Link>
          <Link href="#pricing" className="hover:text-[#E88C56] transition-colors hover:scale-105 transform inline-block">Pricing</Link>
        </nav>

        <div className="flex items-center justify-end w-auto md:w-48 space-x-4">
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
            <button className="text-sm font-bold text-[#1E252B] hover:text-[#E88C56] transition-colors">Log In</button>
          </SignInButton>
          <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
            <button className="bg-[#1E252B] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#E88C56] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </motion.header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-8 max-w-7xl mx-auto text-center space-y-6">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >

            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1E252B] leading-[1.15] mb-6 drop-shadow-sm"
            >
              Upload a design. <br/> Get instant feedback.
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg text-[#5E6D76] max-w-2xl mx-auto leading-relaxed"
            >
              FlowSense is your personal AI design mentor. It looks at your screenshot and tells you exactly what to fix to make your interface look professional—no confusing jargon.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center pt-8 pb-12">
              <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="flex items-center space-x-2 bg-gradient-to-b from-[#EF9D6B] to-[#E37637] text-white font-bold px-8 py-4 rounded-full shadow-[0_4px_20px_0_rgba(227,118,55,0.4)] hover:shadow-[0_6px_25px_rgba(227,118,55,0.5)] hover:scale-105 transition-all duration-300">
                  <SparklesIcon className="w-5 h-5 text-yellow-100" />
                  <span>Start Learning for Free</span>
                </button>
              </SignUpButton>
            </motion.div>
          </motion.div>
          
          {/* Main Hero Image Container with Floating Overlays */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-gray-200/50 bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero.png" alt="Beginner UX Designer working" className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105" />
            
            {/* Floating Badge 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-[20%] left-[10%] bg-white/90 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl flex items-center space-x-3"
            >
              <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Design Score</p>
                <p className="text-xl font-extrabold text-[#1E252B]">Great!</p>
              </div>
            </motion.div>

            {/* Floating Badge 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-[40%] right-[8%] bg-white/90 backdrop-blur-xl border border-white/50 p-5 rounded-2xl shadow-xl w-56"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold text-[#1E252B]">Things to fix <span className="ml-1 text-gray-400">↗</span></p>
              </div>
              <div className="space-y-2">
                <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs px-3 py-2 rounded-lg font-bold">1. Make text darker</div>
                <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs px-3 py-2 rounded-lg font-bold">2. Buttons need more space</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Side-by-side Section */}
        <section id="features" className="py-24 px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-gray-200/50 bg-white">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard.png" alt="Dashboard Analysis" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-xl shadow-lg border border-white/50">
                  <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wide">AI Suggestion</p>
                  <p className="text-[#E88C56] font-extrabold text-sm bg-orange-50 px-2 py-1 rounded inline-block">Very easy to read!</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h2 className="text-4xl font-extrabold text-[#1E252B] leading-snug">
                Simple, actionable <br/> design advice.
              </h2>
              <p className="text-[#5E6D76] text-lg leading-relaxed">
                You don't need to read a 500-page book on design theory. We highlight exactly what isn't working on your screen, and show you the easiest way to fix it.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#E88C56] shrink-0" />
                  <span className="text-[#1E252B] font-bold">Spot spacing and alignment errors instantly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#E88C56] shrink-0" />
                  <span className="text-[#1E252B] font-bold">Check if your colors are readable by everyone</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#E88C56] shrink-0" />
                  <span className="text-[#1E252B] font-bold">Learn design best-practices by actually doing them</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </section>

        {/* How It Works Grid */}
        <section id="how-it-works" className="py-24 relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm border-y border-gray-200/50 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl font-extrabold text-[#1E252B] mb-4">How it works</h2>
              <p className="text-[#5E6D76] max-w-2xl mx-auto text-lg">Three incredibly simple steps to a better design.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Step 1 */}
              <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-sm text-center hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-100 text-[#1E252B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[#1E252B]">1. Take a screenshot</h3>
                <p className="text-[#5E6D76] text-sm leading-relaxed">Working on a website or app? Just snap a screenshot of what you have so far and upload it.</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-sm text-center hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 mx-auto bg-orange-50 border border-orange-100 text-[#E88C56] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[#1E252B]">2. Let AI analyze it</h3>
                <p className="text-[#5E6D76] text-sm leading-relaxed">Our friendly AI scans your image looking for common beginner mistakes in layout and color.</p>
              </motion.div>

              {/* Step 3 */}
              <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-sm text-center hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 mx-auto bg-green-50 border border-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileSearch className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[#1E252B]">3. See what to fix</h3>
                <p className="text-[#5E6D76] text-sm leading-relaxed">You get a simple list of easy-to-understand suggestions to make your design pop.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-[#1E252B] mb-4">Start learning for free</h2>
            <p className="text-[#5E6D76] text-lg">No credit card required. Upgrade only when you want more features.</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-white shadow-lg text-center"
            >
              <h3 className="text-2xl font-extrabold text-[#1E252B] mb-2">Free Plan</h3>
              <p className="text-[#5E6D76] mb-6">Great for beginners learning design.</p>
              <div className="text-5xl font-extrabold text-[#1E252B] mb-8">₹0</div>
              <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="w-full bg-[#1E252B] text-white font-bold py-4 rounded-xl hover:bg-[#E88C56] hover:shadow-lg transition-all mb-8">Get Started</button>
              </SignUpButton>
              <ul className="space-y-4 text-left text-[#1E252B]">
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> 5 Free Audits per month</li>
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Basic layout feedback</li>
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Simple color checking</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#1E252B] text-white rounded-3xl p-10 border border-[#1E252B] shadow-2xl text-center relative transform md:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E88C56] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>
              <h3 className="text-2xl font-extrabold mb-2">Pro Plan</h3>
              <p className="text-gray-400 mb-6">For freelancers and fast learners.</p>
              <div className="text-5xl font-extrabold mb-8">₹180<span className="text-xl text-gray-400 font-medium">/mo</span></div>
              <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="w-full bg-gradient-to-r from-[#EF9D6B] to-[#E37637] text-white font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(227,118,55,0.5)] hover:scale-105 transition-all mb-8">Upgrade to Pro</button>
              </SignUpButton>
              <ul className="space-y-4 text-left">
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-[#E88C56] mr-3" /> Unlimited Audits</li>
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-[#E88C56] mr-3" /> Advanced accessibility checks</li>
                <li className="flex items-center text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-[#E88C56] mr-3" /> Download PDF Reports</li>
              </ul>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/60 backdrop-blur-xl border-t border-gray-200/50 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#5E6D76]">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="https://i.pinimg.com/736x/06/fc/42/06fc420ed3b8827cfa5db4dbca00af9f.jpg" alt="FlowSense Logo" className="w-6 h-6 rounded-full object-cover shadow-sm border border-gray-200" />
            <span className="font-bold text-[#1E252B] text-base">FlowSense</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex space-x-8 font-bold">
            <a href="https://i.pinimg.com/736x/23/b7/9c/23b79cc100b9dab4cf04a6d2419b2110.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-[#E88C56] hover:scale-105 transform transition-all inline-block">Privacy Policy</a>
            <a href="https://i.pinimg.com/736x/23/b7/9c/23b79cc100b9dab4cf04a6d2419b2110.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-[#E88C56] hover:scale-105 transform transition-all inline-block">Terms</a>
            <a href="mailto:hello@flowsense.com" className="hover:text-[#E88C56] hover:scale-105 transform transition-all inline-block">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple icon wrapper
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
