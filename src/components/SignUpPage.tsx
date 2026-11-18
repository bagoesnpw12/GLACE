import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      setError('Email wajib diisi.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Format email tidak valid (contoh: engineer@glace.id).');
      return;
    }

    if (!password) {
      setError('Password wajib diisi.');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal harus 8 karakter.');
      return;
    }

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

  // Handler GitHub OAuth untuk Sign up (sesuai backend check)
  const handleGitHubSignUp = async () => {
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

  return (
    <div className="grid h-svh max-h-svh lg:grid-cols-2 bg-[#090a0d] text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* =========================================================================
          KOLOM KIRI: Form Sign Up Resmi shadcn signup-02 (Fit One-Screen)
          ========================================================================= */}
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#0c0d12] overflow-y-auto lg:overflow-hidden relative z-10">
        {/* Header Bar: Brand Logo GLACE & Tombol Kembali */}
        <div className="flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onGoToLanding}
            className="flex items-center gap-2 font-bold tracking-tight text-white group cursor-pointer focus:outline-none"
          >
            <div className="flex size-6 sm:size-7 items-center justify-center rounded-lg bg-white text-black font-black text-xs shadow-md">
              <span className="italic">//</span>
            </div>
            <span className="text-sm sm:text-base tracking-wider">GLACE</span>
          </button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onGoToLanding}
            className="text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-full px-2.5 py-1 h-auto transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </Button>
        </div>

        {/* Center Form Container (Kompak & Presisi tanpa Scroll di Desktop) */}
        <div className="flex flex-1 items-center justify-center py-2 sm:py-3 shrink-0">
          <div className="w-full max-w-sm space-y-3.5 sm:space-y-4">
            {/* Title & Subtitle */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Create your account
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Fill in the form below to create your account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 sm:p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center justify-between">
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
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label 
                  htmlFor="fullName" 
                  className="text-xs font-medium text-slate-300 block"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="John Doe"
                  required
                  className="h-9 px-3 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
              </div>

              {/* Email + Description */}
              <div className="space-y-1">
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
                  className="h-9 px-3 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  We'll use this to contact you. We will not share your email with anyone else.
                </p>
              </div>

              {/* Password + Description */}
              <div className="space-y-1">
                <label 
                  htmlFor="password" 
                  className="text-xs font-medium text-slate-300 block"
                >
                  Password
                </label>
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
                  className="h-9 px-3 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  Must be at least 8 characters long.
                </p>
              </div>

              {/* Confirm Password + Description */}
              <div className="space-y-1">
                <label 
                  htmlFor="confirmPassword" 
                  className="text-xs font-medium text-slate-300 block"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className="h-9 px-3 bg-slate-900/80 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-lg text-xs focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-400"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  Please confirm your password.
                </p>
              </div>

              {/* Checkbox Terms of Service & Privacy Policy */}
              <div className="flex items-start gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (error) setError('');
                  }}
                  className="mt-0.5 size-3.5 rounded-sm border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-400 leading-tight cursor-pointer">
                  I agree to the{' '}
                  <span className="text-white font-medium hover:underline">Terms of Service</span> and{' '}
                  <span className="text-white font-medium hover:underline">Privacy Policy</span>.
                </label>
              </div>

              {/* Tombol Create Account Utama */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-9 bg-white hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-60 mt-1"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Separator: Or continue with */}
              <div className="relative my-2 sm:my-3 flex items-center justify-center">
                <div className="w-full border-t border-slate-800" />
                <span className="absolute bg-[#0c0d12] px-3 text-[10px] text-slate-500 uppercase tracking-wider">
                  Or continue with
                </span>
              </div>

              {/* GitHub OAuth Button (Resmi block signup-02) */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGitHubSignUp}
                disabled={isLoading}
                className="w-full h-9 bg-slate-900/90 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
                <span>Sign up with GitHub</span>
              </Button>
            </form>

            {/* Navigasi: Already have an account? Sign in */}
            <div className="text-center text-xs text-slate-400 pt-0.5">
              Already have an account?{' '}
              <Button 
                type="button" 
                variant="link"
                onClick={onGoToSignIn}
                className="text-white hover:underline underline-offset-4 font-semibold p-0 h-auto text-xs"
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 shrink-0">
          © 2026 PT. Glace Kreasi Digital. All rights reserved.
        </div>
      </div>

      {/* =========================================================================
          KOLOM KANAN: Cover Image & Industrial Branding GLACE (Fit Full Viewport)
          ========================================================================= */}
      <div className="relative hidden bg-[#060709] lg:block overflow-hidden border-l border-slate-800/50 h-full">
        {/* Cover Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('/signup-cover.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />

        {/* GLACE Center Watermark Branding */}
        <div className="relative z-10 h-full p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
          <div className="flex justify-end">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 border border-slate-800 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs">
              TEKNIK // V2.0
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
