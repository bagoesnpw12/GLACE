import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  useEffect(() => {
    if (expiredMessage) {
      setError(expiredMessage);
    }
  }, [expiredMessage]);

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

  // Integrasi Google OAuth 2.0 Resmi
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

  // Handler GitHub OAuth (memeriksa ketersediaan backend dan kredensial)
  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/github/url');
      if (!res.ok) {
        throw new Error('Endpoint GitHub OAuth belum aktif di server backend.');
      }
      const data = await res.json();

      if (!data.success || !data.url) {
        setIsLoading(false);
        setError(data.message || 'GitHub OAuth belum dikonfigurasi di server backend (.env).');
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      setIsLoading(false);
      setError(
        'GitHub OAuth backend belum siap: Silakan tambahkan endpoint /api/auth/github/url dan kredensial GITHUB_CLIENT_ID di server.ts.'
      );
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

      setIsTrialLoading(false);
      onLoginSuccess(data.user.email, true, data);
    } catch (err) {
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
    <div className="grid min-h-svh lg:grid-cols-2 bg-[#090a0d] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          KOLOM KIRI: Form Login Resmi shadcn login-02
          ========================================================================= */}
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-between relative z-10 bg-[#0c0d12]">
        {/* Header Bar: Brand Logo & Tombol Kembali */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onGoToLanding}
            className="flex items-center gap-2.5 font-bold tracking-tight text-white group cursor-pointer focus:outline-none"
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-white text-black font-black text-xs shadow-md">
              <span className="italic">//</span>
            </div>
            <span className="text-base tracking-wider">GLACE</span>
          </button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onGoToLanding}
            className="text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-full px-3 py-1.5 h-auto transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </Button>
        </div>

        {/* Center Form Container */}
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-sm space-y-6">
            {/* Title & Subtitle */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Login to your account
              </h1>
              <p className="text-sm text-slate-400">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center justify-between">
                <span>{error}</span>
                <button 
                  type="button" 
                  onClick={() => setError('')} 
                  className="text-rose-400 hover:text-rose-200 ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-xs font-medium text-slate-300 block"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="m@example.com"
                  required
                  className="h-10 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="password" 
                    className="text-xs font-medium text-slate-300 block"
                  >
                    Password
                  </label>
                  <Button 
                    type="button" 
                    variant="link"
                    onClick={() => {}}
                    className="p-0 h-auto text-xs text-slate-400 hover:text-white underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className="h-10 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
              </div>

              {/* Login Button Utama */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-white hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-60"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {/* Divider: Or continue with */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-slate-800" />
                <span className="absolute bg-[#0c0d12] px-3 text-[11px] text-slate-500 uppercase tracking-wider">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons Container */}
              <div className="space-y-2">
                {/* 1. Google OAuth Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-10 bg-slate-900/90 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Login with Google</span>
                </Button>

                {/* 2. GitHub OAuth Button (Resmi block shadcn login-02) */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                  className="w-full h-10 bg-slate-900/90 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>Login with GitHub</span>
                </Button>
              </div>
            </form>

            {/* Don't have an account? Sign up */}
            <div className="text-center text-xs text-slate-400 pt-1">
              Don&apos;t have an account?{' '}
              <Button 
                type="button" 
                variant="link"
                onClick={onGoToSignUp}
                className="text-white hover:underline underline-offset-4 font-semibold p-0 h-auto text-xs"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500">
          By signing in, you agree to our{' '}
          <span className="text-slate-400 hover:underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-slate-400 hover:underline cursor-pointer">Privacy Policy</span>.
        </div>
      </div>

      {/* =========================================================================
          KOLOM KANAN: Cover Image & Industrial Branding GLACE
          ========================================================================= */}
      <div className="relative hidden bg-[#060709] lg:block overflow-hidden border-l border-slate-800/50">
        {/* Cover Image Background (Gambar Arsitektural / Gelombang Monokrom) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('/login-cover.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />

        {/* GLACE Center Watermark Branding */}
        <div className="relative z-10 h-full p-12 lg:p-16 flex flex-col justify-between">
          <div className="flex justify-end">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 border border-slate-800 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs">
              ENGINEERING // V2.0
            </span>
          </div>

          <div className="max-w-lg my-auto space-y-4">
            <div className="size-14 rounded-2xl bg-white text-black flex items-center justify-center font-black tracking-tighter text-3xl shadow-2xl">
              <span className="italic">//</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              GLACE
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              The Next-Gen Unified AI Engineering Workspace for Civil, Electrical, Mechanical & Infrastructure Intelligence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
