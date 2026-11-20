import React from 'react';
import { EnterpriseSolutionsOverviewView } from './enterprise/EnterpriseSolutionsOverviewView';
import { EnterpriseOrganizationView } from './enterprise/EnterpriseOrganizationView';
import { EnterpriseAIView } from './enterprise/EnterpriseAIView';
import { EnterpriseIntegrationsView } from './enterprise/EnterpriseIntegrationsView';
import { EnterpriseDataView } from './enterprise/EnterpriseDataView';
import { EnterpriseGovernanceView } from './enterprise/EnterpriseGovernanceView';

interface EnterpriseProps {
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
}

export const EnterpriseSolutionsView: React.FC<EnterpriseProps> = ({ 
  onAddActivity,
  selectedSubItem = '',
  onSelectSubItem
}) => {
  // 1. SUBMENU: ORGANISASI
  if (selectedSubItem === 'Organization' || selectedSubItem === 'Organisasi') {
    return <EnterpriseOrganizationView onAddActivity={onAddActivity} />;
  }

  // 2. SUBMENU: AI PERUSAHAAN (ENTERPRISE AI)
  if (selectedSubItem === 'Enterprise AI' || selectedSubItem === 'AI Perusahaan') {
    return <EnterpriseAIView onAddActivity={onAddActivity} />;
  }

  // 3. SUBMENU: INTEGRASI (INTEGRATIONS)
  if (selectedSubItem === 'Integrations' || selectedSubItem === 'Integrasi') {
    return <EnterpriseIntegrationsView onAddActivity={onAddActivity} />;
  }

  // 4. SUBMENU: DATA
  if (selectedSubItem === 'Data') {
    return <EnterpriseDataView onAddActivity={onAddActivity} />;
  }

  // 5. SUBMENU: TATA KELOLA (GOVERNANCE)
  if (selectedSubItem === 'Governance' || selectedSubItem === 'Tata Kelola') {
    return <EnterpriseGovernanceView onAddActivity={onAddActivity} />;
  }

  // DEFAULT VIEW JIKA BELUM ADA SUBMENU TERPILIH -> OVERVIEW (SESUAI DENGAN GAMBAR REFERENSI 1 KIRI)
  return (
    <EnterpriseSolutionsOverviewView 
      onAddActivity={onAddActivity} 
      onSelectSubItem={onSelectSubItem} 
    />
  );
};
