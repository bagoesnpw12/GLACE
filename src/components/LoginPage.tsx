import React, { useState } from 'react';
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
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  React.useEffect(() => {
    if (expiredMessage) {
      setError(expiredMessage);
    }
  }, [expiredMessage]);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

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

    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email.trim(), false);
    }, 400);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    setInfoMessage('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/google/url');
      const data = await res.json();

      if (!res.ok || !data.success || !data.url) {
        setIsLoading(false);
        setError(data.message || 'Konfigurasi Google OAuth belum tersedia di backend (.env).');
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      setIsLoading(false);
      setError('Koneksi backend Google OAuth gagal.');
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setError('');
    setInfoMessage('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/apple/url');
      if (!res.ok) {
        throw new Error('Apple Sign-In belum tersedia di backend.');
      }
      const data = await res.json();

      if (!data.success || !data.url) {
        setIsLoading(false);
        setError(data.message || 'Kredensial Apple Developer diperlukan di backend.');
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      setIsLoading(false);
      setError('Apple Sign-In belum dikonfigurasi. Gunakan Google atau Email.');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !isValidEmail(forgotEmail)) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setInfoMessage(`Tautan pemulihan dikirim ke ${forgotEmail}`);
    }, 1200);
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
            Selamat datang kembali
          </h1>
          <p className="text-xs text-zinc-400">
            Masuk menggunakan akun Apple atau Google Anda.
          </p>
        </div>

        {/* Status Alerts */}
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

        {infoMessage && (
          <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-700 text-white text-xs flex items-center justify-between">
            <span>{infoMessage}</span>
            <button 
              type="button" 
              onClick={() => setInfoMessage('')} 
              className="text-zinc-400 hover:text-white ml-2 text-sm leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={isLoading}
            className="w-full h-9 px-3 rounded-md bg-[#17181d] border border-[#262830] hover:border-[#353844] hover:bg-[#1d1f25] text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.79-11.97-14.24-6.42-9.68-11.45-20.73-15.09-33.15-3.64-12.42-5.46-24.03-5.46-34.83 0-14.65 3.73-26.69 11.19-36.12 7.46-9.43 16.71-14.25 27.76-14.46 4.9.11 10.37 1.34 16.42 3.69 6.05 2.35 10.15 3.58 12.3 3.69 1.74-.11 6.04-1.4 12.91-3.88 6.87-2.48 12.44-3.61 16.71-3.39 12.83 1.09 23.01 5.88 30.55 14.37-11.09 6.74-16.52 16.09-16.31 28.05.22 9.35 3.78 17.18 10.67 23.49 6.89 6.31 15.11 9.9 24.67 10.77-2.61 7.83-5.77 15.54-9.49 23.13zM119.22 33.02c0-7.39 2.66-14.34 7.99-20.85 5.33-6.52 11.83-10.73 19.5-12.64 1.09 7.39-1.08 14.62-6.52 21.69-5.44 7.07-11.82 11.23-19.14 12.47-.43-.22-.9-.33-1.83-.67z" />
            </svg>
            <span className="text-white">Masuk dengan Apple</span>
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-9 px-3 rounded-md bg-[#17181d] border border-[#262830] hover:border-[#353844] hover:bg-[#1d1f25] text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="text-white">Masuk dengan Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="w-full border-t border-[#23262d]" />
          <span className="absolute bg-[#0d0e11] px-2.5 text-[11px] text-zinc-500 whitespace-nowrap">
            Atau lanjutkan dengan
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-3.5">
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

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="password" 
                className="text-xs font-medium text-zinc-300 block"
              >
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Lupa kata sandi Anda?
              </button>
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
              className="h-9 bg-[#14151a] border-[#242730] text-zinc-100 placeholder:text-zinc-600 rounded-md text-xs focus-visible:border-zinc-400"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-9 bg-white hover:bg-zinc-100 text-black font-semibold text-xs rounded-md transition-colors cursor-pointer disabled:opacity-50 mt-1 shadow-xs"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        {/* Link to Sign up */}
        <div className="text-center text-xs text-zinc-400 pt-0.5">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={onGoToSignUp}
            className="text-white hover:underline underline-offset-4 font-medium cursor-pointer"
          >
            Daftar sekarang
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-zinc-500 max-w-sm px-4 leading-relaxed">
        Dengan mengklik lanjutkan, Anda menyetujui{' '}
        <span 
          onClick={onGoToLanding}
          className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 cursor-pointer"
        >
          Ketentuan Layanan
        </span>{' '}
        dan{' '}
        <span 
          onClick={onGoToLanding}
          className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200 cursor-pointer"
        >
          Kebijakan Privasi
        </span>{' '}
        kami .
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#111216] border border-[#262831] rounded-lg max-w-sm w-full p-5 space-y-3.5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white">Reset Kata Sandi</h3>
            <p className="text-xs text-zinc-400">
              Masukkan email akun Anda untuk menerima instruksi pemulihan.
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <Input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="h-8 bg-[#16171d] border-[#2b2d37] text-xs text-white rounded-md"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForgotModal(false)}
                  className="h-7 text-xs text-zinc-400 hover:text-white"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={forgotSent}
                  className="h-7 text-xs bg-white text-black hover:bg-zinc-200 rounded-md font-medium"
                >
                  {forgotSent ? 'Mengirim...' : 'Kirim Tautan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
