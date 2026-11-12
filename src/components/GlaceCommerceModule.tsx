import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Send, 
  CheckCircle2, 
  Filter, 
  Tag, 
  Building,
  ArrowRight
} from 'lucide-react';

interface CommerceProps {
  onAddActivity: (activity: string, module: string) => void;
}

export const GlaceCommerceModule: React.FC<CommerceProps> = ({ onAddActivity }) => {
  const [rfqSubmitted, setRfqSubmitted] = useState<string | null>(null);

  const products = [
    { id: 'PRD-101', name: 'Schneider Electric Modicon M580 ePAC', category: 'Automation & PLC', corpPrice: '$3,850', moq: '1 unit', stock: 'In Stock' },
    { id: 'PRD-102', name: 'ABB 150kV SF6 Gas Insulated Switchgear Bay', category: 'Electrical Equipment', corpPrice: '$78,000', moq: 'Custom RFQ', stock: 'Lead time 6 wks' },
    { id: 'PRD-103', name: 'Huawei SUN2000-330KTL-H1 Solar Inverter 330kW', category: 'Renewable Energy', corpPrice: '$11,400', moq: '2 units', stock: 'In Stock' },
    { id: 'PRD-104', name: 'Cisco Catalyst 9300 Industrial Ethernet Switch', category: 'Network Hardware', corpPrice: '$2,950', moq: '1 unit', stock: 'In Stock' },
  ];

  const handleCreateRFQ = (productName: string) => {
    onAddActivity(`Created RFQ for ${productName}`, 'Glace Commerce');
    setRfqSubmitted(productName);
    setTimeout(() => setRfqSubmitted(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Glace Commerce</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pengadaan perangkat energi terbarukan, listrik, otomasi industri, dan hardware jaringan dengan harga korporat & penawaran RFQ instan.
          </p>
        </div>
      </div>

      {rfqSubmitted && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>RFQ untuk <strong>{rfqSubmitted}</strong> berhasil diajukan ke vendor mitra Glace! Status: Menunggu penawaran.</span>
        </div>
      )}

      {/* Product Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 mt-2.5 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">{item.id}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Corporate Price</span>
                  <span className="text-base font-bold text-slate-800">{item.corpPrice}</span>
                </div>
                <span className="text-[10px] font-medium text-slate-500">{item.stock}</span>
              </div>
            </div>

            <button
              onClick={() => handleCreateRFQ(item.name)}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request for Quotation (RFQ)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

