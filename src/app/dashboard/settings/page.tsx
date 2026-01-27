"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en-US");
  const [slang, setSlang] = useState("default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the user's settings to your database
    console.log("Settings saved:", { language, slang });
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">Manage your language and communication style preferences.</p>
        
        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Language
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {/* This list would be much longer in a real application */}
              <option value="en-US">English (US)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="fr-FR">French (France)</option>
              <option value="de-DE">German</option>
              <option value="ja-JP">Japanese</option>
            </select>
          </div>

          <div>
            <label htmlFor="slang" className="block text-sm font-medium text-gray-300 mb-2">
              Communication Style
            </label>
            <select
              id="slang"
              name="slang"
              value={slang}
              onChange={(e) => setSlang(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="default">Default</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="gen-z">Gen Z Slang</option>
              <option value="simplified">Simplified Language</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              For neurodivergent users, "Simplified Language" can help clarify complex idioms.
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
