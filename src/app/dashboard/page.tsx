import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import UsageCharts from "@/components/UsageCharts";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
       <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {session.user?.email}</p>
        </div>
        {/* Add a Sign Out button */}
      </header>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tighter mb-4">Usage Analytics</h2>
        <UsageCharts />
      </div>
    </div>
  );
}
