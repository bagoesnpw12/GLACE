import React, { useState } from 'react';
import { CommerceProduct } from '../../data/commerceData';
import { 
  Search, 
  ShoppingCart, 
  Eye, 
  X
} from 'lucide-react';

interface GCMarketplaceViewProps {
  products: CommerceProduct[];
  onRequestRFQ: (product: CommerceProduct) => void;
  onToggleWishlist: (productId: string) => void;
}

export const GCMarketplaceView: React.FC<GCMarketplaceViewProps> = ({
  products,
  onRequestRFQ,
  onToggleWishlist
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedBrand, setSelectedBrand] = useState('Semua brand');
  const [detailProduct, setDetailProduct] = useState<CommerceProduct | null>(null);

  // Kategori Chips persis sesuai Referensi 1 Kanan:
  // [Semua] [Renewable Energy] [Electrical] [Automation] [Network Hardware] [Panel & Enclosure]
  const categoryChips = [
    'Semua',
    'Renewable Energy',
    'Electrical',
    'Automation',
    'Network Hardware',
    'Panel & Enclosure'
  ];

  const filteredProducts = products.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase()) ||
      p.spec.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === 'Semua' ? true : p.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchBrand =
      selectedBrand === 'Semua brand' ? true : p.brand.toLowerCase().includes(selectedBrand.toLowerCase());

    return matchSearch && matchCategory && matchBrand;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Marketplace
        </h1>
      </div>

      {/* Top Search, Category Dropdown, Brand Dropdown, and Filter Button persis Referensi 1 Kanan */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Dropdown Semua Kategori */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua kategori</option>
            <option value="Renewable Energy">Renewable Energy</option>
            <option value="Electrical">Electrical</option>
            <option value="Automation">Automation</option>
            <option value="Network Hardware">Network Hardware</option>
            <option value="Panel & Enclosure">Panel & Enclosure</option>
          </select>

          {/* Dropdown Semua Brand */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="text-xs bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="Semua brand">Semua brand</option>
            <option value="HUAWEI FUSION">Huawei Fusion</option>
            <option value="SCHNEIDER">Schneider</option>
            <option value="ABB">ABB</option>
            <option value="Prysmian">Prysmian</option>
          </select>

          {/* Tombol Filter */}
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('Semua');
              setSelectedBrand('Semua brand');
            }}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121316] hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 cursor-pointer"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Category Pills Row persis Referensi 1 Kanan */}
      <div className="flex flex-wrap items-center gap-2">
        {categoryChips.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 dark:bg-zinc-100 dark:text-zinc-900 text-white font-semibold'
                  : 'bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Metadata bar: Menampilkan 6 dari 148 hasil produk • Standar kalibrasi: IEC 61439-1 */}
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400">
        <span>Menampilkan {filteredProducts.length} dari 148 hasil produk</span>
        <span>•</span>
        <span className="font-mono">Standar kalibrasi: IEC 61439-1</span>
      </div>

      {/* 6-Card Grid (3 Columns) persis Referensi 1 Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-xl bg-white dark:bg-[#121316] border border-slate-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-colors group"
          >
            <div>
              {/* Brand Header */}
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-200 mb-3">
                {prod.brand}
              </div>

              {/* Product Image Box with Technical Visual */}
              <div className="h-44 bg-slate-50 dark:bg-[#181a20] rounded-lg mb-4 flex items-center justify-center p-3 border border-slate-100 dark:border-zinc-800/80 overflow-hidden relative">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Supplier & Specs text persis Screenshot */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400 dark:text-zinc-500 tracking-wider">
                  {prod.supplier}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  {prod.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1">
                  {prod.spec}
                </p>
              </div>
            </div>

            {/* Bottom Actions Row: [+ RFQ] & [Preview Icon] persis Referensi 1 Kanan */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRequestRFQ(prod)}
                className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>+ RFQ</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailProduct(prod)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
                title="Lihat Detail Produk"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Product Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-zinc-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-zinc-500">{detailProduct.brand}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{detailProduct.title}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setDetailProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="h-40 bg-slate-50 dark:bg-[#181a20] rounded-xl flex items-center justify-center p-3">
                <img src={detailProduct.imageUrl} alt={detailProduct.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400">Harga Estimasi:</span>
                <div className="text-base font-bold text-slate-900 dark:text-zinc-100">{detailProduct.price}</div>
              </div>
              <p className="text-slate-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                {detailProduct.spec}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  onRequestRFQ(detailProduct);
                  setDetailProduct(null);
                }}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                + Tambah ke RFQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
