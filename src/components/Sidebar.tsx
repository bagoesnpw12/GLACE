import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  BarChart3, 
  Activity, 
  FileText, 
  ShoppingCart, 
  GraduationCap, 
  Building2, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  Globe,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
  onViewLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedSubItem,
  onSelectSubItem,
  onViewLanding,
}) => {
  // Submenu configuration
  const subItemsMap: Record<string, string[]> = {
    'co-engineer': [
      'My Drawings',
      'Drawing Projects',
      'Drawing Workspace',
      'AI Drawing Assistant',
      'Drawing Comparison',
      'Engineering Intelligence',
      'Drawing Types',
      'Import & Export',
      'Drawing Control',
    ],
    'project-intelligence': [
      'Projects',
      'Project Control',
      'Tasks & Issues',
      'RFI & Submittals',
      'AI Insights',
      'Reports',
    ],
    'asset-intelligence': [
      'Asset Register',
      'Asset Health',
      'Inspection',
      'Maintenance',
      'Digital Twin',
      'Field Operations',
    ],
    'document-intelligence': [
      'Documents',
      'Drawings',
      'Document Control',
      'AI Search',
      'AI Comparison',
      'Knowledge Base',
    ],
    'glace-commerce': [
      'Marketplace',
      'AI Procurement',
      'Search by Image',
      'RFQ',
      'Purchase Orders',
      'Orders',
    ],
    'glace-academy': [
      'Courses',
      'Learning Paths',
      'Certifications',
      'Engineering Library',
    ],
    'enterprise-solutions': [
      'Organization',
      'Enterprise AI',
      'Integrations',
      'Data',
      'Governance',
    ],
    'settings': [
      'Account',
      'Organization',
      'Security',
      'Integrations',
      'Billing',
    ],
  };

  // Submenu state
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    'co-engineer': false,
    'project-intelligence': false,
    'asset-intelligence': false,
    'document-intelligence': false,
    'glace-commerce': false,
    'glace-academy': false,
    'enterprise-solutions': false,
    'settings': false,
  });

  const clickTimeoutRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (selectedSubItem && currentTab && subItemsMap[currentTab]?.includes(selectedSubItem)) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [currentTab]: true,
      }));
    }
  }, [currentTab, selectedSubItem]);

  const toggleSubmenu = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleMenuClick = (itemId: string, hasSub: boolean) => {
    if (!hasSub) {
      onSelectTab(itemId);
      return;
    }

    if (clickTimeoutRef.current[itemId]) {
      clearTimeout(clickTimeoutRef.current[itemId]);
      clickTimeoutRef.current[itemId] = null;

      setOpenSubmenus((prev) => ({
        ...prev,
        [itemId]: !prev[itemId],
      }));
    } else {
      clickTimeoutRef.current[itemId] = setTimeout(() => {
        onSelectTab(itemId);
        clickTimeoutRef.current[itemId] = null;
      }, 250);
    }
  };

  const handleSubItemClick = (parentTabId: string, subName: string) => {
    onSelectTab(parentTabId);
    if (onSelectSubItem) {
      onSelectSubItem(subName);
    }
    setOpenSubmenus((prev) => ({
      ...prev,
      [parentTabId]: true,
    }));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'co-engineer', 
      label: 'Co Engineer', 
      icon: Bot, 
      hasSub: true,
      subItems: subItemsMap['co-engineer'],
    },
    { 
      id: 'project-intelligence', 
      label: 'Project Intelligence', 
      icon: BarChart3, 
      hasSub: true,
      subItems: subItemsMap['project-intelligence'],
    },
    { 
      id: 'asset-intelligence', 
      label: 'Asset Intelligence', 
      icon: Activity, 
      hasSub: true,
      subItems: subItemsMap['asset-intelligence'],
    },
    { 
      id: 'document-intelligence', 
      label: 'Document Intelligence', 
      icon: FileText, 
      hasSub: true,
      subItems: subItemsMap['document-intelligence'],
    },
    { 
      id: 'glace-commerce', 
      label: 'Glace Commerce', 
      icon: ShoppingCart, 
      hasSub: true,
      subItems: subItemsMap['glace-commerce'],
    },
    { 
      id: 'glace-academy', 
      label: 'Glace Academy', 
      icon: GraduationCap, 
      hasSub: true,
      subItems: subItemsMap['glace-academy'],
    },
    { 
      id: 'enterprise-solutions', 
      label: 'Enterprise Solutions', 
      icon: Building2, 
      hasSub: true,
      subItems: subItemsMap['enterprise-solutions'],
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      hasSub: true,
      subItems: subItemsMap['settings'],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Scrollable Nav Area (Menu List) */}
      <div className="flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold tracking-tighter text-base shadow-sm">
              <span className="italic">//</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">Glace</span>
          </div>
          <button 
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            title="Toggle Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isSubmenuOpen = !!openSubmenus[item.id];

            return (
              <div key={item.id} className="space-y-1">
                <div
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleMenuClick(item.id, !!item.hasSub)}
                    className="flex-1 flex items-center gap-3 text-left focus:outline-hidden"
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>

                  {item.hasSub && (
                    <button
                      type="button"
                      onClick={(e) => toggleSubmenu(item.id, e)}
                      className={`p-1 -mr-1 rounded-md transition-colors hover:bg-slate-200/50 ${
                        isActive ? 'text-blue-600 hover:bg-blue-100/50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSubmenuOpen ? `Tutup submenu ${item.label}` : `Buka submenu ${item.label}`}
                    >
                      {isSubmenuOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {item.hasSub && isSubmenuOpen && item.subItems && (
                  <div className="pl-9 pr-2 py-1 space-y-0.5 border-l-2 border-blue-100 ml-4">
                    {item.subItems.map((sub) => {
                      const isSubSelected = currentTab === item.id && selectedSubItem === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => handleSubItemClick(item.id, sub)}
                          className={`w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium transition-colors ${
                            isSubSelected
                              ? 'text-blue-600 bg-blue-50/70 font-semibold'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bagian Bawah Sidebar (Card Glace Workspace Sebagai Tombol Navigasi Landing Page Utama) */}
      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        <button
          type="button"
          onClick={onViewLanding}
          className="w-full p-3 rounded-xl bg-slate-50/90 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-200 transition-all flex items-center gap-3 text-left group cursor-pointer shadow-2xs"
          title="Buka Landing Page Publik Glace"
        >
          {/* Logo / Ikon Globe */}
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 group-hover:border-blue-300 shadow-2xs flex items-center justify-center font-bold text-xs text-slate-700 group-hover:text-blue-600 transition-colors shrink-0">
            <Globe className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate flex items-center justify-between">
              <span>Glace Workspace</span>
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span>Free Plan</span>
              <span className="inline-block w-1 h-1 rounded-full bg-emerald-500"></span>
            </p>
          </div>

          <div className="text-slate-400 group-hover:text-blue-600 transition-colors p-0.5">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </aside>
  );
};
