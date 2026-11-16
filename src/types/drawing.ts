export interface DrawingProject {
  id: string;
  name: string;
  team: string;
  description: string;
  status: 'Berjalan' | 'Selesai' | 'Perencanaan';
  drawing_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DrawingItem {
  id: string;
  project_id: string;
  project_name?: string;
  title: string;
  discipline: string;
  revision: string;
  status: 'Disetujui' | 'Review' | 'Draf';
  thumbnail?: string;
  elements_json?: string;
  layers_json?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DrawingElement {
  id: string;
  type: 'line' | 'rect' | 'circle' | 'text' | 'image' | 'freedraw';
  x: number;
  y: number;
  width?: number;
  height?: number;
  x2?: number;
  y2?: number;
  radius?: number;
  text?: string;
  imageUrl?: string;
  points?: { x: number; y: number }[];
  isFavorite?: boolean;
  comment?: string;
  stroke: string;
  strokeWidth: number;
  layerId: string;
}

export interface DrawingLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

