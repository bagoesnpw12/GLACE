import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  Eye, 
  ArrowRight,
  Send,
  CheckCircle2,
  X,
  ShoppingCart,
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
  Cpu,
  Server,
  Shield,
  Gauge,
  Cable,
  Wrench,
  ExternalLink,
  Plus
} from 'lucide-react';
import { 
  CommerceProduct, 
  RFQItem, 
  PurchaseOrderItem, 
  OrderItem,
  INITIAL_MARKETPLACE_PRODUCTS,
  INITIAL_RFQ_ITEMS,
  INITIAL_PO_ITEMS,
  INITIAL_ORDERS_ITEMS
} from '../data/commerceData';
import { GCMarketplaceView } from './commerce/GCMarketplaceView';
import { GCAIProcurementView } from './commerce/GCAIProcurementView';
import { GCSearchByImageView } from './commerce/GCSearchByImageView';
import { GCRFQView } from './commerce/GCRFQView';
import { GCPurchaseOrdersView } from './commerce/GCPurchaseOrdersView';
import { GCOrdersView } from './commerce/GCOrdersView';

interface CommerceProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const GlaceCommerceModule: React.FC<CommerceProps> = ({ 
  onAddActivity,
  selectedSubItem,
  onSelectSubItem 
}) => {
  // Shared state across all Commerce Submodules
  const [rfqList, setRfqList] = useState<RFQItem[]>(INITIAL_RFQ_ITEMS);
  const [poList, setPoList] = useState<PurchaseOrderItem[]>(INITIAL_PO_ITEMS);
  const [orderList, setOrderList] = useState<OrderItem[]>(INITIAL_ORDERS_ITEMS);
  const [marketplaceProducts, setMarketplaceProducts] = useState<CommerceProduct[]>(INITIAL_MARKETPLACE_PRODUCTS);

  // Filter & Search state for Dashboard Overview
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Semua');
  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState<string>('Semua');

  // Modal State for Dashboard Overview
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedRfqDetail, setSelectedRfqDetail] = useState<any | null>(null);
  const [rfqSuccessToast, setRfqSuccessToast] = useState<string | null>(null);

  // Kategori Produk Unggulan persis sesuai Screenshot referensi
  const categories = [
    { id: 'semua', name: 'Semua', isIconGrid: true },
    { id: 'renewable', name: 'Renewable Energy' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'automation', name: 'Automation' },
    { id: 'network', name: 'Network Hardware' },
    { id: 'panel', name: 'Panel & Enclosure' },
    { id: 'instrumentation', name: 'Instrumentation' },
    { id: 'cabling', name: 'Cabling & Accessories' },
    { id: 'safety', name: 'Safety & Tools' },
  ];

  // Data Dummy Katalog Produk persis sesuai Gambar dan Ketentuan Prompt
  const initialProducts = [
    {
      id: 'prd-01',
      brand: 'SCHNEIDER',
      brandColor: 'text-emerald-600',
      title: 'MCB 1P 6A',
      sku: 'SKU-MCB-001',
      price: 'Rp 85.000',
      numericPrice: 85000,
      category: 'Electrical',
      imageUrl: '/assets/commerce/prd_mcb_1p.svg',
      spec: 'Miniature Circuit Breaker Domae 1 Pole 6 Ampere, Breaking Capacity 4.5kA, Standar SNI/IEC 60898-1',
      stock: '2.450 unit tersedia',
      leadTime: 'Siap kirim 24 jam'
    },
    {
      id: 'prd-02',
      brand: 'ABB',
      brandColor: 'text-red-600',
      title: 'Trafo Distribusi 250 kVA',
      sku: 'SKU-TRF-002',
      price: 'Rp 185.000.000',
      numericPrice: 185000000,
      category: 'Electrical',
      imageUrl: '/assets/commerce/prd_trafo_distribusi.svg',
      spec: 'Oil Immersed Distribution Transformer 20kV to 400V 50Hz, Loss Standard Tier 2 SPLN D3.002-1',
      stock: '4 unit di gudang',
      leadTime: '14-21 hari produksi'
    },
    {
      id: 'prd-03',
      brand: 'Prysmian',
      brandColor: 'text-slate-800 dark:text-slate-200',
      title: 'Kabel NYY 3x2.5 mm\u00B2',
      sku: 'SKU-KBL-003',
      price: 'Rp 25.000 / m',
      numericPrice: 25000,
      category: 'Cabling & Accessories',
      imageUrl: '/assets/commerce/prd_kabel_nyy.svg',
      spec: 'Kabel Tembaga Cu/PVC/PVC 0.6/1kV Tegangan Rendah Bawah Tanah, SNI 04-6629.4 / IEC 60502-1',
      stock: '15.000 meter',
      leadTime: 'Potong & kirim dalam 2 hari'
    },
    {
      id: 'prd-04',
      brand: 'SCHNEIDER',
      brandColor: 'text-emerald-600',
      title: 'Panel Listrik 400A',
      sku: 'SKU-PNL-004',
      price: 'Rp 12.500.000',
      numericPrice: 12500000,
      category: 'Panel & Enclosure',
      imageUrl: '/assets/commerce/prd_panel_listrik.svg',
      spec: 'Main Distribution Panel IP54 Indoor Powder Coated Enclosure dengan MCCB Utama 400A 3P 36kA',
      stock: '12 unit modular',
      leadTime: '7 hari kalibrasi & perakitan'
    },
    {
      id: 'prd-05',
      brand: 'Himel',
      brandColor: 'text-blue-600',
      title: 'KWH Meter Digital',
      sku: 'SKU-MTR-005',
      price: 'Rp 450.000',
      numericPrice: 450000,
      category: 'Instrumentation',
      imageUrl: '/assets/commerce/prd_kwh_meter.svg',
      spec: 'Electronic 3-Phase Energy Meter dengan RS-485 Modbus RTU, Akurasi Kelas 1.0 IEC 62053-21',
      stock: '860 unit',
      leadTime: 'Siap kirim 24 jam'
    }
  ];

  // Penawaran Diterima Dummy
  const dummyQuotations = [
    {
      no: 1,
      rfqCode: 'RFQ-2026-001',
      supplier: 'Schneider Electric',
      total: 'Rp 12.500.000',
      date: '10 Okt 2026',
      deliveryTime: '5 Hari Kerja',
      status: 'Quotation Valid'
    },
    {
      no: 2,
      rfqCode: 'RFQ-2026-002',
      supplier: 'ABB Indonesia',
      total: 'Rp 185.000.000',
      date: '8 Okt 2026',
      deliveryTime: '7 Hari Kerja',
      status: 'Quotation Valid'
    },
    {
      no: 3,
      rfqCode: 'RFQ-2026-003',
      supplier: 'Prysmian',
      total: 'Rp 25.000.000',
      date: '5 Okt 2026',
      deliveryTime: '3 Hari Kerja',
      status: 'Accepted'
    },
    {
      no: 4,
      rfqCode: 'RFQ-2026-005',
      supplier: 'Siemens',
      total: 'Rp 9.800.000',
      date: '1 Okt 2026',
      deliveryTime: '4 Hari Kerja',
      status: 'Reviewed'
    }
  ];

  // Shared Action Handlers
  const handleAddRFQ = (newRFQ: Partial<RFQItem>) => {
    const nextNum = `RFQ-${String(rfqList.length + 1).padStart(3, '0')}`;
    const created: RFQItem = {
      id: `rfq-${Date.now()}`,
      rfqNumber: newRFQ.rfqNumber || nextNum,
      title: newRFQ.title || 'Pengadaan Material Industri Baru',
      itemsCount: newRFQ.itemsCount || 1,
      status: newRFQ.status || 'Menunggu',
      date: newRFQ.date || '20 November 2026',
      supplier: newRFQ.supplier || 'PT Mitra Distribusi Industri',
      totalEstimated: newRFQ.totalEstimated || 'Rp 14.250.000',
      category: newRFQ.category || 'General'
    };

    setRfqList(prev => [created, ...prev]);
    onAddActivity(`Membuat RFQ baru: ${created.rfqNumber} - ${created.title}`, 'Glace Commerce');
    setRfqSuccessToast(`RFQ "${created.rfqNumber}" berhasil dibuat dan ditambahkan ke antrean.`);
    setTimeout(() => setRfqSuccessToast(null), 4000);
  };

  const handleUpdateRFQStatus = (id: string, status: RFQItem['status']) => {
    setRfqList(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    onAddActivity(`Mengubah status RFQ ke ${status}`, 'Glace Commerce');
  };

  const handleDeleteRFQ = (id: string) => {
    setRfqList(prev => prev.filter(item => item.id !== id));
    onAddActivity(`Menghapus RFQ`, 'Glace Commerce');
  };

  const handleCreatePO = (newPO: Partial<PurchaseOrderItem>) => {
    const nextNum = `PO-${String(poList.length + 1).padStart(3, '0')}`;
    const created: PurchaseOrderItem = {
      id: `po-${Date.now()}`,
      poNumber: newPO.poNumber || nextNum,
      supplier: newPO.supplier || 'PT Mega Baja Presisi',
      total: newPO.total || 'Rp 14.250.000',
      numericTotal: newPO.numericTotal || 14250000,
      status: newPO.status || 'Draft',
      date: newPO.date || '20 November 2026',
      rfqReference: newPO.rfqReference || 'RFQ-001',
      itemCount: newPO.itemCount || 12
    };

    setPoList(prev => [created, ...prev]);
    onAddActivity(`Menerbitkan Purchase Order: ${created.poNumber}`, 'Glace Commerce');
    setRfqSuccessToast(`Purchase Order "${created.poNumber}" berhasil diterbitkan.`);
    setTimeout(() => setRfqSuccessToast(null), 4000);
  };

  const handleUpdatePOStatus = (id: string, status: PurchaseOrderItem['status']) => {
    setPoList(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    onAddActivity(`Mengubah status PO ke ${status}`, 'Glace Commerce');
  };

  const handleDeletePO = (id: string) => {
    setPoList(prev => prev.filter(item => item.id !== id));
  };

  const handleConvertToOrder = (po: PurchaseOrderItem) => {
    const nextOrderNum = `ORD-${String(orderList.length + 1).padStart(3, '0')}`;
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNum,
      supplier: po.supplier,
      total: po.total,
      numericTotal: po.numericTotal,
      status: 'Diproses',
      etaDate: '26 November 2026',
      trackingNumber: `TRK-CARGO-${Math.floor(100000 + Math.random() * 900000)}`,
      itemsCount: po.itemCount
    };

    setOrderList(prev => [newOrder, ...prev]);
    handleUpdatePOStatus(po.id, 'Selesai');
    onAddActivity(`PO ${po.poNumber} diproses menjadi Pesanan ${newOrder.orderNumber}`, 'Glace Commerce');
    setRfqSuccessToast(`Pesanan "${newOrder.orderNumber}" berhasil diproses untuk logistik.`);
    setTimeout(() => setRfqSuccessToast(null), 4000);
  };

  const handleUpdateOrderStatus = (id: string, status: OrderItem['status']) => {
    setOrderList(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    onAddActivity(`Mengubah status pesanan ke ${status}`, 'Glace Commerce');
  };

  const handleToggleProductWishlist = (id: string) => {
    setMarketplaceProducts(prev => prev.map(item => item.id === id ? { ...item, isWishlist: !item.isWishlist } : item));
  };

  // Filter Logika Katalog Produk Dashboard
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategoryTag = 
        activeCategory === 'Semua' ? true : p.category.toLowerCase().includes(activeCategory.toLowerCase());

      const matchCategoryDrop = 
        selectedCategoryDropdown === 'Semua' ? true : p.category.toLowerCase().includes(selectedCategoryDropdown.toLowerCase());

      const matchBrand = 
        selectedBrand === 'Semua' ? true : p.brand.toLowerCase() === selectedBrand.toLowerCase();

      return matchSearch && matchCategoryTag && matchCategoryDrop && matchBrand;
    });
  }, [initialProducts, searchQuery, activeCategory, selectedCategoryDropdown, selectedBrand]);

  const handleRequestQuote = (prod: any) => {
    handleAddRFQ({
      title: `Pengadaan ${prod.title} (${prod.brand})`,
      itemsCount: 1,
      supplier: prod.brand,
      totalEstimated: prod.price,
      status: 'Menunggu',
      date: '20 November 2026'
    });
    setSelectedProduct(null);
  };

  // ROUTING VIEW BERDASARKAN selectedSubItem DARI SIDEBAR
  if (selectedSubItem === 'Marketplace') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCMarketplaceView 
          products={marketplaceProducts}
          onRequestRFQ={(prod: CommerceProduct) => {
            handleAddRFQ({
              title: `${prod.title} - ${prod.brand}`,
              itemsCount: 1,
              supplier: prod.supplier,
              totalEstimated: prod.price,
              status: 'Menunggu',
              date: '20 November 2026'
            });
          }}
          onToggleWishlist={handleToggleProductWishlist}
        />
      </div>
    );
  }

  if (selectedSubItem === 'AI Procurement') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCAIProcurementView 
          onCreateRFQFromProcurement={(rec: { title: string; supplier: string; itemsCount: number; estimatedPrice: string }) => {
            handleAddRFQ({
              title: rec.title,
              itemsCount: rec.itemsCount || 10,
              supplier: rec.supplier,
              totalEstimated: rec.estimatedPrice,
              status: 'Menunggu',
              date: '20 November 2026'
            });
          }}
        />
      </div>
    );
  }

  if (selectedSubItem === 'Search by Image') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCSearchByImageView 
          onCreateRFQFromImageSearch={(item: { title: string; supplier: string; price: string }) => {
            handleAddRFQ({
              title: item.title,
              itemsCount: 4,
              supplier: item.supplier,
              totalEstimated: item.price,
              status: 'Menunggu',
              date: '20 November 2026'
            });
          }}
        />
      </div>
    );
  }

  if (selectedSubItem === 'RFQ') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCRFQView 
          rfqList={rfqList}
          onAddRFQ={handleAddRFQ}
          onUpdateRFQStatus={handleUpdateRFQStatus}
          onDeleteRFQ={handleDeleteRFQ}
        />
      </div>
    );
  }

  if (selectedSubItem === 'Purchase Orders') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCPurchaseOrdersView 
          poList={poList}
          onCreatePO={handleCreatePO}
          onUpdatePOStatus={handleUpdatePOStatus}
          onDeletePO={handleDeletePO}
          onConvertToOrder={handleConvertToOrder}
        />
      </div>
    );
  }

  if (selectedSubItem === 'Orders') {
    return (
      <div className="space-y-6">
        {rfqSuccessToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{rfqSuccessToast}</span>
            </div>
            <button onClick={() => setRfqSuccessToast(null)} className="text-emerald-700 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <GCOrdersView 
          orderList={orderList}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      </div>
    );
  }

  // DEFAULT VIEW: GLACE COMMERCE OVERVIEW DASHBOARD
  return (
    <div className="space-y-6">
      {/* Toast Notifikasi Sukses */}
      {rfqSuccessToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-300 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium">{rfqSuccessToast}</span>
          </div>
          <button 
            onClick={() => setRfqSuccessToast(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:opacity-75"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Glace Commerce</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Platform Pengadaan Komponen Teknik, Alat Industri, dan Manajemen Pengadaan AI</p>
      </div>

      {/* Submenu Quick Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-semibold text-gray-400 mr-2">Modul Commerce:</span>
        {[
          { label: 'Overview', sub: '' },
          { label: 'Marketplace', sub: 'Marketplace' },
          { label: 'AI Procurement', sub: 'AI Procurement' },
          { label: 'Search by Image', sub: 'Search by Image' },
          { label: 'RFQ', sub: 'RFQ' },
          { label: 'Purchase Orders', sub: 'Purchase Orders' },
          { label: 'Orders', sub: 'Orders' },
        ].map((m) => (
          <button
            key={m.label}
            onClick={() => onSelectSubItem && onSelectSubItem(m.sub)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              (selectedSubItem || '') === m.sub
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Section 4: KPI Cards persis sesuai Screenshot referensi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total users</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">89,935</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total products</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">23,283.5</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400">
            <Box className="w-5 h-5" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total users</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">46,827</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Refunded */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Refunded</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">124,854</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center text-slate-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section 5: Produk Unggulan & Filter Kategori persis sesuai Screenshot */}
      <div className="bg-white dark:bg-[#13161f] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Produk Unggulan</h2>
          <p className="text-xs text-slate-400 mt-0.5">Produk pilihan untuk kebutuhan industri Anda.</p>
        </div>

        {/* Category Pills Slider / Row persis sesuai Gambar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex-shrink-0 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 ${
                  cat.isIconGrid
                    ? isActive 
                      ? 'w-24 h-24 bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'w-24 h-24 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                    : isActive
                      ? 'h-24 px-5 bg-blue-600 text-white shadow-md shadow-blue-500/20 border-transparent font-semibold'
                      : 'h-24 px-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {cat.isIconGrid ? (
                  <>
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <div className="w-2.5 h-2.5 rounded-sm bg-current opacity-90" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-current opacity-90" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-current opacity-90" />
                      <div className="w-2.5 h-2.5 rounded-sm bg-current opacity-90" />
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </>
                ) : (
                  <span className="text-xs text-center font-medium max-w-[100px] leading-snug">
                    {cat.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 6: Search & Filter Bar + Product Catalog Grid */}
      <div className="space-y-4">
        {/* Search & Filter Header persis sesuai Screenshot */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Input Cari Produk */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#13161f] border border-slate-200/90 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter Kategori Dropdown */}
            <div className="relative flex-1 sm:w-36">
              <select
                value={selectedCategoryDropdown}
                onChange={(e) => setSelectedCategoryDropdown(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white dark:bg-[#13161f] border border-slate-200/90 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <option value="Semua">Kategori</option>
                <option value="Electrical">Electrical</option>
                <option value="Panel & Enclosure">Panel & Enclosure</option>
                <option value="Instrumentation">Instrumentation</option>
                <option value="Cabling & Accessories">Cabling</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Brand Dropdown */}
            <div className="relative flex-1 sm:w-36">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white dark:bg-[#13161f] border border-slate-200/90 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <option value="Semua">Brand</option>
                <option value="SCHNEIDER">Schneider</option>
                <option value="ABB">ABB</option>
                <option value="Prysmian">Prysmian</option>
                <option value="Himel">Himel</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Tombol Filter */}
            <button
              onClick={() => {
                setActiveCategory('Semua');
                setSelectedCategoryDropdown('Semua');
                setSelectedBrand('Semua');
                setSearchQuery('');
              }}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#13161f] border border-slate-200/90 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors whitespace-nowrap"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* 5 Product Grid Cards persis sesuai Screenshot referensi */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Brand Tag kecil di atas kiri kartu */}
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${product.brandColor}`}>
                    {product.brand}
                  </span>

                  {/* Dummy Visual Gambar Teknik Produk (SVG local aset) */}
                  <div className="my-3 w-full h-32 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden p-3 group-hover:scale-[1.02] transition-transform">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Title & SKU */}
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 min-h-[32px]">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {product.sku}
                  </p>
                </div>

                {/* Price persis sesuai format screenshot */}
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {product.price}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section 7 & 8: RFQ Terbaru & Penawaran Diterima persis sesuai Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* RFQ Terbaru Card */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">RFQ Terbaru</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daftar permintaan penawaran yang Anda buat.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase border-b border-slate-100 dark:border-slate-800">
                  <th className="py-2.5 px-3">NO</th>
                  <th className="py-2.5 px-3">NAMA RFQ</th>
                  <th className="py-2.5 px-3 text-center">JUMLAH ITEM</th>
                  <th className="py-2.5 px-3 text-center">STATUS</th>
                  <th className="py-2.5 px-3">TANGGAL</th>
                  <th className="py-2.5 px-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {rfqList.slice(0, 3).map((rfq, idx) => (
                  <tr key={rfq.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{rfq.rfqNumber}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{rfq.itemsCount}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        rfq.status === 'Menunggu'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800'
                          : rfq.status === 'Diproses'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{rfq.date}</td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={() => setSelectedRfqDetail({
                          rfqCode: rfq.rfqNumber,
                          name: rfq.title,
                          itemsCount: rfq.itemsCount,
                          status: rfq.status,
                          date: rfq.date,
                          notes: 'Spesifikasi telah diverifikasi tim teknik untuk memenuhi standar IEC/SPLN.'
                        })}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Penawaran Diterima Card */}
        <div className="bg-white dark:bg-[#13161f] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Penawaran Diterima</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daftar penawaran dari supplier.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase border-b border-slate-100 dark:border-slate-800">
                  <th className="py-2.5 px-3">NO</th>
                  <th className="py-2.5 px-3">NAMA RFQ</th>
                  <th className="py-2.5 px-3">SUPPLIER</th>
                  <th className="py-2.5 px-3">TOTAL</th>
                  <th className="py-2.5 px-3">TANGGAL</th>
                  <th className="py-2.5 px-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {dummyQuotations.map((quo) => (
                  <tr key={quo.no} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-slate-400">{quo.no}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{quo.rfqCode}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{quo.supplier}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{quo.total}</td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{quo.date}</td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={() => {
                          onAddActivity(`Melihat penawaran dari ${quo.supplier} (${quo.total})`, 'Glace Commerce');
                          alert(`Detail Penawaran Resmi:\nNo: ${quo.rfqCode}\nSupplier: ${quo.supplier}\nTotal: ${quo.total}\nLead Time: ${quo.deliveryTime}`);
                        }}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Lihat Penawaran"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#13161f] rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className={`text-[10px] font-bold tracking-wider uppercase ${selectedProduct.brandColor}`}>
                  {selectedProduct.brand}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs text-slate-400">{selectedProduct.sku}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="h-44 w-full bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Harga Satuan:</span>
                  <span className="font-bold text-blue-600 text-sm">{selectedProduct.price}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Kategori:</span>
                  <span className="font-medium">{selectedProduct.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Ketersediaan Stok:</span>
                  <span className="font-medium text-emerald-600">{selectedProduct.stock}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Estimasi Pengiriman:</span>
                  <span className="font-medium">{selectedProduct.leadTime}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block mb-1">Spesifikasi Teknik:</span>
                  <p className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedProduct.spec}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleRequestQuote(selectedProduct)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Minta Penawaran (RFQ)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal RFQ */}
      {selectedRfqDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#13161f] rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                  {selectedRfqDetail.rfqCode}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {selectedRfqDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRfqDetail(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Jumlah Item:</span>
                <span className="font-semibold">{selectedRfqDetail.itemsCount} material industri</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status Tender:</span>
                <span className="font-bold text-blue-600">{selectedRfqDetail.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Tanggal Diajukan:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{selectedRfqDetail.date}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block mb-1">Catatan Proyek:</span>
                <p className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg text-slate-600 dark:text-slate-300">
                  {selectedRfqDetail.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedRfqDetail(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
