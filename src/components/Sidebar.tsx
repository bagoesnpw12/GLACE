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
  ChevronLeft,
  Globe,
  ExternalLink,
  X,
  ArrowLeft
} from 'lucide-react';

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

  // Submenu state untuk mode EXPAND
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

  // State Popout Submenu saat kondisi COLLAPSE di Desktop (Hover)
  const [popoutTabId, setPopoutTabId] = useState<string | null>(null);
  const [popoutPos, setPopoutPos] = useState<{ top: number }>({ top: 0 });
  const hoverTimerRef = useRef<any>(null);
  const popoutRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // State Mobile Bottom Sheet Submenu (Touchscreen / Layar < 1024px)
  const [mobileSubmenuTabId, setMobileSubmenuTabId] = useState<string | null>(null);

  // Nav items item elements refs map for precise animated indicator placement
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number; ready: boolean }>({
    top: 0,
    height: 48,
    ready: false,
  });

  // Update animated active indicator geometry based on the active DOM element
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = itemRefs.current[currentTab];
      const navEl = navRef.current;
      if (activeEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          top: itemRect.top - navRect.top,
          height: itemRect.height || 48,
          ready: true,
        });
      }
    };

    // Panggil langsung
    updateIndicator();

    // Panggil juga pada requestAnimationFrame berikutnya dan timer kecil untuk sinkron dengan transisi DOM/submenu
    const rafId = requestAnimationFrame(updateIndicator);
    const timer = setTimeout(updateIndicator, 50);

    window.addEventListener('resize', updateIndicator);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [currentTab, isCollapsed, openSubmenus]);

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

  // Klik Menu Utama (Mode Expand):
  // - Klik pertama: Navigasi ke Dashboard Utama modul tersebut & buka submenu
  // - Klik kedua pada menu yang sama: Toggle buka/tutup submenu
  const handleMenuClick = (itemId: string, hasSub: boolean) => {
    if (currentTab === itemId && hasSub) {
      // Klik kedua pada menu aktif yang sama -> toggle buka/tutup submenu
      setOpenSubmenus((prev) => ({
        ...prev,
        [itemId]: !prev[itemId],
      }));
      return;
    }

    // Klik pertama (atau klik dari tab lain) -> buka dashboard utama modul
    onSelectTab(itemId);
    if (onSelectSubItem) {
      onSelectSubItem(''); // Reset submenu agar merender Overview / Dashboard Utama modul tersebut
    }

    if (hasSub) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [itemId]: true, // Buka submenu modul tersebut
      }));
    }

    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Klik Submenu (Baik dari menu biasa, popout desktop, maupun bottom sheet mobile)
  const handleSubItemClick = (parentTabId: string, subName: string) => {
    onSelectTab(parentTabId);
    if (onSelectSubItem) {
      onSelectSubItem(subName);
    }
    setOpenSubmenus((prev) => ({
      ...prev,
      [parentTabId]: true,
    }));
    // Tutup popout dan mobile bottom sheet setelah navigasi
    setPopoutTabId(null);
    setMobileSubmenuTabId(null);

    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // DESKTOP: Handle Interaksi Hover Popout pada kondisi COLLAPSE
  const handleMouseEnterItem = (itemId: string, e: React.MouseEvent<HTMLDivElement>) => {
    // Hanya aktif pada desktop yang mendukung hover
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
      }, 200); // Debounce jeda perpindahan kursor
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

  // Klik ikon menu saat COLLAPSE atau MOBILE:
  // - Mode COLLAPSED (Desktop & Mobile):
  //   1. Klik ikon menu langsung membuka Dashboard utama modul tersebut (memindahkan active state & indikator)
  //   2. Menampilkan popout/bottom sheet submenu modul tersebut agar user bisa melihat / memilih submenu
  const handleIconClick = (itemId: string, e: React.MouseEvent, hasSub: boolean) => {
    e.stopPropagation();

    // Selalu pindahkan active tab ke item yang diklik & reset selectedSubItem ke overview
    onSelectTab(itemId);
    if (onSelectSubItem) {
      onSelectSubItem('');
    }

    const isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.innerWidth < 1024;

    if (hasSub) {
      if (isTouchDevice) {
        // Buka panel submenu mobile bottom sheet
        setMobileSubmenuTabId(itemId);
      } else {
        // Pada Desktop Collapsed: Posisikan dan tampilkan popout submenu
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoutPos({ top: rect.top });
        setPopoutTabId(itemId);
      }
      return;
    }

    // Jika menu tidak memiliki submenu (seperti Dashboard):
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

  const activePopoutItem = navItems.find(item => item.id === popoutTabId);
  const activeMobileSubmenuItem = navItems.find(item => item.id === mobileSubmenuTabId);

  return (
    <>
      {/* Mobile Backdrop Overlay untuk Drawer Utama */}
      {isMobileDrawerOpen && (
        <div 
          onClick={onCloseMobileDrawer}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* =========================================================================
          SIDEBAR UTAMA (COLLAPSE / EXPAND / MOBILE DRAWER)
          - Light Mode: Putih / Abu sangat muda (#FFFFFF / #F8FAFC) + Border #E2E7EF + Teks #172033
          - Dark Mode: Navy Gelap (#050E1D) + Border #152338 + Teks Putih
          - Bentuk Active Menu: Ujung kiri bulat penuh, sisi kanan concave cutout (#0066FF)
          ========================================================================= */}
      <aside 
        ref={sidebarRef}
        className={`${
          isCollapsed ? 'w-[76px]' : 'w-64'
        } bg-white dark:bg-[#050E1D] border-r border-[#E2E7EF] dark:border-[#152338] text-[#172033] dark:text-white flex flex-col justify-between h-screen fixed lg:sticky top-0 z-50 lg:z-30 select-none transition-all duration-300 ease-in-out ${
          isMobileDrawerOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Scrollable Nav Area (Menu List) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Brand Header */}
          <div className={`h-16 ${isCollapsed ? 'px-3 justify-center' : 'px-5 justify-between'} flex items-center border-b border-[#E2E7EF] dark:border-[#152338]/80 sticky top-0 bg-white dark:bg-[#050E1D] z-20 transition-all`}>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-500 font-extrabold text-xl tracking-tight select-none italic">
                //
              </span>
              {!isCollapsed && (
                <span className="font-extrabold text-lg tracking-wider text-[#172033] dark:text-white uppercase select-none">
                  GLACE
                </span>
              )}
            </div>

            {/* Tombol Tutup Mobile Drawer jika sedang terbuka */}
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Toggle Collapse Button (Hanya Desktop) */}
            <button 
              type="button"
              onClick={onToggleCollapse}
              className={`hidden lg:block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${
                isCollapsed ? 'hidden' : 'block'
              }`}
              title="Ciutkan Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links Area */}
          <nav ref={navRef} className="relative py-3">
            {/* =========================================================================
                ANIMATED SLIDING ACTIVE INDICATOR
                - Kiri: Bulat penuh (A 24 24 0 0 1)
                - Kanan: Concave hourglass cutout (C 244 0 236 12 236 24 C 236 36 244 48 252 48)
                - Area biru memanjang menyatu ke batas kanan sidebar
                - Animasi transisi halus 380ms cubic-bezier
                ========================================================================= */}
            {indicatorStyle.ready && (
              <div
                className={`absolute ${isCollapsed ? 'left-2.5' : 'left-3'} right-0 pointer-events-none transition-all duration-380 ease-[cubic-bezier(0.2,0.9,0.3,1)] z-10`}
                style={{
                  top: `${indicatorStyle.top}px`,
                  height: `${indicatorStyle.height}px`,
                }}
              >
                {!isCollapsed ? (
                  /* Expanded Menu Indicator SVG (Width: 244px, Height: 48px) */
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 244 48"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_2px_12px_rgba(0,102,255,0.35)]"
                  >
                    <path
                      d="M 24 0 H 244 C 232 0 226 12 226 24 C 226 36 232 48 244 48 H 24 A 24 24 0 0 1 24 0 Z"
                      fill="#0066FF"
                    />
                  </svg>
                ) : (
                  /* Collapsed Menu Indicator SVG (Width: 66px, Height: 48px) */
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 66 48"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,102,255,0.35)]"
                  >
                    <path
                      d="M 24 0 H 66 C 54 0 48 12 48 24 C 48 36 54 48 66 48 H 24 A 24 24 0 0 1 24 0 Z"
                      fill="#0066FF"
                    />
                  </svg>
                )}
              </div>
            )}

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
                  <div 
                    key={item.id}
                    ref={(el) => { itemRefs.current[item.id] = el; }}
                    onMouseEnter={(e) => handleMouseEnterItem(item.id, e)}
                    onMouseLeave={handleMouseLeaveItem}
                    className="relative flex justify-center group h-12 my-1"
                  >
                    <button
                      type="button"
                      onClick={(e) => handleIconClick(item.id, e, !!item.hasSub)}
                      className={`w-full h-full flex items-center justify-center transition-all cursor-pointer relative z-20 active:scale-95 ${
                        isActive
                          ? 'text-white'
                          : isPopoutActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5 shrink-0 -ml-2" />
                      {item.hasSub && (
                        <span className={`absolute right-3 top-2 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-500 dark:bg-blue-400'}`} />
                      )}
                    </button>
                  </div>
                );
              }

              // ---------------------------------------------------------------
              // 2. TAMPILAN EXPANDED (Sesuai Screenshot Referensi GLACE)
              // ---------------------------------------------------------------
              return (
                <div key={item.id} className="relative mb-1">
                  <div
                    ref={(el) => { itemRefs.current[item.id] = el; }}
                    className="relative h-12 flex items-center justify-between pl-6 pr-4 cursor-pointer select-none"
                  >
                    <button
                      type="button"
                      onClick={() => handleMenuClick(item.id, !!item.hasSub)}
                      className="flex-1 flex items-center gap-3.5 text-left focus:outline-hidden cursor-pointer relative z-20"
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isActive 
                            ? 'text-white stroke-[2.2]' 
                            : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white stroke-[1.8]'
                        }`}
                      />
                      <span
                        className={`text-sm truncate transition-colors ${
                          isActive 
                            ? 'text-white font-semibold' 
                            : 'text-[#172033] dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>

                    {item.hasSub && (
                      <button
                        type="button"
                        onClick={(e) => toggleSubmenu(item.id, e)}
                        className={`p-1.5 rounded-md transition-colors relative z-20 cursor-pointer ${
                          isActive
                            ? 'text-white hover:bg-white/15'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
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

                  {/* Submenu List for Expanded Mode with timeline line and circular bullet points */}
                  {item.hasSub && isSubmenuOpen && item.subItems && (
                    <div className="relative pl-10 pr-2 py-1.5 space-y-1 ml-5 my-1">
                      {/* Garis vertikal timeline */}
                      <div className="absolute left-[26px] top-2 bottom-2 w-[1.5px] bg-[#E2E7EF] dark:bg-[#223554]" />

                      {item.subItems.map((sub) => {
                        const isSubSelected = currentTab === item.id && (
                          selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
                        );
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => handleSubItemClick(item.id, sub)}
                            className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center gap-3 cursor-pointer group/sub relative z-10 ${
                              isSubSelected
                                ? 'text-blue-600 dark:text-white font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {/* Indikator titik bulat (Dot Bullet) */}
                            <div className="w-[14px] flex items-center justify-center shrink-0">
                              <span
                                className={`w-2 h-2 rounded-full transition-all border ${
                                  isSubSelected
                                    ? 'bg-blue-600 dark:bg-blue-500 border-blue-500 dark:border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)] scale-110'
                                    : 'bg-white dark:bg-[#050E1D] border-slate-300 dark:border-[#3B4D6B] group-hover/sub:border-slate-500 dark:group-hover/sub:border-slate-300'
                                }`}
                              />
                            </div>
                            <span className="truncate">{sub}</span>
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

        {/* Bagian Bawah Sidebar (Profil Pengguna & Status Workspace) */}
        <div className={`border-t border-[#E2E7EF] dark:border-[#152338] bg-slate-50/80 dark:bg-[#050E1D] shrink-0 ${isCollapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
          <button
            type="button"
            onClick={onViewLanding}
            className={`rounded-xl bg-white dark:bg-[#091426] hover:bg-slate-100 dark:hover:bg-[#0d1b32] border border-[#E2E7EF] dark:border-[#1a2b44] hover:border-blue-500/50 transition-all flex items-center text-left group cursor-pointer shadow-2xs ${
              isCollapsed ? 'w-11 h-11 justify-center p-0' : 'w-full p-2.5 gap-3'
            }`}
            title="Buka Landing Page Publik Glace"
          >
            {/* Avatar Pengguna */}
            <div className={`rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 ${
              isCollapsed ? 'w-8 h-8' : 'w-9 h-9'
            }`}>
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#172033] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {userName || 'User Engineer'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                    <span>{isTrial ? 'Free Trial' : (userEmail || 'Glace Workspace')}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                  </p>
                </div>

                <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors p-0.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* =========================================================================
          DESKTOP: POPOUT / FLYOUT SUBMENU SAAT SIDEBAR COLLAPSE (HOVER)
          - Hanya dirender pada layar besar (>= 1024px) dengan pointer fine
          ========================================================================= */}
      {isCollapsed && activePopoutItem && activePopoutItem.hasSub && (
        <div
          ref={popoutRef}
          onMouseEnter={handleMouseEnterPopout}
          onMouseLeave={handleMouseLeavePopout}
          style={{ 
            top: `${Math.min(Math.max(12, popoutPos.top - 8), window.innerHeight - 380)}px`,
            left: '78px'
          }}
          className="hidden lg:block fixed z-50 w-64 bg-white dark:bg-[#121624] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 animate-in fade-in slide-in-from-left-2 duration-200 select-none"
        >
          {/* Header Popout: Nama Modul & Arahkan ke Dashboard Utama */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <activePopoutItem.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white truncate">
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
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Overview
            </button>
          </div>

          {/* Daftar Submenu Popout Desktop */}
          <div className="py-1 space-y-0.5 max-h-[320px] overflow-y-auto">
            {activePopoutItem.subItems?.map((sub) => {
              const isSubSelected = currentTab === activePopoutItem.id && (
                selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
              );

              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleSubItemClick(activePopoutItem.id, sub)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSubSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
        </div>
      )}

      {/* =========================================================================
          MOBILE / TOUCHSCREEN: SUBMENU BOTTOM SHEET & TOUCH PANEL
          - Muncul ketika ikon modul ber-submenu diketuk pada perangkat HP / Layar Sentuh
          - Tampil utuh di viewport (360px, 375px, 390px, 430px)
          - Header dengan Judul Modul + Pilihan Dashboard Utama di Bagian Teratas
          - Seluruh submenu ditampilkan dengan target sentuh nyaman (min 44px)
          - Tutup dengan tombol 'Tutup' atau ketuk backdrop luar
          ========================================================================= */}
      {activeMobileSubmenuItem && (
        <div className="fixed inset-0 z-60 flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          {/* Backdrop Luar */}
          <div 
            onClick={() => setMobileSubmenuTabId(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Panel Sheet Submenu */}
          <div className="relative w-full max-h-[85vh] bg-white dark:bg-[#121624] border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl p-5 flex flex-col z-10 animate-in slide-in-from-bottom-5 duration-250">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

            {/* Header Panel */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <activeMobileSubmenuItem.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {activeMobileSubmenuItem.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pilih submenu atau buka dashboard utama
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileSubmenuTabId(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Tutup Submenu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Daftar Menu & Submenu Responsif untuk Sentuhan */}
            <div className="overflow-y-auto py-3 space-y-2 flex-1">
              {/* 1. Opsi Teratas: Dashboard Utama Modul */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab(activeMobileSubmenuItem.id);
                  if (onSelectSubItem) onSelectSubItem('');
                  setMobileSubmenuTabId(null);
                  if (onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                  currentTab === activeMobileSubmenuItem.id && (!selectedSubItem || selectedSubItem === '')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 opacity-80" />
                  <span>Dashboard {activeMobileSubmenuItem.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>

              <div className="pt-2 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Submenu Disiplin & Fitur
                </span>
              </div>

              {/* 2. Daftar Seluruh Submenu */}
              <div className="space-y-1.5">
                {activeMobileSubmenuItem.subItems?.map((sub) => {
                  const isSubSelected = currentTab === activeMobileSubmenuItem.id && (
                    selectedSubItem?.toLowerCase().trim() === sub.toLowerCase().trim()
                  );

                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => handleSubItemClick(activeMobileSubmenuItem.id, sub)}
                      className={`w-full py-3 px-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between active:scale-[0.98] cursor-pointer ${
                        isSubSelected
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSubSelected ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tombol Tutup di Bagian Bawah */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setMobileSubmenuTabId(null)}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
