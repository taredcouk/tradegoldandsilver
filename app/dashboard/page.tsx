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
  CheckCircle2,
  FileText,
  PlusCircle,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill for client-side rendering
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-900 animate-pulse rounded-xl border border-slate-800" />
});
import 'react-quill-new/dist/quill.snow.css';

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

interface Blog {
  _id: string;
  title: string;
  body: string;
  author: string;
  cover: string;
  status?: 'draft' | 'published';
  authorId?: string;
  createdAt: string;
}

interface BlogRequest {
  _id: string;
  type: 'create' | 'update' | 'delete';
  blogId?: Blog;
  data?: {
    title: string;
    body: string;
    author: string;
    cover: string;
  };
  requesterId: {
    _id: string;
    username: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "users" | "settings" | "blogs" | "requests">("overview");
  const [stats, setStats] = useState({
    visitors: 0,
    visits: 0,
    conversion: 0
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [requests, setRequests] = useState<BlogRequest[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState<"add" | "edit" | "reset" | "delete" | "addBlog" | "editBlog" | "deleteBlog" | "reviewRequest" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<BlogRequest | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin"
  });

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    body: "",
    author: "",
    cover: ""
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
          // Set default author for blogs
          setBlogFormData(prev => ({ ...prev, author: data.username }));
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
    } else if (activeTab === "blogs") {
      fetchBlogs();
      fetchRequests();
    } else if (activeTab === "requests") {
      fetchRequests();
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

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setBlogsLoading(false);
    }
  };

