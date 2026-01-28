import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24">
        <h1 className="text-5xl lg:text-6xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-white/60 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Echo ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Email address and contact information</li>
              <li>Usage data and analytics</li>
              <li>Communication preferences</li>
              <li>Technical data such as IP address and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. Our service uses on-device processing by default to minimize data transmission and enhance privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us at privacy@echo.ai
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

