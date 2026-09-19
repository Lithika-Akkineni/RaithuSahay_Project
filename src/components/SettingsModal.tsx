import { useState } from 'react';
import {
  Settings,
  User,
  Globe,
  MapPin,
  Trash2,
  RefreshCw,
  CheckCircle,
  SlidersHorizontal,
  LogOut,
  Shield,
  KeyRound
} from 'lucide-react';
import { UserProfile, LanguageCode, UserRole, AuthUser } from '../types';
import { storage } from '../lib/storage';
import { auth } from '../lib/auth';
import { translations } from '../i18n/translations';

interface SettingsModalProps {
  profile: UserProfile;
  currentUser?: AuthUser | null;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onProfileUpdate: (profile: UserProfile) => void;
  onResetOnboarding: () => void;
  onLogout?: () => void;
  onOpenAuth?: () => void;
}

export default function SettingsModal({
  profile,
  currentUser,
  currentLanguage,
  onLanguageChange,
  onProfileUpdate,
  onResetOnboarding,
  onLogout,
  onOpenAuth
}: SettingsModalProps) {
  const t = translations[currentLanguage];
  const [name, setName] = useState(profile.name);
  const [district, setDistrict] = useState(profile.district);
  const [village, setVillage] = useState(profile.village);
  const [saved, setSaved] = useState(false);

  const activeUser = currentUser || auth.getCurrentUser();
  const currentSession = auth.getCurrentSession();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name,
      district,
      village
    };
    storage.saveProfile(updated);
    onProfileUpdate(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearCache = () => {
    if (confirm(t.confirmClearStorage)) {
      storage.resetAllData();
      auth.logout();
      window.location.reload();
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'farmer': return t.roleFarmerLabel;
      case 'buyer': return t.roleBuyerLabel;
      case 'trader': return t.roleTraderLabel;
      case 'service_provider': return t.roleServiceProviderLabel;
      case 'admin': return t.roleAdminLabel;
      default: return role;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200 space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-800" />
            <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
              {t.settings} & {t.accountSession}
            </h1>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.logout}</span>
            </button>
          )}
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.profileUpdatedSuccess}</span>
          </div>
        )}

        {/* Active Auth Session Details */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-700" />
              {t.activeUserSession}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
              {t.authenticatedStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">{t.signedInUser}</span>
              <span className="font-bold text-stone-800">{activeUser?.name || profile.name}</span>
              <span className="text-[11px] text-stone-500 font-mono block">{activeUser?.phone || profile.phone}</span>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">{t.assignedRole}</span>
              <span className="font-bold text-emerald-700 capitalize">
                {getRoleLabel(activeUser?.role || profile.role)}
              </span>
              <span className="text-[10px] text-stone-500 block">{t.rbacEnforced}</span>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">{t.clientSessionToken}</span>
              <span className="font-mono text-[10px] text-stone-600 truncate block">
                {currentSession?.token.slice(0, 18)}...
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block">
                {t.safeSessionNoPassword}
              </span>
            </div>
          </div>

          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="mt-1 px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-stone-600" />
              <span>{t.switchUserTestRole}</span>
            </button>
          )}
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.interfaceLanguage}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'te', label: 'తెలుగు (Telugu)' },
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी (Hindi)' }
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code as LanguageCode)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  currentLanguage === lang.code
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-stone-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.userProfileLocation}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.fullName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.phoneLabel}
              </label>
              <input
                type="text"
                value={profile.phone}
                disabled
                className="w-full px-3 py-2 border rounded-xl text-xs bg-stone-100 text-stone-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.district}
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.village}
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow cursor-pointer"
            >
              {t.saveProfileChanges}
            </button>
          </div>
        </form>

        {/* Reset & Onboarding actions */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.applicationMaintenance}
          </h3>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onResetOnboarding}
              className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.rerunOnboardingTour}</span>
            </button>

            <button
              onClick={handleClearCache}
              className="px-4 py-2 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.clearLocalStorageReset}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
