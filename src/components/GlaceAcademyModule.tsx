import React from 'react';
import { AcademyDashboardView } from './academy/AcademyDashboardView';
import { AcademyCoursesView } from './academy/AcademyCoursesView';
import { AcademyLearningPathsView } from './academy/AcademyLearningPathsView';
import { AcademyCertificationsView } from './academy/AcademyCertificationsView';
import { AcademyEngineeringLibraryView } from './academy/AcademyEngineeringLibraryView';

interface AcademyProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const GlaceAcademyModule: React.FC<AcademyProps> = ({ 
  onAddActivity,
  selectedSubItem = '',
  onSelectSubItem
}) => {
  const normalized = selectedSubItem.toLowerCase().trim();

  // 1. Submenu: Courses (Katalog Kursus Berdasarkan Referensi Gambar 1)
  if (normalized === 'courses' || normalized === 'kursus') {
    return (
      <AcademyCoursesView 
        onAddActivity={onAddActivity} 
        onSelectSubItem={onSelectSubItem} 
      />
    );
  }

  // 2. Submenu: Learning Paths (Alur Kompetensi Berdasarkan Referensi Gambar 2)
  if (normalized === 'learning paths' || normalized === 'learning-paths' || normalized === 'alur belajar') {
    return (
      <AcademyLearningPathsView 
        onAddActivity={onAddActivity} 
        onSelectSubItem={onSelectSubItem} 
      />
    );
  }

  // 3. Submenu: Certifications (Sertifikasi Berdasarkan Referensi Gambar 3)
  if (normalized === 'certifications' || normalized === 'sertifikasi') {
    return (
      <AcademyCertificationsView 
        onAddActivity={onAddActivity} 
      />
    );
  }

  // 4. Submenu: Engineering Library (Perpustakaan Teknik Berdasarkan Referensi Gambar 4)
  if (normalized === 'engineering library' || normalized === 'engineering-library' || normalized === 'perpustakaan') {
    return (
      <AcademyEngineeringLibraryView 
        onAddActivity={onAddActivity} 
      />
    );
  }

  // DEFAULT / OVERVIEW: DASHBOARD UTAMA AKADEMI GLACE
  // Ketika user mengklik nama menu utama "Akademi Glace", halaman ini yang terbuka (bukan submenu pertama!)
  return (
    <AcademyDashboardView 
      onAddActivity={onAddActivity} 
      onNavigateSubmenu={(sub) => {
        if (onSelectSubItem) onSelectSubItem(sub);
      }} 
    />
  );
};
