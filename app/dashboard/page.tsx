"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  TrendingUp,
  BarChart3,
  Mail,
  Clock,
  Pencil,
  Trash2,
  Key,
  Shield,
  UserPlus,
  X,
  Loader2,
  User as UserIcon,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "users" | "settings">("overview");
  const [stats, setStats] = useState({
    visitors: 0,
    visits: 0,
    conversion: 0
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState<"add" | "edit" | "reset" | "delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin"
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        router.push('/login');
      } finally {
        setProfileLoading(false);
      }
    };

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

    fetchProfile();
    fetchStats();
  }, [router]);

  useEffect(() => {
    if (activeTab === "messages") {
      fetchMessages();
    } else if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setUsersLoading(false);
    }
  };

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

  const handleOpenModal = (type: "add" | "edit" | "reset" | "delete", user?: User) => {
    setShowModal(type);
    setError(null);
    if (user) {
      setSelectedUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        role: user.role
      });
    } else {
      setSelectedUser(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user"
      });
    }
  };

  const handleUserAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      let url = '/api/users';
      let method = 'POST';
      let body: { username?: string; email?: string; role?: string; password?: string } | null = { ...formData };

      if (showModal === 'edit' || showModal === 'reset' || showModal === 'delete') {
        url = `/api/users/${selectedUser?._id}`;
        if (showModal === 'edit') {
          method = 'PUT';
          delete body.password;
        } else if (showModal === 'reset') {
          method = 'PUT';
          body = { password: formData.password };
        } else if (showModal === 'delete') {
          method = 'DELETE';
          body = null;
        }
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(null);
        fetchUsers();
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to perform action');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password updated successfully');
        setFormData({ ...formData, password: "" });
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="text-amber-500 animate-spin" size={48} />
      </div>
    );
  }

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
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "overview" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          {currentUser?.role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "messages" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Mail size={20} /> Messages
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "users" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Users size={20} /> Users
              </button>
            </>
          )}

          <div className="pt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">System</div>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "settings" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings size={20} /> Settings
          </button>
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
          <h1 className="text-lg font-semibold">
            {activeTab === "overview" ? "Dashboard Overview" :
             activeTab === "messages" ? "Contact Messages" :
             activeTab === "users" ? "Users Management" : "Account Settings"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              {currentUser?.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LayoutDashboard size={32} className="text-slate-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white">Welcome, {currentUser?.username}!</h2>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Your trading dashboard is ready. We&apos;re currently processing live market data for Gold and Silver.
                    Check back soon for advanced analytics.
                  </p>
                </div>
              </motion.div>
            ) : activeTab === "messages" ? (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Inbox</h2>
                  <button
                    onClick={fetchMessages}
                    className="text-sm text-amber-500 hover:text-amber-400 font-medium"
                  >
                    Refresh
                  </button>
                </div>

                {messagesLoading ? (
                  <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-slate-900 animate-pulse rounded-2xl border border-slate-800"></div>
                    ))}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <Mail size={48} className="text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400">No messages found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{msg.subject}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="text-amber-500 font-medium">{msg.name}</span>
                              <span className="text-slate-500">{msg.email}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <Clock size={14} />
                            {new Date(msg.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 text-slate-300 leading-relaxed">
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === "users" ? (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Users</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={fetchUsers}
                      className="text-sm text-slate-400 hover:text-white font-medium"
                    >
                      Refresh
                    </button>
                    <button
                      onClick={() => handleOpenModal("add")}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      <UserPlus size={18} /> Add User
                    </button>
                  </div>
                </div>

                {usersLoading ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex justify-center">
                    <Loader2 size={32} className="text-amber-500 animate-spin" />
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-800/50">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Username</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Email</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Role</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Created At</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4 font-medium">{user.username}</td>
                              <td className="px-6 py-4 text-slate-400">{user.email}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                  <Shield size={12} />
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenModal("reset", user)}
                                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"
                                    title="Reset Password"
                                  >
                                    <Key size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleOpenModal("edit", user)}
                                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                                    title="Edit User"
                                  >
                                    <Pencil size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleOpenModal("delete", user)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Delete User"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Settings className="text-amber-500" /> Account Settings
                  </h2>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-800 bg-slate-800/30">
                      <h3 className="font-bold flex items-center gap-2">
                        <UserIcon size={18} className="text-amber-500" /> Profile Information
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Username</label>
                          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-300">
                            {currentUser?.username}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Email Address</label>
                          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-300">
                            {currentUser?.email}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Role</label>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium">
                          <Shield size={14} />
                          {currentUser?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 bg-slate-800/30">
                      <h3 className="font-bold flex items-center gap-2">
                        <Key size={18} className="text-amber-500" /> Change Password
                      </h3>
                    </div>
                    <form onSubmit={handlePasswordUpdate} className="p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">New Password</label>
                        <input
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter your new password"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl text-sm flex items-center gap-2">
                          <CheckCircle2 size={16} /> {success}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                      >
                        {actionLoading && <Loader2 size={18} className="animate-spin" />}
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {showModal === 'add' ? 'Add New User' :
                   showModal === 'edit' ? 'Edit User' :
                   showModal === 'reset' ? 'Reset Password' : 'Delete User'}
                </h3>
                <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUserAction} className="p-6 space-y-4">
                {showModal === 'delete' ? (
                  <div className="space-y-4">
                    <p className="text-slate-300">
                      Are you sure you want to delete user <span className="text-white font-bold">{selectedUser?.username}</span>? This action cannot be undone.
                    </p>
                  </div>
                ) : (
                  <>
                    {(showModal === 'add' || showModal === 'edit') && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Username</label>
                          <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Email Address</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Role</label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "admin" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </>
                    )}

                    {(showModal === 'add' || showModal === 'reset') && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">
                          {showModal === 'reset' ? 'New Password' : 'Password'}
                        </label>
                        <input
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                        />
                      </div>
                    )}
                  </>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(null)}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className={`flex-1 px-4 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      showModal === 'delete' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    }`}
                  >
                    {actionLoading && <Loader2 size={18} className="animate-spin" />}
                    {showModal === 'add' ? 'Create User' :
                     showModal === 'edit' ? 'Update User' :
                     showModal === 'reset' ? 'Reset Password' : 'Delete User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
