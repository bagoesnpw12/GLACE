import React from 'react';
import { 
  Bot, 
  BarChart3, 
  Activity, 
  FileText, 
  ShoppingCart, 
  GraduationCap, 
  ArrowRight, 
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onEnterDashboard,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const modules = [
    {
      title: 'Co Engineer',
      desc: 'AI copilot lintas disiplin: sipil, elektrikal, mekanikal, I&C, proses, dan HVAC untuk perhitungan teknis instan.',
      icon: Bot,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
      badge: 'Live Ready'
    },
    {
      title: 'Project Intelligence',
      desc: 'Perencanaan proyek berbasis AI melalui pemantauan WBS, CPM (Critical Path), biaya, dan mitigasi risiko.',
      icon: BarChart3,
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
      badge: 'Live Ready'
    },
    {
      title: 'Asset Intelligence',
      desc: 'Dari registri aset industri hingga predictive maintenance berbasis machine learning telemetri sensor.',
      icon: Activity,
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400',
      badge: 'Segera hadir'
    },
    {
      title: 'Document Intelligence',
      desc: 'Manajemen dokumen teknis berbasis AI: OCR dokumen, gambar teknik, deteksi revisi, dan review P&ID otomatis.',
      icon: FileText,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
      badge: 'Segera hadir'
    },
    {
      title: 'Glace Commerce',
      desc: 'Pengadaan perangkat energi terbarukan, listrik, otomasi, dan hardware jaringan dengan harga korporat & RFQ.',
      icon: ShoppingCart,
      color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
      badge: 'Live Ready'
    },
    {
      title: 'Glace Academy',
      desc: 'Pelatihan AI untuk insinyur: SCADA, PLC, BIM, dan sertifikasi kompetensi profesional berstandar industri.',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
      badge: 'Live Ready'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0d13] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* 1. TOP NAVBAR */}
      <header className="h-20 border-b border-slate-200 dark:border-slate-800 px-6 sm:px-12 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#10131d]/95 backdrop-blur-md z-50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-sm">
            <span className="italic">//</span>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
              Glace
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
              PT. Glace Kreasi Digital
            </span>
          </div>
        </div>

        {/* Menu Navigasi dengan Kontras Jelas */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Modul AI
          </a>
          <a href="#stats" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Statistik
          </a>
          <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Solusi & Harga
          </a>
        </nav>

        {/* 2. THEME TOGGLE & CTA BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Tombol Theme Toggle Global */}
          <button
            onClick={toggleTheme}
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
            title={isDarkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
            )}
          </button>

          <button
            onClick={onEnterDashboard}
            className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3.5 py-2 transition-colors cursor-pointer"
          >
            Masuk
          </button>
          <button
            onClick={onEnterDashboard}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Coba Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Semua Kebutuhan Rekayasa Teknik Dalam <span className="text-blue-600 dark:text-blue-400">Satu Workspace Cerdas.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Platform digital terpadu berbasis AI untuk insinyur, manajer proyek, dan korporasi. Rencanakan proyek, kelola dokumen dan aset teknis, beli perangkat industri, serta tingkatkan sertifikasi kompetensi dalam satu tempat.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Mulai Glace Workspace Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#pricing"
            className="w-full sm:w-auto bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-slate-700 border border-slate-200 dark:border-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
          >
            Lihat Paket Enterprise
          </a>
        </div>

        {/* Dashboard Preview Mockup Container */}
        <div className="mt-14 p-2.5 bg-slate-200/60 dark:bg-[#161a25] rounded-2xl border border-slate-300/80 dark:border-slate-800 shadow-xl max-w-5xl mx-auto transition-colors">
          <div className="bg-white dark:bg-[#11141e] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 text-left transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 ml-2">glace.kreasi.digital/workspace</span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer" onClick={onEnterDashboard}>
                Buka Interactive App →
              </span>
            </div>
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#191e2c] border border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-semibold">Active Projects</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">1,228 Projects</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2">
                  <div className="bg-[#1b887a] h-1.5 rounded-full w-[75%]"></div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#191e2c] border border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-semibold">Engineering AI Queries</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">45,820 Run</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">SNI, IEC, ASME verified</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#191e2c] border border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-semibold">RFQ Fulfillment</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">99.4% SLA</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Corporate vendors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 AI ENGINEERING FEATURES SECTION */}
      <section id="features" className="py-20 bg-white dark:bg-[#0e1118] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Fitur Utama Platform</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              6 Modul Inti AI Engineering Terpadu
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Menggantikan puluhan aplikasi terpisah menjadi satu alur kerja mulus dari perancangan hingga pengadaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50/70 dark:bg-[#131722] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        m.badge === 'Segera hadir'
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{m.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={onEnterDashboard}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Buka Modul</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section id="stats" className="py-16 bg-slate-50 dark:bg-[#0b0d13] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">12,450+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Insinyur & Manajer Proyek</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1b887a]">1,125+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Proyek Aktif Tersinkronisasi</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">840+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Perangkat Korporat di Commerce</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">&lt; 5 Menit</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Waktu Aktivasi Pengguna Baru</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & ENTERPRISE CTA SECTION */}
      <section id="pricing" className="py-20 bg-slate-900 dark:bg-[#08090d] text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Enterprise & Pricing</h2>
          <p className="text-3xl sm:text-4xl font-extrabold mt-3">
            Tingkatkan Efisiensi Tim Rekayasa Anda Sekarang
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-3 max-w-2xl mx-auto">
            Mulai dengan Free Plan untuk kebutuhan perorangan, atau pilih paket Enterprise dengan dukungan on-premise, isolasi data pribadi, dan integrasi SAP/Primavera.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={onEnterDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold text-xs shadow-md transition-colors cursor-pointer"
            >
              Coba Glace Free Plan
            </button>
            <button
              onClick={onEnterDashboard}
              className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 px-6 py-3.5 rounded-xl font-semibold text-xs shadow-md transition-colors cursor-pointer"
            >
              Hubungi Tim Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 px-6 sm:px-12 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0b0d13] transition-colors">
        <div>
          © 2026 PT. Glace Kreasi Digital. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};
