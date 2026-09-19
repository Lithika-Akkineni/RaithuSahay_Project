import { useState } from 'react';
import {
  Lock,
  User,
  Phone,
  Mail,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Building2,
  MapPin,
  Sprout,
  Truck,
  Briefcase
} from 'lucide-react';
import { UserRole, LanguageCode, AuthUser, LoginCredentials, SignupData } from '../types';
import { auth, DEMO_PRESET_CREDENTIALS } from '../lib/auth';
import { translations } from '../i18n/translations';

interface AuthModalProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSuccess: (user: AuthUser) => void;
  onClose?: () => void;
  initialRole?: UserRole;
}

export default function AuthModal({
  currentLanguage,
  onLanguageChange,
  onSuccess,
  onClose,
  initialRole = 'farmer'
}: AuthModalProps) {
  const t = translations[currentLanguage];

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('9848012345');
  const [loginPassword, setLoginPassword] = useState('Farmer@123');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>(initialRole);
  const [signupOrg, setSignupOrg] = useState('');
  const [signupDistrict, setSignupDistrict] = useState('Guntur');
  const [signupLandAcres, setSignupLandAcres] = useState('3.0');

  const DISTRICTS = [
    'Guntur',
    'Warangal',
    'Krishna',
    'Kurnool',
    'Khammam',
    'Nalgonda',
    'Nizamabad',
    'Anantapur',
    'Chittoor',
    'West Godavari'
  ];

  // Quick Demo Login Handler
  const handleQuickDemo = async (preset: (typeof DEMO_PRESET_CREDENTIALS)[0]) => {
    setErrorMessage(null);
    setLoading(true);
    setLoadingRole(preset.role);

    setLoginIdentifier(preset.phone);
    setLoginPassword(preset.password);

    try {
      const res = await auth.login({
        identifier: preset.phone,
        password: preset.password
      });

      if (res.success && res.session) {
        onSuccess(res.session.user);
      } else {
        setErrorMessage(res.error || t.demoLoginFailed);
      }
    } catch (e: any) {
      setErrorMessage(e?.message || t.loginErrorOccurred);
    } finally {
      setLoading(false);
      setLoadingRole(null);
    }
  };

  // Manual Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdentifier.trim()) {
      setErrorMessage(t.enterMobileOrEmailError);
      return;
    }
    if (!loginPassword) {
      setErrorMessage(t.enterPasswordError);
      return;
    }

    setLoading(true);
    try {
      const res = await auth.login({
        identifier: loginIdentifier,
        password: loginPassword
      });

      if (res.success && res.session) {
        onSuccess(res.session.user);
      } else {
        setErrorMessage(res.error || t.invalidCredentialsError);
      }
    } catch (e: any) {
      setErrorMessage(e?.message || t.loginErrorOccurred);
    } finally {
      setLoading(false);
    }
  };

  // Manual Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signupName.trim() || signupName.trim().length < 2) {
      setErrorMessage(t.enterValidNameError);
      return;
    }
    const cleanPhone = signupPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage(t.enterValidPhoneError);
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage(t.passwordMinCharsError);
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage(t.passwordsDoNotMatchError);
      return;
    }

    setLoading(true);
    try {
      const signupData: SignupData = {
        name: signupName.trim(),
        phone: cleanPhone,
        email: signupEmail.trim() || undefined,
        role: signupRole,
        password: signupPassword,
        language: currentLanguage,
        organizationName: signupRole !== 'farmer' ? signupOrg.trim() || signupName.trim() : undefined,
        district: signupDistrict,
        state: 'Andhra Pradesh',
        mandal: 'Rural',
        village: 'Kollipara',
        landAcres: signupRole === 'farmer' ? parseFloat(signupLandAcres) || 2 : undefined,
        selectedCrops: signupRole === 'farmer' ? ['chilli', 'rice'] : undefined
      };

      const res = await auth.signup(signupData);
      if (res.success && res.session) {
        setSuccessNotice(t.accountCreatedSuccess);
        setTimeout(() => {
          onSuccess(res.session!.user);
        }, 600);
      } else {
        setErrorMessage(res.error || t.loginErrorOccurred);
      }
    } catch (e: any) {
      setErrorMessage(e?.message || t.loginErrorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const getPresetLabel = (preset: (typeof DEMO_PRESET_CREDENTIALS)[0]) => {
    if (currentLanguage === 'te') return preset.labelTe;
    if (currentLanguage === 'hi') return preset.labelHi;
    return preset.label;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-auto animate-in fade-in zoom-in duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <div>
                <span className="font-extrabold text-amber-300 tracking-tight text-lg">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-200 block">
                  {t.identityAndAccess}
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-950/60 p-1 rounded-xl border border-emerald-600/40 text-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('te')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  currentLanguage === 'te'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  currentLanguage === 'hi'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="mt-4 relative z-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {mode === 'login' ? t.signInTitle : t.createAccountTitle}
            </h2>
            <p className="text-emerald-100 text-xs mt-0.5">
              {mode === 'login' ? t.signInSub : t.signUpSub}
            </p>
          </div>
        </div>

        {/* DEMO AUTHENTICATION BANNER */}
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-700 shrink-0" />
          <div className="text-[11px] leading-tight">
            {t.demoEnvNotice}
          </div>
        </div>

        {/* 1-CLICK QUICK DEMO LOGIN SELECTOR (Evaluator Convenience) */}
        <div className="p-5 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {t.oneClickDemoLogin}
            </span>
            <span className="text-[10px] text-stone-400 font-mono">{t.instantPreset}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DEMO_PRESET_CREDENTIALS.map((preset) => (
              <button
                key={preset.role}
                type="button"
                onClick={() => handleQuickDemo(preset)}
                disabled={loading}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  loadingRole === preset.role
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500'
                    : 'bg-white hover:bg-emerald-50/50 border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="font-extrabold text-xs text-stone-900 flex items-center justify-between">
                    <span>{getPresetLabel(preset)}</span>
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 truncate mt-1">
                    {preset.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-stone-400 truncate">
                    {preset.phone}
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                  <span>{t.signIn}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="flex border-b border-stone-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'login'
                ? 'border-emerald-700 text-emerald-800 bg-emerald-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.manualSignIn}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'signup'
                ? 'border-emerald-700 text-emerald-800 bg-emerald-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.createNewAccount}
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successNotice && (
          <div className="mx-5 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* MODE: LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.mobileOrEmail}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. 9848012345 or farmer@raithusahay.org"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={t.enterPasswordPlaceholder}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.verifyingCredentials}</span>
                  </div>
                ) : (
                  <>
                    <span>{t.signInToAccount}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* MODE: SIGNUP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.selectYourRole}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { r: 'farmer' as UserRole, l: t.roleFarmerLabel, icon: '🌾' },
                  { r: 'buyer' as UserRole, l: t.roleBuyerLabel, icon: '🏢' },
                  { r: 'trader' as UserRole, l: t.roleTraderLabel, icon: '⚖️' },
                  { r: 'service_provider' as UserRole, l: t.roleServiceProviderLabel, icon: '🚚' },
                  { r: 'admin' as UserRole, l: t.roleAdminLabel, icon: '🛡️' }
                ].map((item) => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => setSignupRole(item.r)}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      signupRole === item.r
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.mobileNumberTen} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="e.g. 9848012345"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>
            </div>

            {/* Email & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.emailOptional}
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="e.g. user@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.district}
                </label>
                <select
                  value={signupDistrict}
                  onChange={(e) => setSignupDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role-Specific fields */}
            {signupRole !== 'farmer' ? (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.companyFirmName}
                </label>
                <input
                  type="text"
                  value={signupOrg}
                  onChange={(e) => setSignupOrg(e.target.value)}
                  placeholder="e.g. Krishna Agro Producer Company"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.landSizeAcres}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={signupLandAcres}
                  onChange={(e) => setSignupLandAcres(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            )}

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.passwordMinSix} *
                </label>
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder={t.createPasswordPlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.confirmPasswordLabel} *
                </label>
                <input
                  type="password"
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder={t.confirmPasswordPlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.creatingSecureProfile}</span>
                  </div>
                ) : (
                  <>
                    <span>{t.completeRegistration}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
