import { useState } from 'react';
import { Check, ArrowRight, Phone, MapPin, User, Sprout, Shield } from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { CROPS_CATALOG } from '../data/mockData';
import { storage } from '../lib/storage';

interface OnboardingProps {
  initialProfile: UserProfile;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onComplete: (profile: UserProfile) => void;
}

export default function FarmerOnboarding({
  initialProfile,
  currentLanguage,
  onLanguageChange,
  onComplete
}: OnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('1234');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const t = translations[currentLanguage];

  const handleLanguageSelect = (lang: LanguageCode) => {
    onLanguageChange(lang);
    storage.setLanguage(lang);
    setProfile((prev) => ({ ...prev, language: lang }));
  };

  const handleSendOtp = () => {
    if (!profile.phone || profile.phone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError(null);
    setOtpSent(true);
  };

  const toggleCrop = (cropId: string) => {
    setProfile((prev) => {
      const selected = prev.selectedCrops || [];
      if (selected.includes(cropId)) {
        return { ...prev, selectedCrops: selected.filter((c) => c !== cropId) };
      } else {
        return { ...prev, selectedCrops: [...selected, cropId] };
      }
    });
  };

  const handleFinish = () => {
    const updated = {
      ...profile,
      isRegistered: true
    };
    storage.saveProfile(updated);
    onComplete(updated);
  };

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

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 bg-emerald-950/20">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
        {/* Progress Bar & Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold tracking-tight text-amber-300 text-lg">
                {t.appName}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {step === 1 && t.selectLanguage}
              {step === 2 && t.loginRegister}
              {step === 3 && 'Farmer & Farm Details'}
              {step === 4 && t.selectPrimaryCrops}
            </h2>
            <p className="text-emerald-100 text-xs mt-1">
              {step === 1 && 'తెలుగు, हिन्दी, or English – select for voice & text guidance'}
              {step === 2 && 'Quick login with OTP or Rythu Passbook verification'}
              {step === 3 && 'Location helps show nearby mandis, weather, and cold storages'}
              {step === 4 && 'Get disease alerts and buyers tailored to your specific crops'}
            </p>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center gap-1.5 mt-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  step >= i ? 'bg-amber-400' : 'bg-emerald-900/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* STEP 1: LANGUAGE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    code: 'te' as LanguageCode,
                    native: 'తెలుగు',
                    name: 'Telugu',
                    sub: 'రైతు సోదరుల కోసం'
                  },
                  {
                    code: 'en' as LanguageCode,
                    native: 'English',
                    name: 'English',
                    sub: 'Standard agricultural view'
                  },
                  {
                    code: 'hi' as LanguageCode,
                    native: 'हिन्दी',
                    name: 'Hindi',
                    sub: 'किसान भाइयों के लिए'
                  }
                ].map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between min-h-[105px] ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <div>
                        <div className="text-xl font-bold text-stone-900">{lang.native}</div>
                        <div className="text-xs font-semibold text-emerald-800">{lang.name}</div>
                      </div>
                      <div className="text-[11px] text-stone-500">{lang.sub}</div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                >
                  <span>{t.continueBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LOGIN / PHONE OTP */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500 font-semibold text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value.replace(/\D/g, '') })
                    }
                    placeholder="98480 12345"
                    className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-base font-medium"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Demo auto-filled for instant evaluation. You can edit with your real number.
                </p>
                {phoneError && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5">
                    {phoneError}
                  </p>
                )}
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Login OTP</span>
                </button>
              ) : (
                <div className="space-y-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-semibold">Simulated OTP Sent to +91 {profile.phone}</span>
                    <button
                      onClick={() => setOtpSent(false)}
                      className="text-emerald-700 underline text-xs"
                    >
                      Change Number
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="Enter 4-digit OTP"
                      className="w-full px-4 py-2.5 bg-white border border-emerald-300 rounded-lg text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[11px] text-emerald-700 text-center mt-1">
                      Demo OTP: <b>1234</b> (Auto-verified)
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Verify & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROFILE & LOCATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.fullNameLabel}</span>
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Venkata Ramana Reddy"
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.districtLabel}</span>
                  </label>
                  <select
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm bg-white"
                  >
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.mandalLabel}
                  </label>
                  <input
                    type="text"
                    value={profile.mandal}
                    onChange={(e) => setProfile({ ...profile, mandal: e.target.value })}
                    placeholder="e.g. Tenali Rural"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.villageLabel}
                  </label>
                  <input
                    type="text"
                    value={profile.village}
                    onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                    placeholder="e.g. Kollipara"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.landAcresLabel}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.landAcres}
                    onChange={(e) =>
                      setProfile({ ...profile, landAcres: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="4.5"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Select Crops</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PRIMARY CROP SELECTION */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600">
                Tap all the crops you currently grow or plan to sow this season:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CROPS_CATALOG.map((crop) => {
                  const isSelected = profile.selectedCrops?.includes(crop.id);
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => toggleCrop(crop.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col items-start gap-1 relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-1 ring-emerald-500'
                          : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span className="text-2xl">{crop.icon}</span>
                      <span className="font-bold text-xs text-stone-900 line-clamp-1">
                        {currentLanguage === 'te'
                          ? crop.nameTe
                          : currentLanguage === 'hi'
                          ? crop.nameHi
                          : crop.name}
                      </span>
                      <span className="text-[10px] text-stone-500">{crop.harvestSeason}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  All your farm data is saved locally on your smartphone with instant offline access and automatic cloud synchronization.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                >
                  <Sprout className="w-5 h-5 text-amber-300" />
                  <span>{t.completeProfile}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
