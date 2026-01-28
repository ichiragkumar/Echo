import Link from "next/link";

export default function ChangelogPage() {
  const changelog = [
    {
      version: "2.1.0",
      date: "2024-01-15",
      type: "feature",
      changes: [
        "Added support for 50+ new languages",
        "Improved emotion detection accuracy by 15%",
        "New real-time intervention system",
        "Enhanced analytics dashboard",
      ],
    },
    {
      version: "2.0.0",
      date: "2023-12-01",
      type: "major",
      changes: [
        "Complete UI redesign with glassmorphism",
        "On-device processing by default",
        "New API v2 with improved performance",
        "Multi-modal analysis support",
      ],
    },
    {
      version: "1.5.2",
      date: "2023-11-10",
      type: "patch",
      changes: [
        "Fixed latency issues in emotion detection",
        "Improved error handling",
        "Security patches",
      ],
    },
    {
      version: "1.5.0",
      date: "2023-10-20",
      type: "feature",
      changes: [
        "Added contextual hover feature",
        "New intervention rules engine",
        "Improved dashboard performance",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24">
        <h1 className="text-5xl lg:text-6xl font-bold mb-4">Changelog</h1>
        <p className="text-white/60 mb-12">All notable changes to Echo will be documented here.</p>

        <div className="space-y-8">
          {changelog.map((entry) => (
            <div
              key={entry.version}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{entry.version}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80">
                  {entry.type === "major" ? "Major" : entry.type === "feature" ? "Feature" : "Patch"}
                </span>
                <span className="text-white/50 text-sm">{entry.date}</span>
              </div>
              <ul className="space-y-2">
                {entry.changes.map((change, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <span className="text-[#3B82F6] mt-1">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

