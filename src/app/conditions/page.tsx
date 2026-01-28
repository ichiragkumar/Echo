import Link from "next/link";

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24">
        <h1 className="text-5xl lg:text-6xl font-bold mb-8">Terms and Conditions</h1>
        <p className="text-white/60 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Conditions</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              These terms and conditions govern your use of Echo's services. By using our services, you accept these conditions in full.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Echo provides real-time affective intelligence services, including emotion detection, tone analysis, and intervention systems. We reserve the right to modify or discontinue any aspect of the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              To access certain features, you must register for an account. You agree to provide accurate and complete information and to keep your account information updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Prohibited Uses</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              You may not use Echo to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to systems</li>
              <li>Use the service for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Data Processing</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              By using Echo, you consent to our processing of data as described in our Privacy Policy. We process data on-device by default to maximize privacy and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Service Level Agreement</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We provide service level agreements (SLAs) for paid plans. Uptime guarantees vary by plan tier. See your plan details for specific SLA terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Disclaimers</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              These conditions are governed by and construed in accordance with applicable laws. Any disputes arising from these conditions shall be subject to the exclusive jurisdiction of the courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              For questions about these Terms and Conditions, please contact us at legal@echo.ai
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

