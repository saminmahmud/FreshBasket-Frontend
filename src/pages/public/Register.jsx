import { useState } from "react";
import Logo from "../../components/reusable/Logo";
import EyeIcon from "../../components/reusable/EyeIcon";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
 
const InputField = ({ label, type = "text", value, onChange, error, placeholder, leftIcon, rightBtn }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    <div className="relative">
      {leftIcon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{leftIcon}</span>
      )}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full ${leftIcon ? "pl-10" : "pl-4"} ${rightBtn ? "pr-11" : "pr-4"} py-3 rounded-2xl border text-sm outline-none transition-all ${
          error
            ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"
        }`}
      />
      {rightBtn && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightBtn}</span>}
    </div>
    {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {error}</p>}
  </div>
);
 
function StrengthBar({ password }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const textColors = ["text-red-500", "text-orange-500", "text-yellow-600", "text-green-600"];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score-1] : "bg-gray-200"}`}/>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {["8+ chars","Uppercase","Number","Symbol"].map((l,i) => (
            <span key={l} className={`mr-2 ${checks[i] ? "text-green-600" : ""}`}>{checks[i] ? "✓" : "○"} {l}</span>
          ))}
        </span>
        <span className={`text-xs font-bold ${textColors[score-1] || "text-gray-400"}`}>{labels[score-1] || ""}</span>
      </div>
    </div>
  );
}

