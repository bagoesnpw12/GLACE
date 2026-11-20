import React, { useState } from 'react';
import { 
  Users, 
  Box, 
  CheckCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  Eye, 
  X,
  ChevronDown,
  CheckCircle2
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
  selectedSubItem = '',
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

  // Data Katalog Produk persis sesuai Gambar Referensi 1 Kiri
  const initialProducts = [
    {
      id: 'prd-01',
      brand: 'SCHNEIDER',
      brandColor: 'text-emerald-600 dark:text-emerald-400',
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
      brandColor: 'text-red-600 dark:text-red-400',
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
      brandColor: 'text-slate-800 dark:text-zinc-200',
      title: 'Kabel NYY 3x2.5 mm²',
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
      brandColor: 'text-emerald-600 dark:text-emerald-400',
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
      brandColor: 'text-blue-600 dark:text-blue-400',
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

  // Penawaran Diterima Dummy persis sesuai Referensi 1 Kiri
  const dummyQuotations = [
    {
      no: 1,
      rfqCode: 'RFQ-2026-001',
      supplier: 'Schneider Electric',
      total: 'Rp 12.800.000',
      date: '10 Okt 2026',
      deliveryTime: '2-3 Hari Kerja',
      status: 'Reviewed'
    },
    {
      no: 2,
      rfqCode: 'RFQ-2026-002',
      supplier: 'ABB Indonesia',
      total: 'Rp 195.000.000',
      date: '8 Okt 2026',
      deliveryTime: '7 Hari Kerja',
      status: 'Reviewed'
    },
    {
      no: 3,
      rfqCode: 'RFQ-2026-003',
      supplier: 'Prysmian',
      total: 'Rp 25.800.000',
      date: '5 Okt 2026',
      deliveryTime: '24 Jam',
      status: 'Reviewed'
    },
    {
      no: 4,
      rfqCode: 'RFQ-2026-005',
      supplier: 'Siemens',
      total: 'Rp 8.880.000',
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
    setRfqSuccessToast(`RFQ "${created.rfqNumber}" berhasil dibuat.`);
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

  const filteredProducts = initialProducts.filter(p => {
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

  // ROUTING VIEW BERDASARKAN selectedSubItem DARI SIDEBAR
  if (selectedSubItem === 'Marketplace') {
    return (
      <div className="space-y-6">
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
        <GCOrdersView 
          orderList={orderList}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      </div>
    );
  }

  // DEFAULT VIEW: GLACE COMMERCE OVERVIEW (Persis Referensi 1 Kiri)
  return (
    <div className="space-y-6">
      {/* Toast Notifikasi Sukses */}
      {rfqSuccessToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-300 shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium">{rfqSuccessToast}</span>
          </div>
          <button 
            onClick={() => setRfqSuccessToast(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Glace Commerce
        </h1>
      </div>

      {/* 4 Metric KPI Cards (Persis Referensi 1 Kiri) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total users</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">89,935</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Total Products */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total products</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">23,283.5</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <Box className="w-5 h-5" />
          </div>
        </div>

        {/* Total Users (Order count in UI) */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total users</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">46,827</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Refunded */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Refunded</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-1">124,854</div>
          </div>
          <div className="text-slate-400 dark:text-zinc-500">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Produk Unggulan & Category Pills (Persis Referensi 1 Kiri) */}
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-5 shadow-2xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Produk Unggulan</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Produk pilihan untuk kebutuhan industri Anda.</p>
        </div>

        {/* Category Horizontal Slider */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                  cat.isIconGrid
                    ? isActive 
                      ? 'w-20 h-20 bg-blue-600 dark:bg-zinc-100 dark:text-zinc-900 text-white shadow-2xs font-semibold' 
                      : 'w-20 h-20 bg-white dark:bg-[#181a20] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                    : isActive
                      ? 'h-20 px-4 bg-blue-600 dark:bg-zinc-100 dark:text-zinc-900 text-white shadow-2xs font-semibold'
                      : 'h-20 px-4 bg-white dark:bg-[#181a20] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                {cat.isIconGrid ? (
                  <>
                    <div className="grid grid-cols-2 gap-1 mb-1.5">
                      <div className="w-2 h-2 rounded-xs bg-current opacity-90" />
                      <div className="w-2 h-2 rounded-xs bg-current opacity-90" />
                      <div className="w-2 h-2 rounded-xs bg-current opacity-90" />
                      <div className="w-2 h-2 rounded-xs bg-current opacity-90" />
                    </div>
                    <span className="text-[11px] font-semibold">{cat.name}</span>
                  </>
                ) : (
                  <span className="text-[11px] text-center font-medium max-w-[90px] leading-snug">
                    {cat.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar + Product Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Input Cari Produk */}
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Filter Kategori Dropdown */}
            <div className="relative flex-1 sm:w-32">
              <select
                value={selectedCategoryDropdown}
                onChange={(e) => setSelectedCategoryDropdown(e.target.value)}
                className="w-full text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="Semua">Kategori</option>
                <option value="Electrical">Electrical</option>
                <option value="Panel & Enclosure">Panel</option>
                <option value="Instrumentation">Instrumentation</option>
                <option value="Cabling & Accessories">Cabling</option>
              </select>
            </div>

            {/* Filter Brand Dropdown */}
            <div className="relative flex-1 sm:w-32">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="Semua">Brand</option>
                <option value="SCHNEIDER">Schneider</option>
                <option value="ABB">ABB</option>
                <option value="Prysmian">Prysmian</option>
                <option value="Himel">Himel</option>
              </select>
            </div>

            {/* Tombol Filter */}
            <button
              onClick={() => {
                setActiveCategory('Semua');
                setSelectedCategoryDropdown('Semua');
                setSelectedBrand('Semua');
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
            >
              <Filter className="w-3 h-3 text-slate-400 dark:text-zinc-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* 5 Product Cards Grid (Persis Referensi 1 Kiri) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-4 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className={`text-[10px] font-bold tracking-wider uppercase ${product.brandColor}`}>
                  {product.brand}
                </span>

                <div className="my-3 w-full h-28 rounded-lg bg-slate-50 dark:bg-[#181a20] border border-slate-100 dark:border-zinc-800/80 flex items-center justify-center overflow-hidden p-2 group-hover:scale-[1.02] transition-transform">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono mt-0.5">
                  {product.sku}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 block">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RFQ Terbaru & Penawaran Diterima (Persis Referensi 1 Kiri) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* RFQ Terbaru */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-5 shadow-2xs space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">RFQ Terbaru</h3>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">Daftar permintaan penawaran yang Anda buat.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">NO</th>
                  <th className="py-2.5 px-3">NAMA RFQ</th>
                  <th className="py-2.5 px-3 text-center">JUMLAH ITEM</th>
                  <th className="py-2.5 px-3 text-center">STATUS</th>
                  <th className="py-2.5 px-3">TANGGAL</th>
                  <th className="py-2.5 px-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {rfqList.slice(0, 3).map((rfq, idx) => (
                  <tr key={rfq.id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="py-3 px-3 text-slate-400 dark:text-zinc-500 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-zinc-100">{rfq.rfqNumber}</td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-zinc-400">{rfq.itemsCount}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                        rfq.status === 'Menunggu'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                          : rfq.status === 'Diproses'
                          ? 'bg-blue-50 text-blue-600 dark:bg-zinc-800 dark:text-zinc-300'
                          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-zinc-400 whitespace-nowrap">{rfq.date}</td>
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
                        className="text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 p-1 cursor-pointer"
                        title="Lihat Detail"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Penawaran Diterima */}
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] p-5 shadow-2xs space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">Penawaran Diterima</h3>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">Daftar penawaran dari supplier.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">NO</th>
                  <th className="py-2.5 px-3">NAMA RFQ</th>
                  <th className="py-2.5 px-3">SUPPLIER</th>
                  <th className="py-2.5 px-3">TOTAL</th>
                  <th className="py-2.5 px-3">TANGGAL</th>
                  <th className="py-2.5 px-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {dummyQuotations.map((quo) => (
                  <tr key={quo.no} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="py-3 px-3 text-slate-400 dark:text-zinc-500 font-mono">{quo.no}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-zinc-100 whitespace-nowrap">{quo.rfqCode}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-zinc-300 whitespace-nowrap">{quo.supplier}</td>
                    <td className="py-3 px-3 font-mono text-slate-900 dark:text-zinc-100 whitespace-nowrap">{quo.total}</td>
                    <td className="py-3 px-3 text-slate-500 dark:text-zinc-400 whitespace-nowrap">{quo.date}</td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={() => {
                          onAddActivity(`Melihat penawaran dari ${quo.supplier} (${quo.total})`, 'Glace Commerce');
                          alert(`Detail Penawaran Resmi:\nNo: ${quo.rfqCode}\nSupplier: ${quo.supplier}\nTotal: ${quo.total}\nLead Time: ${quo.deliveryTime}`);
                        }}
                        className="text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 p-1 cursor-pointer"
                        title="Lihat Penawaran"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-zinc-500">{selectedProduct.brand}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{selectedProduct.title}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="h-32 bg-slate-50 dark:bg-[#181a20] rounded-xl flex items-center justify-center p-3">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400">Harga Satuan:</span>
                <div className="text-base font-bold text-slate-900 dark:text-zinc-100">{selectedProduct.price}</div>
              </div>
              <p className="text-slate-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                {selectedProduct.spec}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddRFQ({
                    title: `Pengadaan ${selectedProduct.title} (${selectedProduct.brand})`,
                    itemsCount: 1,
                    supplier: selectedProduct.brand,
                    totalEstimated: selectedProduct.price,
                    status: 'Menunggu',
                    date: '20 November 2026'
                  });
                  setSelectedProduct(null);
                }}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                + Buat RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail RFQ */}
      {selectedRfqDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Detail Permintaan Penawaran</h3>
              <button 
                type="button" 
                onClick={() => setSelectedRfqDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Nomor RFQ:</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100">{selectedRfqDetail.rfqCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Deskripsi:</span>
                <span className="text-slate-900 dark:text-zinc-100">{selectedRfqDetail.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Jumlah Item:</span>
                <span className="text-slate-900 dark:text-zinc-100">{selectedRfqDetail.itemsCount} unit</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400">Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedRfqDetail.status}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRfqDetail(null)}
                className="px-4 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer"
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
