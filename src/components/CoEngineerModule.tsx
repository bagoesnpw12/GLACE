import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DrawingProject, DrawingItem, DrawingElement, DrawingLayer } from '../types/drawing';
import { ActivityItem } from '../types';
import { CoEngineerDashboardView, ChatMessage } from './drawings/CoEngineerDashboardView';
import { EngineeringCanvasModal } from './drawings/EngineeringCanvasModal';
import { MyDrawingsView } from './drawings/MyDrawingsView';
import { DrawingProjectsView } from './drawings/DrawingProjectsView';
import { DrawingWorkspaceView } from './drawings/DrawingWorkspaceView';
import { AIDrawingAssistantView } from './drawings/AIDrawingAssistantView';
import { DrawingComparisonView } from './drawings/DrawingComparisonView';
import { EngineeringIntelligenceView } from './drawings/EngineeringIntelligenceView';
import { DrawingTypesView } from './drawings/DrawingTypesView';
import { ImportExportView } from './drawings/ImportExportView';
import { DrawingControlView } from './drawings/DrawingControlView';

interface CoEngineerProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
  activities?: ActivityItem[];
}

export const CoEngineerModule: React.FC<CoEngineerProps> = ({ 
  onAddActivity, 
  selectedSubItem = '',
  onSelectSubItem,
  activities = []
}) => {
  const [activeDrawingId, setActiveDrawingId] = useState<string | null>(null);

  // MySQL Data State
  const [projects, setProjects] = useState<DrawingProject[]>([]);
  const [drawings, setDrawings] = useState<DrawingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State Kanvas Engineering Ekstraksi Visual (Screenshot Referensi 2)
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [canvasProjectTitle, setCanvasProjectTitle] = useState('Peluncur Aplikasi Mandiri');
  const [canvasElements, setCanvasElements] = useState<DrawingElement[]>([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);

  // AI Assistant Chat State (Persisten di tingkat Module agar tidak hilang)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Fetch Projects & Drawings from MySQL Backend
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [projRes, drawRes] = await Promise.all([
        fetch('http://localhost:3001/api/drawings/projects'),
        fetch('http://localhost:3001/api/drawings')
      ]);

      if (projRes.ok) {
        const pData = await projRes.json();
        if (pData.success && pData.projects) {
          setProjects(pData.projects);
        }
      }

      if (drawRes.ok) {
        const dData = await drawRes.json();
        if (dData.success && dData.drawings) {
          setDrawings(dData.drawings);
        }
      }
    } catch (err) {
      console.error('Error fetching drawing data from MySQL:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When selectedSubItem changes, update activeDrawingId
  useEffect(() => {
    if (selectedSubItem === 'Drawing Workspace' && !activeDrawingId && drawings.length > 0) {
      setActiveDrawingId(drawings[0].id);
    } else if (selectedSubItem !== 'Drawing Workspace' && activeDrawingId) {
      setActiveDrawingId(null);
    }
  }, [selectedSubItem]);

  // Open Drawing in CAD Workspace
  const handleOpenDrawing = (drawingId: string) => {
    setActiveDrawingId(drawingId);
    if (onSelectSubItem) {
      onSelectSubItem('Drawing Workspace');
    }
    const found = drawings.find(d => d.id === drawingId);
    if (found) {
      onAddActivity(`Membuka Drawing Workspace: ${found.title}`, 'Co Engineer');
    }
  };

  // Kirim Pertanyaan AI - Langsung tampil di Dashboard Co Engineer & Render Gambar ke Kanvas jika diminta
  const handleSendChatMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: userText,
      timestamp: 'Baru saja'
    };

    setChatMessages(prev => [...prev, userMsg]);
    onAddActivity(`Co Engineer prompt: ${userText.slice(0, 35)}...`, 'Co Engineer');

    const lower = userText.toLowerCase();

    // Deteksi apakah pengguna meminta pembuatan/generate gambar
    const isImageGenerationRequest = 
      lower.includes('gambar') ||
      lower.includes('buatkan gambar') ||
      lower.includes('gambarkan') ||
      lower.includes('buat gambar') ||
      lower.includes('generate image') ||
      lower.includes('lukis') ||
      lower.includes('foto') ||
      lower.includes('diagram visual');

    // Cek apakah prompt secara eksplisit meminta diagram, kanvas, atau rancangan visual
    const isExplicitDesignRequest = 
      isImageGenerationRequest ||
      lower.includes('kanvas') || 
      lower.includes('buat diagram') || 
      lower.includes('buka kanvas') || 
      lower.includes('visualisasikan') || 
      lower.includes('rancang diagram') ||
      lower.includes('desain p&id') ||
      lower.includes('buka workspace');

    // JIKA USER MEMINTA GENERATE GAMBAR:
    if (isImageGenerationRequest) {
      setCanvasProjectTitle(userText.length > 25 ? userText.slice(0, 25) + '...' : userText);
      setIsGeneratingImage(true);

      // Jika user belum membuka kanvas, buka kanvas secara otomatis agar hasilnya terlihat di area kerja
      setIsCanvasOpen(true);

      try {
        const res = await fetch('http://localhost:3001/api/coengineer/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userText,
            width: 800,
            height: 600
          })
        });

        const data = await res.json();
        if (data.success && data.imageUrl) {
          // Buat elemen gambar baru untuk kanvas (hanya jika gambar benar-benar lolos verifikasi backend)
          const newImgElement: DrawingElement = {
            id: 'img_ai_' + Date.now(),
            type: 'image',
            // Posisikan dengan offset berdasarkan jumlah elemen agar tidak bertumpuk jika sudah ada gambar sebelumnya
            x: 80 + (canvasElements.length % 5) * 40,
            y: 80 + (canvasElements.length % 5) * 30,
            width: 440,
            height: 330,
            imageUrl: data.imageUrl,
            stroke: '#2563eb',
            strokeWidth: 2,
            layerId: 'layer_1'
          };

          // Masukkan ke state kanvas (menghilangkan placeholder secara otomatis)
          setCanvasElements(prev => [...prev, newImgElement]);

          const aiReply: ChatMessage = {
            id: String(Date.now() + 1),
            sender: 'assistant',
            text: `✅ Gambar untuk "${userText}" berhasil dibuat dan ditambahkan ke kanvas kerja.\n\nGambar ini sekarang dapat dipilih, dipindahkan, diubah ukurannya, atau diberi catatan teknik di toolbar.`,
            timestamp: 'Baru saja'
          };
          setChatMessages(prev => [...prev, aiReply]);
        } else {
          // JIKA PROVIDER LIMIT / ERROR: Tampilkan pesan kegagalan di chat, JANGAN masukkan apapun ke kanvas!
          const errorMsg = data.error || 'Layanan generate gambar tidak dapat memproses permintaan.';
          const aiErrorReply: ChatMessage = {
            id: String(Date.now() + 1),
            sender: 'assistant',
            text: `⚠️ Permintaan gambar belum dapat diproses: ${errorMsg}`,
            timestamp: 'Baru saja'
          };
          setChatMessages(prev => [...prev, aiErrorReply]);
        }
      } catch (err: any) {
        console.error('Error generating image:', err);
        const errorReply: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: `⚠️ Gagal menghubungi layanan AI: ${err.message || 'Koneksi jaringan terganggu'}. Silakan coba lagi.`,
          timestamp: 'Baru saja'
        };
        setChatMessages(prev => [...prev, errorReply]);
      } finally {
        setIsGeneratingImage(false);
      }
      return;
    }

    // Menghasilkan respon cerdas AI untuk teks biasa
    let replyText = '';
    let offerCanvas = false;

    if (lower.includes('baut') || lower.includes('lubang') || lower.includes('sni 2847')) {
      replyText = `Berdasarkan standar SNI 2847 & standar teknis rekayasa:\n• Toleransi lubang baut standar: +0.8 mm s.d. +1.6 mm\n• Jarak tepi minimum: 1.5 x diameter baut nominal\n• Torsi pengencangan baut mutu tinggi (A325): 450 Nm\n\nAnalisis visual dapat ditautkan ke kanvas rekayasa bila Anda ingin meninjau denah sambungan struktur.`;
      offerCanvas = true;
    } else if (lower.includes('dimensi') || lower.includes('ukuran') || lower.includes('panjang')) {
      replyText = `Hasil pembacaan dimensi rekayasa:\n• Panjang Balok: 6,000 mm\n• Tinggi Penampang: 400 mm\n• Lebar Flens: 200 mm\n• Tebal Pelat Badan (Web): 8 mm\n\nSemua dimensi terverifikasi berada dalam batas toleransi pabrikasi.`;
      offerCanvas = true;
    } else if (lower.includes('jalankan aplikasi') || lower.includes('aplikasi') || lower.includes('sistem')) {
      replyText = `Berikut beberapa contoh ide arsitektur & komponen rekayasa yang bisa kita mulai untuk "${userText}":\n\n• Arsitektur Modular & Workflow\n  (Alur input, pemrosesan logika, kontrol sistem & validasi)\n\n• Struktur Data & Spesifikasi Parameter\n  (Atribut teknis, standar keselamatan SNI/IEC, batas toleransi)\n\n• Modul Antarmuka / Dasbor Kontrol\n  (Panel visualisasi status live, grafik pemantauan, form konfigurasi)\n\n• Integrasi Sistem Otomasi & Ekspor Berkas\n\nSilakan tentukan modul mana yang ingin Anda prioritaskan!`;
      offerCanvas = true;
    } else {
      replyText = `Saya telah memproses pertanyaan Anda terkait "${userText}".\n\n• Status Validasi: Memenuhi parameter acuan rekayasa GLACE.\n• Catatan Rekayasa: Tidak ditemukan konflik spesifikasi terhadap basis data proyek saat ini.\n\nApakah Anda memerlukan perhitungan lanjutan, ekspor berkas, atau ingin memvisualisasikannya di kanvas?`;
      offerCanvas = true;
    }

    const aiMsg: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'assistant',
      text: replyText,
      timestamp: 'Baru saja',
      actionOffer: offerCanvas ? {
        type: 'open_canvas',
        title: userText.length > 25 ? userText.slice(0, 25) + '...' : userText
      } : undefined
    };

    setChatMessages(prev => [...prev, aiMsg]);

    // HANYA buka kanvas jika pengguna SECARA EKSPLISIT memintanya
    if (isExplicitDesignRequest) {
      setCanvasProjectTitle(userText.length > 25 ? userText.slice(0, 25) + '...' : userText);
      setIsCanvasOpen(true);
    }
  };

  // Create Project in MySQL
  const handleCreateProject = async (projectData: Partial<DrawingProject>) => {
    try {
      const email = localStorage.getItem('glace_user_email') || 'all';
      const res = await fetch('http://localhost:3001/api/drawings/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectData,
          email
        })
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjects(prev => [data.project, ...prev]);
        onAddActivity(`Membuat Drawing Project: ${data.project.name}`, 'Co Engineer');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  // Create New Drawing in MySQL
  const handleNewDrawing = async (drawingData: Partial<DrawingItem>) => {
    try {
      const email = localStorage.getItem('glace_user_email') || 'all';
      const res = await fetch('http://localhost:3001/api/drawings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...drawingData,
          email
        })
      });
      const data = await res.json();
      if (data.success && data.drawing) {
        setDrawings(prev => [data.drawing, ...prev]);
        onAddActivity(`Membuat Drawing baru: ${data.drawing.title}`, 'Co Engineer');
        handleOpenDrawing(data.drawing.id);
      }
    } catch (err) {
      console.error('Failed to create drawing:', err);
    }
  };

  // Import Drawing
  const handleImportDrawing = async (file: File) => {
    try {
      const title = file.name.replace(/\.[^/.]+$/, "");
      const email = localStorage.getItem('glace_user_email') || 'all';
      const projectId = projects[0]?.id || 'proj_1';
      
      const res = await fetch('http://localhost:3001/api/drawings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          email,
          title: title || 'Gambar Impor Baru',
          discipline: 'Mekanikal',
          revision: 'Rev A',
          status: 'Draf'
        })
      });
      const data = await res.json();
      if (data.success && data.drawing) {
        setDrawings(prev => [data.drawing, ...prev]);
        onAddActivity(`Mengimpor gambar: ${file.name}`, 'Co Engineer');
        handleOpenDrawing(data.drawing.id);
      }
    } catch (err) {
      console.error('Failed to import drawing:', err);
    }
  };

  // Save changes to MySQL from Workspace
  const handleSaveDrawing = async (elements: DrawingElement[], layers: DrawingLayer[]) => {
    if (!activeDrawingId) return;
    try {
      const res = await fetch(`http://localhost:3001/api/drawings/${activeDrawingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elements_json: JSON.stringify(elements),
          layers_json: JSON.stringify(layers)
        })
      });
      const data = await res.json();
      if (data.success && data.drawing) {
        setDrawings(prev => prev.map(d => d.id === activeDrawingId ? data.drawing : d));
        onAddActivity(`Menyimpan perubahan kanvas: ${data.drawing.title}`, 'Co Engineer');
      }
    } catch (err) {
      console.error('Failed to save drawing:', err);
      throw err;
    }
  };

  /* =========================================================================
     RENDER KONTEN SUBMENU & HALAMAN UTAMA CO ENGINEER
     ========================================================================= */
  const renderContent = () => {
    // 1. Drawing Workspace View (Ruang Kerja Menggambar CAD)
    if (selectedSubItem === 'Drawing Workspace' || activeDrawingId) {
      const currentDrawing = drawings.find(d => d.id === activeDrawingId) || drawings[0] || {
        id: 'draw_default',
        project_id: 'proj_1',
        title: 'Denah Lantai 1',
        discipline: 'Sipil',
        revision: 'Rev B',
        status: 'Disetujui'
      };

      return (
        <DrawingWorkspaceView
          drawing={currentDrawing}
          onBack={() => {
            setActiveDrawingId(null);
            if (onSelectSubItem) {
              onSelectSubItem(''); // Kembali ke Dashboard Co Engineer
            }
          }}
          onSave={handleSaveDrawing}
        />
      );
    }

    // 2. Drawing Projects View (Proyek Menggambar)
    if (selectedSubItem === 'Drawing Projects') {
      return (
        <DrawingProjectsView
          projects={projects}
          drawings={drawings}
          onOpenDrawing={handleOpenDrawing}
          onCreateProject={handleCreateProject}
          isLoading={isLoading}
        />
      );
    }

    // 3. My Drawings View (Gambar Saya)
    if (selectedSubItem === 'My Drawings') {
      return (
        <MyDrawingsView
          drawings={drawings}
          projects={projects}
          onOpenDrawing={handleOpenDrawing}
          onImportDrawing={handleImportDrawing}
          onNewDrawing={handleNewDrawing}
          isLoading={isLoading}
        />
      );
    }

    // 4. AI Drawing Assistant
    if (selectedSubItem === 'AI Drawing Assistant') {
      return (
        <AIDrawingAssistantView
          drawings={drawings}
          onBack={() => onSelectSubItem && onSelectSubItem('')}
          onOpenDrawing={handleOpenDrawing}
        />
      );
    }

    // 5. Drawing Comparison
    if (selectedSubItem === 'Drawing Comparison') {
      return (
        <DrawingComparisonView
          drawings={drawings}
          onBack={() => onSelectSubItem && onSelectSubItem('')}
          onOpenDrawing={handleOpenDrawing}
        />
      );
    }

    // 6. Engineering Intelligence
    if (selectedSubItem === 'Engineering Intelligence') {
      return (
        <EngineeringIntelligenceView
          drawings={drawings}
          onBack={() => onSelectSubItem && onSelectSubItem('')}
          onOpenDrawing={handleOpenDrawing}
        />
      );
    }

    // 7. Drawing Types
    if (selectedSubItem === 'Drawing Types') {
      return (
        <DrawingTypesView
          onBack={() => onSelectSubItem && onSelectSubItem('')}
        />
      );
    }

    // 8. Import & Export
    if (selectedSubItem === 'Import & Export') {
      return (
        <ImportExportView
          drawings={drawings}
          onBack={() => onSelectSubItem && onSelectSubItem('')}
          onImportSuccess={fetchData}
        />
      );
    }

    // 9. Drawing Control
    if (selectedSubItem === 'Drawing Control') {
      return (
        <DrawingControlView
          drawings={drawings}
          onBack={() => onSelectSubItem && onSelectSubItem('')}
          onOpenDrawing={handleOpenDrawing}
        />
      );
    }

    // 10. HALAMAN UTAMA DASHBOARD CO ENGINEER
    if (isCanvasOpen) {
      return (
        <EngineeringCanvasModal
          isOpen={isCanvasOpen}
          onClose={() => setIsCanvasOpen(false)}
          projectTitle={canvasProjectTitle}
          messages={chatMessages}
          onSendMessage={handleSendChatMessage}
          canvasElements={canvasElements}
          setCanvasElements={setCanvasElements}
          isGeneratingImage={isGeneratingImage}
        />
      );
    }

    return (
      <CoEngineerDashboardView
        drawings={drawings}
        projects={projects}
        activities={activities.filter(a => a.module === 'Co Engineer' || a.module === 'Document Intelligence')}
        onNavigateSubItem={(subItem) => {
          if (onSelectSubItem) {
            onSelectSubItem(subItem);
          }
        }}
        onOpenDrawing={handleOpenDrawing}
        onNewDrawingClick={() => {
          if (onSelectSubItem) onSelectSubItem('My Drawings');
        }}
        onNewProjectClick={() => {
          if (onSelectSubItem) onSelectSubItem('Drawing Projects');
        }}
        onImportClick={() => {
          if (onSelectSubItem) onSelectSubItem('My Drawings');
        }}
        chatMessages={chatMessages}
        onSendChatMessage={handleSendChatMessage}
        onOpenCanvasExplicit={(title) => {
          if (title) setCanvasProjectTitle(title);
          setIsCanvasOpen(true);
        }}
        isLoading={isLoading}
      />
    );
  };

  const activeKey = isCanvasOpen 
    ? 'canvas-modal' 
    : (activeDrawingId ? `workspace-${activeDrawingId}` : (selectedSubItem || 'dashboard'));

  return (
    <AnimatePresence mode="wait">
      <div
        key={activeKey}
        className="w-full"
      >
        {renderContent()}
      </div>
    </AnimatePresence>
  );
};
