import { useEffect, useState } from "react";
import { getDashboard } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaCheckCircle, FaHome, FaShieldAlt, FaEnvelope } from "react-icons/fa";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        setMessage(res.data.msg || "Welcome to your dashboard!");
        setUser(res.data.user || { name: "User", email: "user@example.com" });
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <FaHome className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-500 hover:to-pink-500 focus:ring-2 focus:ring-red-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>

            <div className="flex items-center space-x-6 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl shadow-purple-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <FaUser className="text-white text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Welcome back, {user?.name || "User"}!
                </h2>
                <p className="text-slate-300 text-lg">{message || "You are successfully logged in."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Authentication Status Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl group">
            <div className="flex items-center space-x-5">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl shadow-xl shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Authentication</h3>
                <p className="text-green-400 font-semibold text-lg">Verified</p>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl group">
            <div className="flex items-center space-x-5">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-2xl shadow-xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Security</h3>
                <p className="text-cyan-400 font-semibold text-lg">Protected</p>
              </div>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 md:col-span-2 lg:col-span-1 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl group">
            <div className="flex items-center space-x-5">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl shadow-xl shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Account</h3>
                <p className="text-pink-400 font-semibold text-lg">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 relative z-10">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Full Name</label>
                <div className="flex items-center space-x-4 p-5 bg-slate-800/50 border border-slate-600/50 rounded-2xl backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-xl">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <span className="text-white font-semibold text-lg">{user?.name || "N/A"}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Email Address</label>
                <div className="flex items-center space-x-4 p-5 bg-slate-800/50 border border-slate-600/50 rounded-2xl backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <span className="text-white font-semibold text-lg">{user?.email || "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Account Status</label>
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-400/30 rounded-2xl backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl">
                    <FaCheckCircle className="text-white text-lg" />
                  </div>
                  <span className="text-green-300 font-bold text-lg">Active</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Last Login</label>
                <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-400/30 rounded-2xl backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-xl">
                    <FaHome className="text-white text-lg" />
                  </div>
                  <span className="text-cyan-300 font-bold text-lg">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
