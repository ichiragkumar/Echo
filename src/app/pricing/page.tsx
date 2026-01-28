import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10,000 API calls/month",
        "Real-time emotion detection",
        "Basic analytics dashboard",
        "Email support",
        "99.9% uptime SLA",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "month",
      description: "For growing teams and businesses",
      features: [
        "Up to 100,000 API calls/month",
        "Advanced emotion analytics",
        "Custom intervention rules",
        "Priority support",
        "99.95% uptime SLA",
        "On-device processing",
        "Multi-language support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited API calls",
        "Dedicated infrastructure",
        "Custom integrations",
        "24/7 dedicated support",
        "99.99% uptime SLA",
        "Advanced security & compliance",
        "Custom training & onboarding",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Pricing</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border backdrop-blur-xl p-8 ${
                plan.popular
                  ? "border-[#3B82F6]/50 bg-white/5 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-white/60 ml-2">/{plan.period}</span>}
              </div>
              <p className="text-white/70 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-xl py-3 font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/15"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
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

