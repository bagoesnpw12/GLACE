import React, { useState } from 'react';
import { 
  Paperclip, 
  Send, 
  ChevronRight,
  MoreHorizontal,
  Clock,
  Menu,
  Download,
  Share2,
  Sparkles,
  Plus,
  Palette,
  ChevronDown,
  FileCode,
  MousePointer,
  Hand,
  Crop,
  Pencil,
  MessageSquare,
  Image as ImageIcon,
  Star,
  Undo2,
  Redo2,
  HelpCircle,
  Smartphone,
  Globe,
  Mic,
  ArrowUp
} from 'lucide-react';

interface CoEngineerProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const CoEngineerModule: React.FC<CoEngineerProps> = ({ 
  onAddActivity, 
  selectedSubItem,
  onSelectSubItem 
}) => {
  // State: 'home' (sebelum kirim: input box mirip gambar 1 dalam tema terang + 9 cards + recent conversations)
  // vs 'canvas' (setelah kirim: tampilan studio canvas mirip gambar 2 dalam tema terang)
  const [viewState, setViewState] = useState<'home' | 'canvas'>('home');
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'app' | 'web'>('app');
  const [currentProjectTitle, setCurrentProjectTitle] = useState('Peluncur Aplikasi Mandiri');

  // Messages inside canvas view
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: '1',
      role: 'user',
      content: 'jalankan aplikasi',
      timestamp: '11:20 AM'
    },
    {
      id: '2',
      role: 'assistant',
      content: `Berikut beberapa contoh ide yang bisa kita mulai:\n\n• Aplikasi E-Commerce / Belanja Online\n  (Beranda produk, kategori, keranjang, checkout)\n\n• Aplikasi Keuangan / Dompet Digital\n  (Saldo, transfer, riwayat transaksi, analitik pengeluaran)\n\n• Aplikasi Manajemen Tugas / Produktivitas\n  (Daftar tugas, kalender, pelacak kebiasaan)\n\n• Ide aplikasi kustom Anda sendiri\n\nSilakan pilih atau jelaskan konsep aplikasi yang Anda inginkan!`,
      timestamp: '11:20 AM'
    }
  ]);

  const [conversations, setConversations] = useState([
    { id: '1', title: 'Calculated load for Single Line Diagram Substation', discipline: 'Electrical', lastUpdated: '10 mins ago' },
    { id: '2', title: 'P&ID revision comparison & valve tags detection', discipline: 'Process', lastUpdated: '2 hours ago' },
    { id: '3', title: 'Civil structural beam deflection analysis (SNI 2847)', discipline: 'Civil', lastUpdated: '1 day ago' },
    { id: '4', title: 'HVAC Ducting static pressure loss review', discipline: 'HVAC', lastUpdated: '2 days ago' },
  ]);

  // 9 Cards as originally requested
  const cards = [
    {
      num: '01',
      title: 'My Drawings',
      desc: 'Semua gambar teknik milik Anda, lengkap dengan filter revisi dan status.',
    },
    {
      num: '02',
      title: 'Drawing Projects',
      desc: 'Kelompokkan gambar per proyek, tim, dan tenggat pekerjaan.',
    },
    {
      num: '03',
      title: 'Drawing Workspace',
      desc: 'Area kerja untuk melihat, menandai, dan menyunting gambar.',
    },
    {
      num: '04',
      title: 'AI Drawing Assistant',
      desc: 'Tanya jawab dan ekstraksi data langsung dari isi gambar dengan AI.',
    },
    {
      num: '05',
      title: 'Drawing Comparison',
      desc: 'Bandingkan dua revisi dan sorot setiap perubahan yang terjadi.',
    },
    {
      num: '06',
      title: 'Engineering Intelligence',
      desc: 'Analisis dimensi, material, dan potensi masalah pada desain.',
    },
    {
      num: '07',
      title: 'Drawing Types',
      desc: 'Atur tipe gambar: mekanikal, sipil, listrik, dan diagram proses.',
    },
    {
      num: '08',
      title: 'Import & Export',
      desc: 'Impor DWG, DXF, atau PDF dan ekspor ke format kerja lainnya.',
    },
    {
      num: '09',
      title: 'Drawing Control',
      desc: 'Kontrol revisi, alur persetujuan, dan riwayat dokumen gambar.',
    },
  ];

  // Submit from Home view -> changes view to Canvas view
  const handleHomeSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt;
    setCurrentProjectTitle(userText.length > 25 ? userText.slice(0, 25) + '...' : userText);

    const userMsg: MessageItem = {
      id: String(Date.now()),
      role: 'user',
      content: userText,
      timestamp: 'Baru saja'
    };

    const aiMsg: MessageItem = {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: `Berikut beberapa contoh ide arsitektur & komponen rekayasa yang bisa kita mulai untuk "${userText}":\n\n• Arsitektur Modular & Workflow\n  (Alur input, pemrosesan logika, kontrol sistem & validasi)\n\n• Struktur Data & Spesifikasi Parameter\n  (Atribut teknis, standar keselamatan SNI/IEC, batas toleransi)\n\n• Modul Antarmuka / Dasbor Kontrol\n  (Panel visualisasi status live, grafik pemantauan, form konfigurasi)\n\n• Integrasi Sistem Otomasi & Ekspor Berkas\n\nSilakan tentukan modul mana yang ingin Anda prioritaskan untuk dibuat lebih lanjut!`,
      timestamp: 'Baru saja'
    };

    setMessages([userMsg, aiMsg]);
    setConversations([
      {
        id: String(Date.now()),
        title: userText,
        discipline: 'Engineering AI',
        lastUpdated: 'Just now',
      },
      ...conversations,
    ]);

    setViewState('canvas');
    onAddActivity(`Co Engineer prompt: ${userText.slice(0, 35)}...`, 'Co Engineer');
    setPrompt('');
  };

  // Follow-up chat inside Canvas
  const handleCanvasSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const followUp = prompt;
    const userMsg: MessageItem = {
      id: String(Date.now()),
      role: 'user',
      content: followUp,
      timestamp: 'Baru saja'
    };

    const aiMsg: MessageItem = {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: `Memproses permintaan: "${followUp}"...\n\n✅ Spesifikasi rekayasa diperbarui.\n✅ Layout kanvas & blok diagram telah disesuaikan dengan parameter yang Anda tentukan.\n\nApakah ada elemen desain atau koneksi data lain yang ingin Anda tambahkan?`,
      timestamp: 'Baru saja'
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    onAddActivity(`Co Engineer Canvas: ${followUp.slice(0, 30)}...`, 'Co Engineer');
    setPrompt('');
  };

  const handleCardClick = (title: string) => {
    if (onSelectSubItem) {
      onSelectSubItem(title);
    }
    setPrompt(`Buka dan analisis ${title}`);
  };

  /* =========================================================================
     VIEW 2: CANVAS VIEW (Persis Gambar 2 tapi dengan warna tema terang yang konsisten)
     ========================================================================= */
  if (viewState === 'canvas') {
    return (
      <div className="h-[calc(100vh-8.5rem)] min-h-[580px] bg-slate-100 flex flex-col font-sans select-none overflow-hidden relative rounded-xl border border-slate-200/90 shadow-xs">
        {/* Workspace Canvas with Dot-Grid Background in Light Mode */}
        <div className="flex-1 relative flex overflow-hidden bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Floating Left Chat Sidebar Panel */}
          <div className="w-[360px] max-w-[90vw] h-full bg-white/95 backdrop-blur-md border-r border-slate-200 flex flex-col z-10 shadow-lg">
            {/* Chat Panel Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewState('home')}
                  className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                  title="Kembali ke Co Engineer Home"
                >
                  <Menu className="w-3.5 h-3.5" />
                </button>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span className="font-semibold text-slate-800 truncate max-w-[170px]">{currentProjectTitle}</span>
              </div>
              <button 
                type="button"
                onClick={() => setViewState('home')}
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                Tutup
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1.5">
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-slate-900 text-white px-3.5 py-2 rounded-2xl rounded-tr-xs max-w-[85%] font-medium shadow-2xs">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-slate-50 border border-slate-200 text-slate-800 p-3.5 rounded-2xl rounded-tl-xs whitespace-pre-line leading-relaxed shadow-2xs">
                        {msg.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Canvas Chat Input Bar */}
            <form onSubmit={handleCanvasSend} className="p-3 border-t border-slate-100 bg-white">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <textarea
                  rows={2}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like to change or create?"
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 resize-none focus:outline-hidden"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCanvasSend(e);
                    }
                  }}
                />

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1 text-slate-400 text-xs">
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-1 hover:text-slate-700 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-300">/</span>
                    <button type="button" className="p-1 hover:text-slate-700 transition-colors">
                      <Palette className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-slate-700 font-medium cursor-pointer shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                      <span>Balanced</span>
                      <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-2xs"
                    title="Kirim instruksi"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Canvas Center Work Area */}
          <div className="flex-1 flex items-center justify-center p-8 relative">
            <div className="text-center p-8 rounded-2xl border border-dashed border-slate-300 bg-white/80 backdrop-blur-xs max-w-md shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-2xs">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Kanvas Rancangan Engineering Aktif
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Ketik instruksi pada kolom chat di sebelah kiri untuk menghasilkan rancangan, diagram P&ID, Single Line Diagram, atau komponen aplikasi interaktif secara otomatis.
              </p>
            </div>

            {/* Right Canvas Toolbar (Matching Gambar 2 in Light Theme) */}
            <aside className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-xl p-1.5 flex flex-col gap-1.5 shadow-md text-slate-500 z-10">
              <button className="p-2 rounded-lg bg-blue-50 text-blue-600 font-semibold shadow-2xs" title="Select (V)">
                <MousePointer className="w-4 h-4 fill-current" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Hand Tool (H)">
                <Hand className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Crop / Frame">
                <Crop className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Pencil / Draw">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Comments">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Add Media / Image">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Color Theme">
                <Palette className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Bookmark / Star">
                <Star className="w-4 h-4" />
              </button>
            </aside>

            {/* Bottom Right Zoom & History Controls */}
            <div className="absolute right-4 bottom-4 flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-500 shadow-md">
              <button className="p-1 hover:text-slate-800 transition-colors" title="Undo">
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-slate-800 transition-colors" title="Redo">
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-200 px-1">|</span>
              <span className="font-mono text-[11px] font-semibold text-slate-700">75%</span>
              <button className="p-1 hover:text-slate-800 transition-colors" title="Help">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     VIEW 1: HOME VIEW (Bentuk Gambar 1: Welcome to Stitch/Co Engineer hero box dengan kontrol lengkap, 
     tetap dengan warna terang yang lama + 9 cards + recent conversations TIDAK DIHAPUS)
     ========================================================================= */
  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Co Engineer
        </h1>
        {selectedSubItem && (
          <p className="text-xs font-medium text-blue-600 mt-1 flex items-center gap-1">
            <span>Sub-menu:</span>
            <span className="font-semibold">{selectedSubItem}</span>
          </p>
        )}
      </div>

      {/* Hero Box Berbentuk Persis Gambar 1 (Welcome to Stitch.. input bar with App/Web, Balanced, Mic, ArrowUp) dalam Tema Terang Yang Lama */}
      <div className="bg-[#f8faff] border border-blue-100/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to Co Engineer..
          </h2>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => {
                setCurrentProjectTitle('Start with design');
                setViewState('canvas');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-slate-400" />
              <span>Start with your design</span>
            </button>
            <button 
              type="button"
              onClick={() => {
                setCurrentProjectTitle('Blank project');
                setViewState('canvas');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-slate-400" />
              <span>Blank project</span>
            </button>
          </div>
        </div>

        {/* Input Card Container persis Gambar 1 */}
        <form 
          onSubmit={handleHomeSend}
          className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex flex-col justify-between min-h-[140px]"
        >
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="jalankan aplikasi"
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-hidden font-normal leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleHomeSend(e);
              }
            }}
          />

          {/* Bottom Bar: + button, [App] [Web], Palette, [Balanced], Mic, Send ArrowUp */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-2.5">
              <button 
                type="button" 
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                title="Tambahkan lampiran berkas"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* App / Web Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('app')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'app'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('web')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'web'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                type="button" 
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                title="Theme & Style Palette"
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Balanced Selector */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 cursor-pointer transition-colors">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Balanced</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              <button 
                type="button" 
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send Button (ArrowUp circle matching Gambar 1) */}
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-2xs shrink-0 cursor-pointer"
                title="Kirim (Enter)"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Engineering Disciplines Grid (9 Cards - TIDAK DIHAPUS, TETAP ADA) */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">
          Engineering Disciplines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => {
            const isSelected = selectedSubItem === card.title;
            return (
              <div
                key={card.num}
                onClick={() => handleCardClick(card.title)}
                className={`bg-white rounded-xl border p-5 transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected 
                    ? 'border-blue-500 ring-2 ring-blue-50 shadow-xs' 
                    : 'border-slate-200/80 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-amber-500 font-mono block mb-2">
                    {card.num}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Conversations Table (TIDAK DIHAPUS, TETAP ADA) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Conversations
          </h3>
          <span className="text-xs text-slate-400">History</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-6">TITLE</th>
                <th className="py-3 px-6">DISCIPLINE</th>
                <th className="py-3 px-6">LAST UPDATED</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {conversations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {item.discipline}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500 font-medium">
                    {item.lastUpdated}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors">
                      <MoreHorizontal className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
