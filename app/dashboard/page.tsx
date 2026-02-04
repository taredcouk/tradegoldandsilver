"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Briefcase,
  Settings,
  Users,
  FileText,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    visitors: 0,
    visits: 0,
    conversion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (response.ok) {
          const data = await response.json();
          setStats({
            visitors: data.visitors || 0,
            visits: data.visits || 0,
            conversion: data.conversion || 0
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">Trade</span>
            <span className="text-amber-500">Gold</span>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">Main</div>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-500 font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/dashboard/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <FileText size={20} /> Blog
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Briefcase size={20} /> My Portfolio
          </Link>
          <div className="pt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">System</div>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings size={20} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">M</div>
          </div>
        </header>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {[
              { label: "Visitors", value: loading ? "..." : stats.visitors.toLocaleString(), icon: <Users size={20} className="text-amber-500" /> },
              { label: "Visits", value: loading ? "..." : stats.visits.toLocaleString(), icon: <TrendingUp size={20} className="text-blue-500" /> },
              { label: "Conversion", value: loading ? "..." : stats.conversion.toLocaleString(), icon: <BarChart3 size={20} className="text-green-500" /> }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl">
                  {stat.icon}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={32} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Welcome to your Dashboard</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Your trading dashboard is ready. We&apos;re currently processing live market data for Gold and Silver.
              Check back soon for advanced analytics.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
