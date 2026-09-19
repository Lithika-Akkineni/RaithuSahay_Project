import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  PlusCircle,
  Search,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Calendar,
  FileCheck,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { MandiPrice, BuyerFPO, ProduceListing, LanguageCode, UserProfile, SyncStatus } from '../types';
import { translations } from '../i18n/translations';
import { MANDI_PRICES, BUYERS_DIRECTORY, CROPS_CATALOG } from '../data/mockData';
import { storage } from '../lib/storage';

interface MarketAndBuyersProps {
  profile: UserProfile;
  currentLanguage: LanguageCode;
  initialTab?: 'prices' | 'buyers' | 'sell';
  preSelectedCrop?: string;
}

export default function MarketAndBuyers({
  profile,
  currentLanguage,
  initialTab = 'prices',
  preSelectedCrop
}: MarketAndBuyersProps) {
  const t = translations[currentLanguage];

  const [activeTab, setActiveTab] = useState<'prices' | 'buyers' | 'sell'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');

  // Produce Listing Form state with draft restoration
  const [crop, setCrop] = useState(preSelectedCrop || 'Chilli (Teja Variety)');
  const [variety, setVariety] = useState('Standard A-Grade');
  const [quantity, setQuantity] = useState<number>(25);
  const [unit, setUnit] = useState<'Quintals' | 'Bags (50kg)' | 'Tons' | 'Kgs'>('Quintals');
  const [expectedPrice, setExpectedPrice] = useState<number>(21500);
  const [location, setLocation] = useState(`${profile.village}, ${profile.district}`);
  const [harvestDate, setHarvestDate] = useState('2026-09-30');
  const [notes, setNotes] = useState('Good quality sun-dried produce, ready for weighment.');

  // Preview Modal & Submission State
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [savedListingSuccess, setSavedListingSuccess] = useState(false);
  const [myListings, setMyListings] = useState<ProduceListing[]>(storage.getProduceListings());

  // Restore draft on mount
  useEffect(() => {
    const draft = storage.getDraft('produceListing');
    if (draft) {
      if (draft.crop) setCrop(draft.crop);
      if (draft.variety) setVariety(draft.variety);
      if (draft.quantity) setQuantity(draft.quantity);
      if (draft.expectedPrice) setExpectedPrice(draft.expectedPrice);
      if (draft.location) setLocation(draft.location);
      if (draft.harvestDate) setHarvestDate(draft.harvestDate);
      if (draft.notes) setNotes(draft.notes);
    }
  }, []);

  // Save draft on change
  const handleInputChange = (key: string, value: any) => {
    storage.saveDraft('produceListing', {
      crop,
      variety,
      quantity,
      expectedPrice,
      location,
      harvestDate,
      notes,
      [key]: value
    });
  };

  const handleOpenSellForMandi = (mandi: MandiPrice) => {
    setCrop(mandi.crop);
    setVariety(mandi.variety);
    setExpectedPrice(mandi.modalPrice);
    setActiveTab('sell');
  };

  const handleConfirmListing = () => {
    const isOnline = storage.isOnline();
    const newListing: ProduceListing = {
      id: `list_${Date.now()}`,
      clientUid: `uid_list_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      farmerId: profile.id,
      farmerName: profile.name,
      farmerPhone: profile.phone,
      crop,
      variety,
      quantity,
      unit,
      expectedPrice,
      location,
      district: profile.district,
      harvestDate,
      status: 'active',
      syncStatus: (isOnline ? 'synced' : 'pending_sync') as SyncStatus,
      createdAt: new Date().toISOString(),
      notes
    };

    storage.addProduceListing(newListing);
    setMyListings(storage.getProduceListings());
    setShowPreviewModal(false);
    setSavedListingSuccess(true);
  };

  const filteredMandiPrices = MANDI_PRICES.filter((m) => {
    const matchSearch =
      searchQuery === '' ||
      m.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCrop = selectedCropFilter === 'all' || m.crop.toLowerCase().includes(selectedCropFilter);
    return matchSearch && matchCrop;
  });

  const filteredBuyers = BUYERS_DIRECTORY.filter((b) => {
    return (
      searchQuery === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.procuringCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Header & Sub-Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-lg">
                📊
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.marketTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Live APMC mandi arrivals, price trends, direct verified FPOs, and farmer produce listings.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('sell')}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow self-start sm:self-auto transition-all"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{t.listProduceForSale}</span>
          </button>
        </div>

        {/* 3 Main Tabs: Prices, Buyers, Sell */}
        <div className="flex items-center gap-2 mt-4 border-b border-stone-200 pb-1">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'prices'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Mandi Rates & Trends</span>
          </button>

          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'buyers'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.buyersDirectory}</span>
          </button>

          <button
            onClick={() => setActiveTab('sell')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'sell'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.listProduceForSale}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Demo Data Notice Banner */}
      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Market Transparency: </span>
          {t.demoPriceNotice}
        </div>
      </div>

      {/* TAB 1: MANDI PRICES */}
      {activeTab === 'prices' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchMandi}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMandiPrices.map((mandi) => (
              <div
                key={mandi.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 space-y-4 hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {mandi.variety}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                      {mandi.crop}
                    </h3>
                    <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{mandi.mandi}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400">
                      {t.modalPrice}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-amber-600">
                      ₹{mandi.modalPrice.toLocaleString()}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700">
                      +{mandi.dailyChangePercent}% Today
                    </span>
                  </div>
                </div>

                {/* Min / Max / Arrival info */}
                <div className="grid grid-cols-3 gap-2 bg-stone-50 p-2.5 rounded-xl text-center text-xs">
                  <div>
                    <div className="text-[10px] text-stone-500">Min Price</div>
                    <div className="font-bold text-stone-800">₹{mandi.minPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Max Price</div>
                    <div className="font-bold text-stone-800">₹{mandi.maxPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Arrivals Today</div>
                    <div className="font-bold text-emerald-800">{mandi.arrivalsToday}</div>
                  </div>
                </div>

                {/* Mini SVG 7-Day Trend Chart */}
                <div>
                  <div className="text-[11px] font-bold text-stone-600 mb-1 flex items-center justify-between">
                    <span>{t.trendWeekly}</span>
                    <span className="text-[10px] text-stone-400">{mandi.lastUpdated}</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-14 bg-stone-50 p-2 rounded-lg">
                    {mandi.historicalTrend.map((pt, idx) => {
                      const min = Math.min(...mandi.historicalTrend.map((p) => p.price));
                      const max = Math.max(...mandi.historicalTrend.map((p) => p.price));
                      const range = max - min || 1;
                      const heightPercent = Math.round(20 + ((pt.price - min) / range) * 75);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full bg-emerald-600/80 hover:bg-emerald-600 rounded-t transition-all"
                            title={`${pt.date}: ₹${pt.price}`}
                          />
                          <span className="text-[9px] text-stone-400 mt-1 whitespace-nowrap">
                            {pt.date.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick CTA to list produce based on this mandi */}
                <button
                  onClick={() => handleOpenSellForMandi(mandi)}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Sell This Produce at Expected ₹{mandi.modalPrice}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BUYERS & FPOS DIRECTORY */}
      {activeTab === 'buyers' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter buyers by crop or district..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3 hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {buyer.type}
                      </span>
                      {buyer.verified && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-amber-700" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-stone-900 mt-1">
                      {buyer.name}
                    </h3>
                    <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{buyer.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600">★ {buyer.rating}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-700 pt-1 border-t border-stone-100">
                  <div>
                    <span className="font-bold text-stone-900">Procuring Crops: </span>
                    <span className="text-emerald-800 font-semibold">
                      {buyer.procuringCrops.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900">Min Quantity: </span>
                    <span>{buyer.minimumQuantity}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900">Payment Terms: </span>
                    <span className="text-stone-600">{buyer.paymentTerms}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900">Contact Officer: </span>
                    <span>{buyer.contactPerson}</span>
                  </div>
                </div>

                {/* Direct Connect Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`tel:${buyer.phone}`}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Buyer</span>
                  </a>
                  <button
                    onClick={() => {
                      alert(`Direct WhatsApp enquiry simulated for ${buyer.name} (${buyer.whatsapp}).`);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCE LISTING FORM & SAVED LISTINGS */}
      {activeTab === 'sell' && (
        <div className="space-y-6">
          {savedListingSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t.listingSaved} Your produce is now queued for direct buyer bids.</span>
              </div>
              <button
                onClick={() => setSavedListingSuccess(false)}
                className="font-bold text-emerald-800 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Creation Form */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-200 space-y-4">
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 border-b border-stone-100 pb-3">
              {t.listProduceForSale}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.cropToSell}
                </label>
                <select
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    handleInputChange('crop', e.target.value);
                  }}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm bg-white"
                >
                  <option value="Chilli (Teja Variety)">Chilli (Teja Variety)</option>
                  <option value="Rice (BPT 5204 Samba Masuri)">Rice (BPT 5204 Samba Masuri)</option>
                  <option value="Cotton (Bunny/Bt)">Cotton (Bunny/Bt)</option>
                  <option value="Tomato (Hybrid)">Tomato (Hybrid)</option>
                  <option value="Maize (Yellow Corn)">Maize (Yellow Corn)</option>
                  <option value="Groundnut (Seeds)">Groundnut (Seeds)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Variety / Grade
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => {
                    setVariety(e.target.value);
                    handleInputChange('variety', e.target.value);
                  }}
                  placeholder="e.g. S17 Deluxe Stemless"
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.quantityAvailable}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value) || 0;
                      setQuantity(v);
                      handleInputChange('quantity', v);
                    }}
                    className="flex-1 px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
                  />
                  <select
                    value={unit}
                    onChange={(e) => {
                      const u = e.target.value as any;
                      setUnit(u);
                      handleInputChange('unit', u);
                    }}
                    className="w-32 px-2 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs bg-white"
                  >
                    <option value="Quintals">Quintals</option>
                    <option value="Bags (50kg)">Bags (50kg)</option>
                    <option value="Tons">Tons</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.expectedPriceQuintal}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-500 text-sm font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => {
                      const p = parseFloat(e.target.value) || 0;
                      setExpectedPrice(p);
                      handleInputChange('expectedPrice', p);
                    }}
                    className="w-full pl-8 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Farm Pickup Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    handleInputChange('location', e.target.value);
                  }}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.harvestDate}
                </label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => {
                    setHarvestDate(e.target.value);
                    handleInputChange('harvestDate', e.target.value);
                  }}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Quality / Curing Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  handleInputChange('notes', e.target.value);
                }}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow transition-all active:scale-[0.98]"
              >
                <span>Preview & Submit Listing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PREVIEW MODAL */}
          {showPreviewModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
                <div className="bg-emerald-800 text-white p-5">
                  <h3 className="text-lg font-bold">Review Produce Listing</h3>
                  <p className="text-xs text-emerald-100">
                    Verify all details before publishing to FPO buyers & Mandi agents.
                  </p>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl">
                    <div>
                      <span className="text-stone-500">Crop & Variety:</span>
                      <div className="font-bold text-stone-900">{crop} ({variety})</div>
                    </div>
                    <div>
                      <span className="text-stone-500">Total Quantity:</span>
                      <div className="font-bold text-stone-900">{quantity} {unit}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">Expected Rate:</span>
                      <div className="font-bold text-emerald-800 text-sm">
                        ₹{expectedPrice.toLocaleString()} / Quintal
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-500">Est. Total Worth:</span>
                      <div className="font-bold text-amber-600 text-sm">
                        ₹{(quantity * expectedPrice).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-500">Pickup Location:</span>
                      <div className="font-bold text-stone-900">{location}</div>
                    </div>
                    <div>
                      <span className="text-stone-500">Harvest Date:</span>
                      <div className="font-bold text-stone-900">{harvestDate}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                    <span className="font-bold">Offline Storage Policy: </span>
                    {storage.isOnline()
                      ? 'You are online. Listing will be synchronized immediately to cloud directory.'
                      : 'You are offline. Listing will be stored in your local smartphone storage (IndexedDB) with Pending Sync status.'}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-2">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 font-medium text-xs"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={handleConfirmListing}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm & Publish</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* My Saved Produce Listings */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
              My Active & Draft Listings ({myListings.length})
            </h3>

            <div className="space-y-2.5">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">
                        {item.crop} - {item.variety}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.syncStatus === 'synced'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.syncStatus === 'synced' ? 'Synced' : 'Pending Sync'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-800 uppercase">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      {item.quantity} {item.unit} @ ₹{item.expectedPrice}/Q • Pickup: {item.location} • Ready: {item.harvestDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-sm font-black text-amber-600">
                      ₹{(item.quantity * item.expectedPrice).toLocaleString()}
                    </span>
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
