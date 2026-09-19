import { ShieldAlert, ArrowLeft, LogOut, KeyRound } from 'lucide-react';
import { UserRole, LanguageCode, AuthUser } from '../types';
import { translations } from '../i18n/translations';

interface AccessDeniedProps {
  currentUser: AuthUser;
  attemptedScreen: string;
  currentLanguage: LanguageCode;
  onNavigateHome: () => void;
  onSwitchAccount: () => void;
}

export default function AccessDenied({
  currentUser,
  attemptedScreen,
  currentLanguage,
  onNavigateHome,
  onSwitchAccount
}: AccessDeniedProps) {
  const t = translations[currentLanguage];

  const getRequiredRoleDescription = (screen: string): string => {
    if (currentLanguage === 'te') {
      switch (screen) {
        case 'admin':
        case 'architecture':
          return 'ప్రభుత్వ నిబంధనలు, KYC ధృవీకరణ మరియు మార్కెట్ ధరల నిర్వహణకు అడ్మిన్ అనుమతులు అవసరం.';
        case 'trader':
        case 'marketPrices':
          return 'మార్కెట్ యార్డ్ వేలంలో పాల్గొనడానికి మరియు బిడ్లను నమోదు చేయడానికి APMC లైసెన్స్ పొందిన వ్యాపారి అనుమతి అవసరం.';
        case 'buyersFPOs':
          return 'రైతుల పంటల కొనుగోలుకు అధికారికంగా బిడ్లు వేయడానికి నమోదైన కొనుగోలుదారు లేదా FPO అనుమతులు అవసరం.';
        case 'serviceProvider':
          return 'శీతల గిడ్డంగులు, వాహనాల కేటాయింపు మరియు స్టోరేజీ నిర్వహణ కోసం సర్వీస్ ప్రొవైడర్ అనుమతి అవసరం.';
        default:
          return 'రైతు సలహాలు, పంట రికార్డులు మరియు రవాణా బుకింగ్ కోసం రైతు ఖాతా అనుమతి అవసరం.';
      }
    }
    if (currentLanguage === 'hi') {
      switch (screen) {
        case 'admin':
        case 'architecture':
          return 'सरकारी अनुपालन, केवाईसी सत्यापन और मंडी मूल्य प्रबंधन के लिए व्यवस्थापक विशेषाधिकार आवश्यक हैं।';
        case 'trader':
        case 'marketPrices':
          return 'मंडी नीलामी में भाग लेने और बोलियां लगाने के लिए अधिकृत व्यापारी अनुमति आवश्यक है।';
        case 'buyersFPOs':
          return 'किसानों की उपज खरीदने और बोलियां लगाने के लिए पंजीकृत खरीदार या एफपीओ क्रेडेंशियल आवश्यक हैं।';
        case 'serviceProvider':
          return 'कोल्ड स्टोरेज और परिवहन बेड़े के प्रबंधन के लिए सेवा प्रदाता प्राधिकरण आवश्यक है।';
        default:
          return 'फसल सलाह, रिकॉर्ड और परिवहन बुकिंग के लिए किसान क्रेडेंशियल आवश्यक हैं।';
      }
    }
    switch (screen) {
      case 'admin':
      case 'architecture':
        return 'Administrator privileges are required for government compliance, KYC auditing, and master mandi price management.';
      case 'trader':
      case 'marketPrices':
        return 'APMC Licensed Trader or Mandi Commission Agent authorization is required to clear auction lots and input spot bids.';
      case 'buyersFPOs':
        return 'Registered Buyer or FPO credentials are required to submit commercial procurement lots and bid on farmer produce.';
      case 'serviceProvider':
        return 'Service Provider authorization is required to operate cold storage chambers, assign fleet transport, and clear storage receipts.';
      case 'diseaseDetect':
      case 'treatmentGuide':
      case 'coldStorage':
      case 'logistics':
      case 'myRequests':
      default:
        return 'Farmer credentials are required to access private farm health advisories, crop records, and farm-gate transport booking.';
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

  const getScreenDisplayName = (screen: string): string => {
    switch (screen) {
      case 'admin':
        return t.admin;
      case 'architecture':
        return t.architecture;
      case 'trader':
        return t.trader;
      case 'buyersFPOs':
        return t.buyersFPOs;
      case 'serviceProvider':
        return t.serviceProvider;
      case 'diseaseDetect':
        return t.diseaseDetect;
      case 'treatmentGuide':
        return t.treatmentGuide;
      case 'coldStorage':
        return t.coldStorage;
      case 'logistics':
        return t.logistics;
      case 'myRequests':
        return t.myRequests;
      default:
        return screen;
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-200 text-center relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-4 border border-rose-200 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-2">
          {t.accessRestrictedTitle}
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
          {t.accessRestrictedTitle}
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {t.accessRestrictedDesc} (<strong className="text-stone-900 font-bold">{getScreenDisplayName(attemptedScreen)}</strong>)
        </p>

        {/* Current User Role vs Requirement Box */}
        <div className="mt-5 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">{t.signedInUser}:</span>
            <span className="font-bold text-stone-900 capitalize flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {currentUser.name} ({getRoleLabel(currentUser.role)})
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">{t.phoneLabel}:</span>
            <span className="font-mono text-stone-800">{currentUser.phone}</span>
          </div>

          <div className="pt-1">
            <span className="font-bold text-stone-700 block mb-1">{t.requiredRole}:</span>
            <p className="text-stone-600 text-[11px] leading-normal">
              {getRequiredRoleDescription(attemptedScreen)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.returnToHome}</span>
          </button>

          <button
            onClick={onSwitchAccount}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-300 transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-stone-500" />
            <span>{t.switchUserAccount}</span>
          </button>
        </div>

        <p className="mt-5 text-[10px] text-stone-400">
          {t.rbacEnforced}
        </p>
      </div>
    </div>
  );
}
