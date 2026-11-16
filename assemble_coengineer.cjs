const fs = require('fs');

let code = fs.readFileSync('C:/Users/Bagoesnugraha/Downloads/Glace/CoEngineerModule_step588.tsx.tmp', 'utf8');

// Replace imports
const targetImport = `import { DrawingProject, DrawingItem, DrawingElement, DrawingLayer } from '../types/drawing';
import { ActivityItem } from '../types';
import { CoEngineerDashboardView } from './drawings/CoEngineerDashboardView';
import { MyDrawingsView } from './drawings/MyDrawingsView';
import { DrawingProjectsView } from './drawings/DrawingProjectsView';
import { DrawingWorkspaceView } from './drawings/DrawingWorkspaceView';`;

const replImport = `import { DrawingProject, DrawingItem, DrawingElement, DrawingLayer } from '../types/drawing';
import { ActivityItem } from '../types';
import { CoEngineerDashboardView } from './drawings/CoEngineerDashboardView';
import { MyDrawingsView } from './drawings/MyDrawingsView';
import { DrawingProjectsView } from './drawings/DrawingProjectsView';
import { DrawingWorkspaceView } from './drawings/DrawingWorkspaceView';
import { AIDrawingAssistantView } from './drawings/AIDrawingAssistantView';
import { DrawingComparisonView } from './drawings/DrawingComparisonView';
import { EngineeringIntelligenceView } from './drawings/EngineeringIntelligenceView';
import { DrawingTypesView } from './drawings/DrawingTypesView';
import { ImportExportView } from './drawings/ImportExportView';
import { DrawingControlView } from './drawings/DrawingControlView';`;

code = code.replace(targetImport, replImport);

// Replace subitems handling
const targetWorkspace = `    return (
      <DrawingWorkspaceView
        drawing={currentDrawing}
        onBack={() => {
          setActiveWorkspaceDrawingId(null);
          if (onSelectSubItem) {
            onSelectSubItem(''); // Kembali ke Dashboard Co Engineer
          }
        }}
        onSave={handleSaveDrawing}
      />
    );
  }`;

const replSubitems = `    return (
      <DrawingWorkspaceView
        drawing={currentDrawing}
        onBack={() => {
          setActiveWorkspaceDrawingId(null);
          if (onSelectSubItem) {
            onSelectSubItem('My Drawings');
          }
        }}
        onSave={handleSaveDrawing}
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
  }`;

// Note in step 588 onBack in workspace was onSelectSubItem('')
const targetWorkspaceAlt = `    return (
      <DrawingWorkspaceView
        drawing={currentDrawing}
        onBack={() => {
          setActiveWorkspaceDrawingId(null);
          if (onSelectSubItem) {
            onSelectSubItem(''); // Kembali ke Dashboard Co Engineer
          }
        }}
        onSave={handleSaveDrawing}
      />
    );
  }`;

// Let's remove AI Drawing Assistant inline component in step 588 if present
const targetInlineAI = `  // 4. AI Drawing Assistant (Asisten Menggambar AI)
  if (selectedSubItem === 'AI Drawing Assistant') {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-8 p-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI Drawing Assistant</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Tanya jawab parameter teknis, ekstraksi kuantitas bill of materials, dan verifikasi standar SNI/IEC langsung bersama AI.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!prompt.trim()) return;
              const userMsg: MessageItem = { id: String(Date.now()), role: 'user', content: prompt, timestamp: 'Baru saja' };
              const aiMsg: MessageItem = { 
                id: String(Date.now() + 1), 
                role: 'assistant', 
                content: \`Menganalisis: "\${prompt}".\\n\\n✅ Ditemukan referensi regulasi SNI 2847 / SNI 1729.\\n✅ Batas lendutan izin balok struktural: L/360 untuk beban hidup.\\n\\nApakah Anda ingin mengecek dimensi penampang pada gambar Denah Lantai 1?\`, 
                timestamp: 'Baru saja' 
              };
              setMessages(prev => [...prev, userMsg, aiMsg]);
              onAddActivity(\`AI Drawing Assistant: \${prompt.slice(0, 30)}...\`, 'Co Engineer');
              setPrompt('');
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ketik pertanyaan atau parameter gambar..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Kirim
            </button>
          </form>

          {/* Chat Messages */}
          <div className="mt-6 space-y-4 max-h-[350px] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={\`p-3.5 rounded-xl text-xs \${
                  m.role === 'user'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ml-12'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 mr-12'
                }\`}
              >
                <span className="font-semibold block mb-1">{m.role === 'user' ? 'Anda' : 'Glace AI'}:</span>
                <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }`;

code = code.replace(targetInlineAI, '');
code = code.replace(targetWorkspaceAlt, replSubitems);

fs.writeFileSync('C:/Users/Bagoesnugraha/Downloads/Glace/CoEngineerModule_restored.tsx', code, 'utf8');
console.log('Restored module file created. Length:', code.length);
