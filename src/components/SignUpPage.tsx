import React, { useState } from 'react';
import { Bookmark, ArrowUpRight, ArrowLeft } from 'lucide-react';

interface SignUpPageProps {
  onSignUpSuccess: (email: string, name: string) => void;
  onGoToSignIn: () => void;
  onGoToLanding: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onGoToSignIn,
  onGoToLanding,
}) => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full Name wajib diisi.');
      return;
    }

    if (!email.trim()) {
      setError('Work Email wajib diisi.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Format email tidak valid (contoh: engineer@company.com).');
      return;
    }

    if (!password) {
      setError('Password wajib diisi.');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.');
      return;
    }

    // Validasi kecocokan Confirm Password dengan Password
    if (password !== confirmPassword) {
      setError('Password dan Confirm Password tidak cocok!');
      return;
    }

    if (!agreeTerms) {
      setError('Anda harus menyetujui Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignUpSuccess(email.trim(), fullName.trim());
    }, 450);
  };

  return (
    <div className="min-h-screen w-full bg-[#121214] flex items-center justify-center p-3 sm:p-6 md:p-8 font-sans select-none">
      {/* Outer Card with Rounded Corners matching Login screenshot */}
      <div className="w-full max-w-6xl h-auto md:h-[720px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-800/40 relative">
        
        {/* Tombol Kembali ke Homepage di pojok kiri atas */}
        <button
          type="button"
          onClick={onGoToLanding}
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white text-xs backdrop-blur-md transition-colors"
          title="Kembali ke Homepage"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>

        {/* =========================================================================
            KOLOM KIRI: PERSIS 100% SAMA DENGAN HALAMAN LOGIN
            ========================================================================= */}
        <div className="w-full md:w-1/2 relative bg-[#090a0d] p-8 md:p-14 flex flex-col justify-between overflow-hidden text-white">
          {/* Background Image dengan Dark Contrast Overlay SAMA PERSIS */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/60" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center justify-between pt-8 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-black tracking-tighter text-2xl shadow-lg">
              <span className="italic">//</span>
            </div>
          </div>

          {/* Center Title: "GLACE" */}
          <div className="relative z-10 my-auto py-10 md:py-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              GLACE
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-md">
              The Next-Gen Unified AI Engineering Workspace for Civil, Electrical, Mechanical & Infrastructure Intelligence.
            </p>

            <div className="mt-6">
              <button 
                type="button"
                onClick={onGoToLanding}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors group cursor-pointer"
              >
                <span className="border-b border-slate-600 group-hover:border-white pb-0.5">glace.kreasi.digital</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            KOLOM KANAN: FORM SIGN UP DENGAN PROPORSI & TEMA KONSISTEN
            ========================================================================= */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12 md:p-14 flex flex-col justify-between relative overflow-y-auto">
          {/* Top Right Bookmark Icon */}
          <div className="flex justify-end">
            <button 
              type="button"
              className="w-10 h-10 rounded-full bg-slate-500/80 hover:bg-slate-600 text-white flex items-center justify-center transition-colors shadow-xs"
              title="Bookmark"
            >
              <Bookmark className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* Form Container */}
          <div className="max-w-sm w-full mx-auto my-auto py-2">
            {/* Header Titles */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Create your account
              </h2>
              <p className="text-xs text-slate-500 mt-1.5">
                Join the Glace Engineering Workspace
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center justify-between">
                <span>{error}</span>
                <button 
                  type="button" 
                  onClick={() => setError('')} 
                  className="text-rose-400 hover:text-rose-700 ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company / Organization (Optional)"
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Work Email"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              {/* Checkbox Terms of Service & Privacy Policy */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (error) setError('');
                  }}
                  className="mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="terms-checkbox" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                  I agree to the{' '}
                  <span className="text-slate-700 font-medium hover:underline">Terms of Service</span> and{' '}
                  <span className="text-slate-700 font-medium hover:underline">Privacy Policy</span>.
                </label>
              </div>

              {/* Tombol Create Account */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#8b9cb3] hover:bg-[#7b8ca3] disabled:opacity-60 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-2xs mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? <span>Membuat Akun...</span> : <span>Create Account</span>}
              </button>

              {/* Link ke Sign In */}
              <div className="text-center text-[11px] text-slate-500 pt-1">
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={onGoToSignIn}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center text-[11px] text-slate-400 pt-2">
            © 2026 PT. Glace Kreasi Digital. All rights reserved.
          </div>
        </div>

      </div>
    </div>
  );
};

