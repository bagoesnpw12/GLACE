import React, { useState } from 'react';
import { 
  Bot, 
  BarChart3, 
  Activity, 
  FileText, 
  ShoppingCart, 
  GraduationCap, 
  ArrowRight, 
  ArrowUpRight,
  ArrowDown,
  Sparkles, 
  Brain, 
  Workflow, 
  CheckCircle, 
  ChevronDown, 
  Layers, 
  Database, 
  Zap, 
  Lock, 
  Sliders, 
  Menu, 
  X,
  Cpu,
  Flame,
  Droplets,
  HardHat,
  Factory,
  Pickaxe,
  Truck,
  Building,
  ShieldCheck,
  Search,
  Check,
  Gauge,
  TrendingUp,
  AlertTriangle,
  Play,
  FileCode,
  Calendar,
  Clock,
  Award,
  Terminal,
  LineChart,
  Box,
  Eye,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onEnterDashboard: (targetModule?: string) => void;
  onGoToLogin?: () => void;
  onGoToSignUp?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onEnterDashboard,
  onGoToLogin,
  onGoToSignUp
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    if (onGoToLogin) {
      onGoToLogin();
    } else {
      onEnterDashboard();
    }
  };

  const handleSignUpClick = () => {
    if (onGoToSignUp) {
      onGoToSignUp();
    } else {
      onEnterDashboard();
    }
  };

  const handleNavigateProduct = (moduleId: string) => {
    setIsProductDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onEnterDashboard(moduleId);
  };

  // ENAM DASHBOARD UTAMA
  const mainDashboards = [
    {
      id: 'co-engineer',
      name: 'Co Engineer',
      tag: 'Rekayasa Teknik',
      shortDesc: 'Asisten AI untuk membantu insinyur melakukan kalkulasi teknis, memeriksa kesesuaian standar industri, dan mempercepat analisis desain.',
      features: [
        'Kalkulasi beban dan kapasitas teknik',
        'Pemeriksaan standar SNI, IEC, dan ASME',
        'Dukungan multi-disiplin teknik',
        'Rangkuman laporan matematis'
      ],
      icon: Bot
    },
    {
      id: 'project-intelligence',
      name: 'Project Intelligence',
      tag: 'Manajemen Proyek',
      shortDesc: 'Pemantauan jadwal dan alur kerja proyek secara terpadu untuk mengidentifikasi potensi keterlambatan dan menjaga efisiensi biaya.',
      features: [
        'Analisis jalur kritis (Critical Path)',
        'Pemantauan deviasi jadwal dan anggaran',
        'Visualisasi kurva S dan struktur kerja (WBS)',
        'Pengelolaan dokumen RFI dan koordinasi lapangan'
      ],
      icon: BarChart3
    },
    {
      id: 'asset-intelligence',
      name: 'Asset Intelligence',
      tag: 'Kesehatan Aset',
      shortDesc: 'Pemantauan kondisi operasional mesin dan peralatan industri secara langsung guna mendukung perawatan preventif yang tepat waktu.',
      features: [
        'Pemantauan telemetri sensor (suhu, vibrasi)',
        'Indikator kesehatan aset (Health Index)',
        'Pencatatan riwayat inspeksi berkala',
        'Pencegahan gangguan operasional tak terduga'
      ],
      icon: Activity
    },
    {
      id: 'document-intelligence',
      name: 'Document Intelligence',
      tag: 'Manajemen Dokumen',
      shortDesc: 'Pusat penyimpanan dan pengelolaan dokumen teknik dengan kemampuan membaca gambar CAD, diagram P&ID, dan perbandingan revisi.',
      features: [
        'Pembacaan gambar CAD dan skematik teknik',
        'Pendeteksian perbedaan antar-revisi dokumen',
        'Pencarian cerdas isi dokumen spesifikasi',
        'Ekstraksi informasi penting secara terstruktur'
      ],
      icon: FileText
    },
    {
      id: 'glace-commerce',
      name: 'Glace Commerce',
      tag: 'Pengadaan Industri',
      shortDesc: 'Platform pengadaan suku cadang dan perangkat industri resmi dengan alur permintaan penawaran (RFQ) dan purchase order yang rapi.',
      features: [
        'Katalog komponen teknik dari distributor resmi',
        'Pencarian visual komponen melalui foto',
        'Rekomendasi kebutuhan material proyek',
        'Pengelolaan RFQ dan pelacakan pesanan'
      ],
      icon: ShoppingCart
    },
    {
      id: 'glace-academy',
      name: 'Glace Academy',
      tag: 'Pelatihan Teknik',
      shortDesc: 'Program peningkatan keahlian teknik berbasis modul praktis industri untuk memperkuat kompetensi insinyur dan teknisi lapangan.',
      features: [
        'Materi praktis otomatisasi dan rekayasa',
        'Simulasi dan studi kasus proyek nyata',
        'Uji pemahaman dan evaluasi terstruktur',
        'Panduan teknis dan standar industri terkini'
      ],
      icon: GraduationCap
    }
  ];

  // Kemampuan Glace AI Engine
  const aiEngineFeatures = [
    { title: 'Unified Data Highway', desc: 'Menghubungkan data kalkulasi rekayasa langsung ke jadwal proyek dan kebutuhan pengadaan komponen.', icon: Database },
    { title: 'Domain-Trained Model', desc: 'AI dilatih khusus pada standar teknik nyata: SNI, IEC, ASME, SPLN, dan standar keselamatan industri.', icon: Brain },
    { title: 'Live Context Sharing', desc: 'Perubahan pada gambar teknik di Document Intelligence langsung memperbarui spesifikasi di Co Engineer & Commerce.', icon: Workflow },
    { title: 'Auditable Logic Trace', desc: 'Setiap formula, asumsi beban, dan rekomendasi supplier disertai sumber transparan yang dapat diverifikasi insinyur.', icon: ShieldCheck }
  ];

  // 9 Sektor Industri
  const industrialSectors = [
    { name: 'Energi & Utilitas', icon: Zap },
    { name: 'Energi Terbarukan', icon: Flame },
    { name: 'Konstruksi & Infrastruktur', icon: HardHat },
    { name: 'Manufaktur Presisi', icon: Factory },
    { name: 'Minyak & Gas Bumi', icon: Droplets },
    { name: 'Pertambangan & Mineral', icon: Pickaxe },
    { name: 'Air & Sanitasi Cerdas', icon: Layers },
    { name: 'Logistik & Rantai Pasok', icon: Truck },
    { name: 'Gedung Pintar & Komersial', icon: Building }
  ];

  // 6 Keunggulan GLACE
  const coreAdvantages = [
    {
      no: '01',
      title: 'Satu Sumber Kebenaran Data',
      desc: 'Tidak ada lagi dokumen ganda atau data usang. Tim rekayasa, proyek, logistik, dan manajemen melihat data yang selalu tersinkronisasi.'
    },
    {
      no: '02',
      title: 'AI Rekayasa Berstandar Regulasi',
      desc: 'Bukan AI chatbot teks umum. Algoritma kami menghitung beban, toleransi, dan tegangan dengan formula baku standar SNI, IEC, dan ASME.'
    },
    {
      no: '03',
      title: 'Efisiensi Siklus Pengadaan hingga 60%',
      desc: 'Dari Bill of Quantities (BOQ) di modul proyek, langsung konversi menjadi RFQ ke vendor resmi di Glace Commerce tanpa input manual berulang.'
    },
    {
      no: '04',
      title: 'Transparansi Biaya & Tanpa Kunci Vendor',
      desc: 'Semua harga, estimasi waktu produksi, dan spesifikasi material disajikan terbuka tanpa biaya tersembunyi.'
    },
    {
      no: '05',
      title: 'Proteksi Kekayaan Intelektual Tingkat Tinggi',
      desc: 'Dokumen CAD dan data operasi rahasia dilindungi dengan enkripsi AES-256 dan kontrol akses berbasis peran (RBAC) ketat.'
    },
    {
      no: '06',
      title: 'Skalabilitas dari Insinyur Mandiri ke Korporasi',
      desc: 'Dapat digunakan per modul untuk proyek skala kecil, atau diintegrasikan penuh ke ERP/SAP perusahaan multinasional.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0D0B14] text-slate-800 dark:text-[#E2E8F0] font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-300">
      
      {/* ========================================================= */}
      {/* 1. NAVBAR & NAVIGASI */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#0D0B14]/85 border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo GLACE */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEnterDashboard()}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-base text-white shrink-0">
              <span className="italic font-mono">//</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white leading-none">GLACE</span>
              <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                PT. Glace Kreasi Digital
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#hero" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Beranda
            </a>

            {/* Dropdown 6 Dashboard Utama */}
            <div className="relative">
              <button 
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                onBlur={() => setTimeout(() => setIsProductDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-white transition-colors py-2"
              >
                <span>6 Dashboard</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              </button>

              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 p-2.5 rounded-2xl bg-white dark:bg-[#151121] border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in z-50">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 dark:border-white/[0.06] mb-1">
                    Enam Dashboard Ekosistem GLACE
                  </div>
                  {mainDashboards.map((dash) => {
                    const Icon = dash.icon;
                    return (
                      <button
                        key={dash.id}
                        onClick={() => handleNavigateProduct(dash.id)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.08] text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                            {dash.name}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {dash.tag}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#dashboards" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Produk
            </a>
            <a href="#engine" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              AI Engine
            </a>
            <a href="#ecosystem-flow" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Alur Ekosistem
            </a>
            <a href="#enterprise" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Enterprise
            </a>
          </nav>

          {/* Desktop Right: Theme Toggle & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-all cursor-pointer shadow-sm"
              title={isDarkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
              )}
            </button>

            <button
              onClick={handleLoginClick}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white px-3.5 py-2 transition-colors cursor-pointer"
            >
              Masuk
            </button>
            <button
              onClick={handleSignUpClick}
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              Mulai Sekarang
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              type="button"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-all"
              title={isDarkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#120F1C] px-6 py-6 space-y-4 animate-fade-in transition-colors">
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-white py-1">Beranda</a>
              <div className="py-1">
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">6 Dashboard Utama:</span>
                <div className="grid grid-cols-1 gap-2 mt-2 pl-2">
                  {mainDashboards.map((dash) => (
                    <button
                      key={dash.id}
                      onClick={() => handleNavigateProduct(dash.id)}
                      className="text-left text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white py-1 flex items-center gap-2"
                    >
                      <dash.icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{dash.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <a href="#dashboards" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-white py-1">Produk</a>
              <a href="#engine" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-white py-1">AI Engine</a>
              <a href="#enterprise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-white py-1">Enterprise</a>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleLoginClick(); }}
                className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-white"
              >
                Masuk
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleSignUpClick(); }}
                className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-xs font-semibold text-white shadow-md"
              >
                Mulai Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO UTAMA DENGAN IDENTITAS GLACE */}
      {/* ========================================================= */}
      <section id="hero" className="relative pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          
          {/* Badge Pengenal Ekosistem */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#141824] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-slate-900 dark:text-white">GLACE Industrial Digital Ecosystem</span>
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            <span className="text-slate-500 dark:text-slate-400">6 Connected Dashboards</span>
          </div>

          {/* Headline Baru Sesuai Permintaan */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] max-w-5xl mx-auto">
            Satu Ekosistem Digital untuk Seluruh Operasional Industri.
          </h1>

          {/* Deskripsi Baru Sesuai Permintaan */}
          <p className="mt-7 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            Enam platform terintegrasi untuk engineering, proyek, aset, dokumen, pengadaan, dan pengembangan kompetensi industri.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#dashboards"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-[#141824] hover:bg-slate-50 dark:hover:bg-[#1a2030] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Jelajahi Platform</span>
              <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </a>
            <button
              onClick={() => onEnterDashboard()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* 6 Dashboard Quick Status Tickers - Infinite Horizontal Carousel (Bergerak ke Kanan) */}
          <div className="mt-16 w-full max-w-6xl mx-auto overflow-hidden marquee-container relative py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-right flex gap-3">
              {/* Set 1: Kartu Asli */}
              {mainDashboards.map((d) => (
                <div 
                  key={`track-1-${d.id}`}
                  onClick={() => handleNavigateProduct(d.id)}
                  className="w-[160px] sm:w-[172px] shrink-0 p-3.5 rounded-xl bg-white dark:bg-[#141120] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/40 hover:shadow-sm transition-all cursor-pointer flex flex-col items-center text-center group"
                >
                  <d.icon className="w-5 h-5 mb-2 text-slate-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">{d.name}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{d.tag}</span>
                </div>
              ))}

              {/* Set 2: Duplicated Track untuk Looping Seamless Tanpa Celah */}
              {mainDashboards.map((d) => (
                <div 
                  key={`track-2-${d.id}`}
                  onClick={() => handleNavigateProduct(d.id)}
                  className="w-[160px] sm:w-[172px] shrink-0 p-3.5 rounded-xl bg-white dark:bg-[#141120] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/40 hover:shadow-sm transition-all cursor-pointer flex flex-col items-center text-center group"
                >
                  <d.icon className="w-5 h-5 mb-2 text-slate-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">{d.name}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{d.tag}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OVERVIEW ENAM DASHBOARD UTAMA */}
      {/* ========================================================= */}
      <section id="dashboards" className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-[#0A0812] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Arsitektur Modular Terpadu
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Enam Dashboard Utama GLACE
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Setiap platform dirancang untuk menyelesaikan beban kerja spesifik para profesional rekayasa dan manajemen industri, sekaligus terhubung dalam satu jalur data real-time.
            </p>
          </div>

          {/* Grid 6 Kartu Dashboard Resmi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainDashboards.map((dash) => {
              const Icon = dash.icon;
              return (
                <div
                  key={dash.id}
                  className="rounded-2xl bg-white dark:bg-[#130F1E] border border-slate-200/90 dark:border-white/[0.08] p-8 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-200 group"
                >
                  <div>
                    {/* Header Kartu: Ikon & Badge Kategori Netral */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-white/[0.05] dark:text-slate-400 border border-slate-200 dark:border-white/[0.06]">
                        {dash.tag}
                      </span>
                    </div>

                    {/* Nama Produk & Deskripsi Fungsi Natural */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                      {dash.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-normal">
                      {dash.shortDesc}
                    </p>

                    {/* Kemampuan Utama */}
                    <div className="mt-7 space-y-2.5">
                      {dash.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tombol Pelajari Selengkapnya */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-end">
                    <button
                      onClick={() => handleNavigateProduct(dash.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
                    >
                      <span>Pelajari Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. GLACE AI ENGINE & INTEGRASI ANTARPLATFORM */}
      {/* ========================================================= */}
      <section id="engine" className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-[#0A0812] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Core Intelligence Layer
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Glace AI Engine: Menghubungkan Enam Titik Temu
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Kekuatan GLACE bukan hanya pada masing-masing dashboard, melainkan pada kemampuan mesin AI kami untuk menjembatani aliran data tanpa batas di antara keenamnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiEngineFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#141020] border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:border dark:border-purple-500/30 dark:text-purple-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ALUR EKOSISTEM ENAM DASHBOARD */}
      {/* ========================================================= */}
      <section id="ecosystem-flow" className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0D0B16] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Satu Siklus Hidup Proyek
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Bagaimana Enam Dashboard Bekerja Bersama
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
              Dari tahap perancangan teknis awal hingga operasional jangka panjang dan peningkatan keahlian tim.
            </p>
          </div>

          {/* Stepper / Lifecycle Flow Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: '1', title: 'Co Engineer', desc: 'Perhitungan beban & formula rancangan awal.' },
              { step: '2', title: 'Document Int.', desc: 'Validasi berkas CAD, revisi, & P&ID.' },
              { step: '3', title: 'Project Int.', desc: 'Penjadwalan WBS, kurva S, & mitigasi risiko.' },
              { step: '4', title: 'Glace Commerce', desc: 'Penerbitan RFQ & pembelian material resmi.' },
              { step: '5', title: 'Asset Int.', desc: 'Monitoring operasional & predictive health.' },
              { step: '6', title: 'Glace Academy', desc: 'Pelatihan lanjutan insinyur pemeliharaan.' }
            ].map((s, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#141020] border border-slate-200 dark:border-white/10 relative text-left shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:border dark:border-blue-500/30 dark:text-blue-400 font-black text-xs flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. INDUSTRI YANG DILAYANI */}
      {/* ========================================================= */}
      <section className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-[#0A0812] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Sektor Implementasi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            Dirancang untuk Industri Berat
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Dikalibrasi untuk mematuhi regulasi ketat keselamatan, keandalan, dan sertifikasi teknis lintas industri vital.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10 max-w-4xl mx-auto">
            {industrialSectors.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-[#141020] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-500/40 hover:shadow-sm transition-all flex items-center gap-2.5 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{ind.name}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. KEUNGGULAN GLACE */}
      {/* ========================================================= */}
      <section className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0D0B16] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Nilai & Standar Ekosistem
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              Keunggulan Kompetitif GLACE
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
              Fondasi yang membedakan GLACE dari solusi parsial tradisional di pasar rekayasa industri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreAdvantages.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#141020] border border-slate-200 dark:border-white/10 hover:border-blue-400/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:border dark:border-blue-500/30 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-4">
                    {item.no}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. ENTERPRISE SOLUTIONS (Bukan Dashboard Utama) */}
      {/* ========================================================= */}
      <section id="enterprise" className="py-24 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-[#0A0812] transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30">
                Penyebaran Korporasi Skala Besar
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Enterprise Solutions: Integrasi Sistem & On-Premise
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Untuk perusahaan dengan protokol kerahasiaan ketat, GLACE Enterprise menyediakan opsi deployment di cloud privat, server on-premise lokal, serta integrasi menyeluruh ke SAP, Oracle, dan Primavera P6.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Isolasi Data Private</span>
                <span className="flex items-center gap-1.5"><Workflow className="w-4 h-4 text-blue-600 dark:text-blue-400" /> API Gateway Korporat</span>
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Sertifikasi ISO 27001</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => {
                  alert("Tim Enterprise PT. Glace Kreasi Digital dapat dihubungi melalui contact@glace.kreasi.digital");
                }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all text-center"
              >
                Hubungi Tim Enterprise
              </button>
              <button
                onClick={() => onEnterDashboard('enterprise-solutions')}
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.14] text-slate-800 dark:text-white font-bold text-xs border border-slate-300 dark:border-white/15 transition-all text-center"
              >
                Spesifikasi Teknis
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#07050B] py-16 text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Col */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">GLACE</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-4">
                PT. Glace Kreasi Digital — Industrial Digital Ecosystem yang mengintegrasikan Co Engineer, Project Intelligence, Asset Intelligence, Document Intelligence, Glace Commerce, dan Glace Academy.
              </p>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">
                Jakarta, Indonesia • Standar Keamanan Enkripsi Enterprise
              </div>
            </div>

            {/* Enam Dashboard Links */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">6 Dashboard</h4>
              {mainDashboards.map((dash) => (
                <div key={dash.id}>
                  <button
                    onClick={() => handleNavigateProduct(dash.id)}
                    className="hover:text-blue-600 dark:hover:text-white transition-colors text-left"
                  >
                    {dash.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Perusahaan */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">Perusahaan</h4>
              <div><a href="#hero" className="hover:text-blue-600 dark:hover:text-white transition-colors">Beranda</a></div>
              <div><a href="#dashboards" className="hover:text-blue-600 dark:hover:text-white transition-colors">Produk</a></div>
              <div><a href="#enterprise" className="hover:text-blue-600 dark:hover:text-white transition-colors">Enterprise Solutions</a></div>
              <div><a href="#engine" className="hover:text-blue-600 dark:hover:text-white transition-colors">Glace AI Engine</a></div>
            </div>

            {/* Kontak & Dukungan */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider mb-3">Kontak & Dukungan</h4>
              <div><a href="mailto:contact@glace.kreasi.digital" className="hover:text-blue-600 dark:hover:text-white transition-colors">contact@glace.kreasi.digital</a></div>
              <div><span className="text-slate-500">+62 (21) 5082-GLACE</span></div>
              <div><span className="text-slate-500">Senin - Jumat, 08:00 - 17:00 WIB</span></div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 PT. Glace Kreasi Digital. Seluruh hak cipta dilindungi.
            </div>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
              <a href="#terms" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
              <a href="#security" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Keamanan Data</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
