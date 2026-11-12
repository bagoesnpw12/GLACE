import React, { useState } from 'react';
import { 
  Building2, 
  Check, 
  ShieldCheck, 
  Zap, 
  Users, 
  Lock, 
  Headphones, 
  FileCheck 
} from 'lucide-react';

interface EnterpriseProps {
  onAddActivity: (activity: string, module: string) => void;
}

export const EnterpriseSolutionsView: React.FC<EnterpriseProps> = ({ onAddActivity }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ company: '', contact: '', seats: '50+' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company) return;
    setSubmitted(true);
    onAddActivity(`Enterprise inquiry submitted for ${formData.company}`, 'Enterprise Solutions');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Enterprise Solutions</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Solusi terdedikasi untuk EPC contractor, konsultan engineering, utility provider, dan korporasi industri berskala besar.
        </p>
      </div>

      {/* Pricing Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">Free Plan</span>
            <p className="text-2xl font-bold text-slate-900 mt-4">$0 <span className="text-xs text-slate-400 font-normal">/ bulan</span></p>
            <p className="text-xs text-slate-500 mt-2">Cocok untuk engineer individu atau mahasiswa yang ingin eksplorasi tools AI.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Akses dasar Co Engineer (10 prompt/hari)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> 1 Active Project WBS Tracker</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Katalog produk Glace Commerce</li>
              <li className="flex items-center gap-2 text-slate-400 line-through">Custom API & Data Isolation</li>
            </ul>
          </div>
          <button className="mt-8 w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium cursor-default">
            Paket Saat Ini (Active)
          </button>
        </div>

        {/* Pro Engineering */}
        <div className="bg-white rounded-xl border-2 border-blue-600 p-6 shadow-md flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">Engineering Team</span>
            <p className="text-2xl font-bold text-slate-900 mt-4">$49 <span className="text-xs text-slate-400 font-normal">/ seat / bulan</span></p>
            <p className="text-xs text-slate-500 mt-2">Didesain untuk tim konsultan atau subkontraktor engineering hingga 25 orang.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Unlimited Co Engineer AI Queries</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Multi-project CPM & Cost monitoring</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Diskon harga korporat RFQ Commerce</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Modul Glace Academy penuh</li>
            </ul>
          </div>
          <button className="mt-8 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs">
            Upgrade ke Team
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-blue-400 border border-slate-700">Enterprise</span>
            <p className="text-2xl font-bold text-white mt-4">Custom <span className="text-xs text-slate-400 font-normal">SLA & On-Premise</span></p>
            <p className="text-xs text-slate-400 mt-2">Untuk EPC skala nasional, BUMN pembangkit/industri dengan standar compliance ketat.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Isolasi data pribadi (Private Cloud / On-premise)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Integrasi SAP, Primavera P6 & SCADA</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Account Manager & 24/7 SLA</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> SSO SAML 2.0 & Custom Security Policies</li>
            </ul>
          </div>
          <a href="#enterprise-form" className="mt-8 w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold text-center hover:bg-slate-100 transition-colors">
            Hubungi Tim Sales
          </a>
        </div>
      </div>

      {/* Enterprise Consultation Form */}
      <div id="enterprise-form" className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">Konsultasi Kebutuhan Enterprise PT. Glace Kreasi Digital</h2>
        <p className="text-xs text-slate-500 mb-6">Ajukan pertemuan teknis bersama Chief Engineering Advisor kami untuk arsitektur custom.</p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Terima kasih! Permintaan Enterprise untuk perusahaan <strong>{formData.company}</strong> telah diterima. Tim korporat kami akan menghubungi via email/telepon dalam 1x24 jam.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nama Perusahaan / Organisasi</label>
              <input
                type="text"
                required
                placeholder="Contoh: PT. PLN Nusantara Power"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email Resmi / WhatsApp PIC</label>
              <input
                type="email"
                required
                placeholder="pic@perusahaan.co.id"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
              >
                Kirim Pengajuan Enterprise
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

