import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  MousePointer, 
  Minus, 
  Square, 
  Circle, 
  Type, 
  Hand, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Save, 
  Share2, 
  Download,
  Eye,
  EyeOff,
  Trash2,
  Check
} from 'lucide-react';
import { DrawingItem, DrawingElement, DrawingLayer } from '../../types/drawing';

interface DrawingWorkspaceViewProps {
  drawing: DrawingItem;
  onBack: () => void;
  onSave: (elements: DrawingElement[], layers: DrawingLayer[]) => Promise<void>;
}

export const DrawingWorkspaceView: React.FC<DrawingWorkspaceViewProps> = ({
  drawing,
  onBack,
  onSave
}) => {
  // Parsing initial elements & layers
  const [elements, setElements] = useState<DrawingElement[]>(() => {
    try {
      if (drawing.elements_json) {
        return JSON.parse(drawing.elements_json);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'el-1', type: 'line', x: 80, y: 80, x2: 320, y2: 80, stroke: '#2563eb', strokeWidth: 2, layerId: 'layer-1' },
      { id: 'el-2', type: 'rect', x: 80, y: 120, width: 240, height: 160, stroke: '#2563eb', strokeWidth: 2, layerId: 'layer-1' },
      { id: 'el-3', type: 'circle', x: 200, y: 350, radius: 50, stroke: '#2563eb', strokeWidth: 2, layerId: 'layer-1' },
      { id: 'el-4', type: 'text', x: 80, y: 440, text: 'Glace Engineering Unit A', stroke: '#1e293b', strokeWidth: 1, layerId: 'layer-3' }
    ];
  });

  const [layers, setLayers] = useState<DrawingLayer[]>(() => {
    try {
      if (drawing.layers_json) {
        return JSON.parse(drawing.layers_json);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'layer-1', name: 'Garis utama', visible: true, locked: false },
      { id: 'layer-2', name: 'Dimensi', visible: true, locked: false },
      { id: 'layer-3', name: 'Anotasi', visible: true, locked: false },
      { id: 'layer-4', name: 'Referensi', visible: false, locked: false },
    ];
  });

  const [activeLayerId, setActiveLayerId] = useState<string>('layer-1');
  const [currentTool, setCurrentTool] = useState<'select' | 'line' | 'rect' | 'circle' | 'text' | 'pan'>('select');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Properti
  const [strokeColor, setStrokeColor] = useState<string>('#2563eb'); // Biru (Glace Blue)
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  // Canvas View Controls
  const [zoom, setZoom] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // History for Undo/Redo
  const [history, setHistory] = useState<DrawingElement[][]>([elements]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawingShape, setCurrentDrawingShape] = useState<DrawingElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Push history state
  const pushHistory = (newElements: DrawingElement[]) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newElements);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(layers.map(l => l.id === layerId ? { ...l, visible: !l.visible } : l));
  };

  // Canvas Mouse Events
  const getCanvasCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const scale = zoom / 100;
    return {
      x: (rawX - panOffset.x) / scale,
      y: (rawY - panOffset.y) / scale
    };
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (currentTool === 'pan' || e.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    if (currentTool === 'select') return;

    const coords = getCanvasCoords(e);
    setIsDrawing(true);

    const newId = `el-${Date.now()}`;
    const newShape: DrawingElement = {
      id: newId,
      type: currentTool,
      x: coords.x,
      y: coords.y,
      x2: coords.x,
      y2: coords.y,
      width: 0,
      height: 0,
      radius: 0,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      layerId: activeLayerId,
      text: currentTool === 'text' ? 'Anotasi Baru' : undefined
    };

    setCurrentDrawingShape(newShape);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    if (!isDrawing || !currentDrawingShape) return;

    const coords = getCanvasCoords(e);

    if (currentDrawingShape.type === 'line') {
      setCurrentDrawingShape({
        ...currentDrawingShape,
        x2: coords.x,
        y2: coords.y
      });
    } else if (currentDrawingShape.type === 'rect') {
      setCurrentDrawingShape({
        ...currentDrawingShape,
        width: Math.abs(coords.x - currentDrawingShape.x),
        height: Math.abs(coords.y - currentDrawingShape.y),
        x: Math.min(coords.x, currentDrawingShape.x),
        y: Math.min(coords.y, currentDrawingShape.y)
      });
    } else if (currentDrawingShape.type === 'circle') {
      const dx = coords.x - currentDrawingShape.x;
      const dy = coords.y - currentDrawingShape.y;
      const radius = Math.sqrt(dx * dx + dy * dy);
      setCurrentDrawingShape({
        ...currentDrawingShape,
        radius
      });
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawing && currentDrawingShape) {
      const updated = [...elements, currentDrawingShape];
      pushHistory(updated);
      setIsDrawing(false);
      setCurrentDrawingShape(null);
    }
  };

  const handleSaveWorkspace = async () => {
    try {
      setIsSaving(true);
      await onSave(elements, layers);
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Export functions
  const exportAsSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${drawing.title || 'drawing'}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportAsPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${drawing.title || 'drawing'}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
    setShowExportMenu(false);
  };

  const deleteSelectedElement = () => {
    if (selectedElementId) {
      const updated = elements.filter(el => el.id !== selectedElementId);
      pushHistory(updated);
      setSelectedElementId(null);
    }
  };

  const visibleLayerIds = new Set(layers.filter(l => l.visible).map(l => l.id));

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full bg-[#f8fafc] dark:bg-[#0b0f17] select-none">
      {/* Top Bar Matching Screenshot 2 Header */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Drawing Workspace
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {drawing.title} • {drawing.discipline} ({drawing.revision})
            </p>
          </div>
        </div>

        {/* Action Buttons: Undo/Redo, Export, Bagikan, Simpan */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {selectedElementId && (
            <button
              onClick={deleteSelectedElement}
              title="Hapus Elemen Terpilih"
              className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1 z-30">
                <button
                  onClick={exportAsPNG}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Export PNG
                </button>
                <button
                  onClick={exportAsSVG}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Export SVG
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => alert(`Tautan bagikan untuk ${drawing.title} telah disalin!`)}
            className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Bagikan
          </button>

          <button
            onClick={handleSaveWorkspace}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            {showSavedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Vertical Toolbar Matching Screenshot 2 */}
        <div className="w-16 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-4 gap-3 z-10 shadow-xs">
          <button
            title="Pilih (Select)"
            onClick={() => setCurrentTool('select')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'select'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MousePointer className="w-4 h-4" />
          </button>

          <button
            title="Garis (Line)"
            onClick={() => setCurrentTool('line')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'line'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Minus className="w-4 h-4 rotate-45" />
          </button>

          <button
            title="Persegi (Rectangle)"
            onClick={() => setCurrentTool('rect')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'rect'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            title="Lingkaran (Circle)"
            onClick={() => setCurrentTool('circle')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'circle'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Circle className="w-4 h-4" />
          </button>

          <button
            title="Teks (Text)"
            onClick={() => setCurrentTool('text')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'text'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            title="Geser Canvas (Pan)"
            onClick={() => setCurrentTool('pan')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              currentTool === 'pan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Hand className="w-4 h-4" />
          </button>
        </div>

        {/* Center Drawing Canvas with Grid Background */}
        <div className="flex-1 relative overflow-hidden bg-slate-100/70 dark:bg-slate-950 flex items-center justify-center p-6">
          {/* Main White Drawing Board (Canvas) matching Screenshot 2 */}
          <div className="relative w-full h-full max-w-[1000px] max-h-[700px] bg-white rounded-xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
            <svg
              ref={svgRef}
              className={`w-full h-full ${currentTool === 'pan' ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Grid pattern background */}
              <defs>
                <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cad-grid)" />

              {/* Canvas viewport transform group */}
              <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoom / 100})`}>
                {elements.map((el) => {
                  if (!visibleLayerIds.has(el.layerId)) return null;
                  const isSelected = selectedElementId === el.id;

                  if (el.type === 'line') {
                    return (
                      <line
                        key={el.id}
                        x1={el.x}
                        y1={el.y}
                        x2={el.x2 ?? el.x + 100}
                        y2={el.y2 ?? el.y}
                        stroke={isSelected ? '#f97316' : el.stroke}
                        strokeWidth={isSelected ? el.strokeWidth + 2 : el.strokeWidth}
                        strokeLinecap="round"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTool === 'select') setSelectedElementId(el.id);
                        }}
                      />
                    );
                  }
                  if (el.type === 'rect') {
                    return (
                      <rect
                        key={el.id}
                        x={el.x}
                        y={el.y}
                        width={el.width || 40}
                        height={el.height || 40}
                        fill="transparent"
                        stroke={isSelected ? '#f97316' : el.stroke}
                        strokeWidth={isSelected ? el.strokeWidth + 2 : el.strokeWidth}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTool === 'select') setSelectedElementId(el.id);
                        }}
                      />
                    );
                  }
                  if (el.type === 'circle') {
                    return (
                      <circle
                        key={el.id}
                        cx={el.x}
                        cy={el.y}
                        r={el.radius || 30}
                        fill="transparent"
                        stroke={isSelected ? '#f97316' : el.stroke}
                        strokeWidth={isSelected ? el.strokeWidth + 2 : el.strokeWidth}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTool === 'select') setSelectedElementId(el.id);
                        }}
                      />
                    );
                  }
                  if (el.type === 'text') {
                    return (
                      <text
                        key={el.id}
                        x={el.x}
                        y={el.y}
                        fill={isSelected ? '#f97316' : el.stroke}
                        fontSize="14"
                        fontFamily="sans-serif"
                        fontWeight="600"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentTool === 'select') setSelectedElementId(el.id);
                        }}
                      >
                        {el.text || 'Teks'}
                      </text>
                    );
                  }
                  return null;
                })}

                {/* Preview active drawing shape */}
                {isDrawing && currentDrawingShape && (
                  <>
                    {currentDrawingShape.type === 'line' && (
                      <line
                        x1={currentDrawingShape.x}
                        y1={currentDrawingShape.y}
                        x2={currentDrawingShape.x2}
                        y2={currentDrawingShape.y2}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray="4 4"
                      />
                    )}
                    {currentDrawingShape.type === 'rect' && (
                      <rect
                        x={currentDrawingShape.x}
                        y={currentDrawingShape.y}
                        width={currentDrawingShape.width}
                        height={currentDrawingShape.height}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray="4 4"
                      />
                    )}
                    {currentDrawingShape.type === 'circle' && (
                      <circle
                        cx={currentDrawingShape.x}
                        cy={currentDrawingShape.y}
                        r={currentDrawingShape.radius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray="4 4"
                      />
                    )}
                  </>
                )}
              </g>
            </svg>

            {/* Bottom Right Zoom Badge Matching Screenshot 2: "Zoom 100%" */}
            <div className="absolute bottom-4 right-4 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 gap-1.5">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 10))}
                className="hover:text-blue-600 p-0.5"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span>Zoom {zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(300, zoom + 10))}
                className="hover:text-blue-600 p-0.5"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Layer & Properti Matching Screenshot 2 */}
        <div className="w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col gap-6 overflow-y-auto z-10 shadow-xs">
          {/* Layer Section */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Layer
            </h2>
            <div className="space-y-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    activeLayerId === layer.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{layer.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLayerVisibility(layer.id);
                    }}
                    className={`text-[11px] font-medium transition-colors ${
                      layer.visible
                        ? 'text-blue-600 dark:text-blue-400 hover:underline'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {layer.visible ? 'Tampil' : 'Sembunyi'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800" />

          {/* Properti Section */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Properti
            </h2>
            <div className="space-y-4 text-xs">
              {/* Warna Garis */}
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Warna garis</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: strokeColor }}
                  />
                  <select
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="bg-transparent font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="#2563eb">Biru</option>
                    <option value="#dc2626">Merah</option>
                    <option value="#16a34a">Hijau</option>
                    <option value="#0f172a">Hitam</option>
                    <option value="#d97706">Oranye</option>
                  </select>
                </div>
              </div>

              {/* Tebal Garis */}
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Tebal garis</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value) || 1)}
                    className="w-16 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-right text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-slate-400">px</span>
                </div>
              </div>

              {/* Opasitas / Grid Toggle */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <p>Klik kanvas lalu tarik mouse untuk mulai menggambar bentuk teknik.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
