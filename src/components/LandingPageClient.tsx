"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

// Real-time emotion and tone states
type EmotionState = "Calm" | "Supportive" | "Concerned" | "Focused" | "Sarcastic" | "Urgent";
type ToneState = "Supportive" | "Neutral" | "Defensive" | "Empathetic" | "Professional";
type InterventionState = "Stand down" | "De-escalate" | "Cultural alert" | "Emergency" | "No risk detected";

interface LiveData {
  frame: number;
  emotion: EmotionState;
  tone: ToneState;
  confidence: number;
  intervention: InterventionState;
  subtitle: string;
  latency: number;
  environmentalSound: string | null;
  agenticTrigger: string | null;
}

// Real-time subtitle examples
const subtitleExamples = [
  { text: "I'm here to help—take a breath and we can sort this together.", emotion: "Supportive" as EmotionState, tone: "empathetic" },
  { text: "That's... interesting. Let me think about that.", emotion: "Sarcastic" as EmotionState, tone: "skeptical" },
  { text: "We need to address this immediately. Time is critical.", emotion: "Urgent" as EmotionState, tone: "professional" },
  { text: "I understand your concern. Let's explore alternatives.", emotion: "Supportive" as EmotionState, tone: "collaborative" },
  { text: "Actually, that approach won't work here.", emotion: "Sarcastic" as EmotionState, tone: "dismissive" },
  { text: "Thank you for your patience. I appreciate it.", emotion: "Supportive" as EmotionState, tone: "grateful" },
  { text: "Let me focus on this problem and find a solution.", emotion: "Focused" as EmotionState, tone: "professional" },
  { text: "I'm concerned about the timeline here.", emotion: "Concerned" as EmotionState, tone: "professional" },
];

// Smooth SVG Waveform Component
const LiveWaveform = () => {
  const [points, setPoints] = useState<string>("");
  const [audioLevel, setAudioLevel] = useState(0.5);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const generateWaveform = () => {
      const newPoints = Array.from({ length: 200 }, (_, i) => {
        const x = (i / 199) * 100;
        const baseY = 50;
        const time = Date.now() * 0.001;
        const variation = Math.random() * 0.2;
        const wave1 = Math.sin((i * 0.1 + time) * 0.2) * (25 + variation * 8) * audioLevel;
        const wave2 = Math.sin((i * 0.3 + time * 1.2) * 0.15) * (15 + variation * 6) * audioLevel;
        const wave3 = Math.sin((i * 0.5 + time * 0.8) * 0.25) * (8 + variation * 4) * audioLevel;
        const y = baseY + wave1 + wave2 + wave3;
        return `${x},${y}`;
      }).join(" ");
      setPoints(newPoints);
    };

    const interval = setInterval(() => {
      setAudioLevel(0.45 + Math.random() * 0.35);
      generateWaveform();
    }, 50);

    generateWaveform();
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black/30 border border-white/5">
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="url(#waveFill)"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "blur(0.5px)" }}
        />
      </svg>
    </div>
  );
};

