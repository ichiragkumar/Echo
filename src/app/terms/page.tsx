import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24">
        <h1 className="text-5xl lg:text-6xl font-bold mb-8">Terms of Service</h1>
        <p className="text-white/60 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              By accessing or using Echo's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Permission is granted to temporarily use Echo's services for personal or commercial purposes. This license shall automatically terminate if you violate any of these restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Service Availability</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We strive to maintain high availability but do not guarantee uninterrupted access. We reserve the right to modify or discontinue services at any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to reverse engineer or compromise the service</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              All content, features, and functionality of Echo are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              In no event shall Echo be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              For questions about these Terms of Service, contact us at legal@echo.ai
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

