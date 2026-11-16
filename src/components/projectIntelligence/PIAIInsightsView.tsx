import React, { useState } from 'react';
import { ProjectAIInsightItem, INITIAL_AI_INSIGHTS_DUMMY } from '../../data/projectIntelligenceData';
import { Sparkles, Send, X, AlertTriangle, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface PIAIInsightsViewProps {
  insights?: ProjectAIInsightItem[];
}

export const PIAIInsightsView: React.FC<PIAIInsightsViewProps> = ({ insights: initialInsights }) => {
  const [insightsList, setInsightsList] = useState<ProjectAIInsightItem[]>(() => {
    return initialInsights && initialInsights.length > 0 ? initialInsights : INITIAL_AI_INSIGHTS_DUMMY;
  });

  const [selectedInsight, setSelectedInsight] = useState<ProjectAIInsightItem | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);

  const promptChips = [
    'Apa risiko terbesar minggu ini?',
    'Bagaimana kemajuan proyek?',
    'RFI mana yang terlambat?'
  ];

  const handleSendPrompt = (promptText: string) => {
    const textToSend = promptText.trim();
    if (!textToSend) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    
    // Generate intelligent contextual response based on prompt
    let aiReply = '';
    const lower = textToSend.toLowerCase();

    if (lower.includes('risiko')) {
      aiReply = 'Risiko terbesar saat ini adalah keterlambatan pengadaan Chiller pada proyek HVAC RSUD (deviasi 28 hari) dan potensi hambatan pasang air laut pada pengecoran pier head Jetty.';
    } else if (lower.includes('kemajuan') || lower.includes('progres') || lower.includes('progress')) {
      aiReply = 'Secara agregat portofolio mencapai rata-rata 64.2%. Proyek Gardu Induk 150 kV Weleri melaju stabil di 72%, sedangkan Proyek Panel Distribusi telah 100% tuntas.';
    } else if (lower.includes('rfi')) {
      aiReply = 'RFI terlambat terdeteksi pada RFI-001 (Klarifikasi elevasi ducting HEPA filter RSUD) dengan batas jawab 18 April 2026 yang telah terlewati.';
    } else {
      aiReply = `Berdasarkan analisis model AI terhadap seluruh data proyek: "${textToSend}", seluruh indikator CPI/SPI menunjukkan stabilitas biaya namun memerlukan percepatan pada jalur kritis material import.`;
    }

    setChatMessages(prev => [...prev, userMsg, { sender: 'ai', text: aiReply }]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          AI Insights
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Temuan dan rekomendasi otomatis dari data proyek Anda.
        </p>
      </div>

      {/* 3 AI Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insightsList.slice(0, 3).map((item) => {
          const isHighRisk = item.category === 'Risiko tinggi';
          const isWarning = item.category === 'Perlu perhatian';
          const isOpportunity = item.category === 'Peluang';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Badge Category */}
                <div className="mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                      isHighRisk
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60'
                        : isWarning
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Card Summary */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3">
                <button
                  onClick={() => setSelectedInsight(item)}
                  className="px-3.5 py-1.5 rounded-xl border border-blue-600/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-xs font-semibold transition-colors"
                >
                  Lihat detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive AI Chat Section */}
      <div className="pt-4 space-y-3">
        {/* Chat History if any */}
        {chatMessages.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-3 max-h-60 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(chip)}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200/60 dark:border-slate-700"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Bottom Input Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendPrompt(chatInput);
            }}
            placeholder="Tanyakan sesuatu tentang proyek Anda..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
          />
          <button
            onClick={() => handleSendPrompt(chatInput)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span>Kirim</span>
          </button>
        </div>
      </div>

      {/* Modal Detail Temuan AI */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    selectedInsight.category === 'Risiko tinggi'
                      ? 'bg-rose-50 text-rose-600'
                      : selectedInsight.category === 'Perlu perhatian'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {selectedInsight.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Detail Rekomendasi AI
                </h3>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedInsight.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedInsight.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Rekomendasi Tindakan:
                </span>
                <p className="text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
                  {selectedInsight.recommendation}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <span className="font-semibold text-amber-800 dark:text-amber-400 block mb-1">
                  Analisis Dampak & Mitigasi:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedInsight.details}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
