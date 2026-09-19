import {
  Home,
  ScanLine,
  TrendingUp,
  Warehouse,
  Truck,
  FileText,
  BookOpen,
  Users,
  Settings,
  ShieldCheck,
  Server,
  Building2,
  Scale
} from 'lucide-react';
import { UserRole, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  currentRole: UserRole;
  currentLanguage: LanguageCode;
  pendingSyncCount: number;
}

export default function Navigation({
  currentScreen,
  onNavigate,
  currentRole,
  currentLanguage,
  pendingSyncCount
}: NavigationProps) {
  const t = translations[currentLanguage];

  // Role: Admin
  if (currentRole === 'admin') {
    return (
      <nav className="bg-emerald-950 text-emerald-100 border-b border-emerald-800 sticky top-[77px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-stone-900 font-extrabold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {t.adminConsole}
            </span>
            <span className="text-emerald-300 hidden sm:inline">{t.platformGovernance}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'admin'
                  ? 'bg-amber-400 text-stone-900 shadow'
                  : 'hover:bg-emerald-800 text-emerald-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.adminManagement}</span>
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'architecture'
                  ? 'bg-amber-400 text-stone-900 shadow'
                  : 'hover:bg-emerald-800 text-emerald-100'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>{t.systemArchitecture}</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-emerald-200 hover:text-white ${
                currentScreen === 'settings' ? 'bg-emerald-800 text-amber-300' : ''
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.settings}</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Role: Service Provider
  if (currentRole === 'service_provider') {
    return (
      <nav className="bg-sky-950 text-sky-100 border-b border-sky-800 sticky top-[77px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-sky-500 text-white font-extrabold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Warehouse className="w-3.5 h-3.5" /> {t.serviceProviderHub}
            </span>
            <span className="text-sky-300 hidden sm:inline">{t.coldStorageFleetOps}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('serviceProvider')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'serviceProvider'
                  ? 'bg-sky-500 text-white shadow'
                  : 'hover:bg-sky-900 text-sky-100'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{t.operationsConsole}</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sky-200 hover:text-white ${
                currentScreen === 'settings' ? 'bg-sky-900 text-amber-300' : ''
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.settings}</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Role: Buyer / FPO
  if (currentRole === 'buyer') {
    return (
      <nav className="bg-emerald-950 text-emerald-100 border-b border-emerald-800 sticky top-[77px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-stone-900 font-extrabold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> {t.buyerFpoConsole}
            </span>
            <span className="text-emerald-300 hidden sm:inline">{t.directFarmProcurement}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('buyersFPOs')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'buyersFPOs'
                  ? 'bg-amber-400 text-stone-900 shadow'
                  : 'hover:bg-emerald-800 text-emerald-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.farmerProduceLots}</span>
            </button>
            <button
              onClick={() => onNavigate('marketPrices')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'marketPrices'
                  ? 'bg-amber-400 text-stone-900 shadow'
                  : 'hover:bg-emerald-800 text-emerald-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.apmcMandiRates}</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-emerald-200 hover:text-white ${
                currentScreen === 'settings' ? 'bg-emerald-800 text-amber-300' : ''
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.settings}</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Role: Trader / Mandi Agent
  if (currentRole === 'trader') {
    return (
      <nav className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-[77px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-stone-900 font-extrabold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> {t.apmcTraderConsole}
            </span>
            <span className="text-stone-400 hidden sm:inline">{t.liveMandiYardAuction}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onNavigate('marketPrices')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center gap-1.5 ${
                currentScreen === 'marketPrices'
                  ? 'bg-amber-500 text-stone-900 shadow'
                  : 'hover:bg-stone-800 text-stone-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.auctionFloorPrices}</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-stone-300 hover:text-white ${
                currentScreen === 'settings' ? 'bg-stone-800 text-amber-300' : ''
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.settings}</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Role: Farmer (Full feature suite)
  const farmerNavItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'diseaseDetect', label: t.diseaseDetect, icon: ScanLine, highlight: true },
    { id: 'marketPrices', label: t.marketPrices, icon: TrendingUp },
    { id: 'coldStorage', label: t.coldStorage, icon: Warehouse },
    { id: 'logistics', label: t.logistics, icon: Truck },
    {
      id: 'myRequests',
      label: t.myRequests,
      icon: FileText,
      badge: pendingSyncCount > 0 ? pendingSyncCount : undefined
    }
  ];

  const secondaryNavItems = [
    { id: 'treatmentGuide', label: t.treatmentGuide, icon: BookOpen },
    { id: 'buyersFPOs', label: t.buyersFPOs, icon: Users },
    { id: 'settings', label: t.settings, icon: Settings }
  ];

  return (
    <>
      {/* Desktop Sub-Nav Bar */}
      <nav className="hidden md:block bg-emerald-900/90 backdrop-blur text-emerald-100 border-b border-emerald-800/80 sticky top-[77px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto py-1.5 scrollbar-none">
            {farmerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-amber-300 font-semibold shadow-inner'
                      : 'hover:bg-emerald-800/70 text-emerald-100 hover:text-white'
                  } ${item.highlight ? 'ring-1 ring-amber-400/40' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 bg-amber-500 text-emerald-950 font-bold text-[10px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1 py-1.5 pl-2 border-l border-emerald-800/60">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-amber-300 font-semibold'
                      : 'hover:bg-emerald-800/70 text-emerald-200 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-emerald-900 border-t border-emerald-700/80 shadow-2xl px-1 py-1.5 pb-safe">
        <div className="flex items-center justify-around">
          {farmerNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-amber-300 font-bold bg-emerald-800'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {item.highlight && !isActive && (
                  <span className="absolute -top-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110 text-amber-300' : ''}`} />
                <span className="text-[10px] line-clamp-1 text-center tracking-tight leading-none">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute top-0 right-1 px-1 min-w-4 h-4 bg-amber-500 text-emerald-950 font-bold text-[9px] rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* More / Requests button */}
          <button
            onClick={() => onNavigate(currentScreen === 'myRequests' ? 'settings' : 'myRequests')}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all relative ${
              currentScreen === 'myRequests' || currentScreen === 'settings'
                ? 'text-amber-300 font-bold bg-emerald-800'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] line-clamp-1 text-center tracking-tight leading-none">
              {t.myRequests}
            </span>
            {pendingSyncCount > 0 && (
              <span className="absolute top-0 right-1 px-1 min-w-4 h-4 bg-amber-500 text-emerald-950 font-bold text-[9px] rounded-full flex items-center justify-center animate-bounce">
                {pendingSyncCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
