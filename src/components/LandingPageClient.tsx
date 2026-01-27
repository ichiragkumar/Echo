"use client";

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

const bentoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const bentoItemVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="text-2xl font-bold tracking-tighter">Echo</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
          <a
            href="#join"
            className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Join Waitlist
          </a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.main
        id="join"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24"
      >
        <div className="max-w-4xl">
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4"
          >
            The Future of{" "}
            <motion.span
              className="text-purple-400"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, yoyo: Infinity, ease: "easeInOut" }}
            >
              Perception
            </motion.span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Echo is a real-time accessibility mirror that decodes paralinguistic cues, providing emotional subtitles and agentic social coaching.
          </motion.p>
          <motion.form variants={itemVariants} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Join the Future
            </button>
          </motion.form>
        </div>
      </motion.main>

      {/* Features Section (Bento Grid) */}
      <section id="features" className="py-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 tracking-tighter"
        >
          A New Sensory Layer for Digital Life
        </motion.h2>
        <motion.div
          variants={bentoGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Feature 1: Emotional Overlays */}
          <motion.div variants={bentoItemVariants} className="md:col-span-2 p-8 glass-card">
            <h3 className="text-2xl font-bold mb-2">Emotional Overlays</h3>
            <p className="text-gray-400">Dynamic subtitles change color and style to show tone, sarcasm, and emotion in real-time.</p>
          </motion.div>

          {/* Feature 2: Contextual Hover */}
          <motion.div variants={bentoItemVariants} className="p-8 glass-card">
            <h3 className="text-2xl font-bold mb-2">Contextual Hover</h3>
            <p className="text-gray-400">Get a "tone check" on any text on social media before you even reply.</p>
          </motion.div>

          {/* Feature 3: Agentic Intervention */}
          <motion.div variants={bentoItemVariants} className="p-8 glass-card">
            <h3 className="text-2xl font-bold mb-2">Agentic Intervention</h3>
            <p className="text-gray-400">Proactive triggers for safety alerts and social de-escalation.</p>
          </motion.div>

          {/* Feature 4: Analytics */}
          <motion.div variants={bentoItemVariants} className="md:col-span-2 p-8 glass-card">
            <h3 className="text-2xl font-bold mb-2">Usage Analytics</h3>
            <p className="text-gray-400">Track your token usage with a beautiful and intuitive dashboard.</p>
          </motion.div>

          {/* Feature 5: Multi-Language */}
          <motion.div variants={bentoItemVariants} className="p-8 glass-card">
            <h3 className="text-2xl font-bold mb-2">100+ Languages</h3>
            <p className="text-gray-400">Translate and understand tone across the globe, including regional slang.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center p-8 text-gray-500 border-t border-gray-800 mt-20"
      >
        <p>&copy; {new Date().getFullYear()} Echo. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
