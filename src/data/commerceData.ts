export interface CommerceProduct {
  id: string;
  brand: string;
  brandColor?: string;
  title: string;
  supplier: string;
  spec: string;
  price: string;
  numericPrice: number;
  category: string;
  imageUrl: string;
  efficiency?: string;
  isWishlist?: boolean;
}

export interface RFQItem {
  id: string;
  rfqNumber: string;
  title: string;
  itemsCount: number;
  status: 'Menunggu' | 'Diproses' | 'Selesai' | 'Draft';
  date: string;
  supplier?: string;
  totalEstimated?: string;
  category?: string;
}

export interface PurchaseOrderItem {
  id: string;
  poNumber: string;
  supplier: string;
  total: string;
  numericTotal: number;
  status: 'Draft' | 'Disetujui' | 'Dikirim' | 'Selesai';
  date: string;
  rfqReference?: string;
  itemCount: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  supplier: string;
  total: string;
  numericTotal: number;
  status: 'Draft' | 'Diproses' | 'Dikirim' | 'Disetujui' | 'Selesai';
  etaDate: string;
  trackingNumber: string;
  itemsCount: number;
}

// 6 Produk Marketplace persis sesuai Screenshot 1 Kiri
export const INITIAL_MARKETPLACE_PRODUCTS: CommerceProduct[] = [
  {
    id: 'mkt-01',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, IP65 Outdoor, RS485 / WLAN Smart Dongle',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: false
  },
  {
    id: 'mkt-02',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, Smart I-V Curve Diagnosis Terintegrasi',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: true
  },
  {
    id: 'mkt-03',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, AFCI DC Arc Fault Protection Tingkat Industri',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: false
  },
  {
    id: 'mkt-04',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, Grid Support Anti-Islanding IEEE 1547',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: false
  },
  {
    id: 'mkt-05',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, Desain Pendinginan Alami Tanpa Kipas Eksternal',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: false
  },
  {
    id: 'mkt-06',
    brand: 'HUAWEI FUSION',
    title: 'Three Phase Solar Inverter 50kW SUN2000',
    supplier: 'SUMBER SURYA ENERGI NUSANTARA',
    spec: 'Max efficiency 98.7%, 4 MPPT String, Garansi Pabrikan 5 Tahun Garansi Resmi',
    price: 'Rp 48.500.000',
    numericPrice: 48500000,
    category: 'Renewable Energy',
    imageUrl: '/assets/commerce/prd_solar_inverter.svg',
    efficiency: '98.7%',
    isWishlist: false
  }
];

// Data RFQ persis sesuai Screenshot 2 Kanan
export const INITIAL_RFQ_ITEMS: RFQItem[] = [
  {
    id: 'rfq-01',
    rfqNumber: 'RFQ-001',
    title: 'Pengadaan Baja Ringan & Struktur Trus CNP 125',
    itemsCount: 12,
    status: 'Diproses',
    date: '20 November 2026',
    supplier: 'PT Mega Baja Presisi',
    totalEstimated: 'Rp 14.250.000'
  },
  {
    id: 'rfq-02',
    rfqNumber: 'RFQ-002',
    title: 'Komponen Katup Tekanan Tinggi Pipa Distribusi',
    itemsCount: 35,
    status: 'Menunggu',
    date: '20 November 2026',
    supplier: 'CV Surya Teknik Logam',
    totalEstimated: 'Rp 28.600.000'
  },
  {
    id: 'rfq-03',
    rfqNumber: 'RFQ-003',
    title: 'Kabel Serat Optik Multimode Core Industri',
    itemsCount: 4,
    status: 'Selesai',
    date: '20 November 2026',
    supplier: 'PT Mitra Elektrik Nusantara',
    totalEstimated: 'Rp 14.250.000'
  },
  {
    id: 'rfq-04',
    rfqNumber: 'RFQ-004',
    title: 'Peralatan Sensor Suhu & Kalibrasi Laboratorium',
    itemsCount: 6,
    status: 'Draft',
    date: '20 November 2026',
    supplier: 'Karya Mandiri Industri',
    totalEstimated: 'Rp 8.400.000'
  },
  {
    id: 'rfq-05',
    rfqNumber: 'RFQ-005',
    title: 'Pelumas Sintesis Mesin Turbin Generator',
    itemsCount: 18,
    status: 'Selesai',
    date: '20 November 2026',
    supplier: 'PT Dinamika Komponen',
    totalEstimated: 'Rp 14.250.000'
  }
];

// Data Purchase Order persis sesuai Screenshot 3 Kiri
export const INITIAL_PO_ITEMS: PurchaseOrderItem[] = [
  {
    id: 'po-01',
    poNumber: 'PO-001',
    supplier: 'PT Mega Baja Presisi',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Draft',
    date: '20 November 2026',
    rfqReference: 'RFQ-001',
    itemCount: 12
  },
  {
    id: 'po-02',
    poNumber: 'PO-002',
    supplier: 'CV Surya Teknik Logam',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Dikirim',
    date: '20 November 2026',
    rfqReference: 'RFQ-002',
    itemCount: 35
  },
  {
    id: 'po-03',
    poNumber: 'PO-003',
    supplier: 'PT Mitra Elektrik Nusantara',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Selesai',
    date: '20 November 2026',
    rfqReference: 'RFQ-003',
    itemCount: 4
  },
  {
    id: 'po-04',
    poNumber: 'PO-004',
    supplier: 'Karya Mandiri Industri',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Draft',
    date: '20 November 2026',
    rfqReference: 'RFQ-004',
    itemCount: 6
  },
  {
    id: 'po-05',
    poNumber: 'PO-005',
    supplier: 'PT Dinamika Komponen',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Disetujui',
    date: '20 November 2026',
    rfqReference: 'RFQ-005',
    itemCount: 18
  }
];

// Data Orders persis sesuai Screenshot 3 Kanan
export const INITIAL_ORDERS_ITEMS: OrderItem[] = [
  {
    id: 'ord-01',
    orderNumber: 'ORD-001',
    supplier: 'PT Mega Baja Presisi',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Draft',
    etaDate: '20 November 2026',
    trackingNumber: 'TRK-JNE-882910',
    itemsCount: 12
  },
  {
    id: 'ord-02',
    orderNumber: 'ORD-002',
    supplier: 'CV Surya Teknik Logam',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Dikirim',
    etaDate: '20 November 2026',
    trackingNumber: 'TRK-SICEPAT-491022',
    itemsCount: 35
  },
  {
    id: 'ord-03',
    orderNumber: 'ORD-003',
    supplier: 'PT Mitra Elektrik Nusantara',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Selesai',
    etaDate: '20 November 2026',
    trackingNumber: 'TRK-CARGO-991823',
    itemsCount: 4
  },
  {
    id: 'ord-04',
    orderNumber: 'ORD-004',
    supplier: 'Karya Mandiri Industri',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Draft',
    etaDate: '20 November 2026',
    trackingNumber: 'TRK-POS-102934',
    itemsCount: 6
  },
  {
    id: 'ord-05',
    orderNumber: 'ORD-005',
    supplier: 'PT Dinamika Komponen',
    total: 'Rp 14.250.000',
    numericTotal: 14250000,
    status: 'Disetujui',
    etaDate: '20 November 2026',
    trackingNumber: 'TRK-INLOG-552918',
    itemsCount: 18
  }
];
