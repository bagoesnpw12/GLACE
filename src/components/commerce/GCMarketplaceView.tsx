import React, { useState } from 'react';
import { CommerceProduct } from '../../data/commerceData';
import { 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Plus, 
  Check, 
  X, 
  Send,
  Zap
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

  // Kategori persis sesuai Screenshot 1 Kiri:
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Marketplace
        </h1>
      </div>

      {/* Top Search, Category Dropdown, Brand Dropdown, and Filter Button persis Screenshot */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Dropdown Semua Kategori */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
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
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
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
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Category Pills Row persis Screenshot 1 Kiri */}
      <div className="flex flex-wrap items-center gap-2">
        {categoryChips.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 font-semibold'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Metadata bar: Menampilkan 6 dari 148 hasil produk • Standar kalibrasi: IEC 61439-1 persis Screenshot */}
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>Menampilkan {filteredProducts.length} dari 148 hasil produk</span>
        <span>•</span>
        <span className="font-mono">Standar kalibrasi: IEC 61439-1</span>
      </div>

      {/* 6-Card Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) persis Screenshot 1 Kiri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Brand Header */}
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                {prod.brand}
              </div>

              {/* Product Image Box with Real Dummy Image */}
              <div className="h-44 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-4 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Supplier & Specs text persis Screenshot */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {prod.supplier}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {prod.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {prod.spec}
                </p>
              </div>
            </div>

            {/* Bottom Actions Row: [+ RFQ] & [Wishlist Icon] persis Screenshot */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRequestRFQ(prod)}
                className="flex-1 py-2 px-3 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>+ RFQ</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(prod.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  prod.isWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                    : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${prod.isWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => setDetailProduct(prod)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Detail Spesifikasi"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Produk */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 uppercase">
                  {detailProduct.brand}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {detailProduct.title}
                </h3>
                <span className="text-xs text-slate-400">{detailProduct.supplier}</span>
              </div>
              <button
                onClick={() => setDetailProduct(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-44 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800">
              <img
                src={detailProduct.imageUrl}
                alt={detailProduct.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Kategori:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{detailProduct.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Estimasi Harga Unit:</span>
                <span className="font-bold text-blue-600 text-sm">{detailProduct.price}</span>
              </div>
              <div className="py-2">
                <span className="text-slate-500 block mb-1">Spesifikasi Lengkap:</span>
                <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
                  {detailProduct.spec}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  onRequestRFQ(detailProduct);
                  setDetailProduct(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat RFQ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