const Register = () => {
  const [step, setStep]         = useState(0);
  const [loading, setLoading]   = useState(false);
  const [showP, setShowP]       = useState(false);
  const [showC, setShowC]       = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [form, setForm]         = useState({
    email:"", password:"", confirm:"",
    firstName:"", lastName:"", phone:"", address:"",
  });
 
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: "" })); };
 
  const validateStep0 = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "You must agree to the terms";
    return e;
  };
 
  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (form.phone && !/^[0-9+\s\-(]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    return e;
  };
 
  const nextStep = () => {
    const e = validateStep0();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setStep(1);
  };
 
  const submit = (ev) => {
    ev.preventDefault();
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1800);
  };
 
  const mailIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
  const lockIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
  const phoneIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
 
  return (
    <div className="min-h-screen bg-[#f4f8f5] flex items-center justify-center p-4" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
 
      <div className="w-full max-w-[920px] bg-white rounded-3xl shadow-2xl shadow-black/10 overflow-hidden flex min-h-[600px]">
 
        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex flex-col justify-between w-[42%] bg-[#1a4731] p-10 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5"/>
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/5"/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#52b788]/15"/>
 
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
 
          {/* Center */}
          <div className="relative z-10 space-y-6">
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80"
                alt="fresh food"
                className="w-full h-full object-cover"
                onError={e => e.target.src = "https://placehold.co/176x176/2d6a4f/ffffff?text=🥗"}
              />
            </div>
            <div className="text-center">
              <h2 className="text-white text-2xl font-extrabold leading-snug">
                Join <span className="text-[#74c69d]">50,000+</span><br/>happy customers
              </h2>
              <p className="text-white/55 text-sm mt-2 leading-relaxed">
                Fresh produce from local farms, delivered fast.
              </p>
            </div>
            <div className="space-y-2.5">
              {[
                { icon:"🎁", text:"$10 credit on first order" },
                { icon:"📦", text:"Free delivery – first 3 orders" },
                { icon:"⭐", text:"Earn points every purchase" },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-white/85 text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
 
        </div>
 
        {/* ── RIGHT FORM PANEL ── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-10 overflow-y-auto">
 
          {/* Mobile logo */}
          <div className="flex md:hidden justify-center mb-7">
            <Logo />
          </div>
 
            <>
              {/* Step dots */}
              {/* <div className="flex items-center gap-2 mb-7">
                <div className="w-6 h-6 rounded-full bg-[#1a4731] flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="flex-1 h-px bg-gray-200"/>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">2</div>
              </div> */}
 
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Create account 🌿</h1>
                <p className="text-gray-400 text-sm mt-1">Start your fresh grocery journey today</p>
              </div>
 
              {/* Social */}
              {/* <div className="grid grid-cols-2 gap-3 mb-5">
                <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 transition-all">
                  <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  Facebook
                </button>
              </div>
 
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200"/>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">or sign up with email</span>
                <div className="flex-1 h-px bg-gray-200"/>
              </div> */}
 
              <div className="space-y-4">
                {/* Email */}
                <InputField label="Email address" value={form.email}
                  onChange={e => set("email", e.target.value)} error={errors.email}
                  placeholder="you@example.com" leftIcon={mailIcon}/>
 
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{lockIcon}</span>
                    <input type={showP ? "text" : "password"} value={form.password}
                      onChange={e => set("password", e.target.value)}
                      placeholder="Create a strong password"
                      className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm outline-none transition-all ${
                        errors.password ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100" : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"
                      }`}/>
                    <button type="button" onClick={() => setShowP(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <EyeIcon open={showP}/>
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.password}</p>}
                  <StrengthBar password={form.password}/>
                </div>
 
                {/* Confirm */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{lockIcon}</span>
                    <input type={showC ? "text" : "password"} value={form.confirm}
                      onChange={e => set("confirm", e.target.value)}
                      placeholder="Re-enter password"
                      className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm outline-none transition-all ${
                        errors.confirm ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
                        : form.confirm && form.confirm === form.password ? "border-green-400 bg-green-50"
                        : "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"
                      }`}/>
                    <button type="button" onClick={() => setShowC(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <EyeIcon open={showC}/>
                    </button>
                    {form.confirm && form.confirm === form.password && (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    )}
                  </div>
                  {errors.confirm && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.confirm}</p>}
                </div>
 
                {/* Terms
                <div>
                  <div className="flex items-start gap-2.5">
                    <button type="button" onClick={() => { setAgreed(p => !p); setErrors(p => ({ ...p, agreed: "" })); }}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        agreed ? "bg-[#1a4731] border-[#1a4731]" : errors.agreed ? "border-red-400" : "border-gray-300 hover:border-[#1a4731]"
                      }`}>
                      {agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </button>
                    <span className="text-sm text-gray-600 cursor-pointer select-none leading-snug" onClick={() => setAgreed(p => !p)}>
                      I agree to the{" "}
                      <a href="#" className="text-[#1a4731] font-semibold hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="text-[#1a4731] font-semibold hover:underline">Privacy Policy</a>
                    </span>
                  </div>
                  {errors.agreed && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.agreed}</p>}
                </div> */}
 
                <button type="button" onClick={nextStep}
                  className="w-full py-3.5 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] active:scale-[0.98] text-white font-bold text-sm transition-all shadow-lg shadow-[#1a4731]/20">
                  Continue →
                </button>
              </div>
 
              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#1a4731] hover:underline">Sign in →</a>
              </p>
            </>
 
            {/* <>
              <div className="flex items-center gap-2 mb-7">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="flex-1 h-px bg-green-400"/>
                <div className="w-6 h-6 rounded-full bg-[#1a4731] flex items-center justify-center text-white text-xs font-bold">2</div>
              </div>
 
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Almost there! 🙌</h1>
                <p className="text-gray-400 text-sm mt-1">Tell us a bit about yourself</p>
              </div>
 
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="First name" value={form.firstName}
                    onChange={e => set("firstName", e.target.value)} error={errors.firstName} placeholder="John"/>
                  <InputField label="Last name" value={form.lastName}
                    onChange={e => set("lastName", e.target.value)} error={errors.lastName} placeholder="Doe"/>
                </div>
 
                <InputField label="Phone (optional)" value={form.phone}
                  onChange={e => set("phone", e.target.value)} error={errors.phone}
                  placeholder="+1 (555) 000-0000" leftIcon={phoneIcon}/>
 
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Delivery address <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input type="text" value={form.address}
                    onChange={e => set("address", e.target.value)}
                    placeholder="123 Green Valley Rd, Portland"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10 text-sm outline-none transition-all"/>
                </div>
 
           
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#1a4731] to-[#2d6a4f] rounded-2xl p-4">
                  <span className="text-3xl flex-shrink-0">🎁</span>
                  <div>
                    <p className="text-white font-bold text-sm">You're almost in!</p>
                    <p className="text-white/70 text-xs mt-0.5">Complete signup & get <strong className="text-[#74c69d]">$10 free credit</strong> on your first order.</p>
                  </div>
                </div>
 
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setStep(0)}
                    className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold text-sm transition-all">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] active:scale-[0.98] text-white font-bold text-sm transition-all disabled:opacity-60 shadow-lg shadow-[#1a4731]/20">
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                        </svg>
                        Creating...
                      </>
                    ) : "Create Account 🎉"}
                  </button>
                </div>
              </form>
            </> */}
        </div>
      </div>
    </div>
  );
}

export default Register