// Premium Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,6,10,0.8)] backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1280px] px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded">
            <motion.span
              className="text-2xl font-bold tracking-tight"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      textShadow: [
                        "0 0 12px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.2)",
                        "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
                        "0 0 12px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.2)",
                      ],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-[#3B82F6]">Echo</span>
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
            >
              Product
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
            >
              Security
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
            >
              Pricing
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-white/60 hover:text-white/80 transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
            >
              Explore the stack
            </Link>
            <Link
              href="#join"
              className="rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2"
            >
              Join the Future
            </Link>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

// Premium HUD Widget
const AnalyticHUD = () => {
  const [liveData, setLiveData] = useState<LiveData>({
    frame: 128,
    emotion: "Calm",
    tone: "Supportive",
    confidence: 92,
    intervention: "Stand down",
    subtitle: subtitleExamples[0].text,
    latency: 187,
    environmentalSound: null,
    agenticTrigger: null,
  });

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [frameCounter, setFrameCounter] = useState(128);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrameCounter((prev) => prev + 1);
    }, 100);

    const stateInterval = setInterval(() => {
      const nextIndex = (currentSubtitleIndex + 1) % subtitleExamples.length;
      setCurrentSubtitleIndex(nextIndex);
      const example = subtitleExamples[nextIndex];

      let emotion: EmotionState = "Calm";
      let tone: ToneState = "Supportive";
      let confidence = 85 + Math.floor(Math.random() * 10);
      let intervention: InterventionState = "Stand down";

      if (example.emotion === "Sarcastic") {
        emotion = "Sarcastic";
        tone = "Defensive";
        confidence = 78 + Math.floor(Math.random() * 8);
        intervention = "De-escalate";
      } else if (example.emotion === "Urgent") {
        emotion = "Urgent";
        tone = "Professional";
        confidence = 88 + Math.floor(Math.random() * 7);
        intervention = "Stand down";
      } else if (example.emotion === "Supportive") {
        emotion = "Supportive";
        tone = "Empathetic";
        confidence = 90 + Math.floor(Math.random() * 8);
        intervention = "Stand down";
      } else if (example.emotion === "Focused") {
        emotion = "Focused";
        tone = "Professional";
        confidence = 91 + Math.floor(Math.random() * 7);
        intervention = "Stand down";
      } else if (example.emotion === "Concerned") {
        emotion = "Concerned";
        tone = "Professional";
        confidence = 82 + Math.floor(Math.random() * 8);
        intervention = "Stand down";
      }

      setLiveData((prev) => ({
        ...prev,
        frame: frameCounter,
        emotion,
        tone,
        confidence,
        intervention,
        subtitle: example.text,
        latency: 150 + Math.floor(Math.random() * 50),
      }));
    }, shouldReduceMotion ? 10000 : 4000);

    const triggerInterval = setInterval(() => {
      if (Math.random() > 0.6 && !shouldReduceMotion) {
        setLiveData((prev) => ({
          ...prev,
          agenticTrigger: "Sarcasm detected",
          environmentalSound: "Emotional subtitle overlay activated",
        }));

        setTimeout(() => {
          setLiveData((prev) => ({
            ...prev,
            agenticTrigger: null,
            environmentalSound: null,
          }));
        }, 3000);
      }
    }, 6000);

    return () => {
      clearInterval(frameInterval);
      clearInterval(stateInterval);
      clearInterval(triggerInterval);
    };
  }, [currentSubtitleIndex, frameCounter, shouldReduceMotion]);

  const getEmotionGlow = (emotion: EmotionState) => {
    switch (emotion) {
      case "Calm":
        return "shadow-[0_0_20px_rgba(96,165,250,0.3)]";
      case "Supportive":
        return "shadow-[0_0_20px_rgba(251,191,36,0.3)]";
      case "Concerned":
        return "shadow-[0_0_20px_rgba(245,158,11,0.3)]";
      case "Focused":
        return "shadow-[0_0_20px_rgba(52,211,153,0.3)]";
      case "Sarcastic":
        return "shadow-[0_0_20px_rgba(168,85,247,0.3)]";
      case "Urgent":
        return "shadow-[0_0_20px_rgba(248,113,113,0.3)]";
      default:
        return "shadow-[0_0_20px_rgba(96,165,250,0.3)]";
    }
  };

  const getEmotionColor = (emotion: EmotionState) => {
    switch (emotion) {
      case "Calm":
        return "text-[#60A5FA]";
      case "Supportive":
        return "text-[#FBBF24]";
      case "Concerned":
        return "text-[#F59E0B]";
      case "Focused":
        return "text-[#34D399]";
      case "Sarcastic":
        return "text-[#C084FC]";
      case "Urgent":
        return "text-[#F87171]";
      default:
        return "text-[#60A5FA]";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl backdrop-blur-2xl p-6 lg:p-8"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
      }}
    >
      {/* Header with latency */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Live Signal Graph</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/50">{liveData.latency}ms</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-medium text-[#3B82F6]">Online</span>
          </div>
        </div>
      </div>

      {/* Waveform Panel */}
      <div className="mb-6">
        <LiveWaveform />
      </div>

      {/* Demo Toast (inline, not floating) */}
      <AnimatePresence>
        {liveData.agenticTrigger && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-5 rounded-xl backdrop-blur-md relative"
            style={{
              background: "rgba(168,85,247,0.1)",
              border: "1px solid rgba(168,85,247,0.2)",
              padding: "1rem",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Demo Event
              </span>
            </div>
            <p className="text-xs text-purple-200">{liveData.agenticTrigger}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2x2 Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Emotion Blend */}
        <div className="rounded-xl backdrop-blur-md" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem" }}>
          <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Emotion</p>
          <motion.div
                key={liveData.emotion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`inline-block px-4 py-2 rounded-lg ${getEmotionColor(liveData.emotion)} ${getEmotionGlow(liveData.emotion)} font-semibold text-sm`}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
              >
                {liveData.emotion}
          </motion.div>
          <p className="text-xs text-white/40 font-mono mt-3">FRAME {liveData.frame}</p>
      </div>

        {/* Tone */}
        <div className="rounded-xl backdrop-blur-md" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem" }}>
          <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Tone</p>
          <motion.p
            key={liveData.tone}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-white mb-2"
          >
            {liveData.tone}
          </motion.p>
          <p className="text-xs font-semibold text-[#FBBF24] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            {liveData.confidence}% confidence
          </p>
        </div>

        {/* Intervention */}
        <div className="rounded-xl backdrop-blur-md" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem" }}>
          <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Intervention</p>
          <motion.p
            key={liveData.intervention}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-white mb-2"
          >
            {liveData.intervention}
          </motion.p>
          <p className="text-xs text-white/50">
            {liveData.intervention === "Stand down" ? "No risk detected" : "Action recommended"}
          </p>
        </div>

        {/* Confidence */}
        <div className="rounded-xl backdrop-blur-md" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem" }}>
          <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Status</p>
          <p className="text-lg font-bold text-white mb-2">Active</p>
          <p className="text-xs text-white/50">Real-time processing</p>
        </div>
      </div>

      {/* Live Subtitle Row */}
      <motion.div
        key={currentSubtitleIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl backdrop-blur-md"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 20px ${liveData.emotion === "Calm" ? "rgba(96,165,250,0.15)" : liveData.emotion === "Supportive" ? "rgba(251,191,36,0.15)" : "rgba(248,113,113,0.15)"}`,
          padding: "1.25rem",
        }}
      >
        <p className="text-xs uppercase tracking-wider text-white/60 mb-3">Live Subtitle</p>
        <p className="text-base leading-relaxed font-medium text-white">
          "{liveData.subtitle}"
        </p>
      </motion.div>
    </div>
  );
};

