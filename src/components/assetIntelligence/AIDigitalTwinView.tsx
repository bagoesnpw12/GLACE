import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EngineeringAsset } from '../../data/assetIntelligenceData';
import { 
  Users, 
  Box, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

interface AIDigitalTwinViewProps {
  assets: EngineeringAsset[];
}

export const AIDigitalTwinView: React.FC<AIDigitalTwinViewProps> = ({ assets }) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || 'ast-01');

  // Layer toggles sesuai Referensi 3 Kanan: Struktur, Mekanikal, Elektrikal, Sensor
  const [layers, setLayers] = useState({
    struktur: true,
    mekanikal: true,
    elektrikal: true,
    sensor: true,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f5); // Default neutral

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.5, 2.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const gridHelper = new THREE.GridHelper(8, 16, 0xa1a1aa, 0xd4d4d8);
    gridHelper.position.y = -0.8;
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const assetGroup = new THREE.Group();

    // 1. Layer Struktur
    if (layers.struktur) {
      const baseGeo = new THREE.BoxGeometry(2.4, 0.2, 1.8);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x71717a, roughness: 0.5 });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -0.7;
      assetGroup.add(baseMesh);
    }

    // 2. Layer Mekanikal
    if (layers.mekanikal) {
      const bodyGeo = new THREE.BoxGeometry(1.6, 1.2, 1.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = 0;
      assetGroup.add(bodyMesh);
    }

    // 3. Layer Elektrikal
    if (layers.elektrikal) {
      const bushGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 12);
      const bushMat = new THREE.MeshStandardMaterial({ color: 0x9333ea });
      for (let i = -0.4; i <= 0.4; i += 0.4) {
        const b = new THREE.Mesh(bushGeo, bushMat);
        b.position.set(i, 0.9, 0);
        assetGroup.add(b);
      }
    }

    // 4. Layer Sensor
    if (layers.sensor) {
      const sGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const sMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(0.85, 0.2, 0.4);
      assetGroup.add(sMesh);
    }

    scene.add(assetGroup);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      assetGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [layers, currentAsset]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Sesuai Referensi 3 Kanan */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Digital Twin
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Kembaran digital 3D aset rekayasa, layer telemetri real-time, dan pemantauan sensor.
        </p>
      </div>

      {/* 2. Top 4 KPI Metrics Horisontal dalam 1 Panel Bergaris Tipis Sesuai Referensi 3 */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-[#23252c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              89,935
            </h3>
          </div>
          <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total products</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              23,283.5
            </h3>
          </div>
          <Box className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total users</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              46,827
            </h3>
          </div>
          <CheckCircle2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Refunded</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              124,854
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
        </div>
      </div>

      {/* 3. Area Model 3D Aset (Kiri) & Dua Panel Samping (Kanan) Sesuai Referensi 3 Kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Model 3D Aset (2 Kolom) */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Model 3D Aset</h2>
              <p className="text-[11px] text-zinc-400">{currentAsset.name} ({currentAsset.code})</p>
            </div>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18191f] text-zinc-900 dark:text-zinc-100"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.code} - {a.name}</option>
              ))}
            </select>
          </div>

          {/* Canvas Viewport 3D Three.js */}
          <div ref={containerRef} className="w-full h-80 rounded-lg bg-zinc-100/70 dark:bg-[#18191f] border border-zinc-200/70 dark:border-[#27272a] relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
        </div>

        {/* Panel Samping: Layer & Aset Terpilih (1 Kolom) */}
        <div className="space-y-6">
          {/* Panel Layer Sesuai Referensi 3 Kanan */}
          <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Layer
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { id: 'struktur', label: 'Struktur' },
                { id: 'mekanikal', label: 'Mekanikal' },
                { id: 'elektrikal', label: 'Elektrikal' },
                { id: 'sensor', label: 'Sensor' },
              ].map((layer) => (
                <label key={layer.id} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers[layer.id as keyof typeof layers]}
                    onChange={(e) => setLayers(prev => ({ ...prev, [layer.id]: e.target.checked }))}
                    className="rounded border-zinc-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{layer.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Panel Aset Terpilih Sesuai Referensi 3 Kanan */}
          <div className="rounded-xl border border-zinc-200/90 dark:border-[#23252c] bg-white dark:bg-[#121316] p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Aset Terpilih
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                [{currentAsset.name}]
              </p>
            </div>

            {/* Health Bar Sesuai Screenshot */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-zinc-500">Health</span>
                <span className="text-blue-600 dark:text-zinc-100 font-mono">{currentAsset.healthIndex}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-[#18191f] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 dark:bg-white h-full rounded-full"
                  style={{ width: `${currentAsset.healthIndex}%` }}
                />
              </div>
            </div>

            {/* Detail Telemetri Sesuai Screenshot */}
            <div className="space-y-2 text-xs pt-2 border-t border-zinc-100 dark:border-[#23252c]">
              <div className="flex justify-between">
                <span className="text-zinc-500">Status Operasi</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{currentAsset.operationalStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Getaran (Vibration)</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">1.12 mm/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Terakhir Dikalibrasi</span>
                <span className="font-mono text-zinc-500">Hari ini, 08:30</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert(`Detail telemetri ${currentAsset.name}`)}
                className="w-full py-1.5 rounded-lg border border-zinc-200 dark:border-[#27272a] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#18191f] cursor-pointer transition-colors"
              >
                Lihat Detail Telemetri Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
