import { useState, useEffect } from 'react';
import {
  Truck,
  Search,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Users,
  Navigation
} from 'lucide-react';
import { LogisticsVehicle, LogisticsRequest, LanguageCode, UserProfile, SyncStatus } from '../types';
import { translations } from '../i18n/translations';
import { LOGISTICS_VEHICLES } from '../data/mockData';
import { storage } from '../lib/storage';

interface LogisticsBookingProps {
  profile: UserProfile;
  currentLanguage: LanguageCode;
}

export default function LogisticsBooking({
  profile,
  currentLanguage
}: LogisticsBookingProps) {
  const t = translations[currentLanguage];

  const [vehicles] = useState<LogisticsVehicle[]>(LOGISTICS_VEHICLES);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [activeBookingVehicle, setActiveBookingVehicle] = useState<LogisticsVehicle | null>(null);

  // Form Fields with draft
  const [pickupLocation, setPickupLocation] = useState(
    `${profile.village}, ${profile.mandal}`
  );
  const [destination, setDestination] = useState('Guntur APMC Mirchi Yard');
  const [scheduledDate, setScheduledDate] = useState('2026-10-02');
  const [goodsType, setGoodsType] = useState('Chilli Bags (Dried)');
  const [weightKg, setWeightKg] = useState<number>(2000);
  const [estimatedKm, setEstimatedKm] = useState<number>(32);
  const [needLaborers, setNeedLaborers] = useState(true);
  const [contactPhone, setContactPhone] = useState(profile.phone);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [myLogisticsRequests, setMyLogisticsRequests] = useState<LogisticsRequest[]>(
    storage.getLogisticsRequests()
  );

  // Load draft on mount
  useEffect(() => {
    const draft = storage.getDraft('logistics') as any;
    if (draft) {
      if (draft.pickupLocation) setPickupLocation(draft.pickupLocation);
      if (draft.destination) setDestination(draft.destination);
      if (draft.scheduledDate) setScheduledDate(draft.scheduledDate);
      if (draft.goodsType) setGoodsType(draft.goodsType);
      if (draft.weightKg) setWeightKg(draft.weightKg);
      if (draft.estimatedKm) setEstimatedKm(draft.estimatedKm);
      if (draft.needLaborers !== undefined) setNeedLaborers(draft.needLaborers);
    }
  }, []);

  const calculateFare = () => {
    if (!activeBookingVehicle) return 0;
    const base = activeBookingVehicle.basePrice || activeBookingVehicle.baseFare || 450;
    const pricePerKm = activeBookingVehicle.pricePerKm || activeBookingVehicle.ratePerKm || 25;
    const distanceCost = estimatedKm * pricePerKm;
    const laborCost = needLaborers ? 400 : 0;
    return Math.round(base + distanceCost + laborCost);
  };

  const handleConfirmBooking = () => {
    if (!activeBookingVehicle) return;

    const isOnline = storage.isOnline();
    const newReq: LogisticsRequest = {
      id: `log_${Date.now()}`,
      clientUid: `uid_log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      farmerId: profile.id,
      farmerName: profile.name,
      farmerPhone: contactPhone,
      pickupLocation,
      destination,
      scheduledDate,
      vehicleType: activeBookingVehicle.vehicleType,
      goodsType,
      weightKg,
      estimatedDistanceKm: estimatedKm,
      status: 'assigned',
      syncStatus: (isOnline ? 'synced' : 'pending_sync') as SyncStatus,
      createdAt: new Date().toISOString(),
      estimatedCost: calculateFare(),
      assignedDriver: activeBookingVehicle.driverName,
      driverPhone: activeBookingVehicle.driverPhone
    };

    storage.addLogisticsRequest(newReq);
    setMyLogisticsRequests(storage.getLogisticsRequests());
    setActiveBookingVehicle(null);
    setSavedSuccess(true);
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (vehicleTypeFilter === 'all') return true;
    return v.vehicleType.toLowerCase().includes(vehicleTypeFilter.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800 text-lg">
                🚚
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.logisticsTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              {currentLanguage === 'te'
                ? 'ధృవీకరించబడిన స్థానిక పొలం పికప్ వాహనాలను బుక్ చేయండి: GPS ట్రాకింగ్ మరియు టార్పాలిన్ రెయిన్ కవర్‌తో టాటా ఏస్, బొలెరో మ్యాక్స్ మరియు ఐచర్ ట్రక్కులు.'
                : currentLanguage === 'hi'
                ? 'सत्यापित स्थानीय फार्म पिकअप वाहन बुक करें: जीपीएस ट्रैकिंग और तिरपाल कवर के साथ टाटा ऐस, बोलेरो मैक्स और आयशर ट्रक।'
                : 'Book verified local farm pickup vehicles: Tata Ace, Bolero Maxx, and Eicher trucks with GPS tracking and tarpaulin rain cover.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              {currentLanguage === 'te' ? 'పొలం వద్ద డోర్‌స్టెప్ పికప్' : currentLanguage === 'hi' ? 'खेत पर डोरस्टेप पिकअप' : 'Farmgate Doorstep Pickup'}
            </span>
          </div>
        </div>

        {/* Vehicle Filter Pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: currentLanguage === 'te' ? 'అన్ని వాహనాలు' : currentLanguage === 'hi' ? 'सभी वाहन' : 'All Vehicles' },
            { id: 'bolero', label: 'Mahindra Bolero (1.5 - 2 MT)' },
            { id: 'ace', label: 'Tata Ace (1 MT)' },
            { id: 'eicher', label: 'Eicher 6-Wheeler (4.5 MT)' },
            { id: 'heavy', label: currentLanguage === 'te' ? '10-వీల్ ట్రక్ (16 MT)' : currentLanguage === 'hi' ? '10-पहिया ट्रक (16 MT)' : '10-Wheel Truck (16 MT)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setVehicleTypeFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                vehicleTypeFilter === item.id
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {t.bookingConfirmed}: {currentLanguage === 'te' ? 'డ్రైవర్ మీ పొలం పికప్‌కు కేటాయించబడ్డారు.' : currentLanguage === 'hi' ? 'ड्राइवर को आपके फार्म पिकअप के लिए असाइन किया गया है।' : 'Driver has been assigned to your farm pickup.'}
            </span>
          </div>
          <button
            onClick={() => setSavedSuccess(false)}
            className="font-bold text-emerald-800 underline cursor-pointer"
          >
            {currentLanguage === 'te' ? 'తీసివేయి' : currentLanguage === 'hi' ? 'खारिज करें' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4 hover:border-emerald-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                    {vehicle.vehicleType}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    {vehicle.rating} ★ ({vehicle.tripsCompleted} {currentLanguage === 'te' ? 'ట్రిప్‌లు' : currentLanguage === 'hi' ? 'ट्रिप्स' : 'Trips'})
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900 mt-1">
                  {vehicle.driverName}
                </h3>
                <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentLanguage === 'te' ? 'స్థానం: ' : currentLanguage === 'hi' ? 'स्थान: ' : 'Stationed: '}{vehicle.currentLocation}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  {currentLanguage === 'te' ? 'ధర' : currentLanguage === 'hi' ? 'दर' : 'Rate'}
                </span>
                <div className="text-lg font-black text-emerald-800">
                  ₹{vehicle.pricePerKm} {currentLanguage === 'te' ? '/ కి.మీ' : currentLanguage === 'hi' ? '/ किमी' : '/ km'}
                </div>
                <div className="text-[10px] text-stone-500">
                  + ₹{vehicle.basePrice} {currentLanguage === 'te' ? 'బేస్ ఛార్జీ' : currentLanguage === 'hi' ? 'आधार किराया' : 'base'}
                </div>
              </div>
            </div>

            {/* Capacity & Features */}
            <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? 'గరిష్ట లోడ్ సామర్థ్యం' : currentLanguage === 'hi' ? 'अधिकतम पेलोड क्षमता' : 'Max Payload Capacity'}
                </span>
                <div className="font-bold text-stone-800">
                  {vehicle.capacityMT || vehicle.capacityTons || 2} MT (
                  {(((vehicle.capacityMT || vehicle.capacityTons || 2) * 20)).toFixed(0)} {currentLanguage === 'te' ? 'సంచులు' : currentLanguage === 'hi' ? 'बोरे' : 'Bags'})
                </div>
              </div>
              <div>
                <span className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? 'రక్షణ వివరాలు' : currentLanguage === 'hi' ? 'सुरक्षा विवरण' : 'Protection Specs'}
                </span>
                <div className="font-bold text-stone-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentLanguage === 'te' ? 'వాటర్‌ప్రూఫ్ టార్పాలిన్' : currentLanguage === 'hi' ? 'वाटरप्रूफ तिरपाल' : 'Waterproof Tarpaulin'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setActiveBookingVehicle(vehicle)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentLanguage === 'te' ? 'ఈ వాహనాన్ని బుక్ చేయండి' : currentLanguage === 'hi' ? 'यह वाहन बुक करें' : 'Book This Vehicle'}</span>
              </button>
              <a
                href={`tel:${vehicle.driverPhone}`}
                className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700"
                title={currentLanguage === 'te' ? 'డ్రైవర్‌కు నేరుగా కాల్ చేయండి' : currentLanguage === 'hi' ? 'ड्राइवर को सीधे कॉल करें' : 'Call driver directly'}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {activeBookingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-emerald-800 text-white p-5">
              <h3 className="text-lg font-bold">
                {currentLanguage === 'te' ? 'వ్యవసాయ ఉత్పత్తుల రవాణాను బుక్ చేయండి' : currentLanguage === 'hi' ? 'कृषि उपज परिवहन बुक करें' : 'Book Farm Produce Transport'}
              </h3>
              <p className="text-xs text-emerald-100">
                {currentLanguage === 'te' ? 'డ్రైవర్: ' : currentLanguage === 'hi' ? 'ड्राइवर: ' : 'Driver: '}{activeBookingVehicle.driverName} • {activeBookingVehicle.vehicleType}
              </p>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {currentLanguage === 'te' ? 'పికప్ పొలం / గ్రామం చిరునామా' : currentLanguage === 'hi' ? 'पिकअप फार्म / गांव का पता' : 'Pickup Farm / Village Address'}
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {currentLanguage === 'te' ? 'గమ్యస్థానం (మార్కెట్, శీతల గిడ్డంగి లేదా FPO)' : currentLanguage === 'hi' ? 'गंतव्य (मंडी, कोल्ड स्टोरेज या एफपीओ)' : 'Destination (Mandi, Cold Store or FPO)'}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'పికప్ తేదీ' : currentLanguage === 'hi' ? 'पिकअप तिथि' : 'Pickup Date'}
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'అంచనా దూరం (కి.మీ)' : currentLanguage === 'hi' ? 'अनुमानित दूरी (किमी)' : 'Est. One-way Distance (km)'}
                  </label>
                  <input
                    type="number"
                    value={estimatedKm}
                    onChange={(e) => setEstimatedKm(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'సరుకు / ఉత్పత్తులు' : currentLanguage === 'hi' ? 'वस्तु / माल' : 'Commodity / Goods'}
                  </label>
                  <input
                    type="text"
                    value={goodsType}
                    onChange={(e) => setGoodsType(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'మొత్తం లోడ్ బరువు (కిలోలు)' : currentLanguage === 'hi' ? 'कुल भार वजन (किग्रा)' : 'Total Load Weight (kg)'}
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Laborers toggle */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800">
                    {currentLanguage === 'te' ? 'లోడింగ్ & అన్‌లోడింగ్ కూలీలను చేర్చండి (+₹400)' : currentLanguage === 'hi' ? 'लोडिंग और अनलोडिंग श्रमिक शामिल करें (+₹400)' : 'Include Loading & Unloading Laborers (+₹400)'}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {currentLanguage === 'te' ? 'పొలం వద్ద లోడ్ చేయడానికి & మార్కెట్‌లో అమర్చడానికి 2 హమాలీలు' : currentLanguage === 'hi' ? 'खेत पर लोड करने और मंडी में रखने के लिए 2 हमाली' : '2 hamalis to load at farm and stack at mandi'}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={needLaborers}
                  onChange={(e) => setNeedLaborers(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Live Fare Estimation */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span>{currentLanguage === 'te' ? 'అంచనా మొత్తం ప్రయాణ ఛార్జీ:' : currentLanguage === 'hi' ? 'अनुमानित कुल यात्रा किराया:' : 'Estimated Total Trip Fare:'}</span>
                  <span className="text-base text-amber-600">
                    ₹{calculateFare().toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  {currentLanguage === 'te'
                    ? `ఛార్జీలో బేస్ రుసుము (₹${activeBookingVehicle.basePrice}) + ${estimatedKm} కి.మీ @ ₹${activeBookingVehicle.pricePerKm}/కి.మీ ${needLaborers ? '+ ₹400 హమాలీ' : ''} ఉంటాయి. డెలివరీ తర్వాత డ్రైవర్‌కు నేరుగా చెల్లింపు.`
                    : currentLanguage === 'hi'
                    ? `किराए में आधार शुल्क (₹${activeBookingVehicle.basePrice}) + ${estimatedKm} किमी @ ₹${activeBookingVehicle.pricePerKm}/किमी ${needLaborers ? '+ ₹400 लोडिंग' : ''} शामिल हैं। मंडी डिलीवरी पर ड्राइवर को सीधा भुगतान।`
                    : `Fare includes base charge (₹${activeBookingVehicle.basePrice}) + ${estimatedKm} km @ ₹${activeBookingVehicle.pricePerKm}/km ${needLaborers ? '+ ₹400 loading' : ''}. Direct payment to driver upon mandi delivery.`}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveBookingVehicle(null)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 font-medium text-xs cursor-pointer"
              >
                {currentLanguage === 'te' ? 'రద్దు చేయి' : currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{currentLanguage === 'te' ? 'వాహనం బుకింగ్‌ను నిర్ధారించండి' : currentLanguage === 'hi' ? 'वाहन बुकिंग की पुष्टि करें' : 'Confirm Vehicle Booking'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Transport Requests */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
          {currentLanguage === 'te' ? 'నా రవాణా ట్రిప్‌లు' : currentLanguage === 'hi' ? 'मेरी परिवहन यात्राएं' : 'My Transport Trips'} ({myLogisticsRequests.length})
        </h3>

        <div className="space-y-2">
          {myLogisticsRequests.map((req) => (
            <div
              key={req.id}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">
                    {req.vehicleType} • {currentLanguage === 'te' ? 'డ్రైవర్: ' : currentLanguage === 'hi' ? 'ड्राइवर: ' : 'Driver: '}{req.assignedDriver}
                  </span>
                  <span
                    className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      req.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {req.syncStatus === 'synced'
                      ? (currentLanguage === 'te' ? 'సింక్ చేయబడింది' : currentLanguage === 'hi' ? 'सिंक किया गया' : 'Synced')
                      : (currentLanguage === 'te' ? 'పెండింగ్ సింక్' : currentLanguage === 'hi' ? 'लंबित सिंक' : 'Pending Sync')}
                  </span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-stone-200 text-stone-700 uppercase">
                    {req.status === 'assigned'
                      ? (currentLanguage === 'te' ? 'కేటాయించబడింది' : currentLanguage === 'hi' ? 'आवंटित' : 'ASSIGNED')
                      : req.status === 'in_transit'
                      ? (currentLanguage === 'te' ? 'మార్గంలో ఉంది' : currentLanguage === 'hi' ? 'पारगमन में' : 'IN TRANSIT')
                      : req.status === 'completed'
                      ? (currentLanguage === 'te' ? 'పూర్తయింది' : currentLanguage === 'hi' ? 'पूर्ण' : 'COMPLETED')
                      : (currentLanguage === 'te' ? 'అభ్యర్థించబడింది' : currentLanguage === 'hi' ? 'अनुरोधित' : req.status)}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  {currentLanguage === 'te' ? 'మార్గం: ' : currentLanguage === 'hi' ? 'मार्ग: ' : 'Route: '}{req.pickupLocation} ➔ {req.destination} • {req.goodsType} ({req.weightKg} kg) • {req.scheduledDate}
                </div>
              </div>

              <div className="font-bold text-xs text-amber-600">
                ₹{req.estimatedCost?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