// Email CTA Form Component
const EmailCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <div className="flex-1 relative w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full rounded-xl backdrop-blur-md px-6 py-4 text-base text-white placeholder-white/40 outline-none transition-all focus:ring-4 focus:ring-[#3B82F6]/20 focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "1rem 1.5rem",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(59,130,246,0.6)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.15)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />
          {status === "error" && (
            <p className="absolute -bottom-6 left-0 text-xs text-red-400 mt-2 px-1">{errorMessage}</p>
          )}
          {status === "success" && (
            <p className="absolute -bottom-6 left-0 text-xs text-green-400 mt-2 px-1">Success! Check your email.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="whitespace-nowrap rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            boxShadow: "0 4px 14px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            padding: "1rem 2rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
          }}
        >
          {status === "loading" ? "Joining..." : status === "success" ? "Joined!" : "Join the Future"}
        </button>
      </div>
      <p className="text-xs text-white/50 text-center mt-3">No spam. Early access only.</p>
    </form>
  );
};

// Trust Pills Component
const TrustPills = () => {
  const pills = [
    { text: "<200ms latency", icon: "⚡" },
    { text: "On-device first", icon: "🔒" },
    { text: "Private by design", icon: "🛡️" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {pills.map((pill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="flex items-center gap-2 rounded-full backdrop-blur-sm text-sm text-white/80"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "0.75rem 1.25rem",
          }}
        >
          <span>{pill.icon}</span>
          <span>{pill.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Bento Grid Feature Cards
const CapabilityStack = () => {
  const features = [
    {
      title: "Emotional Overlays",
      description: "Dynamic subtitles shift color and texture to show tone, sarcasm, and intent in real-time using Gemini 3 multimodal analysis.",
      icon: "🎭",
      highlight: false,
    },
    {
      title: "Contextual Hover",
      description: "Tone-check any text before you respond—social, email, or docs—in one hover with sub-200ms latency.",
      icon: "✨",
      highlight: false,
    },
    {
      title: "Agentic Intervention",
      description: "Proactive de-escalation triggers and safety nudges when conversations turn sharp. Autonomous actions for emergency scenarios.",
      icon: "🛡️",
      highlight: true,
    },
    {
      title: "Usage Analytics",
      description: "Explainable dashboards that track signals, interventions, and trust scores with full audit trails for compliance.",
      icon: "📊",
      highlight: false,
    },
    {
      title: "100+ Languages",
      description: "Reads nuance across dialects and regional slang without losing sentiment fidelity via native multimodality.",
      icon: "🌍",
      highlight: false,
    },
    {
      title: "Private by Design",
      description: "On-device inference paths keep sensitive cues off the cloud by default. Edge processing for zero-trust architecture.",
      icon: "🔐",
      highlight: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          // Make Agentic Intervention span 2 columns on large screens
          const isLarge = index === 2; // Agentic Intervention
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 w-full ${
                isLarge ? "md:col-span-2 lg:col-span-2" : ""
              }`}
              style={{
                border: feature.highlight 
                  ? "1px solid rgba(59,130,246,0.2)" 
                  : "1px solid rgba(255,255,255,0.05)",
                boxShadow: feature.highlight 
                  ? "0 8px 32px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                padding: "clamp(1.5rem, 4vw, 2rem)",
              }}
            >
            <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
              feature.highlight
                ? "border-2 border-[#3B82F6]/0 group-hover:border-[#3B82F6]/40"
                : "border-2 border-[#3B82F6]/0 group-hover:border-[#3B82F6]/30"
            }`} />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-[#60A5FA] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm lg:text-base text-white/70 leading-relaxed flex-grow">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
};

// Book a Call CTA Component
const BookCallCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24"
    >
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">Ready to Transform Communication?</h2>
        <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto px-4">
          Book a call with our team to see Echo in action and discuss how it can enhance your platform.
        </p>
        <a
          href="https://cal.com/zkichirag"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            boxShadow: "0 4px 14px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book a Call
        </a>
      </div>
    </motion.section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Security", href: "/privacy" },
    ],
    company: [
      { name: "Changelog", href: "/changelog" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
    legal: [
      { name: "Conditions", href: "/conditions" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Echo</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Real-time affective intelligence for human-centered communication.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50 text-center sm:text-left">
            © {new Date().getFullYear()} Echo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 rounded"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPageClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060A] text-white">
      {/* Subtle Mesh Background */}
      <div className="pointer-events-none fixed inset-0">
        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        
        {/* Subtle diagonal mesh pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
              repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Header />

      {/* Hero Section */}
      <motion.main
        id="join"
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-screen flex-col justify-center gap-16 px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-[1280px]"
      >
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column - Content */}
          <div className="space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block rounded-lg text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.75rem 1.25rem",
              }}
            >
              REAL-TIME AFFECTIVE INTELLIGENCE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              The Future of{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent"
              >
                Communication
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed"
            >
              Echo decodes paralinguistic cues in real time—rendering emotional subtitles, proactive coaching, and agentic guardrails that keep every conversation humane and effective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <EmailCTA />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <TrustPills />
            </motion.div>
          </div>

          {/* Right Column - HUD Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <AnalyticHUD />
          </motion.div>
        </div>
      </motion.main>

      {/* Capability Stack Section */}
      <section id="features" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 pt-12 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">CAPABILITY STACK</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            A New Sensory Layer for Digital Life
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Built for humans first—visceral overlays, contextual guardrails, and analytics you can actually trust.
          </p>
        </motion.div>

        <CapabilityStack />
      </section>

      {/* Book a Call CTA */}
      <BookCallCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
