import { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Globe,
  Bell,
  UserCheck,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  User,
  Shield,
  KeyRound
} from 'lucide-react';
import { UserRole, LanguageCode, AuthUser } from '../types';
import { storage } from '../lib/storage';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentRole: UserRole;
  currentUser: AuthUser | null;
  onRoleChange: (role: UserRole) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigate: (screen: string) => void;
  unreadCount: number;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Header({
  currentRole,
  currentUser,
  onRoleChange,
  currentLanguage,
  onLanguageChange,
  onNavigate,
  unreadCount,
  onLogout,
  onOpenAuth
}: HeaderProps) {
  const [isOnline, setIsOnline] = useState(storage.isOnline());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(storage.getSimulateOffline());
  const [pendingCount, setPendingCount] = useState(storage.getPendingSyncCount());
  const [isSyncing, setIsSyncing] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const t = translations[currentLanguage];

  useEffect(() => {
    const unsubscribe = storage.subscribe(() => {
      setIsOnline(storage.isOnline());
      setIsSimulatedOffline(storage.getSimulateOffline());
      setPendingCount(storage.getPendingSyncCount());
    });

    const handleWindowOnline = () => {
      setIsOnline(storage.isOnline());
    };
    window.addEventListener('online', handleWindowOnline);
    window.addEventListener('offline', handleWindowOnline);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleWindowOnline);
      window.removeEventListener('offline', handleWindowOnline);
    };
  }, []);

  const handleToggleOffline = () => {
    const nextVal = !isSimulatedOffline;
    storage.setSimulateOffline(nextVal);
    setIsSimulatedOffline(nextVal);
    setIsOnline(storage.isOnline());
  };

  const handleQuickSync = async () => {
    if (!isOnline) {
      onNavigate('myRequests');
      return;
    }
    setIsSyncing(true);
    await storage.syncPendingItems();
    setIsSyncing(false);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return t.farmer;
      case 'buyer':
        return t.buyer;
      case 'trader':
        return t.trader;
      case 'service_provider':
        return t.serviceProvider;
      case 'admin':
        return t.admin;
    }
  };

  const getRoleEmoji = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return '🌱';
      case 'buyer':
        return '🏢';
      case 'trader':
        return '⚖️';
      case 'service_provider':
        return '🚚';
      case 'admin':
        return '🛡️';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md">
      {/* Top Utility Bar: Network Status & Offline Simulator */}
      <div className="bg-emerald-950 px-3 py-1 text-xs flex items-center justify-between border-b border-emerald-900">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium ${
              isOnline
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            {isOnline ? (
              <Wifi className="w-3 h-3 text-emerald-400" />
            ) : (
              <WifiOff className="w-3 h-3 text-amber-400" />
            )}
            <span>{isOnline ? t.networkOnline : t.networkOffline}</span>
          </div>

          {pendingCount > 0 && (
            <button
              onClick={() => onNavigate('myRequests')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-600/30 text-amber-200 border border-amber-500/40 hover:bg-amber-600/50 transition-colors"
              title="Click to view and sync pending requests"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{pendingCount} {t.statusPendingSync}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Simulation Toggle */}
          <button
            onClick={handleToggleOffline}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
              isSimulatedOffline
                ? 'bg-amber-500 text-stone-900 hover:bg-amber-400'
                : 'bg-emerald-700/60 text-emerald-200 hover:bg-emerald-700'
            }`}
            title="Toggle offline/online mode simulation"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{isSimulatedOffline ? t.switchToOnline : t.simulateOffline}</span>
          </button>

          {pendingCount > 0 && isOnline && (
            <button
              onClick={handleQuickSync}
              disabled={isSyncing}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{t.syncNow}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center shadow-inner text-xl border border-emerald-400/30">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-emerald-950">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 line-clamp-1 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </button>

        {/* Right Controls: Role, Language, Notifications, Auth Session */}
        <div className="flex items-center gap-2">
          {/* User Account & Role Badge / Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowLangDropdown(false);
              }}
              className="flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-700/80 px-2.5 py-1.5 rounded-xl border border-emerald-600/40 text-xs font-semibold transition-all shadow-sm"
              title="Current User & Role Switcher"
            >
              <span>{getRoleEmoji(currentRole)}</span>
              <div className="text-left hidden sm:block leading-tight">
                <div className="text-[11px] text-white font-bold max-w-[120px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : getRoleLabel(currentRole)}
                </div>
                <div className="text-[9px] text-amber-300 uppercase tracking-wider font-extrabold">
                  {getRoleLabel(currentRole)}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-1.5 w-64 bg-stone-900 text-stone-100 border border-stone-700 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Active user details */}
                <div className="px-3.5 py-2.5 border-b border-stone-800 bg-stone-950/60 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                      {currentUser ? currentUser.name.charAt(0) : 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-white truncate">
                        {currentUser?.name || t.authorizedUser}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono truncate">
                        {currentUser?.phone}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-[10px] font-bold">
                      {getRoleEmoji(currentRole)} {getRoleLabel(currentRole)}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[10px] font-mono">
                      {t.safeSession}
                    </span>
                  </div>
                </div>

                {/* Switch Role Fast-Action */}
                <div className="px-3.5 pt-2 pb-1 text-[10px] uppercase text-stone-400 font-extrabold tracking-wider">
                  {t.switchActiveRole}
                </div>
                {(
                  [
                    'farmer',
                    'buyer',
                    'trader',
                    'service_provider',
                    'admin'
                  ] as UserRole[]
                ).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(role);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-stone-800 transition-colors ${
                      currentRole === role
                        ? 'bg-stone-800/80 text-amber-300 font-bold'
                        : 'text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{getRoleEmoji(role)}</span>
                      <span>{getRoleLabel(role)}</span>
                    </div>
                    {currentRole === role && <span className="text-amber-400">✓</span>}
                  </button>
                ))}

                {/* Account modal trigger & Logout */}
                <div className="mt-1 pt-1 border-t border-stone-800 px-2 space-y-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenAuth();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-stone-800 text-emerald-300 flex items-center gap-2 transition-colors font-medium text-[11px]"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.switchUserDemo}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-950/60 text-rose-300 flex items-center gap-2 transition-colors font-medium text-[11px]"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangDropdown(!showLangDropdown);
                setShowUserDropdown(false);
              }}
              className="flex items-center gap-1 bg-emerald-900/80 hover:bg-emerald-700/80 px-2.5 py-1.5 rounded-xl border border-emerald-600/40 text-xs font-semibold transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold uppercase">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-1.5 w-36 bg-emerald-950 border border-emerald-700 rounded-xl shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] uppercase text-emerald-400 font-bold tracking-wider border-b border-emerald-800/80">
                  Language / భాష
                </div>
                {[
                  { code: 'en' as LanguageCode, label: 'English' },
                  { code: 'te' as LanguageCode, label: 'తెలుగు (Telugu)' },
                  { code: 'hi' as LanguageCode, label: 'हिन्दी (Hindi)' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-emerald-800 transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-emerald-800 text-amber-300 font-bold'
                        : 'text-emerald-100'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {currentLanguage === lang.code && (
                      <span className="text-amber-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-700/80 border border-emerald-600/40 text-emerald-100 transition-colors"
            title="Notifications & Weather Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-emerald-950 font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
