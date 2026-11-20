import React, { useState } from 'react';
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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }

    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Format email tidak valid.');
      return;
    }

    if (!password) {
      setError('Kata sandi wajib diisi.');
      return;
    }

    if (password.length < 8) {
      setError('Kata sandi minimal harus 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Kata sandi dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignUpSuccess(email.trim(), fullName.trim());
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#141518] text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-zinc-700 selection:text-white font-sans">
      
      {/* Brand Badge */}
      <button 
        type="button" 
        onClick={onGoToLanding}
        className="flex items-center gap-2 mb-4 px-3 py-1 rounded-md bg-[#1d1f24] border border-[#2b2e36] text-white hover:bg-[#252830] transition-colors cursor-pointer"
        title="Kembali ke Beranda"
      >
        <div className="w-4 h-4 rounded bg-white text-black flex items-center justify-center font-black text-[10px] italic">
          //
        </div>
        <span className="text-xs font-semibold tracking-wide text-white">GLACE</span>
      </button>

      {/* Main Container */}
      <div className="w-full max-w-[380px] bg-[#0d0e11] border border-[#23262d] rounded-xl p-6 sm:p-7 shadow-xl space-y-5">
        
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Create your account
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your email below to create your account
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-700 text-white text-xs flex items-center justify-between">
            <span>{error}</span>
            <button 
              type="button" 
              onClick={() => setError('')} 
              className="text-zinc-400 hover:text-white ml-2 text-sm leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label 
              htmlFor="fullName" 
              className="text-xs font-medium text-zinc-300 block"
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
              className="h-9 bg-[#14151a] border-[#242730] text-zinc-100 placeholder:text-zinc-600 rounded-md text-xs focus-visible:border-zinc-400"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label 
              htmlFor="email" 
              className="text-xs font-medium text-zinc-300 block"
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
              className="h-9 bg-[#14151a] border-[#242730] text-zinc-100 placeholder:text-zinc-600 rounded-md text-xs focus-visible:border-zinc-400"
            />
          </div>

          {/* Password & Confirm Password (Side by side) */}
          <div className="space-y-1">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label 
                  htmlFor="password" 
                  className="text-xs font-medium text-zinc-300 block"
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
                  className="h-9 bg-[#14151a] border-[#242730] text-zinc-100 placeholder:text-zinc-600 rounded-md text-xs focus-visible:border-zinc-400"
                />
              </div>

              <div className="space-y-1">
                <label 
                  htmlFor="confirmPassword" 
                  className="text-xs font-medium text-zinc-300 block"
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
                  className="h-9 bg-[#14151a] border-[#242730] text-zinc-100 placeholder:text-zinc-600 rounded-md text-xs focus-visible:border-zinc-400"
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 leading-tight pt-0.5">
              Must be at least 8 characters long.
            </p>
          </div>

          {/* Tombol Buat Akun (Putih Bersih dengan Teks Hitam Kontras) */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-9 bg-white hover:bg-zinc-100 text-black font-semibold text-xs rounded-md transition-colors cursor-pointer disabled:opacity-50 mt-1 shadow-xs"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Link back to Sign in */}
        <div className="text-center text-xs text-zinc-400 pt-0.5">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onGoToSignIn}
            className="text-white hover:underline underline-offset-4 font-medium cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 text-center text-xs text-zinc-500 max-w-sm px-4 leading-relaxed">
        By clicking continue, you agree to our{' '}
        <span 
          onClick={onGoToLanding}
          className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 cursor-pointer"
        >
          Terms of Service
        </span>{' '}
        and{' '}
        <span 
          onClick={onGoToLanding}
          className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 cursor-pointer"
        >
          Privacy Policy
        </span>
        .
      </div>
    </div>
  );
};
