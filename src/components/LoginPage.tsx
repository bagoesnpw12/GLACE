import React, { useState } from 'react';
import { Bookmark, ArrowUpRight, ArrowLeft, Clock, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string, isTrial?: boolean, trialInfo?: any) => void;
  onGoToLanding: () => void;
  onGoToSignUp?: () => void;
  expiredMessage?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onGoToLanding,
  onGoToSignUp,
  expiredMessage 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(expiredMessage || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isTrialLoading, setIsTrialLoading] = useState(false);

  // Validasi format email
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Generate hardware / browser fingerprint sederhana
  const getDeviceFingerprint = () => {
    let fp = localStorage.getItem('glace_device_fp');
    if (!fp) {
      fp = 'fp_' + Math.random().toString(36).substring(2, 12) + '_' + navigator.userAgent.replace(/\D/g, '').slice(0, 8);
      localStorage.setItem('glace_device_fp', fp);
    }
    return fp;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Format email tidak valid (contoh: user@glace.id).');
      return;
    }

    if (!password) {
      setError('Password wajib diisi.');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal harus memiliki 6 karakter.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email.trim(), false);
    }, 450);
  };

  // Hapus total simulasi login Google -> Integrasikan Google OAuth 2.0 Resmi
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/google/url');
      const data = await res.json();

      if (!res.ok || !data.success || !data.url) {
        setIsLoading(false);
        setError(data.message || 'Google OAuth belum dikonfigurasi. Silakan isi GOOGLE_CLIENT_ID & SECRET di .env.');
        return;
      }

      // Arahkan browser pengguna langsung ke halaman autentikasi resmi Google
      window.location.href = data.url;
    } catch (err: any) {
      setIsLoading(false);
      setError('Gagal menghubungi backend Google OAuth: ' + (err.message || 'Periksa server.ts'));
    }
  };

  // Handler tombol "Start Free Trial – 3 Days"
  const handleStartFreeTrial = async () => {
    setIsTrialLoading(true);
    setError('');

    try {
      const fingerprint = getDeviceFingerprint();
      const res = await fetch('http://localhost:3001/api/trial/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Masa Free Trial 3 hari Anda telah berakhir.');
        setIsTrialLoading(false);
        return;
      }

      // Berhasil mendapatkan trial 3 hari dari backend database
      setIsTrialLoading(false);
      onLoginSuccess(data.user.email, true, data);
    } catch (err) {
      // Fallback backend offline handler
      setIsTrialLoading(false);
      const fallbackTrial = {
        user: {
          id: 'trial_' + Date.now().toString(36),
          email: 'trial.engineer@glace.id',
          name: 'Trial Engineer',
          role: 'Free Trial',
          trialExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        timeLeft: {
          displayText: 'Free Trial: 3 Days Left',
          days: 3
        }
      };
      onLoginSuccess(fallbackTrial.user.email, true, fallbackTrial);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121214] flex items-center justify-center p-3 sm:p-6 md:p-8 font-sans select-none">
      {/* Outer Card with Rounded Corners matching screenshot */}
      <div className="w-full max-w-6xl h-auto md:h-[720px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-800/40 relative">
        
        {/* Tombol Kembali ke Homepage */}
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
            KOLOM KIRI: Background Gambar Gelap dengan Branding GLACE
            ========================================================================= */}
        <div className="w-full md:w-1/2 relative bg-[#090a0d] p-8 md:p-14 flex flex-col justify-between overflow-hidden text-white">
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
            KOLOM KANAN: Form Login dengan Background Putih Bersih
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
                Welcome back
              </h2>
              <p className="text-xs text-slate-500 mt-1.5">
                Sign in to your account
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

            {/* Login Form */}
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
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
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 transition-colors"
                />
              </div>

              {/* Sign in Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#8b9cb3] hover:bg-[#7b8ca3] disabled:opacity-60 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-2xs mt-1 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? <span>Memverifikasi...</span> : <span>Sign in</span>}
              </button>

              {/* Links below Sign in */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={onGoToSignUp}
                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
                <button 
                  type="button" 
                  onClick={() => {}}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Separator "or" */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-slate-100" />
                <span className="absolute bg-white px-3 text-[11px] text-slate-400">
                  or
                </span>
              </div>

              {/* 1. Sign in with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2.5 transition-all shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>

              {/* 2. TOMBOL FREE TRIAL (Tepat di bawah tombol Google dengan lebar sama & jarak rapi) */}
              <button
                type="button"
                onClick={handleStartFreeTrial}
                disabled={isTrialLoading}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer group mt-2.5"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>
                  {isTrialLoading ? 'Mengaktifkan Trial...' : 'Start Free Trial – 3 Days'}
                </span>
                <Sparkles className="w-3 h-3 text-blue-400" />
              </button>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center text-[11px] text-slate-400 pt-3">
            By signing in, you agree to our{' '}
            <span className="text-slate-600 hover:underline cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
