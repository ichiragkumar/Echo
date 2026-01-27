"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Enhanced Waveform component with smooth, animated signal graph
const Waveform = () => {
  const generatePoints = () => {
    return Array.from({ length: 120 }, (_, i) => {
      const x = (i / 119) * 100;
      const baseY = 50;
      const time = Date.now() * 0.001;
      const wave1 = Math.sin((i * 0.15 + time) * 0.1) * 28;
      const wave2 = Math.sin((i * 0.35 + time * 1.2) * 0.12) * 18;
      const wave3 = Math.sin((i * 0.55 + time * 0.8) * 0.18) * 10;
      const y = baseY + wave1 + wave2 + wave3;
      return `${x},${y}`;
    }).join(" ");
  };

  const [points, setPoints] = React.useState(generatePoints());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPoints(generatePoints());
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black/40 border border-white/10">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="url(#waveFill)"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Subtle grid overlay on waveform */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:10px_10px] opacity-25" />
    </div>
  );
};

export default function LandingPageClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ultra-subtle background - clean matte black with faint blueprint style */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <motion.div
            className="text-2xl font-bold tracking-tight"
            animate={{
              textShadow: [
                "0 0 12px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.2)",
                "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
                "0 0 12px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.2)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-[#3b82f6]">EEcho</span>
          </motion.div>
          <a
            href="#features"
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:border-[#3b82f6]/50 hover:bg-white/10 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
          >
            Explore the stack
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <motion.main
        id="join"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center gap-16 px-6 pb-20 pt-20 lg:pt-28"
      >
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8 text-left">
            <motion.div
              variants={itemVariants}
              className="inline-block border border-white/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm bg-white/5"
            >
              REAL-TIME AFFECTIVE INTELLIGENCE
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-6xl font-bold leading-[1.1] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
            >
              The Future of
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/75 sm:text-2xl max-w-2xl leading-relaxed"
            >
              Echo decodes paralinguistic cues in real time—rendering emotional subtitles, proactive coaching, and agentic guardrails that keep every conversation humane.
            </motion.p>
            <motion.form
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-stretch"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-6 py-4 text-base text-white placeholder-white/50 outline-none transition-all focus:border-[#3b82f6] focus:bg-white/15 focus:ring-4 focus:ring-[#3b82f6]/20 shadow-lg"
                required
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-xl border-2 border-[#3b82f6] bg-[#3b82f6] backdrop-blur-md px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#2563eb] hover:border-[#2563eb] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Join the future
              </button>
            </motion.form>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-white/90 backdrop-blur-sm">Latency &lt; 200ms</span>
              <span className="rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-white/90 backdrop-blur-sm">On-device privacy first</span>
              <span className="rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-white/90 backdrop-blur-sm">Multimodal overlays</span>
            </motion.div>
          </div>

          {/* High-fidelity Glassmorphism Dashboard Widget - Analytic HUD */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-2xl p-8 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.2) inset",
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#3b82f6]/20 rounded-full blur-3xl" />
            
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90">Live signal graph</span>
              <span className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6] animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <span className="text-sm font-medium text-[#3b82f6]">Online</span>
              </span>
            </div>
            
            {/* Prominent smooth waveform */}
            <div className="mb-8">
              <Waveform />
            </div>

            {/* Cohesive Analytic HUD - Better information density */}
            <div className="space-y-5">
              {/* Emotion Blend & Frame - Combined */}
              <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1.5">EMOTION BLEND</p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-lg bg-[#3b82f6]/25 text-[#60a5fa] border border-[#3b82f6]/40 text-sm font-semibold shadow-[0_0_12px_rgba(59,130,246,0.3)]">Calm</span>
                      <span className="text-xs text-white/50">FRAME 128</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tone & Intervention - Side by side with better spacing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">TONE</p>
                  <p className="text-xl font-bold text-white mb-2">Supportive</p>
                  <p className="text-sm font-semibold text-[#fbbf24] flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    Confidence 92%
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">INTERVENTION</p>
                  <p className="text-xl font-bold text-white mb-2">Stand down</p>
                  <p className="text-sm text-white/60">No risk detected</p>
                </div>
              </div>

              {/* Live Subtitle - Enhanced */}
              <div className="rounded-2xl border border-[#3b82f6]/30 bg-gradient-to-r from-[#3b82f6]/15 via-[#3b82f6]/10 to-transparent backdrop-blur-md p-5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">LIVE SUBTITLE</p>
                <p className="text-lg text-white leading-relaxed font-medium">"I'm here to help—take a breath and we can sort this together."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Features Section - Enhanced Bento Grid */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">CAPABILITY STACK</p>
          <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight mb-4">A New Sensory Layer for Digital Life</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">Built for humans first—visceral overlays, contextual guardrails, and analytics you can actually trust.</p>
        </motion.div>

        {/* Dynamic Bento Grid with varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Emotional Overlays",
              copy: "Dynamic subtitles shift color and texture to show tone, sarcasm, and intent in real-time.",
              span: "md:col-span-1 lg:col-span-1",
              size: "normal",
            },
            {
              title: "Contextual Hover",
              copy: "Tone-check any text before you respond—social, email, or docs—in one hover.",
              span: "md:col-span-1 lg:col-span-1",
              size: "normal",
            },
            {
              title: "Agentic Intervention",
              copy: "Proactive de-escalation triggers and safety nudges when conversations turn sharp.",
              span: "md:col-span-2 lg:col-span-2",
              size: "wide",
            },
            {
              title: "Usage Analytics",
              copy: "Explainable dashboards that track signals, interventions, and trust scores.",
              span: "md:col-span-2 lg:col-span-2",
              size: "wide",
            },
            {
              title: "100+ Languages",
              copy: "Reads nuance across dialects and regional slang without losing sentiment fidelity.",
              span: "md:col-span-1 lg:col-span-1",
              size: "normal",
            },
            {
              title: "Private by Design",
              copy: "On-device inference paths keep sensitive cues off the cloud by default.",
              span: "md:col-span-1 lg:col-span-1",
              size: "normal",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-[#3b82f6]/40 hover:shadow-[0_12px_40px_rgba(59,130,246,0.25)] ${feature.span} ${feature.size === "wide" ? "lg:row-span-1" : ""}`}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#3b82f6]/0 group-hover:border-[#3b82f6]/30 transition-all duration-500 pointer-events-none" />
              
              {/* Subtle glow on hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3b82f6]/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="mb-4 text-3xl font-bold text-[#3b82f6]/30 group-hover:text-[#3b82f6]/50 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#60a5fa] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {feature.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <span>Echo • Emotional clarity layer</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/50">N</div>
            <p className="text-xs text-white/40">6 Echo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
