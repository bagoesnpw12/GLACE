import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Layers, 
  Activity, 
  Cpu, 
  X,
  RotateCw,
  ImageIcon
} from 'lucide-react';

interface AIDigitalTwinViewProps {
  assets: EngineeringAsset[];
}

export const AIDigitalTwinView: React.FC<AIDigitalTwinViewProps> = ({ assets }) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || 'ast-01');
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Layer toggles matching Screenshot 3 Left: Struktur, Mekanikal, Elektrikal, Sensor
  const [layerStruktur, setLayerStruktur] = useState(true);
  const [layerMekanikal, setLayerMekanikal] = useState(true);
  const [layerElektrikal, setLayerElektrikal] = useState(true);
  const [layerSensor, setLayerSensor] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  // Top KPI calculations matching Screenshot:
  // Total aset, Aset sehat, Perlu perhatian, Kritis
  const totalAsset = assets.length;
  const assetSehat = assets.filter(a => a.condition === 'Baik').length;
  const perluPerhatian = assets.filter(a => a.condition === 'Perlu Perhatian').length;
  const kritis = assets.filter(a => a.condition === 'Kritis').length;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Check if asset has valid 3D model
    if (!currentAsset.hasDigitalTwinModel) return;

    const width = containerRef.current.clientWidth;
    const height = 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Clean neutral background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.5, 2.8, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ground Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x94a3b8, 0xe2e8f0);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x2563eb, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const assetGroup = new THREE.Group();

    // 1. Layer Struktur (Base & Stand)
    if (layerStruktur) {
      const baseGeo = new THREE.BoxGeometry(2.4, 0.25, 1.8);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -0.85;
      assetGroup.add(baseMesh);
    }

    // 2. Layer Mekanikal / Main Body
    if (layerMekanikal) {
      if (currentAsset.category === 'Transformator') {
        const bodyGeo = new THREE.BoxGeometry(1.8, 1.4, 1.2);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.4 });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        bodyMesh.position.y = 0.05;
        assetGroup.add(bodyMesh);

        // Conservator cylinder
        const tankGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.5, 24);
        const tankMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 });
        const tankMesh = new THREE.Mesh(tankGeo, tankMat);
        tankMesh.rotation.z = Math.PI / 2;
        tankMesh.position.set(0, 1.05, 0);
        assetGroup.add(tankMesh);
      } else {
        const cylGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.8, 32);
        const cylMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, metalness: 0.6 });
        const bodyMesh = new THREE.Mesh(cylGeo, cylMat);
        bodyMesh.rotation.z = Math.PI / 2;
        bodyMesh.position.y = 0;
        assetGroup.add(bodyMesh);
      }
    }

    // 3. Layer Elektrikal (Bushing Horns / Cables)
    if (layerElektrikal && currentAsset.category === 'Transformator') {
      for (let i = -0.55; i <= 0.55; i += 0.55) {
        const bGeo = new THREE.ConeGeometry(0.08, 0.5, 16);
        const bMat = new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.2 });
        const bMesh = new THREE.Mesh(bGeo, bMat);
        bMesh.position.set(i, 1.05, 0.35);
        assetGroup.add(bMesh);
      }
    }

    // 4. Layer Sensor (Floating glowing spheres at telemetry points)
    if (layerSensor) {
      const sensorGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const sensorMat = new THREE.MeshStandardMaterial({
        color: currentAsset.healthIndex >= 85 ? 0x10b981 : currentAsset.healthIndex >= 50 ? 0xf59e0b : 0xef4444,
        emissive: currentAsset.healthIndex >= 85 ? 0x10b981 : 0xef4444,
        emissiveIntensity: 0.8
      });
      const s1 = new THREE.Mesh(sensorGeo, sensorMat);
      s1.position.set(0.7, 0.6, 0.6);
      assetGroup.add(s1);

      const s2 = new THREE.Mesh(sensorGeo, sensorMat);
      s2.position.set(-0.7, 0.6, -0.6);
      assetGroup.add(s2);
    }

    scene.add(assetGroup);

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      assetGroup.rotation.y = elapsed * 0.35;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [currentAsset, layerStruktur, layerMekanikal, layerElektrikal, layerSensor]);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Digital Twin
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Model representasi digital 3D aset, kontrol layer struktur, telemetri sensor, dan riwayat kesehatan.
          </p>
        </div>

        {/* Asset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Pilih Aset 3D:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                [{a.code}] {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 KPI Cards matching Screenshot 3 Left */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total aset</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {totalAsset}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aset sehat</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {assetSehat}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Box className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Perlu perhatian</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {perluPerhatian}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kritis</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {kritis}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Model 3D Aset Viewport, Right: Layer checkboxes & Aset Terpilih Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Model 3D Viewport matching Screenshot 3 Left */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Model 3D Aset</h3>
            <p className="text-[11px] text-slate-400">Representasi visual digital twin Three.js WebGL.</p>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[380px] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative flex items-center justify-center"
          >
            {currentAsset.hasDigitalTwinModel ? (
              <canvas ref={canvasRef} className="w-full h-full block" />
            ) : (
              // Informative Placeholder if 3D model is not available (sesuai instruksi user)
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Model 3D CAD Belum Tersedia untuk Aset Ini
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                  Placeholder informatif: Anda dapat mengunggah berkas model 3D CAD (.STEP / .GLTF) melalui menu berkas fasilitas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Layer Checkboxes & Aset Terpilih Details Card */}
        <div className="space-y-5">
          {/* Layer Panel matching Screenshot: Struktur, Mekanikal, Elektrikal, Sensor */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Layer</h3>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layerStruktur}
                  onChange={(e) => setLayerStruktur(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Struktur</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layerMekanikal}
                  onChange={(e) => setLayerMekanikal(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Mekanikal</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layerElektrikal}
                  onChange={(e) => setLayerElektrikal(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Elektrikal</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layerSensor}
                  onChange={(e) => setLayerSensor(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Sensor</span>
              </label>
            </div>
          </div>

          {/* Aset Terpilih Card matching Screenshot */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Aset Terpilih</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {currentAsset.name}
              </h4>
            </div>

            {/* Health Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 font-medium">Health</span>
                <span className="font-bold text-blue-600">{currentAsset.healthIndex}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentAsset.healthIndex}%` }}
                ></div>
              </div>
            </div>

            {/* Status & Telemetry items */}
            <div className="space-y-2 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status Operasi</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{currentAsset.operationalStatus}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Getaran (Vibration)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">1.2 mm/s</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Terakhir Dikalibrasi</span>
                <span className="font-medium text-slate-600 dark:text-slate-400">Hari ini, 08:30</span>
              </div>
            </div>

            <button
              onClick={() => setShowDetailModal(true)}
              className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Lihat Detail Telemetri Lengkap
            </button>
          </div>
        </div>
      </div>

      {/* Modal Telemetri Lengkap */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 block">{currentAsset.code}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Telemetri Lengkap & Spesifikasi Aset
                </h3>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">{currentAsset.name}</span>
                <p className="text-slate-500">Merek: {currentAsset.brand} | Model: {currentAsset.model}</p>
                <p className="text-slate-500">Lokasi: {currentAsset.location}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Spesifikasi Teknik:</span>
                <div className="space-y-1">
                  {Object.entries(currentAsset.specifications).map(([k, v], i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-semibold text-blue-600">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Indikator Kerusakan Terdeteksi:</span>
                <div className="space-y-1">
                  {currentAsset.damageIndicators.map((ind, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {ind}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
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
