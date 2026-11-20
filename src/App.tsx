import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CoEngineerModule } from './components/CoEngineerModule';
import { ProjectIntelligenceModule } from './components/ProjectIntelligenceModule';
import { AssetIntelligenceModule } from './components/AssetIntelligenceModule';
import { DocumentIntelligenceModule } from './components/DocumentIntelligenceModule';
import { AssetAndDocIntelligenceModule } from './components/AssetAndDocIntelligenceModule';
import { GlaceCommerceModule } from './components/GlaceCommerceModule';
import { GlaceAcademyModule } from './components/GlaceAcademyModule';
import { EnterpriseSolutionsView } from './components/EnterpriseSolutionsView';
import { SettingsView } from './components/SettingsView';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './components/ui/sidebar';
import { ActivityItem } from './types';

function AppContent() {
  // Sesi Autentikasi
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('glace_auth_session') === 'true';
  });

  const [isTrialAccount, setIsTrialAccount] = useState<boolean>(() => {
    return localStorage.getItem('glace_is_trial') === 'true';
  });

  const [trialDisplayText, setTrialDisplayText] = useState<string>(() => {
    return localStorage.getItem('glace_trial_text') || 'Free Trial: 3 Days Left';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('glace_user_email') || '';
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('glace_user_name') || '';
  });

  const [expiredErrorMsg, setExpiredErrorMsg] = useState<string>('');

  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'signup' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedSubItem, setSelectedSubItem] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('glace_sidebar_collapsed') === 'true';
  });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('glace_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Menangani callback redirect dari Google OAuth 2.0 resmi (Token JWT / Error)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get('oauth_token');
    const oauthEmail = params.get('email');
    const oauthName = params.get('name');
    const oauthError = params.get('oauth_error');

    // Bersihkan query string dari URL browser agar bersih
    if (oauthToken || oauthError) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (oauthError) {
      setExpiredErrorMsg(oauthError);
      setViewMode('login');
      return;
    }

    if (oauthToken && oauthEmail) {
      // Login Google OAuth 2.0 Berhasil
      localStorage.setItem('glace_jwt_token', oauthToken);
      handleLoginSuccess(oauthEmail, false);
      if (oauthName) {
        setUserName(oauthName);
        localStorage.setItem('glace_user_name', oauthName);
      }
    }
  }, []);

  // Backend Validation untuk Masa Free Trial
  const validateTrialWithBackend = async () => {
    const trialId = localStorage.getItem('glace_trial_id');
    const fingerprint = localStorage.getItem('glace_device_fp');

    if (!trialId && !fingerprint) return;

    try {
      const res = await fetch(`http://localhost:3001/api/trial/validate?trialId=${trialId || ''}&fingerprint=${fingerprint || ''}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        handleLogout();
        setExpiredErrorMsg(data.message || 'Masa Free Trial 3 hari Anda telah berakhir. Silakan lakukan Upgrade Plan.');
        setViewMode('login');
      } else {
        const text = data.timeLeft?.displayText || 'Free Trial: 3 Days Left';
        setTrialDisplayText(text);
        localStorage.setItem('glace_trial_text', text);
      }
    } catch (e) {
      // Offline fallback
    }
  };

  useEffect(() => {
    if (isAuthenticated && isTrialAccount) {
      validateTrialWithBackend();
      const interval = setInterval(validateTrialWithBackend, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isTrialAccount]);

  // Proteksi Route Dashboard Terkunci
  useEffect(() => {
    if (viewMode === 'app' && !isAuthenticated) {
      setViewMode('login');
    }
  }, [viewMode, isAuthenticated]);

  // Initial activities
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-1',
      time: '2 minutes ago',
      activity: 'WBS updated for Project PLN Solar',
      module: 'Project Intelligence',
      status: 'Success',
      iconType: 'wbs',
    },
    {
      id: 'act-2',
      time: '15 minutes ago',
      activity: 'New document uploaded: P&ID_RevA.pdf',
      module: 'Document Intelligence',
      status: 'Success',
      iconType: 'document',
    },
    {
      id: 'act-3',
      time: '1 hour ago',
      activity: 'Added new asset: Transformer #TR-001',
      module: 'Asset Intelligence',
      status: 'Success',
      iconType: 'asset',
    },
    {
      id: 'act-4',
      time: '3 hours ago',
      activity: 'Created RFQ for electrical equipment',
      module: 'Glace Commerce',
      status: 'Pending',
      iconType: 'rfq',
    },
    {
      id: 'act-5',
      time: '1 day ago',
      activity: 'Completed PLC course module 1',
      module: 'Glace Academy',
      status: 'Success',
      iconType: 'academy',
    },
  ]);

  const addActivity = (activityText: string, moduleName: string) => {
    let iconType: 'document' | 'asset' | 'rfq' | 'academy' | 'wbs' = 'wbs';
    if (moduleName.includes('Document')) iconType = 'document';
    else if (moduleName.includes('Asset')) iconType = 'asset';
    else if (moduleName.includes('Commerce')) iconType = 'rfq';
    else if (moduleName.includes('Academy')) iconType = 'academy';

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      time: 'Just now',
      activity: activityText,
      module: moduleName,
      status: moduleName.includes('Commerce') ? 'Pending' : 'Success',
      iconType,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleUpdateUser = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem('glace_user_name', name);
    localStorage.setItem('glace_user_email', email);
  };

  const handleLoginSuccess = (email: string, isTrial = false, trialData?: any) => {
    const rawName = isTrial ? 'Trial Engineer' : (email.split('@')[0] || 'User');
    const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    
    setIsAuthenticated(true);
    setIsTrialAccount(isTrial);
    setUserEmail(email);
    setUserName(cleanName);
    setExpiredErrorMsg('');

    localStorage.setItem('glace_auth_session', 'true');
    localStorage.setItem('glace_user_email', email);
    localStorage.setItem('glace_user_name', cleanName);
    localStorage.setItem('glace_is_trial', isTrial ? 'true' : 'false');

    if (isTrial && trialData) {
      if (trialData.user?.id) localStorage.setItem('glace_trial_id', trialData.user.id);
      const displayText = trialData.timeLeft?.displayText || 'Free Trial: 3 Days Left';
      setTrialDisplayText(displayText);
      localStorage.setItem('glace_trial_text', displayText);
      addActivity('Free Trial 3 Hari diaktifkan', 'Settings');
    }

    setViewMode('app');
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsTrialAccount(false);
    setUserEmail('');
    setUserName('');

    localStorage.removeItem('glace_auth_session');
    localStorage.removeItem('glace_user_email');
    localStorage.removeItem('glace_user_name');
    localStorage.removeItem('glace_is_trial');
    localStorage.removeItem('glace_trial_text');
    localStorage.removeItem('glace_trial_id');
    localStorage.removeItem('glace_jwt_token');

    setViewMode('landing');
    setCurrentTab('dashboard');
  };

  // Render Homepage Publik
  if (viewMode === 'landing') {
    return (
      <LandingPage 
        onEnterDashboard={() => {
          if (isAuthenticated) {
            setViewMode('app');
          } else {
            setViewMode('login');
          }
        }} 
      />
    );
  }

  // Render Login Page
  if (viewMode === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onGoToLanding={() => setViewMode('landing')}
        onGoToSignUp={() => setViewMode('signup')}
        expiredMessage={expiredErrorMsg}
      />
    );
  }

  // Render Sign Up Page
  if (viewMode === 'signup') {
    return (
      <SignUpPage
        onSignUpSuccess={(email, name) => {
          handleLoginSuccess(email, false);
          setUserName(name);
          localStorage.setItem('glace_user_name', name);
        }}
        onGoToSignIn={() => setViewMode('login')}
        onGoToLanding={() => setViewMode('landing')}
      />
    );
  }

  // Proteksi Route Internal
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onGoToLanding={() => setViewMode('landing')}
        onGoToSignUp={() => setViewMode('signup')}
        expiredMessage={expiredErrorMsg}
      />
    );
  }

  // Render Dashboard
  return (
    <SidebarProvider
      open={!isSidebarCollapsed}
      onOpenChange={(open) => {
        setIsSidebarCollapsed(!open);
        localStorage.setItem('glace_sidebar_collapsed', String(!open));
      }}
      className="flex min-h-screen bg-slate-50 dark:bg-[#090B10] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        selectedSubItem={selectedSubItem}
        onSelectSubItem={(sub) => setSelectedSubItem(sub)}
        onViewLanding={() => setViewMode('landing')}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        userName={userName}
        userEmail={userEmail}
        isTrial={isTrialAccount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <Header
          userEmail={userEmail}
          userName={userName}
          onLogout={handleLogout}
          isTrial={isTrialAccount}
          trialText={trialDisplayText}
          onUpgradePlan={() => setCurrentTab('enterprise-solutions')}
          onToggleMobileMenu={() => setIsMobileDrawerOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab === 'co-engineer' ? 'co-engineer-root' : `${currentTab}-${selectedSubItem}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentTab === 'dashboard' && (
                  <DashboardView
                    userName={userName}
                    onNavigateModule={(modId) => setCurrentTab(modId)}
                    activities={activities}
                  />
                )}

                {currentTab === 'co-engineer' && (
                  <CoEngineerModule 
                    onAddActivity={addActivity}
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                    activities={activities}
                  />
                )}

                {currentTab === 'project-intelligence' && (
                  <ProjectIntelligenceModule 
                    onAddActivity={addActivity} 
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'asset-intelligence' && (
                  <AssetIntelligenceModule 
                    onAddActivity={addActivity}
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'document-intelligence' && (
                  <DocumentIntelligenceModule 
                    onAddActivity={addActivity}
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'glace-commerce' && (
                  <GlaceCommerceModule 
                    onAddActivity={addActivity} 
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'glace-academy' && (
                  <GlaceAcademyModule 
                    onAddActivity={addActivity}
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'enterprise-solutions' && (
                  <EnterpriseSolutionsView 
                    onAddActivity={addActivity} 
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}

                {currentTab === 'settings' && (
                  <SettingsView
                    userName={userName}
                    userEmail={userEmail}
                    onUpdateUser={handleUpdateUser}
                    onAddActivity={addActivity}
                    selectedSubItem={selectedSubItem}
                    onSelectSubItem={(sub) => setSelectedSubItem(sub)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Tetap Diam di Bawah Viewport (Sticky/Fixed di Dasar Konten Utama) */}
        <footer className="shrink-0 border-t border-slate-200 dark:border-[#1a1f2c] py-3 sm:py-3.5 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-[#090B10] z-30 transition-colors">
          <div>© 2026 PT. Glace Kreasi Digital, Semua hak dilindungi undang-undang.</div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Privasi</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Ketentuan</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Kontak</a>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">LinkedIn</span>
              <span>•</span>
              <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">YouTube</span>
              <span>•</span>
              <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">GitHub</span>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
