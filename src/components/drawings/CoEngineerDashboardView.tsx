import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Send,
  Sparkles,
  ChevronRight,
  MoreHorizontal,
  Bot,
  User,
  Layout,
  ExternalLink,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileText,
  ArrowDown
} from 'lucide-react';
import { DrawingProject, DrawingItem } from '../../types/drawing';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionOffer?: {
    type: 'open_canvas';
    title: string;
  };
}

interface CoEngineerDashboardViewProps {
  drawings: DrawingItem[];
  projects: DrawingProject[];
  activities: { id: string; time: string; activity: string; status: string }[];
  onNavigateSubItem: (subItem: string) => void;
  onOpenDrawing: (drawingId: string) => void;
  onNewDrawingClick: () => void;
  onNewProjectClick: () => void;
  onImportClick: () => void;
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  onOpenCanvasExplicit?: (title?: string) => void;
  isLoading?: boolean;
}

export const CoEngineerDashboardView: React.FC<CoEngineerDashboardViewProps> = ({
  drawings,
  projects,
  activities,
  onNavigateSubItem,
  onOpenDrawing,
  onNewDrawingClick,
  onNewProjectClick,
  onImportClick,
  chatMessages,
  onSendChatMessage,
  onOpenCanvasExplicit,
  isLoading
}) => {
  const [prompt, setPrompt] = useState('');
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const isNearBottomRef = useRef(true);

  // Fungsi scroll ke pesan paling bawah secara halus
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  // Deteksi posisi scroll pengguna: apakah berada di bawah atau sedang membaca pesan lama di atas
  const handleScroll = () => {
    if (!chatScrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollContainerRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    
    // Jika jarak dari bawah > 120px, anggap pengguna sedang membaca pesan atas
    const nearBottom = distanceFromBottom < 120;
    isNearBottomRef.current = nearBottom;
    setShowScrollBottomBtn(!nearBottom);
  };

  // Auto-scroll cerdas: Ikuti pesan terbaru jika pengguna berada di area bawah
  useEffect(() => {
    if (chatMessages.length > 0) {
      if (isNearBottomRef.current) {
        scrollToBottom('smooth');
      }
    }
  }, [chatMessages]);

  // 9 Engineering Disciplines Cards matching reference screenshot & database
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

  // Recent conversations table
  const recentConversations = [
    { 
      id: '1', 
      title: 'Calculated load for Single Line Diagram Substation', 
      discipline: 'Electrical', 
      lastUpdated: '10 mins ago' 
    },
    { 
      id: '2', 
      title: 'P&ID revision comparison & valve tags detection', 
      discipline: 'Process', 
      lastUpdated: '2 hours ago' 
    },
    { 
      id: '3', 
      title: 'Civil structural beam deflection analysis (SNI 2847)', 
      discipline: 'Civil', 
      lastUpdated: '1 day ago' 
    },
    { 
      id: '4', 
      title: 'HVAC Ducting static pressure loss review', 
      discipline: 'HVAC', 
      lastUpdated: '2 days ago' 
    },
  ];

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt.trim();
    setPrompt('');
    
    // Saat user mengirim pesan, paksa kembali ke bawah
    isNearBottomRef.current = true;
    onSendChatMessage(userText);
    setTimeout(() => scrollToBottom('smooth'), 50);
  };

  const handleSelectRecent = (title: string) => {
    isNearBottomRef.current = true;
    onSendChatMessage(title);
    setTimeout(() => scrollToBottom('smooth'), 50);
  };

  const hasMessages = chatMessages && chatMessages.length > 0;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-150">
      {/* 1. Header Co Engineer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Co Engineer
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Asisten rekayasa teknik cerdas dan pusat kendali gambar operasional GLACE.
          </p>
        </div>

        {hasMessages && (
          <button
            onClick={() => onOpenCanvasExplicit && onOpenCanvasExplicit('Kanvas Desain Aktif')}
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Layout className="w-4 h-4" />
            <span>Buka Kanvas Engineering</span>
          </button>
        )}
      </div>

      {/* 2. AI Engineering Workspace Card (How can I help you today?) */}
      <div className="w-full bg-slate-50/70 dark:bg-slate-900/60 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 md:p-8 flex flex-col justify-between relative shadow-xs transition-all">
        {!hasMessages ? (
          /* Tampilan Awal: Clean Hero "How can I help you today?" */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How can I help you today?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md px-2">
              Tanyakan perhitungan beban, analisis standar SNI/ASME, pemindaian diagram P&ID, atau instruksi visualisasi rancangan teknik.
            </p>
          </div>
        ) : (
          /* Tampilan Berjalan: Riwayat Percakapan dengan Smooth Auto-Scroll & Slim Minimalist Scrollbar */
          <div className="flex-1 flex flex-col mb-4 relative min-h-[160px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Percakapan Aktif Co Engineer</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {chatMessages.length} pesan
              </span>
            </div>

            {/* Scroll Container Khusus Chat History */}
            <div 
              ref={chatScrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 max-h-[460px] overflow-y-auto pr-2 py-3 space-y-4 glace-chat-scroll"
            >
              {chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-1.5 animate-in fade-in duration-100">
                  {msg.sender === 'user' ? (
                    <div className="flex justify-end items-start gap-2.5">
                      <div className="bg-slate-900 dark:bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] md:max-w-[70%] text-xs md:text-sm shadow-xs font-medium">
                        {msg.text}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 text-xs font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-100 p-4 rounded-2xl rounded-tl-xs max-w-[90%] md:max-w-[80%] text-xs md:text-sm leading-relaxed shadow-xs space-y-3">
                        <div className="whitespace-pre-line">
                          {msg.text}
                        </div>

                        {/* Tombol Aksi Opsional jika AI mendeteksi permintaan rancangan / visualisasi teknik */}
                        {msg.actionOffer && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              Rancangan siap divisualisasikan pada kanvas teknik.
                            </span>
                            <button
                              type="button"
                              onClick={() => onOpenCanvasExplicit && onOpenCanvasExplicit(msg.actionOffer?.title)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
                            >
                              <Layout className="w-3.5 h-3.5" />
                              <span>Buka di Kanvas</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tombol Melayang "Kembali ke Pesan Terbaru" jika pengguna scroll jauh ke atas */}
            {showScrollBottomBtn && (
              <button
                type="button"
                onClick={() => {
                  isNearBottomRef.current = true;
                  scrollToBottom('smooth');
                }}
                className="absolute bottom-2 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all animate-in fade-in duration-200 cursor-pointer z-10"
                title="Scroll ke pesan terbaru"
              >
                <span>Pesan terbaru</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            )}
          </div>
        )}

        {/* Floating Input Pill: Selalu Menempel di Bagian Bawah Panel */}
        <form 
          onSubmit={handleSubmitPrompt}
          className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 flex items-center gap-3 shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shrink-0 mt-2"
        >
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Lampirkan berkas teknik"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Co Engineer anything..."
            className="flex-1 bg-transparent border-0 text-sm md:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
            title="Kirim pertanyaan"
          >
            <Send className="w-4 h-4 -rotate-45" />
          </button>
        </form>
      </div>

      {/* 3. Engineering Disciplines (9 Cards Grid) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Engineering Disciplines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.num}
              onClick={() => onNavigateSubItem(card.title)}
              className="glace-floating-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 cursor-pointer group flex flex-col justify-between min-h-[140px] shadow-xs"
            >
              <div>
                <span className="glace-card-badge text-xs font-semibold text-amber-500 dark:text-amber-400 font-mono inline-block mb-2 transform origin-left">
                  {card.num}
                </span>
                <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Conversations */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Recent Conversations
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                  <th className="py-3.5 px-6 font-semibold">TITLE</th>
                  <th className="py-3.5 px-6 font-semibold">DISCIPLINE</th>
                  <th className="py-3.5 px-6 font-semibold">LAST UPDATED</th>
                  <th className="py-3.5 px-6 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentConversations.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => handleSelectRecent(item.title)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                        {item.discipline}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs">
                      {item.lastUpdated}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRecent(item.title);
                        }}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
