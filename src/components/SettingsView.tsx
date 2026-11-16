import React from 'react';
import { SettingsAccountView } from './settings/SettingsAccountView';
import { SettingsOrganizationView } from './settings/SettingsOrganizationView';
import { SettingsSecurityView } from './settings/SettingsSecurityView';
import { SettingsIntegrationsView } from './settings/SettingsIntegrationsView';
import { SettingsBillingView } from './settings/SettingsBillingView';

interface SettingsProps {
  userName: string;
  userEmail: string;
  onUpdateUser: (name: string, email: string) => void;
  onAddActivity: (activity: string, module: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (subItem: string) => void;
}

export const SettingsView: React.FC<SettingsProps> = ({
  userName,
  userEmail,
  onUpdateUser,
  onAddActivity,
  selectedSubItem = 'Account',
  onSelectSubItem
}) => {
  // Normalize subItem key to handle both English and Indonesian identifiers
  const normalized = (selectedSubItem || 'Account').toLowerCase();

  const renderContent = () => {
    switch (normalized) {
      case 'account':
      case 'akun':
        return (
          <SettingsAccountView
            userName={userName}
            userEmail={userEmail}
            onUpdateUser={onUpdateUser}
            onAddActivity={onAddActivity}
          />
        );
      case 'organization':
      case 'organisasi':
        return (
          <SettingsOrganizationView
            onAddActivity={onAddActivity}
          />
        );
      case 'security':
      case 'keamanan':
        return (
          <SettingsSecurityView
            userEmail={userEmail}
            onAddActivity={onAddActivity}
          />
        );
      case 'integrations':
      case 'integrasi':
        return (
          <SettingsIntegrationsView
            userName={userName}
            userEmail={userEmail}
            onAddActivity={onAddActivity}
          />
        );
      case 'billing':
      case 'penagihan':
        return (
          <SettingsBillingView
            userEmail={userEmail}
            onAddActivity={onAddActivity}
          />
        );
      default:
        return (
          <SettingsAccountView
            userName={userName}
            userEmail={userEmail}
            onUpdateUser={onUpdateUser}
            onAddActivity={onAddActivity}
          />
        );
    }
  };

  return (
    <div className="pb-12">
      {renderContent()}
    </div>
  );
};
