import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/reusable/Logo";
import EyeIcon from "../../components/reusable/EyeIcon";
import { useLoginMutation } from "../../redux/features/authFeatures";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading}] = useLoginMutation();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password }).unwrap();
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      // console.error(err);
      toast.error("Invalid username or password");
    }
  };
    

  return (
    <div className="min-h-screen bg-[#f4f8f5] flex items-center justify-center p-4" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
 
      <div className="w-full max-w-[900px] bg-white rounded-3xl shadow-2xl shadow-black/10 overflow-hidden flex min-h-[580px]">
 
        {/* ── LEFT GREEN PANEL ── */}
        <div className="hidden md:flex flex-col justify-between w-[42%] bg-[#1a4731] p-10 relative overflow-hidden">
          {/* bg blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#52b788]/20" />
 
          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2.5 pb-5">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <span className="text-white font-extrabold text-xl">FreshBasket</span>
          </Link>
 
          {/* Center content */}
          <div className="relative z-10 space-y-7">
            {/* Image */}
            <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543168256-418811576931?w=500&q=80"
                alt="fresh groceries"
                className="w-full h-full object-cover"
                onError={e => e.target.src = "https://placehold.co/192x192/2d6a4f/ffffff?text=🛒"}
              />
            </div>
 
            <div className="text-center space-y-2">
              <h2 className="text-white text-2xl font-extrabold leading-snug">
                Fresh groceries,<br/>
                <span className="text-[#74c69d]">delivered fast</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Farm-fresh produce delivered to your door in under 30 minutes.
              </p>
            </div>
 
            {/* Features */}
            <div className="space-y-2.5">
              {[
                { icon: "⚡", text: "30-minute delivery" },
                { icon: "🌱", text: "100% organic & fresh" },
                { icon: "🔒", text: "Secure & easy checkout" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-white/85 text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
 
        </div>
 
        {/* ── RIGHT FORM PANEL ── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-10">
 
          {/* Mobile logo */}
          <div className="flex md:hidden justify-center mb-8">
            <Logo />
          </div>

          <div>
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Sign in to your FreshBasket account</p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input
                    type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"}`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-semibold text-[#1a4731] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <input
                    type={showPass ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm outline-none transition-all border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"}`}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <EyeIcon open={showPass}/>
                  </button>
                </div>
              </div>

              {/* {
                isError && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{error?.data?.detail || "Login failed"}</p>
                )
              } */}

              {/* Submit */}
              <button type="submit" disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] active:scale-[0.98] text-white font-bold text-sm transition-all disabled:opacity-60 shadow-lg shadow-[#1a4731]/20">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    Signing in...
                  </div>
                ) : "Sign In →"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-[#1a4731] hover:underline">Create one free →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
