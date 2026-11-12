import React, { useState } from 'react';
import { Sun, Moon, Bell, ChevronDown, Sparkles, LogOut, Clock, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  userEmail: string;
  userName: string;
  onOpenNotifications?: () => void;
  onLogout?: () => void;
  isTrial?: boolean;
  trialText?: string;
  onUpgradePlan?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userEmail,
  userName,
  onLogout,
  isTrial,
  trialText,
  onUpgradePlan
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-[#10131d] border-b border-slate-200/80 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
          PT. Glace Kreasi Digital
        </span>

        {/* Indikator Sisa Waktu Free Trial jika aktif */}
        {isTrial && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-400 text-xs font-semibold animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{trialText || 'Free Trial: 3 Days Left'}</span>
            </span>

            <button
              onClick={onUpgradePlan}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Upgrade Plan</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Global Dark / Light Mode Toggle Button */}
        <button 
          onClick={toggleTheme}
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title={isDarkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
          )}
        </button>

        {/* Notifications */}
        <button 
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
          title="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        {/* User Profile Pill with Logout Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-medium text-xs shadow-2xs ${
              isTrial ? 'bg-amber-600' : 'bg-slate-900 dark:bg-blue-600'
            }`}>
              {userName ? userName.charAt(0).toUpperCase() : 'T'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                {isTrial ? 'Free Trial Account' : userEmail}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{userName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
                {isTrial && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
                    ⚡ {trialText || 'Free Trial 3 Hari'}
                  </p>
                )}
              </div>

              {isTrial && (
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdown(false);
                    if (onUpgradePlan) onUpgradePlan();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-800"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Upgrade ke Pro Plan</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  if (onLogout) onLogout();
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out (Keluar)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
