import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different types of errors
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError("Network error: Please check if the server is running on http://localhost:5000");
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || err.response.data?.error || `Login failed: ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        setError("Server is not responding. Please check if the server is running.");
      } else {
        // Something else happened
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (


    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none"></div>

      {/* Subtle Geometric Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border border-cyan-500/10 rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-xl shadow-purple-500/20 mb-6">
            <FaSignInAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">Sign in to continue to your account</p>
        </div>

        {/* Professional Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/[0.05] p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] rounded-2xl pointer-events-none"></div>

          <form onSubmit={submit} autoComplete="on" className="space-y-6 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-400/20 text-red-300 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-slate-500 text-sm" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 transition-all duration-200 text-white placeholder-slate-500 text-sm"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-slate-500 text-sm" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 transition-all duration-200 text-white placeholder-slate-500 text-sm"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-400 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaSignInAlt className="mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors duration-200 cursor-pointer inline-block"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <span>Secure & Encrypted</span>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

