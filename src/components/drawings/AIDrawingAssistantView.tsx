import React, { useState } from 'react';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/motionVariants';
import { ArrowLeft, Sparkles, Send, FileText } from 'lucide-react';
import { DrawingItem } from '../../types/drawing';

interface AIDrawingAssistantViewProps {
  drawings: DrawingItem[];
  onBack?: () => void;
  onOpenDrawing?: (drawingId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AIDrawingAssistantView: React.FC<AIDrawingAssistantViewProps> = ({
  drawings,
  onBack,
  onOpenDrawing
}) => {
  const [selectedDrawingId, setSelectedDrawingId] = useState<string>(drawings[0]?.id || 'draw_1');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Berapa jumlah lubang baut pada gambar ini?'
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Saya menemukan 4 lubang baut. Posisinya sejajar simetris di gambar sebelah kanan.'
    },
    {
      id: '3',
      sender: 'user',
      text: 'Pasti daftar dimensi utama.'
    },
    {
      id: '4',
      sender: 'ai',
      text: 'Berikut dimensi utama yang terbaca: [daftar dimensi]. Mau saya ekspor ke tabel?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const selectedDrawing = drawings.find(d => d.id === selectedDrawingId) || drawings[0];

  const handleSendPrompt = async (promptToSend?: string) => {
    const text = promptToSend || inputText;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    if (!promptToSend) setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('http://localhost:3001/api/coengineer/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drawing_id: selectedDrawingId, prompt: text })
      });
      const data = await res.json();
      if (data.success && data.answer) {
        const aiMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: data.answer
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 transition-colors cursor-pointer"
          >
            <span>← Kembali ke Co Engineer</span>
          </button>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            AI Drawing Assistant
          </h1>
          {drawings.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Pilih Gambar:</span>
              <select
                value={selectedDrawingId}
                onChange={(e) => setSelectedDrawingId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                {drawings.map(d => (
                  <option key={d.id} value={d.id}>{d.title} ({d.discipline})</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Container Matching Screenshot 1 */}
      <motion.div
        variants={staggerItem}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Side: Technical Drawing Preview Canvas with 4 Bolt Holes */}
        <div className="lg:col-span-6 bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[480px]">
          <div className="relative w-full max-w-[380px] aspect-[3/4] bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-md p-6 flex flex-col justify-between">
            {/* 4 Bolts (Orange concentric circles matching screenshot) */}
            <svg className="w-full h-full" viewBox="0 0 300 400">
              {/* Outer boundary lines */}
              <rect x="25" y="25" width="250" height="350" fill="none" stroke="#2563eb" strokeWidth="2" />
              {/* Cross center dash lines */}
              <line x1="25" y1="200" x2="275" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="150" y1="25" x2="150" y2="375" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="25" y1="310" x2="275" y2="310" stroke="#2563eb" strokeWidth="1.5" />

              {/* 4 Bolts / Holes (Orange circles) */}
              {/* Top Left */}
              <circle cx="65" cy="65" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="65" cy="65" r="3" fill="#f59e0b" />

              {/* Top Right */}
              <circle cx="235" cy="65" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="235" cy="65" r="3" fill="#f59e0b" />

              {/* Bottom Left */}
              <circle cx="65" cy="340" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="65" cy="340" r="3" fill="#f59e0b" />

              {/* Bottom Right */}
              <circle cx="235" cy="340" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="235" cy="340" r="3" fill="#f59e0b" />
            </svg>
            <div className="text-center text-[11px] text-slate-400 font-medium">
              {selectedDrawing?.title || 'Fabrikasi Base Plate Baut'} • Skala 1:20
            </div>
          </div>
        </div>

        {/* Right Side: Chat Dialog & Quick Chips Matching Screenshot 1 */}
        <div className="lg:col-span-6 flex flex-col h-full min-h-[480px]">
          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-xs shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                  <span>AI sedang menganalisis gambar teknik...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Chips & Input Form (Jarak dinaikkan mendekat ke percakapan ~16-20px) */}
          <div className="mt-4 pt-1 space-y-3">
            {/* Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleSendPrompt('Ringkas gambar')}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
              >
                Ringkas gambar
              </button>
              <button
                type="button"
                onClick={() => handleSendPrompt('Cek kelengkapan dimensi')}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
              >
                Cek kelengkapan dimensi
              </button>
              <button
                type="button"
                onClick={() => handleSendPrompt('Ekstrak daftar material')}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
              >
                Ekstrak daftar material
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tulis pertanyaan tentang gambar..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-50"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

