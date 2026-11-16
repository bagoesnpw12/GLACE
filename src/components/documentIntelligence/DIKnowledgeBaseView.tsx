import React, { useState } from 'react';
import { KnowledgeBaseItem, INITIAL_KNOWLEDGE_DUMMY } from '../../data/documentIntelligenceData';
import { 
  BookOpen, 
  Search, 
  ExternalLink,
  Tag, 
  Layers,
  FileText,
  Zap,
  ShieldCheck,
  Cpu,
  Droplets,
  Wind,
  CheckCircle2,
  X,
  Clock,
  ArrowRight
} from 'lucide-react';

interface DIKnowledgeBaseViewProps {
  items?: KnowledgeBaseItem[];
}

export const DIKnowledgeBaseView: React.FC<DIKnowledgeBaseViewProps> = ({
  items: initialItems
}) => {
  const [items, setItems] = useState<KnowledgeBaseItem[]>(() => {
    return initialItems && initialItems.length > 0 ? initialItems : INITIAL_KNOWLEDGE_DUMMY;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<any | null>(null);

  // 6 Visual Category Cards with Dedicated Icons, Colors, and Count
  const categoryCards = [
    {
      id: 1,
      name: 'Standar Kelistrikan & PUIL',
      shortName: 'Kelistrikan',
      count: '14 Materi',
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      desc: 'Standar PUIL 2020, SPLN, impedansi hubung singkat, dan isolasi gardu.'
    },
    {
      id: 2,
      name: 'Spesifikasi Gardu Induk & GIS',
      shortName: 'Gardu Induk',
      count: '22 Materi',
      icon: Layers,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
      desc: 'Panduan teknis GIS 150 kV, gas SF6, dan pemeliharaan trafo daya.'
    },
    {
      id: 3,
      name: 'SOP K3 & Proteksi Bahaya',
      shortName: 'K3 & Safety',
      count: '18 Materi',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      desc: 'Batas aman insiden arc flash, APD kelistrikan, dan isolasi lockout-tagout.'
    },
    {
      id: 4,
      name: 'Pedoman Desain HVAC & Mekanikal',
      shortName: 'HVAC & Pendingin',
      count: '11 Materi',
      icon: Wind,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900',
      desc: 'Kalkulasi beban termal pendingin chiller, AHU, ducting, dan aliran udara.'
    },
    {
      id: 5,
      name: 'Instrumentasi & Otomasi SCADA',
      shortName: 'SCADA & Otomasi',
      count: '16 Materi',
      icon: Cpu,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900',
      desc: 'Protokol IEC 61850, Modbus RTU/TCP, konfigurasi RTU, dan HMI industri.'
    },
    {
      id: 6,
      name: 'Regulasi Lingkungan & IPAL Industri',
      shortName: 'Lingkungan & IPAL',
      count: '9 Materi',
      icon: Droplets,
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900',
      desc: 'Baku mutu efluen limbah cair, aerasi biologi, dan pengolahan lumpur aktif.'
    }
  ];

  // Articles Database
  const articles = [
    {
      id: 'art-01',
      title: 'Pedoman Koordinasi Proteksi Relai Diferensial Busbar 150 kV',
      category: 'Standar Kelistrikan & PUIL',
      author: 'Ir. Hendra Gunawan, M.T.',
      updateDate: '12 Nov 2026',
      readTime: '6 mnt',
      summary: 'Penjelasan prinsip kerja relai diferensial bersensitivitas tinggi untuk mencegah trip sesaat akibat saturasi trafo arus saat arus gangguan eksternal.',
      content: `1. PENDAHULUAN
Proteksi busbar gardu induk merupakan komponen paling kritis pada sistem tenaga listrik tegangan tinggi. Gangguan pada rel busbar dapat memicu pelepasan daya dalam kapasitas gigawatt jika tidak diisolasi dalam waktu kurang dari 80 milidetik.

2. PRINSIP KERJA HIGH IMPEDANCE DIFFERENTIAL RELAY
Skema diferensial impedansi tinggi mewajibkan semua Current Transformer (CT) memiliki rasio yang identik dan resistansi sekunder yang seimbang. Resistor stabilisasi disetel sedemikian rupa untuk menahan tegangan jatuh yang timbul ketika salah satu CT mengalami saturasi total selama gangguan luar.

3. REKOMENDASI SETTING LAPANGAN
- Tegangan Stabilisasi Vs = If_max * (Rct + 2RL)
- Tegangan pick-up relai diset 1.1 hingga 1.2 kali dari Vs yang dikalkulasikan.
- Pemasangan Non-Linear Resistor (Metrosil) wajib disertakan untuk membatasi tegangan puncak di atas 2.000 V puncak demi keselamatan isolasi instalasi.`
    },
    {
      id: 'art-02',
      title: 'Tata Cara Komisioning & Uji Vakum Circuit Breaker SF6',
      category: 'Spesifikasi Gardu Induk & GIS',
      author: 'Raditya Pratama, S.T.',
      updateDate: '10 Nov 2026',
      readTime: '8 mnt',
      summary: 'Prosedur pengujian tekanan gas sulfur heksafluorida, pengujian resistansi kontak breaker mikro-ohm, dan analisis timing buka-tutup pole breaker.',
      content: `1. PEMERIKSAAN KEMURNIAN GAS SF6
Sebelum pengujian tegangan tembus dilakukan, periksa kadar kelembaban gas dengan hygrometer khusus SF6. Batas maksimum kandungan air adalah 15 ppmv pada tekanan nominal operasi 0.6 MPa.

2. PENGUJIAN CONTACT RESISTANCE
Gunakan micro-ohmmeter arus searah minimum 100 Ampere. Nilai resistansi kontak utama tidak boleh melampaui 45 mikro-ohm sesuai rekomendasi pabrikan.

3. PENGUJIAN WAKTU BUKA-TUTUP (BREAKER TIMING)
Perbedaan waktu penutupan antar pole (inter-pole discrepancy) harus berada di bawah 3.3 milidetik untuk mencegah arus asimetris yang merusak belitan generator atau trafo.`
    },
    {
      id: 'art-03',
      title: 'Manual Analisis Beban Termal Chiller & Aliran Udara HVAC Industri',
      category: 'Pedoman Desain HVAC & Mekanikal',
      author: 'Dimas Saputra, S.T.',
      updateDate: '08 Nov 2026',
      readTime: '5 mnt',
      summary: 'Metode kalkulasi Cooling Load Temperature Difference (CLTD) untuk gedung kontrol kelistrikan dan cleanroom manufaktur farmasi.',
      content: `1. FORMULASI CLTD
Beban pendinginan total mencakup perolehan panas melalui amplop bangunan (dinding, atap, kaca), radiasi matahari, disipasi panas peralatan elektronika (kubikel, inverter, server), dan beban infiltrasi manusia.

2. TEKANAN POSITIF RUANGAN
Untuk gedung kontrol industri yang mengandung gas korosif H2S atau debu debu semen, ruangan wajib dipertahankan pada tekanan positif minimal +15 Pascal terhadap atmosfer luar. Hal ini mencegah masuknya partikulat yang merusak papan sirkuit kendali.`
    },
    {
      id: 'art-04',
      title: 'Kepatuhan Baku Mutu Limbah Cair & Aerasi IPAL Pabrik Tekstil',
      category: 'Regulasi Lingkungan & IPAL Industri',
      author: 'Dr. Maya Indrawati, M.Eng.',
      updateDate: '05 Nov 2026',
      readTime: '7 mnt',
      summary: 'Pedoman operasional unit biologi aerasi lumpur aktif untuk mendegradasi zat warna azo dan menurunkan parameter COD/BOD sesuai Permen LHK No. 16/2019.',
      content: `1. PARAMETER KONTROL BIOLOGI
- Nilai Dissolved Oxygen (DO) tangki aerasi wajib dijaga konstan pada rentang 2.0 - 3.5 mg/L.
- Mixed Liquor Suspended Solids (MLSS) dipertahankan pada 3.000 - 4.500 mg/L dengan Sludge Volume Index (SVI) berkisar antara 80 - 120 mL/g.

2. PENGENDALIAN ZAT WARNA REFRAKTER
Untuk pewarna reaktif sintetis yang sulit diurai mikroba, diperlukan tahap pretreatment koagulasi-flokulasi kimiawi menggunakan garam feri atau Polialuminium Klorida (PAC) sebelum memasuki kolam aerasi.`
    },
    {
      id: 'art-05',
      title: 'Integrasi Protokol Modbus TCP & IEC 61850 pada Remote Terminal Unit',
      category: 'Instrumentasi & Otomasi SCADA',
      author: 'Budi Santoso, M.Kom.',
      updateDate: '02 Nov 2026',
      readTime: '6 mnt',
      summary: 'Arsitektur komunikasi jaringan proteksi berbasis GOOSE messaging dan pemetaan data register Modbus ke logical node IEC 61850.',
      content: `1. ARSITEKTUR BUS PROSES & BUS STASIUN
Sistem otomasi gardu modern memisahkan aliran data GOOSE (Generic Object Oriented Substation Events) berprioritas tinggi pada VLAN terisolasi dengan prioritas Ethernet IEEE 802.1p.

2. MAPPING LOGICAL NODES
- CSWI: Control switch indikator status posisi breaker.
- XCBR: Circuit breaker operating statistics dan trip counters.
- MMXU: Pengukuran arus tegangan tiga fasa rms, daya aktif MW, daya reaktif MVAR.`
    },
    {
      id: 'art-06',
      title: 'Kalkulasi Energi Insiden Arc Flash & Penentuan Zona Aman K3',
      category: 'SOP K3 & Proteksi Bahaya',
      author: 'Agus Setiawan, S.T.',
      updateDate: '29 Okt 2026',
      readTime: '9 mnt',
      summary: 'Panduan perhitungan batas aman busbar sesuai regulasi IEEE 1584 edisi 2018 dan penentuan label bahaya pada kabinet distribusi daya.',
      content: `1. FORMULA ENERGI INSIDEN
Energi insiden (cal/cm2) dihitung berdasarkan besaran arus hubung singkat bolak-balik bolted fault, waktu clearing trip breaker cadangan, konfigurasi elektroda (VCB, VCBB, HCB), dan jarak kerja personil teknisi.

2. KATEGORI ALAT PELINDUNG DIRI (APD)
- Kategori 1: Minimum 4 cal/cm2 (baju tahan api katun khusus, kacamata pengaman).
- Kategori 2: Minimum 8 cal/cm2 (faceshield tahan busur api, balaclava pelindung leher).
- Kategori 4: Minimum 40 cal/cm2 (arc flash suit komplit tipe astronot tahan ledakan).`
    }
  ];

  const filteredArticles = articles.filter(art => {
    const matchCat = selectedCategory === 'Semua' ? true : art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase()) ||
      art.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Knowledge Base
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pustaka digital teknik rekayasa, standar industri SPLN/IEC/IEEE, panduan SOP keselamatan, dan pedoman komisioning.
          </p>
        </div>
      </div>

      {/* 6 Category Cards Grid: 2 rows of 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryCards.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? 'Semua' : cat.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${cat.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}>
                  {isSelected ? 'Kategori Terpilih' : 'Klik untuk filter'}
                </span>
                <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  Buka &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Articles Section: Search & List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Artikel & Pedoman Teknis Terbaru
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Kategori aktif: <strong className="text-slate-700 dark:text-slate-300">{selectedCategory}</strong> ({filteredArticles.length} materi ditemukan)
            </p>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel teknik atau nama penulis..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {art.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Penulis: <strong className="text-slate-600 dark:text-slate-300">{art.author}</strong></span>
                <span className="text-blue-600 font-semibold group-hover:underline">Baca Materi &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Article Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  {readingArticle.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {readingArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Penulis: <strong>{readingArticle.author}</strong></span>
                  <span>•</span>
                  <span>Diperbarui: {readingArticle.updateDate}</span>
                </div>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {readingArticle.content}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Pustaka Terverifikasi GLACE Engineering Platform</span>
              <button
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
