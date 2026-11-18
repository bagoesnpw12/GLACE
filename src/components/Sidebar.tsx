import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronLeft,
  ExternalLink,
  PanelLeft,
  X,
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  selectedSubItem?: string;
  onSelectSubItem?: (item: string) => void;
  onViewLanding?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
  userName?: string;
  userEmail?: string;
  isTrial?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedSubItem,
  onSelectSubItem,
  onViewLanding,
  isCollapsed = false,
  onToggleCollapse,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
  userName = 'User',
  userEmail = 'user@glace.id',
  isTrial = false,
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
      'Asset Registry',
      'Condition Monitoring',
      'Predictive Maintenance',
      'Work Orders',
      'Failure Analysis',
      'Asset Lifecycle',
    ],
    'document-intelligence': [
      'Document Hub',
      'Smart Extraction',
      'Semantic Search',
      'Document Comparison',
      'Compliance Check',
      'Audit Trail',
    ],
    'glace-commerce': [
      'Marketplace',
      'Vendor Directory',
      'Material Catalog',
      'RFQ & Bidding',
      'Purchase Orders',
      'Contract Management',
    ],
    'glace-academy': [
      'Course Catalog',
      'My Learning',
      'Certifications',
      'Knowledge Base',
      'Community Forum',
      'Webinars',
    ],
    'enterprise-solutions': [
      'Organization Overview',
      'Multi-Project Dashboard',
      'Enterprise Analytics',
      'Security & Governance',
      'Custom Integrations',
      'SLA & Support',
    ],
    'settings': [
      'Account Profile',
      'Workspace Settings',
      'Team & Roles',
      'Integrations & API',
      'Billing & Plans',
      'Audit Logs',
    ],
  };

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    'co-engineer': true,
    'project-intelligence': false,
    'asset-intelligence': false,
    'document-intelligence': false,
    'glace-commerce': false,
    'glace-academy': false,
    'enterprise-solutions': false,
    'settings': false,
  });

  const [popoutTabId, setPopoutTabId] = useState<string | null>(null);
  const [popoutPos, setPopoutPos] = useState<{ top: number }>({ top: 0 });
  const [mobileSubmenuTabId, setMobileSubmenuTabId] = useState<string | null>(null);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoutRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // Pertahankan submenu tetap terbuka selama pengguna berada di halaman turunannya (mode Expand)
  useEffect(() => {
    if (selectedSubItem && currentTab && subItemsMap[currentTab]?.includes(selectedSubItem)) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [currentTab]: true,
      }));
    }
  }, [currentTab, selectedSubItem]);

  // Tutup popout / mobile sheet ketika pengguna klik area luar atau menekan tombol Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoutRef.current && 
        !popoutRef.current.contains(e.target as Node) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setPopoutTabId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPopoutTabId(null);
        setMobileSubmenuTabId(null);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Klik ikon panah HANYA untuk expand/collapse submenu tanpa melakukan navigasi
  const toggleSubmenu = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Klik Menu Utama (Mode Expand)
  const handleMenuClick = (itemId: string, hasSub: boolean) => {
    if (currentTab === itemId && hasSub) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [itemId]: !prev[itemId],
      }));
      return;
    }

    onSelectTab(itemId);
    if (onSelectSubItem) {
      onSelectSubItem(''); // Reset submenu agar merender Overview / Dashboard Utama modul
    }

    if (hasSub) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [itemId]: true,
      }));
    }

    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Klik Submenu
  const handleSubItemClick = (parentTabId: string, subName: string) => {
    onSelectTab(parentTabId);
    if (onSelectSubItem) {
      onSelectSubItem(subName);
    }
    setOpenSubmenus((prev) => ({
      ...prev,
      [parentTabId]: true,
    }));
    setPopoutTabId(null);
    setMobileSubmenuTabId(null);

    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // DESKTOP: Handle Interaksi Hover Popout pada kondisi COLLAPSE
  const handleMouseEnterItem = (itemId: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (!isCollapsed) return;
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

      const rect = e.currentTarget.getBoundingClientRect();
      setPopoutPos({ top: rect.top });
      setPopoutTabId(itemId);
    }
  };

  const handleMouseLeaveItem = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (!isCollapsed) return;
      hoverTimerRef.current = setTimeout(() => {
        setPopoutTabId(null);
      }, 200);
    }
  };

  const handleMouseEnterPopout = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const handleMouseLeavePopout = () => {
    hoverTimerRef.current = setTimeout(() => {
      setPopoutTabId(null);
    }, 200);
  };

  // Klik ikon menu saat COLLAPSE
  const handleIconClick = (itemId: string, e: React.MouseEvent, hasSub: boolean) => {
    e.stopPropagation();
    onSelectTab(itemId);
    if (onSelectSubItem) {
      onSelectSubItem('');
    }

    const isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.innerWidth < 1024;

    if (hasSub) {
      if (isTouchDevice) {
        setMobileSubmenuTabId(itemId);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoutPos({ top: rect.top });
        setPopoutTabId(itemId);
      }
      return;
    }

    setPopoutTabId(null);
    setMobileSubmenuTabId(null);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
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
      label: 'Kecerdasan Proyek', 
      icon: BarChart3, 
      hasSub: true,
      subItems: subItemsMap['project-intelligence'],
    },
    { 
      id: 'asset-intelligence', 
      label: 'Intelijen Aset', 
      icon: Activity, 
      hasSub: true,
      subItems: subItemsMap['asset-intelligence'],
    },
    { 
      id: 'document-intelligence', 
      label: 'Kecerdasan Dokumen', 
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
      label: 'Akademi Glace', 
      icon: GraduationCap, 
      hasSub: true,
      subItems: subItemsMap['glace-academy'],
    },
    { 
      id: 'enterprise-solutions', 
      label: 'Solusi Perusahaan', 
      icon: Building2, 
      hasSub: true,
      subItems: subItemsMap['enterprise-solutions'],
    },
    { 
      id: 'settings', 
      label: 'Pengaturan', 
      icon: Settings, 
      hasSub: true,
      subItems: subItemsMap['settings'],
    },
  ];

  const activePopoutItem = navItems.find(item => item.id === popoutTabId);
  const activeMobileSubmenuItem = navItems.find(item => item.id === mobileSubmenuTabId);

  // Label Menu Aktif untuk Breadcrumb
  const currentNavItem = navItems.find(item => item.id === currentTab);
  const currentMenuLabel = currentNavItem ? currentNavItem.label : '';
  // Tampilkan breadcrumb di semua halaman selain Dasbor
  const showBreadcrumb = currentTab !== 'dashboard' && !!currentMenuLabel;

  return (
    <>
      {/* Mobile Backdrop Overlay untuk Drawer Utama */}
      {isMobileDrawerOpen && (
        <div 
          onClick={onCloseMobileDrawer}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* =========================================================================
          SIDEBAR UTAMA SHADCN (sidebar-07 Architecture)
          ========================================================================= */}
      <aside 
        ref={sidebarRef}
        data-slot="sidebar"
        data-sidebar="sidebar"
        className={`${
          isCollapsed ? 'w-[76px]' : 'w-64'
        } bg-white dark:bg-[#090B10] border-r border-slate-200 dark:border-[#1a1f2c] text-slate-700 dark:text-slate-200 flex flex-col justify-between h-screen fixed lg:sticky top-0 z-50 lg:z-40 select-none transition-all duration-300 ease-in-out box-border relative ${
          isMobileDrawerOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Tombol Split Sidebar dan Breadcrumb Dinamis (Sejajar dengan Menu Dasbor) */}
        <div className="hidden lg:flex absolute left-[calc(100%+12px)] top-[76px] z-20 items-center gap-3 h-7 pointer-events-auto">
          {/* Tombol Split Sidebar */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="size-7 flex items-center justify-center rounded-md bg-white dark:bg-[#13161f] hover:bg-slate-100 dark:hover:bg-[#1d222e] border border-slate-200 dark:border-[#1e2330] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-md transition-all cursor-pointer hover:scale-105 shrink-0"
            title={isCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
          >
            <PanelLeft className="w-3.5 h-3.5" />
          </button>

          {/* Breadcrumb Dinamis: Tampil pada Overview Modul dan Submenu */}
          {showBreadcrumb && (
            <div className="flex items-center gap-2.5 text-xs whitespace-nowrap pl-1 animate-in fade-in duration-200">
              <span className="w-px h-3.5 bg-slate-300 dark:bg-[#1e2330]" />
              {selectedSubItem ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectSubItem) onSelectSubItem('');
                    }}
                    className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title={`Kembali ke ${currentMenuLabel}`}
                  >
                    {currentMenuLabel}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="text-slate-900 dark:text-slate-100 font-medium">
                    {selectedSubItem}
                  </span>
                </>
              ) : (
                <span className="text-slate-900 dark:text-slate-100 font-medium">
                  {currentMenuLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Nav Area dengan primitive shadcn SidebarContent */}
        <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden p-0 bg-white dark:bg-[#090B10]">
          {/* Brand Header: h-16 box-border border-b border-slate-200 dark:border-[#1a1f2c] sejajar presisi dengan Header Konten Utama */}
          <div className={`h-16 shrink-0 box-border border-b border-slate-200 dark:border-[#1a1f2c] ${isCollapsed ? 'px-3 justify-center' : 'px-4 justify-between'} flex items-center sticky top-0 bg-white dark:bg-[#090B10] z-20 transition-all`}>
            <div className="flex items-center gap-2.5">
              <span className="text-slate-900 dark:text-white font-extrabold text-xl tracking-tight select-none italic">
                //
              </span>
              {!isCollapsed && (
                <span className="font-extrabold text-base tracking-wider text-slate-900 dark:text-white uppercase select-none">
                  GLACE
                </span>
              )}
            </div>

            {/* Tombol Tutup Mobile Drawer jika sedang terbuka */}
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="lg:hidden text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-[#1f222b]"
              title="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Area dengan primitive shadcn SidebarMenu */}
          <nav className="p-2 space-y-1">
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                const isSubmenuOpen = !!openSubmenus[item.id];
                const isPopoutActive = popoutTabId === item.id || mobileSubmenuTabId === item.id;

                // ---------------------------------------------------------------
                // 1. TAMPILAN COLLAPSED (Hanya Ikon Menu)
                // ---------------------------------------------------------------
                if (isCollapsed) {
                  return (
                    <SidebarMenuItem 
                      key={item.id}
                      className="relative flex justify-center my-0.5"
                    >
                      <div
                        onMouseEnter={(e) => handleMouseEnterItem(item.id, e)}
                        onMouseLeave={handleMouseLeaveItem}
                        className="w-full flex justify-center"
                      >
                        <button
                          type="button"
                          onClick={(e) => handleIconClick(item.id, e, !!item.hasSub)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer relative z-20 ${
                            isActive
                              ? 'bg-blue-50 dark:bg-[#272b38] text-blue-600 dark:text-white shadow-xs font-semibold'
                              : isPopoutActive
                              ? 'bg-slate-100 dark:bg-[#1e222d] text-slate-900 dark:text-white'
                              : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#272b38] hover:text-slate-900 dark:hover:text-white'
                          }`}
                          title={item.label}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          {item.hasSub && (
                            <span className={`absolute right-1.5 top-1.5 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600 dark:bg-white' : 'bg-slate-400 dark:bg-slate-500'}`} />
                          )}
                        </button>
                      </div>
                    </SidebarMenuItem>
                  );
                }

                // ---------------------------------------------------------------
                // 2. TAMPILAN EXPANDED (Shadcn SidebarMenu + Highlight Abu-Abu)
                // ---------------------------------------------------------------
                return (
                  <SidebarMenuItem key={item.id} className="relative mb-0.5">
                    <div
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                        isActive
                          ? 'bg-blue-50 dark:bg-[#272b38] text-blue-600 dark:text-white font-medium'
                          : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#272b38] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleMenuClick(item.id, !!item.hasSub)}
                        className="flex-1 flex items-center gap-3 text-left focus:outline-hidden cursor-pointer"
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive 
                              ? 'text-blue-600 dark:text-white' 
                              : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                          }`}
                        />
                        <span className="text-xs truncate">
                          {item.label}
                        </span>
                      </button>

                      {item.hasSub && (
                        <button
                          type="button"
                          onClick={(e) => toggleSubmenu(item.id, e)}
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isActive
                              ? 'text-blue-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white hover:bg-blue-100/50 dark:hover:bg-white/10'
                              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10'
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

                    {/* Submenu List dengan primitive shadcn SidebarMenuSub & Motion Smooth Accordion */}
                    <AnimatePresence initial={false}>
                      {item.hasSub && isSubmenuOpen && item.subItems && (
                        <motion.div
                          key={`sub-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: 'auto', 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.18, delay: 0.04 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.12 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <SidebarMenuSub className="mx-2 my-1 pl-4 pr-1 space-y-0.5 border-l border-slate-200 dark:border-[#262b37]">
                            {item.subItems.map((sub) => {
                              const isSubSelected = currentTab === item.id && (
                                selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
                              );
                              return (
                                <SidebarMenuSubItem key={sub}>
                                  <button
                                    type="button"
                                    onClick={() => handleSubItemClick(item.id, sub)}
                                    className={`w-full text-left py-1.5 px-2 rounded-md text-[11px] transition-colors flex items-center gap-2 cursor-pointer ${
                                      isSubSelected
                                        ? 'bg-blue-50 dark:bg-[#272b38] text-blue-600 dark:text-white font-semibold'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#272b38]'
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                                        isSubSelected
                                          ? 'bg-blue-600 dark:bg-white scale-110'
                                          : 'bg-slate-300 dark:bg-[#404759]'
                                      }`}
                                    />
                                    <span className="truncate">{sub}</span>
                                  </button>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </nav>
        </SidebarContent>

        {/* Profil Pengguna di Area Bawah Sidebar */}
        <SidebarFooter className={`border-t border-slate-200 dark:border-[#1a1f2c] bg-white dark:bg-[#090B10] shrink-0 ${isCollapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
          {/* Kartu Profil Pengguna */}
          <button
            type="button"
            onClick={onViewLanding}
            className={`rounded-lg bg-slate-50 dark:bg-[#13161f] hover:bg-slate-100 dark:hover:bg-[#1d222e] border border-slate-200 dark:border-[#1e2330] hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center text-left group cursor-pointer ${
              isCollapsed ? 'w-10 h-10 justify-center p-0' : 'w-full p-2 gap-2.5 min-w-0'
            }`}
            title="Buka Landing Page Publik Glace"
          >
            {/* Avatar Pengguna */}
            <div className={`rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center shrink-0 ${
              isCollapsed ? 'w-7 h-7' : 'w-8 h-8'
            }`}>
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-slate-200 truncate">
                    {userName || 'Bagoes Nugraha pw'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                    <span>{isTrial ? 'Free Trial' : (userEmail || 'bagoesnugrahapw@gmail.com')}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </p>
                </div>

                <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white transition-colors p-0.5 shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </>
            )}
          </button>
        </SidebarFooter>
      </aside>

      {/* =========================================================================
          DESKTOP: POPOUT SUBMENU SAAT SIDEBAR COLLAPSE (HOVER) DENGAN TEMA ABU-ABU
          ========================================================================= */}
      <AnimatePresence>
        {isCollapsed && activePopoutItem && activePopoutItem.hasSub && (
          <motion.div
            ref={popoutRef}
            initial={{ opacity: 0, x: -8, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnterPopout}
            onMouseLeave={handleMouseLeavePopout}
            style={{ 
              top: `${Math.min(Math.max(12, popoutPos.top - 8), window.innerHeight - 380)}px`,
              left: '78px'
            }}
            className="hidden lg:block fixed z-50 w-60 bg-[#161922] border border-[#272c3b] rounded-xl shadow-2xl p-2.5 select-none"
          >
            {/* Header Popout */}
            <div className="px-2.5 py-1.5 border-b border-[#232734] flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <activePopoutItem.icon className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-semibold text-xs text-white truncate">
                  {activePopoutItem.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectTab(activePopoutItem.id);
                  if (onSelectSubItem) onSelectSubItem('');
                  setPopoutTabId(null);
                }}
                className="text-[11px] text-slate-400 hover:text-white hover:underline cursor-pointer"
              >
                Overview
              </button>
            </div>

            {/* Daftar Submenu Popout */}
            <div className="py-1 space-y-0.5 max-h-[300px] overflow-y-auto">
              {activePopoutItem.subItems?.map((sub) => {
                const isSubSelected = currentTab === activePopoutItem.id && (
                  selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
                );

                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSubItemClick(activePopoutItem.id, sub)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isSubSelected
                        ? 'bg-[#272b38] text-white font-semibold'
                        : 'text-slate-400 hover:bg-[#272b38] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{sub}</span>
                    {isSubSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MOBILE / TOUCHSCREEN: SUBMENU BOTTOM SHEET
          ========================================================================= */}
      <AnimatePresence>
        {activeMobileSubmenuItem && (
          <div className="fixed inset-0 z-60 flex flex-col justify-end lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileSubmenuTabId(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-h-[85vh] bg-[#14161f] border-t border-[#232733] rounded-t-2xl shadow-2xl p-4 flex flex-col z-10"
            >
              <div className="w-10 h-1 bg-[#2e3344] rounded-full mx-auto mb-3" />

              <div className="flex items-center justify-between pb-3 border-b border-[#232733] shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#202430] flex items-center justify-center text-white">
                    <activeMobileSubmenuItem.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">
                      {activeMobileSubmenuItem.label}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Pilih submenu modul
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileSubmenuTabId(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#202430]"
                  title="Tutup Submenu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto py-2 space-y-1.5 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTab(activeMobileSubmenuItem.id);
                    if (onSelectSubItem) onSelectSubItem('');
                    setMobileSubmenuTabId(null);
                    if (onCloseMobileDrawer) onCloseMobileDrawer();
                  }}
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    currentTab === activeMobileSubmenuItem.id && (!selectedSubItem || selectedSubItem === '')
                      ? 'bg-[#272b38] text-white'
                      : 'bg-[#1b1e28] text-slate-300 border border-[#262a38]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard {activeMobileSubmenuItem.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>

                <div className="space-y-1 pt-1">
                  {activeMobileSubmenuItem.subItems?.map((sub) => {
                    const isSubSelected = currentTab === activeMobileSubmenuItem.id && (
                      selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
                    );

                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubItemClick(activeMobileSubmenuItem.id, sub)}
                        className={`w-full py-2.5 px-3 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between ${
                          isSubSelected
                            ? 'bg-[#272b38] text-white font-semibold'
                            : 'text-slate-300 hover:bg-[#272b38]'
                        }`}
                      >
                        <span className="truncate">{sub}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSubSelected ? 'text-white' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-[#232733] shrink-0">
                <button
                  type="button"
                  onClick={() => setMobileSubmenuTabId(null)}
                  className="w-full py-2.5 rounded-lg bg-[#202430] text-slate-300 font-medium text-xs hover:bg-[#282d3d]"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
