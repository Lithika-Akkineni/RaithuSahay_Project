import { useState, useEffect } from 'react';
import {
  Warehouse,
  Search,
  MapPin,
  Thermometer,
  ShieldCheck,
  Calendar,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  Phone,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { ColdStorageFacility, ColdStorageRequest, LanguageCode, UserProfile, SyncStatus } from '../types';
import { translations } from '../i18n/translations';
import { COLD_STORAGE_FACILITIES } from '../data/mockData';
import { storage } from '../lib/storage';

interface ColdStorageBookingProps {
  profile: UserProfile;
  currentLanguage: LanguageCode;
}

export default function ColdStorageBooking({
  profile,
  currentLanguage
}: ColdStorageBookingProps) {
  const t = translations[currentLanguage];

  const [facilities] = useState<ColdStorageFacility[]>(COLD_STORAGE_FACILITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [activeBookingFacility, setActiveBookingFacility] = useState<ColdStorageFacility | null>(null);

  // Form Fields
  const [crop, setCrop] = useState('Chilli (Dry Pods)');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<'Bags (50kg)' | 'Quintals' | 'Metric Tons'>('Bags (50kg)');
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [preferredStartDate, setPreferredStartDate] = useState('2026-10-01');
  const [needsTransport, setNeedsTransport] = useState(true);
  const [specialNotes, setSpecialNotes] = useState('Moisture tested below 10%. Fumigation requested.');

  // Preview & Confirmation
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [myRequests, setMyRequests] = useState<ColdStorageRequest[]>(
    storage.getColdStorageRequests()
  );

  // Draft handling
  useEffect(() => {
    const draft = storage.getDraft('coldStorage') as any;
    if (draft) {
      if (draft.crop) setCrop(draft.crop);
      if (draft.quantity) setQuantity(draft.quantity);
      if (draft.durationMonths) setDurationMonths(draft.durationMonths);
      if (draft.preferredStartDate) setPreferredStartDate(draft.preferredStartDate);
      if (draft.needsTransport !== undefined) setNeedsTransport(draft.needsTransport);
      if (draft.specialNotes) setSpecialNotes(draft.specialNotes);
    }
  }, []);

  const handleOpenBooking = (facility: ColdStorageFacility) => {
    setActiveBookingFacility(facility);
    setShowPreviewModal(false);
  };

  const calculateEstimatedCost = () => {
    if (!activeBookingFacility) return 0;
    const rate = activeBookingFacility.pricePerBagPerMonth || activeBookingFacility.monthlyChargePerQuintal || 45;
    const multiplier = unit === 'Metric Tons' ? 20 : unit === 'Quintals' ? 2 : 1;
    return Math.round(quantity * multiplier * rate * durationMonths);
  };

  const handleConfirmReservation = () => {
    if (!activeBookingFacility) return;

    const isOnline = storage.isOnline();
    const newReq: ColdStorageRequest = {
      id: `cold_${Date.now()}`,
      clientUid: `uid_cold_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      farmerId: profile.id,
      farmerName: profile.name,
      farmerPhone: profile.phone,
      facilityId: activeBookingFacility.id,
      facilityName: activeBookingFacility.name,
      crop,
      quantity,
      unit,
      durationMonths,
      preferredStartDate,
      status: 'pending',
      syncStatus: (isOnline ? 'synced' : 'pending_sync') as SyncStatus,
      createdAt: new Date().toISOString(),
      estimatedCost: calculateEstimatedCost(),
      specialNotes
    };

    storage.addColdStorageRequest(newReq);
    setMyRequests(storage.getColdStorageRequests());
    setShowPreviewModal(false);
    setActiveBookingFacility(null);
    setSavedSuccess(true);
  };

  const filteredFacilities = facilities.filter((f) => {
    const matchSearch =
      searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCrop =
      selectedCropFilter === 'all' ||
      (f.suitableCrops || f.supportedProduce || []).some((c) =>
        c.toLowerCase().includes(selectedCropFilter.toLowerCase())
      );
    return matchSearch && matchCrop;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-800 text-lg">
                ❄️
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.coldStorageTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              {currentLanguage === 'te'
                ? 'ధృవీకరించబడిన మల్టీ-ఛాంబర్ శీతల గిడ్డంగులను కనుగొనండి, ఉష్ణోగ్రతను పరిశీలించండి, లభ్యత తనిఖీ చేయండి మరియు నిల్వ స్థలాన్ని నేరుగా రిజర్వ్ చేయండి.'
                : currentLanguage === 'hi'
                ? 'प्रमाणित मल्टी-चेंबर कोल्ड स्टोरेज का पता लगाएं, तापमान जांचें, उपलब्ध क्षमता देखें और सीधे स्थान आरक्षित करें।'
                : 'Locate certified multi-chamber cold storages, verify chamber temperature, check available capacity, and reserve storage space directly.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              {currentLanguage === 'te' ? 'రాయితీ ధరలు అందుబాటులో ఉన్నాయి' : currentLanguage === 'hi' ? 'सब्सिडी दरें उपलब्ध' : 'Subsidized Rates Available'}
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLanguage === 'te'
                  ? 'సౌకర్యం పేరు, జిల్లా లేదా మండలం ద్వారా శీతల గిడ్డంగిని శోధించండి...'
                  : currentLanguage === 'hi'
                  ? 'सुविधा नाम, जिला या मंडल द्वारा कोल्ड स्टोरेज खोजें...'
                  : 'Search cold storage by facility name, district, or mandal...'
              }
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: currentLanguage === 'te' ? 'అన్ని పంటలు' : currentLanguage === 'hi' ? 'सभी फसलें' : 'All Crops' },
              { id: 'chilli', label: currentLanguage === 'te' ? 'మిర్చి' : currentLanguage === 'hi' ? 'मिर्च' : 'Chilli' },
              { id: 'turmeric', label: currentLanguage === 'te' ? 'పసుపు' : currentLanguage === 'hi' ? 'हल्दी' : 'Turmeric' },
              { id: 'onion', label: currentLanguage === 'te' ? 'ఉల్లి' : currentLanguage === 'hi' ? 'प्याज' : 'Onion' },
              { id: 'potato', label: currentLanguage === 'te' ? 'బంగాళాదుంప' : currentLanguage === 'hi' ? 'आलू' : 'Potato' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedCropFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors shrink-0 cursor-pointer ${
                  selectedCropFilter === filter.id
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {t.bookingConfirmed}: {currentLanguage === 'te' ? 'సౌకర్య పర్యవేక్షకుడికి మీ స్థల రిజర్వేషన్ అభ్యర్థన అందింది.' : currentLanguage === 'hi' ? 'सुविधा पर्यवेक्षक को आपका स्थान आरक्षण अनुरोध प्राप्त हुआ है।' : 'The facility supervisor has received your space reservation request.'}
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

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4 hover:border-emerald-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {facility.distanceKm} {currentLanguage === 'te' ? 'కి.మీ దూరంలో' : currentLanguage === 'hi' ? 'किमी दूर' : 'km away'}
                  </span>
                  {facility.hasInsurance && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {currentLanguage === 'te' ? 'బీమా చేయబడింది' : currentLanguage === 'hi' ? 'बीमाकृत' : 'Insured'}
                    </span>
                  )}
                  {facility.subsidyEligible && (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                      {currentLanguage === 'te' ? 'NHM రాయితీ' : currentLanguage === 'hi' ? 'NHM सब्सिडी' : 'NHM Subsidy'}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-stone-900 mt-1">
                  {facility.name}
                </h3>
                <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{facility.location}, {facility.district}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  {currentLanguage === 'te' ? 'ధర' : currentLanguage === 'hi' ? 'दर' : 'Rate'}
                </span>
                <div className="text-lg font-extrabold text-emerald-800">
                  ₹{facility.pricePerBagPerMonth}
                </div>
                <div className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? '/ సంచి / నెలకు' : currentLanguage === 'hi' ? '/ बोरा / महीना' : '/ bag / month'}
                </div>
              </div>
            </div>

            {/* Metrics & Specs */}
            <div className="grid grid-cols-3 gap-2 bg-stone-50 p-2.5 rounded-xl text-xs text-center">
              <div>
                <span className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? 'ఉష్ణోగ్రత శ్రేణి' : currentLanguage === 'hi' ? 'तापमान सीमा' : 'Temp Range'}
                </span>
                <div className="font-bold text-stone-800 flex items-center justify-center gap-1">
                  <Thermometer className="w-3 h-3 text-sky-600" />
                  <span>{facility.tempRange}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? 'అందుబాటులో ఉన్న స్థలం' : currentLanguage === 'hi' ? 'उपलब्ध स्थान' : 'Available Space'}
                </span>
                <div className="font-bold text-emerald-800">
                  {facility.availableCapacityMT.toLocaleString()} MT
                </div>
              </div>
              <div>
                <span className="text-[10px] text-stone-500">
                  {currentLanguage === 'te' ? 'ఛాంబర్లు' : currentLanguage === 'hi' ? 'चैंबर' : 'Chambers'}
                </span>
                <div className="font-bold text-stone-800">
                  {facility.chambers} {currentLanguage === 'te' ? 'యూనిట్లు' : currentLanguage === 'hi' ? 'यूनिट' : 'Units'}
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-600">
              <span className="font-bold text-stone-800">
                {currentLanguage === 'te' ? 'అనుకూలమైన పంటలు: ' : currentLanguage === 'hi' ? 'उपयुक्त फसलें: ' : 'Ideal For: '}
              </span>
              <span>{(facility.suitableCrops || facility.supportedProduce || []).join(', ')}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleOpenBooking(facility)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
              >
                <Warehouse className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentLanguage === 'te' ? 'నిల్వ స్థలాన్ని రిజర్వ్ చేయండి' : currentLanguage === 'hi' ? 'भंडारण स्थान आरक्षित करें' : 'Reserve Storage Space'}</span>
              </button>
              <a
                href={`tel:${facility.phone}`}
                className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700"
                title={currentLanguage === 'te' ? 'మేనేజర్‌కు కాల్ చేయండి' : currentLanguage === 'hi' ? 'प्रबंधक को कॉल करें' : 'Call manager'}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL & COST ESTIMATOR */}
      {activeBookingFacility && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-emerald-800 text-white p-5">
              <h3 className="text-lg font-bold">
                {currentLanguage === 'te' ? 'శీతల గిడ్డంగిని రిజర్వ్ చేయండి' : currentLanguage === 'hi' ? 'कोल्ड स्टोरेज आरक्षित करें' : 'Reserve Cold Storage'}
              </h3>
              <p className="text-xs text-emerald-100">
                {currentLanguage === 'te' ? 'సౌకర్యం: ' : currentLanguage === 'hi' ? 'सुविधा: ' : 'Facility: '}{activeBookingFacility.name} ({activeBookingFacility.location})
              </p>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'ఉత్పత్తి / పంట' : currentLanguage === 'hi' ? 'वस्तु / फसल' : 'Commodity / Crop'}
                  </label>
                  <input
                    type="text"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'నిల్వ చేయవలసిన పరిమాణం' : currentLanguage === 'hi' ? 'भंडारण की मात्रा' : 'Quantity to Store'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as any)}
                      className="px-2 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="Bags (50kg)">{currentLanguage === 'te' ? 'సంచులు (50 కేజీలు)' : currentLanguage === 'hi' ? 'बोरे (50 किग्रा)' : 'Bags (50kg)'}</option>
                      <option value="Quintals">{currentLanguage === 'te' ? 'క్వింటాళ్లు' : currentLanguage === 'hi' ? 'क्विंटल' : 'Quintals'}</option>
                      <option value="Metric Tons">MT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'వ్యవధి (నెలలు)' : currentLanguage === 'hi' ? 'अवधि (महीने)' : 'Duration (Months)'}
                  </label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  >
                    <option value={3}>{currentLanguage === 'te' ? '3 నెలలు' : currentLanguage === 'hi' ? '3 महीने' : '3 Months'}</option>
                    <option value={6}>{currentLanguage === 'te' ? '6 నెలలు (ప్రామాణిక సీజన్)' : currentLanguage === 'hi' ? '6 महीने (मानक सीजन)' : '6 Months (Standard Season)'}</option>
                    <option value={9}>{currentLanguage === 'te' ? '9 నెలలు' : currentLanguage === 'hi' ? '9 महीने' : '9 Months'}</option>
                    <option value={12}>{currentLanguage === 'te' ? '12 నెలలు (పూర్తి సంవత్సరం)' : currentLanguage === 'hi' ? '12 महीने (पूरा साल)' : '12 Months (Full Year)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {currentLanguage === 'te' ? 'ప్రాధాన్య డిపాజిట్ తేదీ' : currentLanguage === 'hi' ? 'पसंदीदा जमा तिथि' : 'Preferred Deposit Date'}
                  </label>
                  <input
                    type="date"
                    value={preferredStartDate}
                    onChange={(e) => setPreferredStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              {/* Transport Toggle */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800">
                    {currentLanguage === 'te' ? 'పొలం నుండి శీతల గిడ్డంగికి రవాణా కావాలా?' : currentLanguage === 'hi' ? 'खेत से कोल्ड स्टोरेज तक परिवहन चाहिए?' : 'Farm-to-Cold-Store Transport Needed?'}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {currentLanguage === 'te' ? 'మా రవాణా నెట్‌వర్క్ నుండి పికప్ బొలెరో / ఐచర్‌ను కేటాయించండి' : currentLanguage === 'hi' ? 'हमारे लॉजिस्टिक्स नेटवर्क से पिकअप बोलेरो / आयशर असाइन करें' : 'Assign a pickup Bolero / Eicher from our logistics network'}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={needsTransport}
                  onChange={(e) => setNeedsTransport(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Dynamic Cost Estimation */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span>{currentLanguage === 'te' ? 'అంచనా వేసిన నిల్వ అద్దె:' : currentLanguage === 'hi' ? 'अनुमानित भंडारण किराया:' : 'Estimated Storage Rent:'}</span>
                  <span className="text-base text-amber-600">
                    ₹{calculateEstimatedCost().toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  {currentLanguage === 'te'
                    ? `₹${activeBookingFacility.pricePerBagPerMonth}/సంచి/నెలకు × ${quantity} సంచులు × ${durationMonths} నెలల ఆధారంగా. అసలు చెల్లింపు డిపాజిట్ సమయంలో లేదా నెలవారీ వాయిదాలలో చెల్లించవచ్చు.`
                    : currentLanguage === 'hi'
                    ? `₹${activeBookingFacility.pricePerBagPerMonth}/बोरा/माह × ${quantity} बोरे × ${durationMonths} महीने पर आधारित। वास्तविक भुगतान जमा के समय या मासिक किस्तों में देय होगा।`
                    : `Based on ₹${activeBookingFacility.pricePerBagPerMonth}/bag/mo × ${quantity} bags × ${durationMonths} months. Actual payment payable at time of deposit or monthly installments.`}
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {currentLanguage === 'te' ? 'ప్రత్యేక గమనికలు / తేమ శాతం పరీక్ష' : currentLanguage === 'hi' ? 'विशेष निर्देश / नमी परीक्षण' : 'Special Notes / Moisture test'}
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveBookingFacility(null)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 font-medium text-xs cursor-pointer"
              >
                {currentLanguage === 'te' ? 'రద్దు చేయి' : currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmReservation}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{currentLanguage === 'te' ? 'స్థల రిజర్వేషన్‌ను నిర్ధారించండి' : currentLanguage === 'hi' ? 'स्थान आरक्षण की पुष्टि करें' : 'Confirm Space Reservation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Cold Storage Requests */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
          {currentLanguage === 'te' ? 'నా శీతల గిడ్డంగి బుకింగ్‌లు' : currentLanguage === 'hi' ? 'मेरी कोल्ड स्टोरेज बुकिंग' : 'My Cold Storage Bookings'} ({myRequests.length})
        </h3>

        <div className="space-y-2">
          {myRequests.map((req) => (
            <div
              key={req.id}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">
                    {req.facilityName}
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
                    {req.status === 'pending'
                      ? (currentLanguage === 'te' ? 'పెండింగ్‌లో ఉంది' : currentLanguage === 'hi' ? 'लंबित' : 'PENDING')
                      : req.status === 'confirmed' || req.status === 'approved'
                      ? (currentLanguage === 'te' ? 'ఆమోదించబడింది' : currentLanguage === 'hi' ? 'स्वीकृत' : 'CONFIRMED')
                      : req.status === 'stored'
                      ? (currentLanguage === 'te' ? 'నిల్వ చేయబడింది' : currentLanguage === 'hi' ? 'संग्रहीत' : 'STORED')
                      : (currentLanguage === 'te' ? 'రద్దు చేయబడింది' : currentLanguage === 'hi' ? 'रद्द' : req.status)}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  {req.crop} • {req.quantity} {req.unit} {currentLanguage === 'te' ? 'కోసం' : currentLanguage === 'hi' ? 'के लिए' : 'for'} {req.durationMonths} {currentLanguage === 'te' ? 'నెలలు' : currentLanguage === 'hi' ? 'महीने' : 'months'} • {currentLanguage === 'te' ? 'ప్రారంభం: ' : currentLanguage === 'hi' ? 'प्रारंभ: ' : 'Start: '}{req.preferredStartDate}
                </div>
              </div>

              <div className="font-bold text-xs text-amber-600">
                {currentLanguage === 'te' ? 'అంచనా ' : currentLanguage === 'hi' ? 'अनुमानित ' : 'Est. '}₹{req.estimatedCost?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
