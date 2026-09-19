import { useState, useEffect } from 'react';
import {
  ScanLine,
  TrendingUp,
  Warehouse,
  Truck,
  Users,
  BookOpen,
  CloudSun,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Droplets,
  Calendar,
  Check,
  X,
  Phone,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { UserProfile, LanguageCode, WeatherSummary, PurchaseOffer } from '../types';
import { translations } from '../i18n/translations';
import { INITIAL_WEATHER, MANDI_PRICES, SAMPLE_NOTIFICATIONS, CROPS_CATALOG } from '../data/mockData';
import { storage } from '../lib/storage';

interface DashboardProps {
  profile: UserProfile;
  currentLanguage: LanguageCode;
  onNavigate: (screen: string) => void;
  onSelectCropForScan?: (cropId: string) => void;
}

export default function FarmerDashboard({
  profile,
  currentLanguage,
  onNavigate,
  onSelectCropForScan
}: DashboardProps) {
  const t = translations[currentLanguage];
  const [weather] = useState<WeatherSummary>(INITIAL_WEATHER);
  const [purchaseOffers, setPurchaseOffers] = useState<PurchaseOffer[]>(storage.getPurchaseOffers());
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const pendingCount = storage.getPendingSyncCount();
  const recentListings = storage.getProduceListings().slice(0, 2);
  const recentStorage = storage.getColdStorageRequests().slice(0, 1);
  const recentLogistics = storage.getLogisticsRequests().slice(0, 1);

  // Subscribe to storage updates
  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setPurchaseOffers(storage.getPurchaseOffers());
    });
    return () => unsub();
  }, []);

  // Filter offers for this farmer (by farmerId or farmerName match, or all offers in demo mode if empty)
  const farmerOffers = purchaseOffers.filter(
    (o) =>
      o.farmerId === profile.id ||
      o.farmerName?.toLowerCase() === profile.name?.toLowerCase() ||
      !o.farmerId // fallback for demo offers
  );

  const pendingOffers = farmerOffers.filter((o) => o.status === 'Pending');

  const handleUpdateOfferStatus = (
    offer: PurchaseOffer,
    status: 'Accepted' | 'Rejected'
  ) => {
    storage.updatePurchaseOfferStatus(offer.id || offer.clientUid, status);
    setPurchaseOffers(storage.getPurchaseOffers());

    const msg =
      status === 'Accepted'
        ? currentLanguage === 'te'
          ? `ఆఫర్ విజయవంతంగా ఆమోదించబడింది! రవాణా కోసం సిద్ధం చేయండి.`
          : currentLanguage === 'hi'
          ? `ऑफर सफलतापूर्वक स्वीकार कर लिया गया! परिवहन की व्यवस्था करें।`
          : `Offer for ${offer.crop} accepted! You can now arrange farmgate logistics.`
        : currentLanguage === 'te'
        ? `ఆఫర్ తిరస్కరించబడింది.`
        : currentLanguage === 'hi'
        ? `ऑफर अस्वीकार कर दिया गया।`
        : `Offer for ${offer.crop} rejected.`;

    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  const selectedCropsData = CROPS_CATALOG.filter((c) =>
    profile.selectedCrops?.includes(c.id)
  );

  return (
    <div className="space-y-5 pb-16">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/60 text-amber-300 text-xs font-semibold flex items-center gap-1 border border-emerald-500/40">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>
                  {profile.village}, {profile.mandal}, {profile.district}
                </span>
              </span>
              <span className="text-xs text-emerald-200">
                {profile.landAcres} {t.landAcresLabel.toLowerCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.greeting}, {profile.name}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              {currentLanguage === 'te'
                ? 'మీ వ్యవసాయానికి అవసరమైన సమగ్ర సేవలు: తెగుళ్ల గుర్తింపు, మార్కెట్ ధరలు, శీతల గిడ్డంగులు మరియు రవాణా.'
                : currentLanguage === 'hi'
                ? 'आपकी खेती के लिए सभी आवश्यक सेवाएं: रोग पहचान, मंडी भाव, कोल्ड स्टोरेज और परिवहन।'
                : 'Empowering your farm with instant disease diagnosis, real mandi prices, verified buyers, and cold chain logistics.'}
            </p>
          </div>

          {/* Quick Disease Scan Hero Button */}
          <div className="shrink-0">
            <button
              onClick={() => onNavigate('diseaseDetect')}
              className="w-full md:w-auto px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-95 group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center">
                <ScanLine className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-emerald-950/80 font-bold leading-none">
                  {currentLanguage === 'te' ? 'AI & ఆఫ్‌లైన్ రోగ నిర్ధారణ' : currentLanguage === 'hi' ? 'AI और ऑफलाइन रोग निदान' : 'AI & Offline Diagnosis'}
                </div>
                <div className="text-base leading-tight font-black">
                  {t.scanCropHealth}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Weather Advisory Card (IMD Agro-met Bulletin format) */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <CloudSun className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">
                  {t.weatherAdvisory}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  {currentLanguage === 'te' ? 'ప్రత్యక్ష కేంద్రం' : currentLanguage === 'hi' ? 'लाइव स्टेशन' : 'Live Station'}
                </span>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-3 mt-0.5">
                <span>{weather.location}</span>
                <span>•</span>
                <span className="font-semibold text-stone-800">{weather.temperatureC}°C</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-500" />
                  {weather.humidity}% {currentLanguage === 'te' ? 'తేమ' : currentLanguage === 'hi' ? 'नमी' : 'Humidity'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{currentLanguage === 'te' ? 'వాతావరణ వివరాలు' : currentLanguage === 'hi' ? 'मौसम रडार' : 'Weather Radar'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="mt-3 p-3 bg-emerald-50/70 rounded-lg border border-emerald-200/60 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 font-medium">
            <span className="font-bold">{t.advisoryNotice}: </span>
            {currentLanguage === 'te'
              ? weather.advisoryTe
              : currentLanguage === 'hi'
              ? weather.advisoryHi
              : weather.advisory}
          </p>
        </div>
      </div>

      {/* Quick Action Grid (6 primary farmer services) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
            {t.quickActions}
          </h2>
          <span className="text-xs text-stone-500">
            {currentLanguage === 'te' ? 'సేవల కోసం నొక్కండి' : currentLanguage === 'hi' ? 'सेवाओं के लिए टैप करें' : 'Tap to access services'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Action 1: Disease Scan */}
          <button
            onClick={() => onNavigate('diseaseDetect')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border-2 border-emerald-500/30 hover:border-emerald-500 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🔬
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-stone-900">
                {currentLanguage === 'te' ? 'AI స్కాన్' : currentLanguage === 'hi' ? 'AI स्कैन' : 'AI SCAN'}
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.scanCropHealth}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'కెమెరా ఆకు వ్యాధి గుర్తింపు' : currentLanguage === 'hi' ? 'पत्ती रोग पहचान' : 'Camera leaf diagnosis'}
              </div>
            </div>
          </button>

          {/* Action 2: Mandi Prices */}
          <button
            onClick={() => onNavigate('marketPrices')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-400 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.checkLivePrices}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'APMC & e-NAM మార్కెట్లు' : currentLanguage === 'hi' ? 'APMC और ई-नाम मंडियां' : 'APMC & e-NAM mandis'}
              </div>
            </div>
          </button>

          {/* Action 3: Cold Storage */}
          <button
            onClick={() => onNavigate('coldStorage')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-400 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              ❄️
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.bookColdStorage}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'సమీప శీతల గిడ్డంగులు' : currentLanguage === 'hi' ? 'नजदीकी कोल्ड स्टोरेज' : 'Nearby cold stores'}
              </div>
            </div>
          </button>

          {/* Action 4: Logistics Transport */}
          <button
            onClick={() => onNavigate('logistics')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-400 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🚚
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.bookTransport}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'పికప్ బొలెరో & ట్రక్కులు' : currentLanguage === 'hi' ? 'पिकअप बोलेरो और ट्रक' : 'Pickup Bolero & trucks'}
              </div>
            </div>
          </button>

          {/* Action 5: Sell Produce / Buyers */}
          <button
            onClick={() => onNavigate('buyersFPOs')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-400 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🤝
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.sellProduce}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'ధృవీకరించిన FPOలు & కొనుగోలుదారులు' : currentLanguage === 'hi' ? 'सत्यापित खरीदार व एफपीओ' : 'Direct to verified FPOs'}
              </div>
            </div>
          </button>

          {/* Action 6: Treatment Library */}
          <button
            onClick={() => onNavigate('treatmentGuide')}
            className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-400 shadow-sm text-left transition-all group flex flex-col justify-between min-h-[120px] active:scale-[0.98] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              📖
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                {t.treatmentGuide}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-1">
                {currentLanguage === 'te' ? 'సేంద్రీయ & రసాయన మందులు' : currentLanguage === 'hi' ? 'जैविक व रासायनिक उपचार' : 'Organic & chemical doses'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* My Primary Crops Quick Ticker */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🌾</span>
            <h3 className="font-bold text-sm text-stone-900">{t.myCrops}</h3>
          </div>
          <button
            onClick={() => onNavigate('diseaseDetect')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{t.scanCropHealth}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {selectedCropsData.map((crop) => (
            <div
              key={crop.id}
              className="p-2.5 rounded-lg border border-stone-200 bg-stone-50/70 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{crop.icon}</span>
                <div>
                  <div className="font-bold text-xs text-stone-900">
                    {currentLanguage === 'te'
                      ? crop.nameTe
                      : currentLanguage === 'hi'
                      ? crop.nameHi
                      : crop.name}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {currentLanguage === 'te' ? 'అంచనా దిగుబడి: ' : currentLanguage === 'hi' ? 'अनुमानित उपज: ' : 'Est. Yield: '} {crop.standardYieldPerAcre}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onSelectCropForScan) onSelectCropForScan(crop.id);
                  onNavigate('diseaseDetect');
                }}
                className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors cursor-pointer"
                title={t.scanCropHealth}
              >
                {currentLanguage === 'te' ? 'స్కాన్' : currentLanguage === 'hi' ? 'स्कैन' : 'Scan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mandi Rate Ticker Highlight */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-xs tracking-wider uppercase text-amber-300">
              {t.todayMandiHighlight}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('marketPrices')}
            className="text-xs text-emerald-300 hover:text-white font-medium flex items-center gap-1"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {MANDI_PRICES.slice(0, 2).map((mandi) => (
            <div
              key={mandi.id}
              className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-semibold text-stone-200 line-clamp-1">
                  {mandi.crop}
                </div>
                <div className="text-[10px] text-stone-400 line-clamp-1">{mandi.mandi}</div>
              </div>
              <div className="text-right">
                <div className="text-base font-extrabold text-amber-400">
                  ₹{mandi.modalPrice.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  +{mandi.dailyChangePercent}% {currentLanguage === 'te' ? 'ఈ రోజు' : currentLanguage === 'hi' ? 'आज' : 'Today'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action feedback toast/banner */}
      {actionFeedback && (
        <div className="p-3.5 bg-emerald-900 text-white rounded-xl shadow-md border border-emerald-700 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-emerald-300 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* OFFERS RECEIVED SECTION (Farmer Direct Selling Workflow) */}
      <div id="farmer-offers-received-section" className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-stone-900">
                  {currentLanguage === 'te'
                    ? 'కొనుగోలుదారుల నుండి వచ్చిన ఆఫర్లు'
                    : currentLanguage === 'hi'
                    ? 'खरीदारों से प्राप्त ऑफर'
                    : 'Offers Received from Buyers / FPOs'}
                </h3>
                {pendingOffers.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 animate-pulse">
                    {pendingOffers.length} {currentLanguage === 'te' ? 'పెండింగ్' : currentLanguage === 'hi' ? 'लंबित' : 'Pending Action'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                {currentLanguage === 'te'
                  ? 'మీ పంట కొనుగోలుకు FPOలు మరియు వ్యాపారులు చేసిన బిడ్స్ సమీక్షించండి'
                  : currentLanguage === 'hi'
                  ? 'अपनी फसल खरीद के लिए FPO और खरीदारों के प्रस्तावों की समीक्षा करें'
                  : 'Review procurement proposals, accept rates, and coordinate dispatch'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('myRequests')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0"
          >
            <span>{t.viewAll} ({farmerOffers.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {farmerOffers.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-stone-50 border border-dashed border-stone-200">
            <Users className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-stone-700">
              {currentLanguage === 'te'
                ? 'ఇంకా ఎటువంటి కొనుగోలు ఆఫర్లు రాలేదు.'
                : currentLanguage === 'hi'
                ? 'अभी तक कोई खरीद ऑफर प्राप्त नहीं हुआ है।'
                : 'No purchase offers received yet.'}
            </p>
            <p className="text-[11px] text-stone-500 mt-1 max-w-sm mx-auto">
              {currentLanguage === 'te'
                ? 'మీ పంటను మార్కెట్ లేదా FPO డైరెక్టరీలో లిస్ట్ చేయండి. కొనుగోలుదారులు చూసి ఆఫర్ పంపుతారు.'
                : currentLanguage === 'hi'
                ? 'अपनी उपज को मंडी में लिस्ट करें। खरीदार इसे देखकर आपको सीधा ऑफर भेजेंगे।'
                : 'Publish your produce lots under "Sell Produce". Verified buyers & FPOs will submit offers directly.'}
            </p>
            <button
              onClick={() => onNavigate('buyersFPOs')}
              className="mt-3 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
            >
              <span>{t.sellProduce}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {farmerOffers.slice(0, 3).map((offer) => (
              <div
                key={offer.id || offer.clientUid}
                id={`farmer-offer-card-${offer.id || offer.clientUid}`}
                className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/80 hover:bg-stone-50 space-y-3 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-stone-900">
                        {offer.crop} ({offer.variety})
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          offer.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : offer.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {offer.status === 'Accepted' ? (
                          <CheckCircle className="w-2.5 h-2.5" />
                        ) : (
                          <Clock className="w-2.5 h-2.5" />
                        )}
                        {offer.status === 'Accepted'
                          ? currentLanguage === 'te' ? 'ఆమోదించబడింది' : currentLanguage === 'hi' ? 'स्वीकृत' : 'Accepted'
                          : offer.status === 'Rejected'
                          ? currentLanguage === 'te' ? 'తిరస్కరించబడింది' : currentLanguage === 'hi' ? 'अस्वीकृत' : 'Rejected'
                          : currentLanguage === 'te' ? 'పెండింగ్' : currentLanguage === 'hi' ? 'लंबित' : 'Pending'}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                          offer.syncStatus === 'synced'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {offer.syncStatus === 'synced'
                          ? (currentLanguage === 'te' ? 'సింక్ చేయబడింది' : currentLanguage === 'hi' ? 'सिंक हुआ' : 'Synced')
                          : (currentLanguage === 'te' ? 'పెండింగ్ సింక్' : currentLanguage === 'hi' ? 'लंबित सिंक' : 'Pending Sync')}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {currentLanguage === 'te' ? 'కొనుగోలుదారు: ' : currentLanguage === 'hi' ? 'खरीदार: ' : 'From Buyer: '}<strong className="text-stone-800">{offer.buyerName}</strong> • {new Date(offer.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-stone-400 font-bold uppercase">
                      {currentLanguage === 'te' ? 'మొత్తం ఆఫర్ విలువ' : currentLanguage === 'hi' ? 'कुल सौदा मूल्य' : 'Total Offer Deal'}
                    </span>
                    <div className="text-base font-black text-emerald-800">
                      ₹{offer.totalOfferAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Offer detail specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2.5 rounded-lg border border-stone-200/80 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500">
                      {currentLanguage === 'te' ? 'ఆఫర్ చేసిన పరిమాణం' : currentLanguage === 'hi' ? 'प्रस्तावित मात्रा' : 'Offered Quantity'}
                    </span>
                    <div className="font-bold text-stone-900">
                      {offer.quantity} {offer.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500">
                      {currentLanguage === 'te' ? 'ఆఫర్ చేసిన ధర' : currentLanguage === 'hi' ? 'प्रस्तावित दर' : 'Offered Rate'}
                    </span>
                    <div className="font-bold text-emerald-700">
                      ₹{offer.offeredPrice.toLocaleString()} / Q
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500">
                      {currentLanguage === 'te' ? 'మీరు కోరిన ధర' : currentLanguage === 'hi' ? 'आपकी मांगी गई दर' : 'Your Asking Rate'}
                    </span>
                    <div className="font-semibold text-stone-600">
                      ₹{offer.askingPrice.toLocaleString()} / Q
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500">
                      {currentLanguage === 'te' ? 'ధర సరిపోలిక' : currentLanguage === 'hi' ? 'मूल्य मिलान' : 'Price Match'}
                    </span>
                    <div className={`font-bold ${offer.offeredPrice >= offer.askingPrice ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {offer.offeredPrice >= offer.askingPrice
                        ? currentLanguage === 'te' ? '100% కోరిన ధరకు సరిపోయింది' : currentLanguage === 'hi' ? '100% मांग के अनुसार' : '100% Meets Ask'
                        : currentLanguage === 'te'
                        ? `కోరిన ధర కంటే ₹${(offer.askingPrice - offer.offeredPrice).toLocaleString()} తక్కువ`
                        : currentLanguage === 'hi'
                        ? `मांग से ₹${(offer.askingPrice - offer.offeredPrice).toLocaleString()} कम`
                        : `₹${(offer.askingPrice - offer.offeredPrice).toLocaleString()} below ask`}
                    </div>
                  </div>
                </div>

                {offer.message && (
                  <div className="bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-lg text-xs text-amber-900">
                    <span className="font-bold">
                      {currentLanguage === 'te' ? 'కొనుగోలుదారు గమనిక: ' : currentLanguage === 'hi' ? 'खरीदार की टिप्पणी: ' : 'Note from Buyer: '}
                    </span>
                    <span>"{offer.message}"</span>
                  </div>
                )}

                {/* Offer Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${offer.buyerPhone}`}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{currentLanguage === 'te' ? 'కొనుగోలుదారుకు కాల్ చేయండి' : currentLanguage === 'hi' ? 'खरीदार को कॉल करें' : 'Call Buyer'}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {offer.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleUpdateOfferStatus(offer, 'Rejected')}
                          className="px-3.5 py-1.5 border border-rose-300 bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{currentLanguage === 'te' ? 'తిరస్కరించు' : currentLanguage === 'hi' ? 'अस्वीकार करें' : 'Reject'}</span>
                        </button>
                        <button
                          onClick={() => handleUpdateOfferStatus(offer, 'Accepted')}
                          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{currentLanguage === 'te' ? 'ఆమోదించు' : currentLanguage === 'hi' ? 'स्वीकार करें' : 'Accept Offer'}</span>
                        </button>
                      </>
                    ) : offer.status === 'Accepted' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{currentLanguage === 'te' ? 'డీల్ ఖరారైంది' : currentLanguage === 'hi' ? 'सौदा तय हुआ' : 'Deal Confirmed'}</span>
                        </span>
                        <button
                          onClick={() => onNavigate('logistics')}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{t.bookTransport}</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                        {currentLanguage === 'te' ? 'ఆఫర్ తిరస్కరించబడింది' : currentLanguage === 'hi' ? 'ऑफर अस्वीकार किया गया' : 'Offer Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{t.activeReminders}</span>
          </h3>
          <button
            onClick={() => onNavigate('notifications')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {t.viewAll}
          </button>
        </div>

        <div className="space-y-2">
          {SAMPLE_NOTIFICATIONS.slice(0, 2).map((notif) => (
            <div
              key={notif.id}
              className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3 hover:bg-emerald-50/40 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  notif.priority === 'high' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-stone-900">
                  {currentLanguage === 'te'
                    ? notif.titleTe
                    : currentLanguage === 'hi'
                    ? notif.titleHi
                    : notif.title}
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">
                  {currentLanguage === 'te'
                    ? notif.messageTe
                    : currentLanguage === 'hi'
                    ? notif.messageHi
                    : notif.message}
                </p>
              </div>
              <span className="text-[10px] text-stone-400 shrink-0">{notif.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Service Requests & Sync Status */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-stone-900">{t.recentRequests}</h3>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                {pendingCount} {currentLanguage === 'te' ? 'పెండింగ్ సింక్' : currentLanguage === 'hi' ? 'लंबित सिंक' : 'Pending Sync'}
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigate('myRequests')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{currentLanguage === 'te' ? 'అన్ని అభ్యర్థనలు చూడండి' : currentLanguage === 'hi' ? 'सभी अनुरोध देखें' : 'Manage All Requests'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {recentListings.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-stone-200 bg-stone-50/60 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">
                    {currentLanguage === 'te' ? 'పంట అమ్మకపు జాబితా: ' : currentLanguage === 'hi' ? 'फसल सूची: ' : 'Produce Listing: '}{item.crop}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced'
                      ? (currentLanguage === 'te' ? 'సింక్ చేయబడింది' : currentLanguage === 'hi' ? 'सिंक हुआ' : 'Synced')
                      : (currentLanguage === 'te' ? 'పెండింగ్ సింక్' : currentLanguage === 'hi' ? 'लंबित सिंक' : 'Pending Sync')}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  {item.quantity} {item.unit} @ ₹{item.expectedPrice}/Q • {item.location}
                </div>
              </div>
              <span className="text-xs font-bold text-stone-700 capitalize">
                {item.status === 'sold'
                  ? (currentLanguage === 'te' ? 'అమ్మబడింది' : currentLanguage === 'hi' ? 'बिक गया' : 'Sold')
                  : item.status === 'in_negotiation'
                  ? (currentLanguage === 'te' ? 'చర్చల్లో ఉంది' : currentLanguage === 'hi' ? 'बातचीत जारी' : 'In Negotiation')
                  : item.status === 'active'
                  ? (currentLanguage === 'te' ? 'యాక్టివ్' : currentLanguage === 'hi' ? 'सक्रिय' : 'Active')
                  : (currentLanguage === 'te' ? 'డ్రాఫ్ట్' : currentLanguage === 'hi' ? 'ड्राफ्ट' : 'Draft')}
              </span>
            </div>
          ))}

          {recentStorage.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-stone-200 bg-stone-50/60 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">
                    {currentLanguage === 'te' ? 'శీతల గిడ్డంగి: ' : currentLanguage === 'hi' ? 'కోल्ड स्टोरेज: ' : 'Cold Storage: '}{item.facilityName}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    {currentLanguage === 'te' ? 'సింక్ చేయబడింది' : currentLanguage === 'hi' ? 'सिंक हुआ' : 'Synced'}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  {item.quantity} {item.unit}, {item.durationMonths} {currentLanguage === 'te' ? 'నెలలు' : currentLanguage === 'hi' ? 'महीने' : 'months'}
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 capitalize">
                {item.status === 'confirmed'
                  ? (currentLanguage === 'te' ? 'ధృవీకరించబడింది' : currentLanguage === 'hi' ? 'पुष्टि की गई' : 'Confirmed')
                  : item.status === 'active'
                  ? (currentLanguage === 'te' ? 'యాక్టివ్' : currentLanguage === 'hi' ? 'सक्रिय' : 'Active')
                  : item.status === 'cancelled'
                  ? (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : 'Cancelled')
                  : item.status === 'submitted'
                  ? (currentLanguage === 'te' ? 'సమర్పించబడింది' : currentLanguage === 'hi' ? 'जमा किया गया' : 'Submitted')
                  : (currentLanguage === 'te' ? 'పెండింగ్' : currentLanguage === 'hi' ? 'लंबित' : 'Pending')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
