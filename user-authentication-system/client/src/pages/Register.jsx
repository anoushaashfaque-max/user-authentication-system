import { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (form.password.length >= 6) strength++;
    if (form.password.length >= 8) strength++;
    if (/[A-Z]/.test(form.password)) strength++;
    if (/[0-9]/.test(form.password)) strength++;
    if (/[^A-Za-z0-9]/.test(form.password)) strength++;
    setPasswordStrength(strength);
  }, [form.password]);

  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Form submitted with data:", form);

    // Validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Sending registration request...");
      const response = await registerUser(form);
      console.log("Registration successful:", response);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle different types of errors
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError("Network error: Please check if the server is running on http://localhost:5000");
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || err.response.data?.error || err.response.data?.msg || `Registration failed: ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        setError("Server is not responding. Please check if the server is running.");
      } else {
        // Something else happened
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.08),transparent_50%)] pointer-events-none"></div>

        <div className="w-full max-w-md text-center relative z-10">
          <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/[0.05] p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-green-500/[0.02] to-teal-500/[0.02] rounded-2xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl mb-6">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent mb-4">
                Welcome Aboard!
              </h1>
              <p className="text-slate-400 text-sm mb-6">Your account has been created successfully</p>

              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-emerald-400 border-t-transparent"></div>
                <span className="text-sm font-medium text-emerald-300">Redirecting to login...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.08),transparent_50%)] pointer-events-none"></div>

      {/* Subtle Geometric Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border border-emerald-500/10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-green-500/5 to-transparent rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/20 mb-6">
            <FaUserPlus className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent mb-2">
            Join Our Community
          </h1>
          <p className="text-slate-400 text-sm">Create your account and get started</p>
        </div>

        {/* Professional Register Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/[0.05] p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-green-500/[0.02] to-teal-500/[0.02] rounded-2xl pointer-events-none"></div>

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

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-slate-500 text-sm" />
                </div>
                <input
                  type="text"
                  autoComplete="name"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-200 text-white placeholder-slate-500 text-sm"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-200 text-white placeholder-slate-500 text-sm"
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
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-slate-500 text-sm" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="w-full pl-11 pr-11 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-200 text-white placeholder-slate-500 text-sm"
                  placeholder="••••••••"
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

              {/* Password Strength Indicator */}
              {form.password && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Strength:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? passwordStrength <= 2
                              ? 'bg-red-400'
                              : passwordStrength <= 3
                              ? 'bg-yellow-400'
                              : passwordStrength <= 4
                              ? 'bg-blue-400'
                              : 'bg-emerald-400'
                            : 'bg-slate-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-400 hover:via-green-500 hover:to-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaUserPlus className="mr-2" />
                  Create Account
                </div>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-colors duration-200 cursor-pointer inline-block"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
            <span>Secure & Private</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