  const fetchRequests = async () => {
    setRequestsLoading(true);
    try {
      const response = await fetch('/api/blogs/requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setRequestsLoading(false);
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

  const handleOpenModal = (type: "add" | "edit" | "reset" | "delete" | "addBlog" | "editBlog" | "deleteBlog" | "reviewRequest", data?: User | Blog | BlogRequest) => {
    setShowModal(type);
    setError(null);
    setSuccess(null);
    setAdminNotes("");

    if (type === 'add' || type === 'edit' || type === 'reset' || type === 'delete') {
      if (data) {
        const userData = data as User;
        setSelectedUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          password: "",
          role: userData.role
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
    } else if (type === 'addBlog' || type === 'editBlog' || type === 'deleteBlog') {
      if (data) {
        const blogData = data as Blog;
        setSelectedBlog(blogData);
        setBlogFormData({
          title: blogData.title,
          body: blogData.body,
          author: blogData.author,
          cover: blogData.cover
        });
      } else {
        setSelectedBlog(null);
        setBlogFormData({
          title: "",
          body: "",
          author: currentUser?.username || "",
          cover: ""
        });
      }
    } else if (type === 'reviewRequest') {
      setSelectedRequest(data as BlogRequest);
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

      const resData = await response.json();

      if (response.ok) {
        setShowModal(null);
        fetchUsers();
      } else {
        setError(resData.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to perform action');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlogAction = async (e: React.FormEvent | null, submitForApproval: boolean = false) => {
    if (e) e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      let url = '/api/blogs';
      let method = 'POST';
      let body: { title: string; body: string; author: string; cover: string; submitForApproval: boolean } | null = { ...blogFormData, submitForApproval };

      if (showModal === 'editBlog' || showModal === 'deleteBlog') {
        url = `/api/blogs/${selectedBlog?._id}`;
        if (showModal === 'editBlog') {
          method = 'PUT';
        } else if (showModal === 'deleteBlog') {
          method = 'DELETE';
          body = null;
        }
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });

      const resData = await response.json();

      if (response.ok) {
        setShowModal(null);
        fetchBlogs();
        fetchRequests();
      } else {
        setError(resData.error || 'Something went wrong');
      }
    } catch {
      setError('Failed to perform action');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestAction = async (action: 'approve' | 'reject') => {
    setActionLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogs/requests/${selectedRequest?._id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: action === 'reject' ? JSON.stringify({ adminNotes }) : undefined
      });

      const resData = await response.json();

      if (response.ok) {
        setShowModal(null);
        fetchRequests();
        fetchBlogs();
      } else {
        setError(resData.error || 'Something went wrong');
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

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
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

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "blogs" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FileText size={20} /> Blogs
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
              <button
                onClick={() => setActiveTab("requests")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "requests" ? "bg-amber-500/10 text-amber-500 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Clock size={20} /> Requests
                {requests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="ml-auto bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {requests.filter(r => r.status === 'pending').length}
                  </span>
                )}
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
             activeTab === "messages" && currentUser?.role === 'admin' ? "Contact Messages" :
             activeTab === "users" && currentUser?.role === 'admin' ? "Users Management" :
             activeTab === "blogs" ? "Blogs Management" :
             activeTab === "requests" ? "Moderation Requests" : "Account Settings"}
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
            ) : activeTab === "messages" && currentUser?.role === 'admin' ? (
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
            ) : (activeTab === "users" && currentUser?.role === 'admin') ? (
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
            ) : activeTab === "blogs" ? (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Blogs</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={fetchBlogs}
                      className="text-sm text-slate-400 hover:text-white font-medium"
                    >
                      Refresh
                    </button>
                    <button
                      onClick={() => handleOpenModal("addBlog")}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      <PlusCircle size={18} /> Add Blog
                    </button>
                  </div>
                </div>

                {blogsLoading ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex justify-center">
                    <Loader2 size={32} className="text-amber-500 animate-spin" />
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <FileText size={48} className="text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400">No blogs found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => {
                      const hasPendingRequest = requests.some(r => r.blogId?._id === blog._id && r.status === 'pending');
                      return (
                      <div key={blog._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-slate-700 transition-all">
                        <div className="relative h-40 w-full bg-slate-800">
                          {blog.cover ? (
                            <img src={blog.cover} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <ImageIcon size={40} />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 flex gap-2">
                            {blog.status === 'draft' ? (
                              <span className="bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Draft</span>
                            ) : (
                              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Published</span>
                            )}
                            {hasPendingRequest && (
                              <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                <Clock size={10} /> Pending
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-5 flex-grow">
                          <h3 className="font-bold text-lg mb-2 line-clamp-1">{blog.title}</h3>
                          <p className="text-slate-400 text-sm mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.body.substring(0, 100) + '...' }} />
                          <div className="flex justify-between items-center mt-auto">
                            <span className="text-xs text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal("editBlog", blog)}
                                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleOpenModal("deleteBlog", blog)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );})}
                  </div>
                )}
              </motion.div>
            ) : activeTab === "requests" ? (
              <motion.div
                key="requests"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{currentUser?.role === 'admin' ? "Moderation Queue" : "My Requests"}</h2>
                  <button
                    onClick={fetchRequests}
                    className="text-sm text-amber-500 hover:text-amber-400 font-medium"
                  >
                    Refresh
                  </button>
                </div>

                {requestsLoading ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex justify-center">
                    <Loader2 size={32} className="text-amber-500 animate-spin" />
                  </div>
                ) : requests.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <Clock size={48} className="text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400">No pending requests.</p>
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-800/50">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Type</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Blog</th>
                            {currentUser?.role === 'admin' && <th className="px-6 py-4 text-sm font-semibold text-slate-400">Requester</th>}
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  req.type === 'create' ? 'bg-green-500/10 text-green-500' :
                                  req.type === 'update' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {req.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {req.type === 'create' ? req.data?.title : req.blogId?.title || 'Unknown Blog'}
                              </td>
                              {currentUser?.role === 'admin' && (
                                <td className="px-6 py-4 text-slate-400">
                                  {req.requesterId.username}
                                </td>
                              )}
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  req.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                                  req.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {req.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm">
                                {new Date(req.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {currentUser?.role === 'admin' && req.status === 'pending' ? (
                                  <button
                                    onClick={() => handleOpenModal("reviewRequest", req)}
                                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                                  >
                                    Review
                                  </button>
                                ) : (
                                  req.adminNotes && (
                                    <span className="text-xs text-slate-500 italic" title={req.adminNotes}>Notes avail.</span>
                                  )
                                )}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-slate-900 border border-slate-800 rounded-2xl w-full ${showModal.toString().includes('Blog') ? 'max-w-4xl' : 'max-w-md'} overflow-hidden shadow-2xl my-8`}
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {showModal === 'add' ? 'Add New User' :
                   showModal === 'edit' ? 'Edit User' :
                   showModal === 'reset' ? 'Reset Password' :
                   showModal === 'delete' ? 'Delete User' :
                   showModal === 'addBlog' ? 'Add New Blog' :
                   showModal === 'editBlog' ? 'Edit Blog' :
                   showModal === 'reviewRequest' ? 'Review Request' : 'Delete Blog'}
                </h3>
                <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {showModal.toString().includes('Blog') ? (
                <form onSubmit={handleBlogAction} className="p-6 space-y-4">
                  {showModal === 'deleteBlog' ? (
                    <div className="space-y-4">
                      <p className="text-slate-300">
                        Are you sure you want to delete blog <span className="text-white font-bold">{selectedBlog?.title}</span>? This action cannot be undone.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Title</label>
                          <input
                            type="text"
                            required
                            value={blogFormData.title}
                            onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Author</label>
                          <input
                            type="text"
                            required
                            value={blogFormData.author}
                            onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-400">Cover Image URL</label>
                          <input
                            type="text"
                            required
                            value={blogFormData.cover}
                            onChange={(e) => setBlogFormData({ ...blogFormData, cover: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all"
                          />
                          {blogFormData.cover && (
                            <div className="mt-2 h-32 w-full rounded-xl overflow-hidden border border-slate-800">
                              <img src={blogFormData.cover} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <label className="text-sm font-medium text-slate-400">Content</label>
                        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-800 overflow-hidden min-h-[300px]">
                          <ReactQuill
                            theme="snow"
                            value={blogFormData.body}
                            onChange={(content) => setBlogFormData({ ...blogFormData, body: content })}
                            modules={quillModules}
                            className="h-full quill-editor"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4 justify-end flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowModal(null)}
                      className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all"
                    >
                      Cancel
                    </button>
                    {showModal === 'deleteBlog' ? (
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                      >
                        {actionLoading && <Loader2 size={18} className="animate-spin" />}
                        {currentUser?.role === 'admin' ? 'Delete Immediately' : 'Request Deletion'}
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handleBlogAction(e, false)}
                          disabled={actionLoading}
                          className="px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white"
                        >
                          {actionLoading && <Loader2 size={18} className="animate-spin" />}
                          Save as Draft
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleBlogAction(e, true)}
                          disabled={actionLoading}
                          className="px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950"
                        >
                          {actionLoading && <Loader2 size={18} className="animate-spin" />}
                          {currentUser?.role === 'admin' ? 'Save & Publish' : 'Submit for Approval'}
                        </button>
                      </>
                    )}
                  </div>
                </form>
              ) : showModal === 'reviewRequest' ? (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current Version */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Version</h4>
                      {selectedRequest?.type === 'create' ? (
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500 italic">
                          New Blog (No current version)
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                          <p className="font-bold text-white">{selectedRequest?.blogId?.title}</p>
                          <div className="text-xs text-slate-400 max-h-40 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedRequest?.blogId?.body || '' }} />
                        </div>
                      )}
                    </div>

                    {/* Proposed Version */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Proposed Changes</h4>
                      {selectedRequest?.type === 'delete' ? (
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500 font-bold">
                          DELETION REQUEST
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-3 shadow-lg shadow-amber-500/5">
                          <p className="font-bold text-white">{selectedRequest?.data?.title}</p>
                          <div className="text-xs text-slate-300 max-h-40 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedRequest?.data?.body || '' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium text-slate-400">Admin Notes (for rejection)</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Explain why this request is being rejected..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus:border-amber-500 outline-none transition-all h-20 text-sm"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowModal(null)}
                      className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => handleRequestAction('reject')}
                      disabled={actionLoading}
                      className="px-6 py-2 rounded-xl font-bold transition-all bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleRequestAction('approve')}
                      disabled={actionLoading}
                      className="px-6 py-2 rounded-xl font-bold transition-all bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      {actionLoading && <Loader2 size={18} className="animate-spin" />}
                      Approve & Publish
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .quill-editor .ql-container {
          height: calc(100% - 42px);
          min-height: 250px;
          background: #020617;
          border-color: #1e293b !important;
          color: #e2e8f0;
          font-family: inherit;
        }
        .quill-editor .ql-toolbar {
          background: #0f172a;
          border-color: #1e293b !important;
        }
        .quill-editor .ql-toolbar button {
          color: #94a3b8;
        }
        .quill-editor .ql-toolbar button:hover {
          color: #fbbf24;
        }
        .quill-editor .ql-toolbar .ql-stroke {
          stroke: #94a3b8;
        }
        .quill-editor .ql-toolbar .ql-fill {
          fill: #94a3b8;
        }
        .quill-editor .ql-toolbar button:hover .ql-stroke {
          stroke: #fbbf24;
        }
        .quill-editor .ql-toolbar button:hover .ql-fill {
          fill: #fbbf24;
        }
        .quill-editor .ql-toolbar .ql-picker {
          color: #94a3b8;
        }
        .quill-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #fbbf24;
        }
      `}</style>
    </div>
  );
}
