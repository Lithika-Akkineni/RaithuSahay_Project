import { useState, useEffect } from 'react';
import {
  Warehouse,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  MapPin,
  Calendar,
  Filter,
  RefreshCw,
  Phone,
  Package,
  AlertCircle
} from 'lucide-react';
import { LanguageCode, ColdStorageRequest, LogisticsRequest } from '../types';
import { storage } from '../lib/storage';
import { COLD_STORAGE_FACILITIES, LOGISTICS_VEHICLES } from '../data/mockData';
import { translations } from '../i18n/translations';

interface ServiceProviderDashboardProps {
  currentLanguage: LanguageCode;
  onNavigate?: (screen: string) => void;
}

export default function ServiceProviderDashboard({
  currentLanguage
}: ServiceProviderDashboardProps) {
  const t = translations[currentLanguage];

  const [activeTab, setActiveTab] = useState<'storage' | 'logistics'>('storage');
  const [coldStorageRequests, setColdStorageRequests] = useState<ColdStorageRequest[]>(
    storage.getColdStorageRequests()
  );
  const [logisticsRequests, setLogisticsRequests] = useState<LogisticsRequest[]>(
    storage.getLogisticsRequests()
  );
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setColdStorageRequests(storage.getColdStorageRequests());
      setLogisticsRequests(storage.getLogisticsRequests());
    });
    return () => unsub();
  }, []);

  const handleUpdateStorageStatus = (
    reqId: string,
    newStatus: 'confirmed' | 'active' | 'cancelled'
  ) => {
    const updated = coldStorageRequests.map((r) =>
      r.id === reqId ? { ...r, status: newStatus } : r
    );
    storage.saveColdStorageRequests(updated);
    setColdStorageRequests(updated);
    const statusName = newStatus === 'confirmed'
      ? (currentLanguage === 'te' ? 'ధృవీకరించబడింది' : currentLanguage === 'hi' ? 'पुष्टि की गई' : 'CONFIRMED')
      : newStatus === 'active'
      ? (currentLanguage === 'te' ? 'యాక్టివ్' : currentLanguage === 'hi' ? 'सक्रिय' : 'ACTIVE')
      : (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : 'CANCELLED');
    setSuccessToast(
      currentLanguage === 'te'
        ? `శీతల గిడ్డంగి రిజర్వేషన్ స్థితి "${statusName}"గా నవీకరించబడింది`
        : currentLanguage === 'hi'
        ? `कोल्ड स्टोरेज आरक्षण स्थिति "${statusName}" में अपडेट की गई`
        : `Storage reservation status updated to "${newStatus.toUpperCase()}"`
    );
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleUpdateLogisticsStatus = (
    reqId: string,
    newStatus: 'assigned' | 'in_transit' | 'completed' | 'cancelled'
  ) => {
    const updated = logisticsRequests.map((r) =>
      r.id === reqId ? { ...r, status: newStatus } : r
    );
    storage.saveLogisticsRequests(updated);
    setLogisticsRequests(updated);
    const statusName = newStatus === 'assigned'
      ? (currentLanguage === 'te' ? 'కేటాయించబడింది' : currentLanguage === 'hi' ? 'आवंटित' : 'ASSIGNED')
      : newStatus === 'in_transit'
      ? (currentLanguage === 'te' ? 'మార్గంలో ఉంది' : currentLanguage === 'hi' ? 'पारगमन में' : 'IN TRANSIT')
      : newStatus === 'completed'
      ? (currentLanguage === 'te' ? 'పూర్తయింది' : currentLanguage === 'hi' ? 'पूर्ण' : 'COMPLETED')
      : (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : 'CANCELLED');
    setSuccessToast(
      currentLanguage === 'te'
        ? `రవాణా స్థితి "${statusName}"గా నవీకరించబడింది`
        : currentLanguage === 'hi'
        ? `परिवहन स्थिति "${statusName}" में अपडेट की गई`
        : `Logistics transport status updated to "${newStatus.replace('_', ' ').toUpperCase()}"`
    );
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const pendingStorageCount = coldStorageRequests.filter(
    (r) => r.status === 'pending' || r.status === 'submitted'
  ).length;
  const pendingLogisticsCount = logisticsRequests.filter(
    (r) => r.status === 'requested'
  ).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-800 text-lg">
                🏢
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {currentLanguage === 'te' ? 'సేవా ప్రదాత కార్యకలాపాల కన్సోల్' : currentLanguage === 'hi' ? 'सेवा प्रदाता संचालन कंसोल' : 'Service Provider Operations Console'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              {currentLanguage === 'te'
                ? 'శీతల గిడ్డంగుల రిజర్వేషన్లు, గిడ్డంగి గదులు, పొలం వద్ద రవాణా పంపిణీ మరియు వాహన కేటాయింపులను నిర్వహించండి.'
                : currentLanguage === 'hi'
                ? 'कोल्ड स्टोरेज आरक्षण, वेयरहाउस कक्ष, फार्म-गेट परिवहन प्रेषण और बेड़े आवंटन का प्रबंधन करें।'
                : 'Manage cold storage reservations, warehouse chambers, farm-gate logistics dispatch, and fleet assignments.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'te' ? 'ధృవీకరించిన భాగస్వామి: రైతు రథం కార్యకలాపాలు' : currentLanguage === 'hi' ? 'प्रमाणित भागीदार: रैथु रथम संचालन' : 'Certified Partner: Raithu Ratham Operations'}</span>
            </span>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-emerald-800 font-bold underline cursor-pointer"
            >
              {currentLanguage === 'te' ? 'తీసివేయి' : currentLanguage === 'hi' ? 'खारिज करें' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-stone-500">
              {currentLanguage === 'te' ? 'యాక్టివ్ కోల్డ్ స్టోరేజీలు' : currentLanguage === 'hi' ? 'सक्रिय कोल्ड स्टोरेज' : 'Active Cold Stores'}
            </div>
            <div className="text-xl font-extrabold text-stone-900 mt-1">
              {COLD_STORAGE_FACILITIES.length} {currentLanguage === 'te' ? 'యూనిట్లు' : currentLanguage === 'hi' ? 'इकाइयां' : 'Units'}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              {currentLanguage === 'te' ? '5,200 MT మొత్తం సామర్థ్యం' : currentLanguage === 'hi' ? '5,200 मीट्रिक टन कुल क्षमता' : '5,200 MT total capacity'}
            </div>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200">
            <div className="text-[10px] uppercase font-bold text-sky-700">
              {currentLanguage === 'te' ? 'నిల్వ బుకింగ్‌లు' : currentLanguage === 'hi' ? 'भंडारण बुकिंग' : 'Storage Bookings'}
            </div>
            <div className="text-xl font-extrabold text-sky-900 mt-1">
              {coldStorageRequests.length}
            </div>
            <div className="text-[11px] text-sky-700 font-medium mt-0.5">
              {pendingStorageCount} {currentLanguage === 'te' ? 'చేరిక కోసం వేచి ఉన్నాయి' : currentLanguage === 'hi' ? 'आगमन की प्रतीक्षा में' : 'awaiting intake'}
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
            <div className="text-[10px] uppercase font-bold text-amber-700">
              {currentLanguage === 'te' ? 'యాక్టివ్ రవాణా వాహనాలు' : currentLanguage === 'hi' ? 'सक्रिय परिवहन बेड़ा' : 'Active Transport Fleet'}
            </div>
            <div className="text-xl font-extrabold text-amber-900 mt-1">
              {LOGISTICS_VEHICLES.length} {currentLanguage === 'te' ? 'వాహనాలు' : currentLanguage === 'hi' ? 'वाहन' : 'Vehicles'}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">
              {currentLanguage === 'te' ? 'GPS ట్రాక్ & బీమా చేయబడింది' : currentLanguage === 'hi' ? 'जीपीएस ट्रैक और बीमाकृत' : 'GPS tracked & insured'}
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="text-[10px] uppercase font-bold text-stone-500">
              {currentLanguage === 'te' ? 'రవాణా ఆర్డర్లు' : currentLanguage === 'hi' ? 'परिवहन आदेश' : 'Logistics Orders'}
            </div>
            <div className="text-xl font-extrabold text-stone-900 mt-1">
              {logisticsRequests.length}
            </div>
            <div className="text-[11px] text-stone-600 font-medium mt-0.5">
              {pendingLogisticsCount} {currentLanguage === 'te' ? 'రవాణా పెండింగ్‌లో ఉంది' : currentLanguage === 'hi' ? 'प्रेषण लंबित' : 'pending dispatch'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'storage'
              ? 'border-sky-600 text-sky-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Warehouse className="w-4 h-4" />
          <span>{currentLanguage === 'te' ? 'శీతల గిడ్డంగి రిజర్వేషన్లు' : currentLanguage === 'hi' ? 'कोल्ड स्टोरेज आरक्षण' : 'Cold Storage Reservations'} ({coldStorageRequests.length})</span>
          {pendingStorageCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px]">
              {pendingStorageCount} {currentLanguage === 'te' ? 'కొత్తవి' : currentLanguage === 'hi' ? 'नए' : 'new'}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'logistics'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{currentLanguage === 'te' ? 'రవాణా & సరుకు ట్రిప్‌లు' : currentLanguage === 'hi' ? 'परिवहन और माल ट्रिप' : 'Logistics & Freight Trips'} ({logisticsRequests.length})</span>
          {pendingLogisticsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">
              {pendingLogisticsCount} {currentLanguage === 'te' ? 'కొత్తవి' : currentLanguage === 'hi' ? 'नए' : 'new'}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: COLD STORAGE OPERATIONS */}
      {activeTab === 'storage' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800">
              {currentLanguage === 'te' ? 'రైతుల స్థల రిజర్వేషన్లు & చేరిక అభ్యర్థనలు' : currentLanguage === 'hi' ? 'किसान स्थान आरक्षण और आगमन अनुरोध' : 'Farmer Space Reservations & Intake Requests'}
            </h3>
            <span className="text-xs text-stone-500">
              {currentLanguage === 'te' ? 'లైవ్ రైతు బుకింగ్ జాబితా (ఆటో-సింక్రొనైజ్ చేయబడింది)' : currentLanguage === 'hi' ? 'लाइव किसान बुकिंग कतार (ऑटो-सिंक)' : 'Live farmer booking queue (auto-synchronized)'}
            </span>
          </div>

          <div className="space-y-3">
            {coldStorageRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1">
                      <Warehouse className="w-3.5 h-3.5" />
                      {req.facilityName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === 'confirmed' || req.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : req.status === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {req.status === 'confirmed'
                        ? (currentLanguage === 'te' ? 'ధృవీకరించబడింది' : currentLanguage === 'hi' ? 'पुष्टि की गई' : 'CONFIRMED')
                        : req.status === 'active'
                        ? (currentLanguage === 'te' ? 'యాక్టివ్' : currentLanguage === 'hi' ? 'सक्रिय' : 'ACTIVE')
                        : req.status === 'cancelled'
                        ? (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : 'CANCELLED')
                        : (currentLanguage === 'te' ? 'పెండింగ్' : currentLanguage === 'hi' ? 'लंबित' : 'PENDING')}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ID: {req.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'రైతు' : currentLanguage === 'hi' ? 'किसान' : 'Farmer'}</span>
                      <span className="font-bold text-stone-800">{req.farmerName}</span>
                      <span className="text-[11px] text-stone-500 block">{req.farmerPhone}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'పంట & పరిమాణం' : currentLanguage === 'hi' ? 'फसल और मात्रा' : 'Produce & Quantity'}</span>
                      <span className="font-bold text-emerald-800">
                        {req.crop} — {req.quantity} {req.unit}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {currentLanguage === 'te' ? 'వ్యవధి: ' : currentLanguage === 'hi' ? 'अवधि: ' : 'Duration: '}{req.durationMonths} {currentLanguage === 'te' ? 'నెలలు' : currentLanguage === 'hi' ? 'महीने' : 'Months'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'చేరిక తేదీ' : currentLanguage === 'hi' ? 'आगमन तिथि' : 'Intake Date'}</span>
                      <span className="font-bold text-stone-800">
                        {req.preferredStartDate || req.expectedIntakeDate || (currentLanguage === 'te' ? 'తక్షణమే' : currentLanguage === 'hi' ? 'तत्काल' : 'Immediate')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'అంచనా ఆదాయం' : currentLanguage === 'hi' ? 'अनुमानित आय' : 'Estimated Revenue'}</span>
                      <span className="font-bold text-stone-900">
                        ₹{(req.estimatedTotalCharge || req.estimatedCost || 4500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                  {req.status !== 'confirmed' && req.status !== 'active' && (
                    <button
                      onClick={() => handleUpdateStorageStatus(req.id, 'confirmed')}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{currentLanguage === 'te' ? 'స్థలాన్ని నిర్ధారించండి' : currentLanguage === 'hi' ? 'स्थान की पुष्टि करें' : 'Confirm Space'}</span>
                    </button>
                  )}

                  {req.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateStorageStatus(req.id, 'active')}
                      className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>{currentLanguage === 'te' ? 'సంచులు నిల్వ చేయబడ్డాయిగా గుర్తించు' : currentLanguage === 'hi' ? 'भंडारण चिह्नित करें' : 'Mark Bags Stored'}</span>
                    </button>
                  )}

                  {req.status !== 'cancelled' && (
                    <button
                      onClick={() => handleUpdateStorageStatus(req.id, 'cancelled')}
                      className="px-3 py-2 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded-xl text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
                    >
                      {currentLanguage === 'te' ? 'తిరస్కరించు' : currentLanguage === 'hi' ? 'अस्वीकार करें' : 'Reject'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Facilities Overview Cards */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              {currentLanguage === 'te' ? 'నమోదిత శీతల గిడ్డంగి యూనిట్లు' : currentLanguage === 'hi' ? 'पंजीकृत कोल्ड स्टोरेज इकाइयां' : 'Registered Cold Storage Facility Units'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COLD_STORAGE_FACILITIES.map((f) => (
                <div
                  key={f.id}
                  className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm text-xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">{f.name}</h5>
                      <span className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {f.location}, {f.district}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold text-[10px]">
                      {f.tempRange || '-2°C to 10°C'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-stone-50 p-2 rounded-lg text-center">
                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'మొత్తం సామర్థ్యం' : currentLanguage === 'hi' ? 'कुल क्षमता' : 'Total Cap'}</span>
                      <span className="font-bold text-stone-800">{f.totalCapacityMT} MT</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'అందుబాటులో ఉన్నది' : currentLanguage === 'hi' ? 'उपलब्ध' : 'Available'}</span>
                      <span className="font-bold text-emerald-700">{f.availableCapacityMT} MT</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'గదులు' : currentLanguage === 'hi' ? 'कक्ष' : 'Chambers'}</span>
                      <span className="font-bold text-stone-800">{f.chambers || 4} {currentLanguage === 'te' ? 'యూనిట్లు' : currentLanguage === 'hi' ? 'इकाइयां' : 'Units'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOGISTICS & FLEET OPERATIONS */}
      {activeTab === 'logistics' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800">
              {currentLanguage === 'te' ? 'రైతు పొలం వద్ద రవాణా & సరుకు ఆర్డర్లు' : currentLanguage === 'hi' ? 'फार्म गेट परिवहन और माल ढुलाई के आदेश' : 'Farm Gate Transport & Freight Orders'}
            </h3>
            <span className="text-xs text-stone-500">
              {currentLanguage === 'te' ? 'పికప్ డిస్పాచ్ జాబితా' : currentLanguage === 'hi' ? 'पिकअप प्रेषण कतार' : 'Pickup dispatch queue'}
            </span>
          </div>

          <div className="space-y-3">
            {logisticsRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      {req.vehicleType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'in_transit'
                          ? 'bg-sky-100 text-sky-800'
                          : req.status === 'assigned'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {req.status === 'completed'
                        ? (currentLanguage === 'te' ? 'పూర్తయింది' : currentLanguage === 'hi' ? 'पूर्ण' : 'COMPLETED')
                        : req.status === 'in_transit'
                        ? (currentLanguage === 'te' ? 'మార్గంలో ఉంది' : currentLanguage === 'hi' ? 'पारगमन में' : 'IN TRANSIT')
                        : req.status === 'assigned'
                        ? (currentLanguage === 'te' ? 'కేటాయించబడింది' : currentLanguage === 'hi' ? 'आवंटित' : 'ASSIGNED')
                        : req.status === 'cancelled'
                        ? (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : 'CANCELLED')
                        : (currentLanguage === 'te' ? 'అభ్యర్థించబడింది' : currentLanguage === 'hi' ? 'अनुरोधित' : 'REQUESTED')}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ID: {req.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'రైతు పికప్' : currentLanguage === 'hi' ? 'किसान पिकअप' : 'Farmer Pickup'}</span>
                      <span className="font-bold text-stone-800">{req.farmerName}</span>
                      <span className="text-[11px] text-stone-600 truncate block">
                        📍 {req.pickupLocation}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'గమ్యస్థానం' : currentLanguage === 'hi' ? 'गंतव्य' : 'Destination'}</span>
                      <span className="font-bold text-stone-800">
                        {req.destination || req.destinationLocation || (currentLanguage === 'te' ? 'మార్కెట్ యార్డ్' : currentLanguage === 'hi' ? 'मंडी यार्ड' : 'Mandi Yard')}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {currentLanguage === 'te' ? 'దూరం: ' : currentLanguage === 'hi' ? 'दूरी: ' : 'Distance: '}~{req.estimatedDistanceKm} {currentLanguage === 'te' ? 'కి.మీ' : currentLanguage === 'hi' ? 'किमी' : 'km'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'రవాణా సరుకు' : currentLanguage === 'hi' ? 'माल कार्गो' : 'Produce Cargo'}</span>
                      <span className="font-bold text-emerald-800">
                        {req.produce || req.goodsType || (currentLanguage === 'te' ? 'వ్యవసాయ దిగుబడి' : currentLanguage === 'hi' ? 'खेत की फसल' : 'Farm Harvest')}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {currentLanguage === 'te' ? 'షెడ్యూల్: ' : currentLanguage === 'hi' ? 'निर्धारित: ' : 'Scheduled: '}{req.transportDate || req.scheduledDate || (currentLanguage === 'te' ? 'ఈ రోజు' : currentLanguage === 'hi' ? 'आज' : 'Today')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block">{currentLanguage === 'te' ? 'రవాణా ఛార్జీ' : currentLanguage === 'hi' ? 'माल भाड़ा' : 'Freight Charge'}</span>
                      <span className="font-bold text-stone-900 text-sm">
                        ₹{(req.estimatedCost || 950).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                  {req.status === 'requested' && (
                    <button
                      onClick={() => handleUpdateLogisticsStatus(req.id, 'assigned')}
                      className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{currentLanguage === 'te' ? 'డ్రైవర్‌ను కేటాయించండి' : currentLanguage === 'hi' ? 'ड्राइवर असाइन करें' : 'Assign Driver'}</span>
                    </button>
                  )}

                  {req.status === 'assigned' && (
                    <button
                      onClick={() => handleUpdateLogisticsStatus(req.id, 'in_transit')}
                      className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{currentLanguage === 'te' ? 'ప్రయాణం ప్రారంభించండి' : currentLanguage === 'hi' ? 'यात्रा शुरू करें' : 'Start Trip'}</span>
                    </button>
                  )}

                  {req.status === 'in_transit' && (
                    <button
                      onClick={() => handleUpdateLogisticsStatus(req.id, 'completed')}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{currentLanguage === 'te' ? 'డెలివరీ పూర్తయినట్లు గుర్తించండి' : currentLanguage === 'hi' ? 'वितरित चिह्नित करें' : 'Mark Delivered'}</span>
                    </button>
                  )}

                  {req.status !== 'completed' && req.status !== 'cancelled' && (
                    <button
                      onClick={() => handleUpdateLogisticsStatus(req.id, 'cancelled')}
                      className="px-3 py-2 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded-xl text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
                    >
                      {currentLanguage === 'te' ? 'రద్దు చేయి' : currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Fleet Vehicles Status */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              {currentLanguage === 'te' ? 'రవాణా వాహనాల జాబితా' : currentLanguage === 'hi' ? 'परिवहन वाहन बेड़ा' : 'Fleet Transport Vehicles'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LOGISTICS_VEHICLES.map((v) => (
                <div
                  key={v.id}
                  className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm text-xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-stone-900">{v.vehicleType}</h5>
                      <span className="text-stone-500 text-[11px]">
                        {currentLanguage === 'te' ? 'డ్రైవర్: ' : currentLanguage === 'hi' ? 'ड्राइवर: ' : 'Driver: '}{v.driverName || (currentLanguage === 'te' ? 'ధృవీకరించబడిన డ్రైవర్' : currentLanguage === 'hi' ? 'सत्यापित बेड़े ड्राइवर' : 'Verified Fleet Driver')}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.availableToday
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {v.availableToday
                        ? (currentLanguage === 'te' ? 'అందుబాటులో ఉంది' : currentLanguage === 'hi' ? 'उपलब्ध' : 'Available')
                        : (currentLanguage === 'te' ? 'ప్రయాణంలో ఉంది' : currentLanguage === 'hi' ? 'यात्रा पर' : 'On Trip')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2 rounded-lg text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{currentLanguage === 'te' ? 'సామర్థ్యం' : currentLanguage === 'hi' ? 'क्षमता' : 'Capacity'}</span>
                      <span className="font-bold text-stone-800">
                        {v.capacityMT || 2} MT
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{currentLanguage === 'te' ? 'స్థానం' : currentLanguage === 'hi' ? 'स्थान' : 'Location'}</span>
                      <span className="font-bold text-stone-800 truncate block">
                        {v.currentLocation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
