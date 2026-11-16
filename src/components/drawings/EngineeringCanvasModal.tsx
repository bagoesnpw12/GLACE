import React, { useState, useRef, useEffect } from 'react';
import { 
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
  Send,
  ArrowLeft,
  ArrowDown,
  X,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react';
import { ChatMessage } from './CoEngineerDashboardView';
import { DrawingElement } from '../../types/drawing';

interface EngineeringCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  // State elemen kanvas bersama
  canvasElements: DrawingElement[];
  setCanvasElements: React.Dispatch<React.SetStateAction<DrawingElement[]>>;
  isGeneratingImage?: boolean;
}

export const EngineeringCanvasModal: React.FC<EngineeringCanvasModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  messages,
  onSendMessage,
  canvasElements,
  setCanvasElements,
  isGeneratingImage = false
}) => {
  const [prompt, setPrompt] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTool, setActiveTool] = useState<'select' | 'hand' | 'crop' | 'draw' | 'comment' | 'image' | 'color' | 'favorite'>('select');
  const [activeColor, setActiveColor] = useState<string>('#2563eb');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isMobileChatDrawerOpen, setIsMobileChatDrawerOpen] = useState(false);

  // Pan (Hand tool) state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Free drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);

  // Dragging / Resizing selected element state
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elementStartPos, setElementStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<'se' | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });

  // Undo / Redo history
  const [history, setHistory] = useState<DrawingElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const isNearBottomRef = useRef(true);

  // Smooth scroll ke bawah
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  const handleChatScroll = () => {
    if (!chatScrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollContainerRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const nearBottom = distanceFromBottom < 100;
    isNearBottomRef.current = nearBottom;
    setShowScrollBottomBtn(!nearBottom);
  };

  // Auto scroll chat hanya jika pengguna berada di area bawah
  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom('smooth');
    }
  }, [messages, isGeneratingImage]);

  if (!isOpen) return null;

  // Simpan riwayat perubahan untuk Undo/Redo
  const pushHistory = (newElements: DrawingElement[]) => {
    const updated = history.slice(0, historyIndex + 1);
    setHistory([...updated, newElements]);
    setHistoryIndex(updated.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCanvasElements(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCanvasElements(next);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGeneratingImage) return;
    const textToSend = prompt.trim();
    setPrompt('');
    isNearBottomRef.current = true;
    onSendMessage(textToSend);
    setTimeout(() => scrollToBottom('smooth'), 50);
  };

  // Tool Handlers
  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
    if (tool === 'color') {
      setShowColorPicker(!showColorPicker);
    } else {
      setShowColorPicker(false);
    }

    if (tool === 'favorite' && selectedElementId) {
      setCanvasElements(prev => {
        const next = prev.map(el => el.id === selectedElementId ? { ...el, isFavorite: !el.isFavorite } : el);
        pushHistory(next);
        return next;
      });
    }

    if (tool === 'comment' && selectedElementId) {
      const comm = window.prompt('Tambahkan komentar teknik pada objek:', '');
      if (comm !== null) {
        setCanvasElements(prev => {
          const next = prev.map(el => el.id === selectedElementId ? { ...el, comment: comm } : el);
          pushHistory(next);
          return next;
        });
      }
    }

    if (tool === 'crop' && selectedElementId) {
      // Crop / resize objek terpilih ke proporsi 80%
      setCanvasElements(prev => {
        const next = prev.map(el => {
          if (el.id === selectedElementId) {
            return {
              ...el,
              width: Math.max(100, Math.round((el.width || 300) * 0.85)),
              height: Math.max(80, Math.round((el.height || 220) * 0.85))
            };
          }
          return el;
        });
        pushHistory(next);
        return next;
      });
    }

    if (tool === 'image') {
      // Trigger upload gambar manual dari perangkat pengguna
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const dataUrl = re.target?.result as string;
            const newImgElement: DrawingElement = {
              id: 'img_' + Date.now(),
              type: 'image',
              x: 100 - panOffset.x,
              y: 100 - panOffset.y,
              width: 360,
              height: 260,
              imageUrl: dataUrl,
              stroke: '#2563eb',
              strokeWidth: 2,
              layerId: 'layer_1'
            };
            setCanvasElements(prev => {
              const next = [...prev, newImgElement];
              pushHistory(next);
              return next;
            });
            setSelectedElementId(newImgElement.id);
            setActiveTool('select');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };

  // Canvas Mouse Events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Abaikan jika klik berasal dari toolbar atau kontrol kanan
    if ((e.target as HTMLElement).closest('aside') || (e.target as HTMLElement).closest('.canvas-controls')) {
      return;
    }

    const rect = canvasContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (activeTool === 'hand') {
      setIsPanning(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    if (activeTool === 'draw') {
      setIsDrawing(true);
      const canvasX = (clientX - panOffset.x) / (zoomLevel / 100);
      const canvasY = (clientY - panOffset.y) / (zoomLevel / 100);
      setCurrentStroke([{ x: canvasX, y: canvasY }]);
      return;
    }

    // Klik background kosong -> deselect
    if ((e.target as HTMLElement).id === 'canvas-background-area') {
      setSelectedElementId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning && activeTool === 'hand') {
      setPanOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y
      });
      return;
    }

    const rect = canvasContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (isDrawing && activeTool === 'draw') {
      const canvasX = (clientX - panOffset.x) / (zoomLevel / 100);
      const canvasY = (clientY - panOffset.y) / (zoomLevel / 100);
      setCurrentStroke(prev => [...prev, { x: canvasX, y: canvasY }]);
      return;
    }

    if (isDraggingElement && selectedElementId) {
      const deltaX = (e.clientX - dragStartPos.x) / (zoomLevel / 100);
      const deltaY = (e.clientY - dragStartPos.y) / (zoomLevel / 100);

      setCanvasElements(prev => prev.map(el => {
        if (el.id === selectedElementId) {
          return {
            ...el,
            x: Math.round(elementStartPos.x + deltaX),
            y: Math.round(elementStartPos.y + deltaY)
          };
        }
        return el;
      }));
      return;
    }

    if (isResizing && selectedElementId) {
      const deltaX = (e.clientX - resizeStart.x) / (zoomLevel / 100);
      const deltaY = (e.clientY - resizeStart.y) / (zoomLevel / 100);

      setCanvasElements(prev => prev.map(el => {
        if (el.id === selectedElementId) {
          return {
            ...el,
            width: Math.max(80, Math.round(resizeStart.w + deltaX)),
            height: Math.max(60, Math.round(resizeStart.h + deltaY))
          };
        }
        return el;
      }));
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
    }

    if (isDrawing && currentStroke.length > 1) {
      setIsDrawing(false);
      const newDrawElement: DrawingElement = {
        id: 'draw_' + Date.now(),
        type: 'freedraw',
        x: currentStroke[0].x,
        y: currentStroke[0].y,
        points: currentStroke,
        stroke: activeColor,
        strokeWidth: 3,
        layerId: 'layer_1'
      };
      setCanvasElements(prev => {
        const next = [...prev, newDrawElement];
        pushHistory(next);
        return next;
      });
      setCurrentStroke([]);
    }

    if (isDraggingElement || isResizing) {
      setIsDraggingElement(false);
      setIsResizing(false);
      pushHistory(canvasElements);
    }
  };

  // Hapus elemen terpilih
  const handleDeleteSelected = () => {
    if (!selectedElementId) return;
    setCanvasElements(prev => {
      const next = prev.filter(el => el.id !== selectedElementId);
      pushHistory(next);
      return next;
    });
    setSelectedElementId(null);
  };

  const hasElements = canvasElements && canvasElements.length > 0;
  const selectedElement = canvasElements.find(el => el.id === selectedElementId);

  return (
    <div className="w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-8.5rem)] min-h-[500px] md:min-h-[600px] bg-slate-100 dark:bg-slate-950 flex flex-col font-sans select-none overflow-hidden relative rounded-xl md:rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm animate-in fade-in duration-150">
      <div className="flex-1 relative flex overflow-hidden">
        {/* Mobile Chat Backdrop */}
        {isMobileChatDrawerOpen && (
          <div 
            onClick={() => setIsMobileChatDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-20 md:hidden backdrop-blur-xs"
          />
        )}

        {/* =========================================================================
            PANEL KIRI: PERCAKAPAN CO ENGINEER (CHAT)
            - Responsive Drawer di Mobile (< 768px)
            ========================================================================= */}
        <div className={`w-[320px] sm:w-[360px] md:w-[380px] max-w-[85vw] h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 shadow-lg shrink-0 transition-transform duration-300 md:translate-x-0 ${
          isMobileChatDrawerOpen ? 'translate-x-0 fixed md:relative left-0 top-0 bottom-0' : '-translate-x-full md:translate-x-0 absolute md:relative'
        }`}>
          {/* Chat Panel Header */}
          <div className="px-3 md:px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
                title="Kembali ke Co Engineer Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0"></span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[140px] sm:max-w-[170px]">
                {projectTitle || 'Kanvas Rekayasa Co Engineer'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Close Mobile Drawer Button */}
              <button
                type="button"
                onClick={() => setIsMobileChatDrawerOpen(false)}
                className="md:hidden text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                Sembunyikan
              </button>
              <button 
                type="button"
                onClick={onClose}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatScrollContainerRef}
            onScroll={handleChatScroll}
            className="flex-1 p-4 overflow-y-auto space-y-4 text-xs glace-chat-scroll relative"
          >
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1.5">
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-slate-900 dark:bg-blue-600 text-white px-3.5 py-2 rounded-2xl rounded-tr-xs max-w-[85%] font-medium shadow-2xs">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 p-3.5 rounded-2xl rounded-tl-xs whitespace-pre-line leading-relaxed shadow-2xs">
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* AI Image Generation Loading Indicator */}
            {isGeneratingImage && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold block">Menghasilkan gambar teknik...</span>
                  <span className="text-[11px] opacity-80">Memproses rancangan dan merender objek langsung ke kanvas.</span>
                </div>
              </div>
            )}
          </div>

          {/* Tombol Melayang "Pesan Terbaru" pada Panel Chat Kanvas */}
          {showScrollBottomBtn && (
            <div className="px-4 py-1 flex justify-center bg-transparent relative z-20">
              <button
                type="button"
                onClick={() => {
                  isNearBottomRef.current = true;
                  scrollToBottom('smooth');
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-md transition-all animate-in fade-in cursor-pointer"
                title="Scroll ke pesan terbaru"
              >
                <span>Pesan terbaru</span>
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </button>
            </div>
          )}

          {/* Canvas Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors">
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Apa yang ingin Anda ubah atau buat? (misal: 'buatkan gambar beruang')"
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 mt-1 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => handleToolChange('image')}
                    className="p-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="Sisipkan berkas gambar"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                  <button 
                    type="button" 
                    onClick={() => handleToolChange('color')}
                    className="p-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="Pilih warna"
                  >
                    <Palette className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] text-slate-700 dark:text-slate-200 font-medium cursor-pointer shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                    <span>Seimbang</span>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingImage || !prompt.trim()}
                  className="w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Kirim instruksi"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* =========================================================================
            AREA KANVAS REKAYASA (TENGAH)
            ========================================================================= */}
        <div 
          ref={canvasContainerRef}
          id="canvas-background-area"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (!touch) return;
            handleMouseDown({
              clientX: touch.clientX,
              clientY: touch.clientY,
              target: e.target
            } as any);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (!touch) return;
            handleMouseMove({
              clientX: touch.clientX,
              clientY: touch.clientY
            } as any);
          }}
          onTouchEnd={() => handleMouseUp()}
          className={`flex-1 h-full relative overflow-hidden bg-slate-50 dark:bg-slate-900 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] ${
            activeTool === 'hand' ? 'cursor-grab active:cursor-grabbing' : activeTool === 'draw' ? 'cursor-crosshair' : 'cursor-default'
          }`}
        >
          {/* Tombol Buka Chat untuk Mobile Screen */}
          <button
            type="button"
            onClick={() => setIsMobileChatDrawerOpen(true)}
            className="md:hidden absolute left-3 top-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-md text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Chat ({messages.length})</span>
          </button>
          {/* Sub-container ter-transform oleh Pan & Zoom */}
          <div 
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
              transition: isPanning ? 'none' : 'transform 0.05s ease-out',
              width: '100%',
              height: '100%'
            }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* 1. Placeholder jika belum ada elemen */}
            {!hasElements && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <div className="text-center p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xs max-w-md shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 shadow-2xs">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    Kanvas Rancangan Teknik Aktif
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Ketik instruksi pada kolom chat di sebelah kiri untuk menghasilkan rancangan, diagram P&ID, Single Line Diagram, atau komponen aplikasi interaktif secara otomatis.
                  </p>
                </div>
              </div>
            )}

            {/* 2. Render Elemen Kanvas (Gambar AI / Bentuk / Free Drawing) */}
            {canvasElements.map((el) => {
              const isSelected = el.id === selectedElementId;

              if (el.type === 'image' && el.imageUrl) {
                return (
                  <div
                    key={el.id}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                      if (activeTool === 'select') {
                        setIsDraggingElement(true);
                        setDragStartPos({ x: e.clientX, y: e.clientY });
                        setElementStartPos({ x: el.x, y: el.y });
                      }
                    }}
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: `${el.width || 360}px`,
                      height: `${el.height || 260}px`,
                    }}
                    className={`absolute pointer-events-auto rounded-xl overflow-hidden transition-shadow group ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 ring-offset-2 shadow-xl' 
                        : 'hover:ring-1 hover:ring-slate-300 shadow-md'
                    }`}
                  >
                    <img 
                      src={el.imageUrl} 
                      alt="Hasil Rancangan AI"
                      className="w-full h-full object-cover select-none pointer-events-none" 
                    />

                    {/* Metadata Badge jika favorit atau ada komentar */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                      {el.isFavorite && (
                        <span className="p-1 rounded-md bg-amber-500 text-white shadow-xs">
                          <Star className="w-3 h-3 fill-current" />
                        </span>
                      )}
                      {el.comment && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-medium backdrop-blur-xs">
                          {el.comment}
                        </span>
                      )}
                    </div>

                    {/* Resize Handle (Pojok Kanan Bawah) */}
                    {isSelected && (
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setIsResizing(true);
                          setResizeHandle('se');
                          setResizeStart({
                            x: e.clientX,
                            y: e.clientY,
                            w: el.width || 360,
                            h: el.height || 260
                          });
                        }}
                        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 border-2 border-white cursor-se-resize rounded-tl-sm shadow-xs"
                      />
                    )}
                  </div>
                );
              }

              if (el.type === 'freedraw' && el.points && el.points.length > 1) {
                const pathData = el.points.reduce((acc, pt, idx) => {
                  return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
                }, '');

                return (
                  <svg 
                    key={el.id} 
                    className="absolute inset-0 w-full h-full pointer-events-auto overflow-visible"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                    }}
                  >
                    <path
                      d={pathData}
                      fill="none"
                      stroke={el.stroke || '#2563eb'}
                      strokeWidth={el.strokeWidth || 3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`cursor-pointer ${isSelected ? 'stroke-blue-600 filter drop-shadow' : ''}`}
                    />
                  </svg>
                );
              }

              return null;
            })}

            {/* Stroke aktif saat user menggambar langsung */}
            {isDrawing && currentStroke.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <path
                  d={currentStroke.reduce((acc, pt, idx) => idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`, '')}
                  fill="none"
                  stroke={activeColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {/* =========================================================================
              MASALAH 1 TERATASI: TOOLBAR KANVAS VERTIKAL DI DALAM AREA KANVAS
              - Posisi absolute tepat di dalam canvas container (right-4, top-1/2, -translate-y-1/2)
              - Mengikuti tinggi workspace, tidak melar ke seluruh body
              ========================================================================= */}
          <aside className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl p-1 sm:p-1.5 flex flex-col gap-1 sm:gap-1.5 shadow-lg text-slate-500 dark:text-slate-400 z-30 scale-90 sm:scale-100 origin-right">
            {/* 1. Select Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('select')}
              className={`p-2 rounded-lg transition-all ${
                activeTool === 'select'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Select / Pilih Objek (V)"
            >
              <MousePointer className="w-4 h-4 fill-current" />
            </button>

            {/* 2. Hand Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('hand')}
              className={`p-2 rounded-lg transition-all ${
                activeTool === 'hand'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Hand Tool / Geser Kanvas (H)"
            >
              <Hand className="w-4 h-4" />
            </button>

            {/* 3. Crop / Resize Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('crop')}
              className={`p-2 rounded-lg transition-all ${
                activeTool === 'crop'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Crop / Potong & Resize Objek"
            >
              <Crop className="w-4 h-4" />
            </button>

            {/* 4. Draw / Pencil Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('draw')}
              className={`p-2 rounded-lg transition-all ${
                activeTool === 'draw'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Draw / Menggambar dengan Pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>

            {/* 5. Comment Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('comment')}
              className={`p-2 rounded-lg transition-all ${
                activeTool === 'comment'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Comment / Tambahkan Catatan Rekayasa"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* 6. Image Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('image')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Image / Masukkan Gambar"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* 7. Color Tool & Picker */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => handleToolChange('color')}
                className={`p-2 rounded-lg transition-all ${
                  showColorPicker
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Color / Atur Warna Garis & Objek"
              >
                <Palette className="w-4 h-4" />
              </button>

              {showColorPicker && (
                <div className="absolute right-12 top-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 shadow-xl flex gap-1.5 z-40">
                  {['#2563eb', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#0f172a'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => {
                        setActiveColor(col);
                        setShowColorPicker(false);
                        if (selectedElementId) {
                          setCanvasElements(prev => prev.map(el => el.id === selectedElementId ? { ...el, stroke: col } : el));
                        }
                      }}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-white dark:border-slate-600 shadow-2xs hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 8. Favorite Tool */}
            <button 
              type="button"
              onClick={() => handleToolChange('favorite')}
              className={`p-2 rounded-lg transition-all ${
                selectedElement?.isFavorite
                  ? 'text-amber-500 fill-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-xs'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Favorite / Tandai Objek Rekayasa"
            >
              <Star className={`w-4 h-4 ${selectedElement?.isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Tombol Hapus jika ada objek terpilih */}
            {selectedElementId && (
              <button 
                type="button"
                onClick={handleDeleteSelected}
                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border-t border-slate-100 dark:border-slate-700 pt-2"
                title="Hapus Objek Terpilih (Delete)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </aside>

          {/* =========================================================================
              KONTROL ZOOM, UNDO & REDO (POJOK KANAN BAWAH KANVAS)
              ========================================================================= */}
          <div className="canvas-controls absolute right-2 sm:right-4 bottom-2 sm:bottom-4 flex items-center gap-1 sm:gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg px-2 sm:px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 shadow-md z-30 scale-90 sm:scale-100 origin-bottom-right">
            <button 
              type="button"
              onClick={handleUndo}
              className="p-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer" 
              title="Undo"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button 
              type="button"
              onClick={handleRedo}
              className="p-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer" 
              title="Redo"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-200 dark:text-slate-700 px-1">|</span>
            
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(25, prev - 15))}
              className="p-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Perkecil Kanvas"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            
            <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 min-w-[36px] text-center">
              {zoomLevel}%
            </span>

            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(250, prev + 15))}
              className="p-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Perbesar Kanvas"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setZoomLevel(100);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="p-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Reset Tampilan (100%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
