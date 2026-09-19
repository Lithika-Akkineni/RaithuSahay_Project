import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  CheckCircle,
  PlusCircle,
  Phone,
  MessageSquare,
  Warehouse,
  Truck,
  FileCheck,
  TrendingUp,
  MapPin,
  ArrowRight,
  X,
  Clock,
  AlertCircle,
  FileText,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ProduceListing, PurchaseOffer, LanguageCode } from '../types';
import { storage } from '../lib/storage';
import { auth } from '../lib/auth';
import { translations } from '../i18n/translations';

interface BuyerDashboardProps {
  currentLanguage: LanguageCode;
  onNavigate: (screen: string) => void;
}

export default function BuyerDashboard({ currentLanguage, onNavigate }: BuyerDashboardProps) {
  const t = translations[currentLanguage];
  const [listings, setListings] = useState<ProduceListing[]>(storage.getProduceListings());
  const [purchaseOffers, setPurchaseOffers] = useState<PurchaseOffer[]>(storage.getPurchaseOffers());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'available' | 'myOffers' | 'procurement'>('available');

  // Purchase Offer Modal State
  const [selectedListingForOffer, setSelectedListingForOffer] = useState<ProduceListing | null>(null);
  const [offerQuantity, setOfferQuantity] = useState<string>('');
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [offerMessage, setOfferMessage] = useState<string>('');
  const [offerErrors, setOfferErrors] = useState<{ quantity?: string; price?: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscribe to storage updates
  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setListings(storage.getProduceListings());
      setPurchaseOffers(storage.getPurchaseOffers());
    });
    return () => unsub();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const [procurementDemands, setProcurementDemands] = useState([
    {
      id: 'dem_1',
      crop: 'Chilli (Teja Variety)',
      requiredQty: '500 Quintals',
      targetPrice: '₹21,000 / Q',
      district: 'Guntur / Krishna',
      status: 'Procuring'
    },
    {
      id: 'dem_2',
      crop: 'Rice (BPT 5204)',
      requiredQty: '1,200 Bags',
      targetPrice: '₹2,350 / Bag',
      district: 'West Godavari',
      status: 'Procuring'
    }
  ]);

  const [newCropDemand, setNewCropDemand] = useState('');
  const [newQtyDemand, setNewQtyDemand] = useState('');
  const [showDemandModal, setShowDemandModal] = useState(false);

  const handlePostDemand = () => {
    if (!newCropDemand || !newQtyDemand) return;
    setProcurementDemands([
      ...procurementDemands,
      {
        id: `dem_${Date.now()}`,
        crop: newCropDemand,
        requiredQty: newQtyDemand,
        targetPrice: 'Market Competitive',
        district: 'Regional FPO Cluster',
        status: 'Procuring'
      }
    ]);
    setNewCropDemand('');
    setNewQtyDemand('');
    setShowDemandModal(false);
  };

  // Open "Make Purchase Offer" Modal
  const handleOpenOfferModal = (listing: ProduceListing) => {
    setSelectedListingForOffer(listing);
    setOfferQuantity(String(listing.quantity));
    setOfferPrice(String(listing.expectedPrice));
    setOfferMessage('');
    setOfferErrors({});
  };

  // Close Offer Modal
  const handleCloseOfferModal = () => {
    setSelectedListingForOffer(null);
    setOfferErrors({});
  };

  // Submit Purchase Offer with strict validation
  const handleSubmitOffer = () => {
    if (!selectedListingForOffer) return;

    const numQty = parseFloat(offerQuantity);
    const numPrice = parseFloat(offerPrice);
    const errors: { quantity?: string; price?: string } = {};

    if (isNaN(numQty) || numQty <= 0) {
      errors.quantity = t.validQuantityError;
    } else if (numQty > selectedListingForOffer.quantity) {
      errors.quantity = `${t.quantityExceedError} (${selectedListingForOffer.quantity} ${selectedListingForOffer.unit}).`;
    }

    if (isNaN(numPrice) || numPrice <= 0) {
      errors.price = t.validPriceError;
    }

    if (Object.keys(errors).length > 0) {
      setOfferErrors(errors);
      return;
    }

    const currentUser = auth.getCurrentUser();
    const buyerId = currentUser?.id || 'usr_buyer_default';
    const buyerName =
      currentUser?.organizationName || currentUser?.name || 'Andhra Agri FPO / Institutional Buyer';
    const buyerPhone = currentUser?.phone || '9848099887';

    const newOffer: PurchaseOffer = {
      id: `offer_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      clientUid: `uid_offer_${Date.now()}`,
      produceId: selectedListingForOffer.id,
      crop: selectedListingForOffer.crop,
      variety: selectedListingForOffer.variety,
      farmerId: selectedListingForOffer.farmerId,
      farmerName: selectedListingForOffer.farmerName,
      farmerPhone: selectedListingForOffer.farmerPhone,
      farmerLocation: selectedListingForOffer.location,
      buyerId,
      buyerName,
      buyerPhone,
      quantity: numQty,
      unit: 'Quintals',
      offeredPrice: numPrice,
      askingPrice: selectedListingForOffer.expectedPrice,
      totalOfferAmount: Math.round(numQty * numPrice),
      message: offerMessage.trim() || undefined,
      status: 'Pending',
      syncStatus: storage.isOnline() ? 'synced' : 'pending_sync',
      createdAt: new Date().toISOString()
    };

    storage.addPurchaseOffer(newOffer);
    setPurchaseOffers(storage.getPurchaseOffers());
    setSelectedListingForOffer(null);
    setToastMessage(t.purchaseOfferSubmittedSuccess);
    setActiveTab('myOffers');
  };

  const filteredListings = listings.filter((l) => {
    return (
      searchQuery === '' ||
      l.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="purchase-offer-toast"
          className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-300 hover:text-white text-xs font-bold"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-900 text-xs font-bold">
                {t.fpoBuyerConsoleTag}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {t.directFarmerProcurementTitle}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              {t.directFarmerProcurementSub}
            </p>
          </div>

          <button
            onClick={() => setShowDemandModal(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-xl text-xs flex items-center gap-2 shadow self-start sm:self-auto transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.postProcurementDemand}</span>
          </button>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-emerald-800/80 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'available' ? 'bg-amber-400 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
            }`}
          >
            {t.browseFarmgateListings} ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('myOffers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'myOffers' ? 'bg-amber-400 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.myPurchaseOffers} ({purchaseOffers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'procurement' ? 'bg-amber-400 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
            }`}
          >
            {t.activeProcurementDemands} ({procurementDemands.length})
          </button>
        </div>
      </div>

      {/* TAB 1: BROWSE FARMGATE LISTINGS */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t.search} ${t.cropLabel}, ${t.farmerName}...`}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                id={`produce-card-${listing.id}`}
                className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3 hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {listing.variety}
                    </span>
                    <h3 className="text-base font-extrabold text-stone-900 mt-1">
                      {listing.crop}
                    </h3>
                    <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{listing.location}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400">
                      {t.askingPrice}
                    </span>
                    <div className="text-lg font-black text-amber-600">
                      ₹{listing.expectedPrice.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-500">{t.perQuintal}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500">{t.availableInLot}</span>
                    <div className="font-bold text-stone-800">
                      {listing.quantity} {listing.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500">{t.date}</span>
                    <div className="font-bold text-stone-800">{listing.harvestDate}</div>
                  </div>
                </div>

                <div className="text-xs text-stone-600">
                  <span className="font-bold text-stone-800">{t.farmerName}: </span>
                  <span>{listing.farmerName}</span>
                </div>

                {listing.notes && (
                  <p className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg italic">
                    "{listing.notes}"
                  </p>
                )}

                {/* Actions: Make Purchase Offer, Call, Book Transport */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id={`make-offer-btn-${listing.id}`}
                    onClick={() => handleOpenOfferModal(listing)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.makePurchaseOffer}</span>
                  </button>
                  <a
                    href={`tel:${listing.farmerPhone}`}
                    className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700"
                    title={t.callFarmer}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => onNavigate('logistics')}
                    className="p-2.5 rounded-xl bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200"
                    title={t.logistics}
                  >
                    <Truck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY PURCHASE OFFERS */}
      {activeTab === 'myOffers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              {t.myPurchaseOffers} ({purchaseOffers.length})
            </h2>
            <button
              onClick={() => setActiveTab('available')}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>+ {t.makePurchaseOffer}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {purchaseOffers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-3">
              <FileText className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-stone-800 text-sm">{t.noOffersReceivedYet}</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {t.noOffersReceivedDesc}
              </p>
              <button
                onClick={() => setActiveTab('available')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-colors"
              >
                {t.browseFarmgateListings}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {purchaseOffers.map((offer) => (
                <div
                  key={offer.id}
                  id={`purchase-offer-item-${offer.id}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                          {offer.variety}
                        </span>
                        <span className="font-extrabold text-sm sm:text-base text-stone-900">
                          {offer.crop}
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
                          {offer.status === 'Accepted' ? t.accepted : offer.status === 'Rejected' ? t.rejected : t.pending}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            offer.syncStatus === 'synced'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {offer.syncStatus === 'synced' ? t.statusSynced : t.statusPendingSync}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{offer.farmerLocation}</span>
                        <span>•</span>
                        <span className="font-semibold text-stone-700">{t.farmerName}: {offer.farmerName}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">
                        {t.totalOfferDeal}
                      </span>
                      <div className="text-lg font-black text-emerald-700">
                        ₹{offer.totalOfferAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Quantity Comparison Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-50 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500">{t.offeredQuantity}</span>
                      <div className="font-bold text-stone-900">
                        {offer.quantity} {offer.unit}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">{t.offeredRate}</span>
                      <div className="font-bold text-emerald-700">
                        ₹{offer.offeredPrice.toLocaleString()} / Q
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">{t.yourAskingRate}</span>
                      <div className="font-semibold text-stone-600">
                        ₹{offer.askingPrice.toLocaleString()} / Q
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">{t.date}</span>
                      <div className="font-medium text-stone-700">
                        {new Date(offer.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  {offer.message && (
                    <div className="bg-amber-50/70 border border-amber-100 p-2.5 rounded-xl text-xs text-amber-900">
                      <span className="font-bold">{t.messageToFarmer}: </span>
                      <span>"{offer.message}"</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-stone-500">
                      {t.fromBuyer}: <strong className="text-stone-700">{offer.buyerName}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${offer.farmerPhone}`}
                        className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.callFarmer}</span>
                      </a>
                      <button
                        onClick={() => onNavigate('logistics')}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          offer.status === 'Accepted'
                            ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-700 text-white shadow-sm'
                            : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
                        }`}
                      >
                        <Truck className={`w-3.5 h-3.5 ${offer.status === 'Accepted' ? 'text-white' : 'text-indigo-600'}`} />
                        <span>{t.logistics}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ACTIVE PROCUREMENT DEMANDS */}
      {activeTab === 'procurement' && (
        <div className="space-y-3">
          {procurementDemands.map((dem) => (
            <div
              key={dem.id}
              className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-900">{dem.crop}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {dem.status}
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  {t.target}: {dem.requiredQty} @ {dem.targetPrice} • {t.district}: {dem.district}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {t.broadcastedToFarmers}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MAKE PURCHASE OFFER MODAL */}
      {selectedListingForOffer && (
        <div
          id="make-purchase-offer-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 border border-stone-100 my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-stone-900">{t.makePurchaseOffer}</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.makePurchaseOfferModalDesc}
                </p>
              </div>
              <button
                onClick={handleCloseOfferModal}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Produce Listing's Actual Data */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 uppercase">
                    {selectedListingForOffer.variety}
                  </span>
                  <div className="text-sm font-extrabold text-emerald-950 mt-1">
                    {selectedListingForOffer.crop}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">
                    {t.askingPrice}
                  </span>
                  <div className="text-base font-black text-emerald-900">
                    ₹{selectedListingForOffer.expectedPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-700">{t.perQuintal}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-700">{t.farmerName}</span>
                  <div className="font-bold text-stone-900 truncate">
                    {selectedListingForOffer.farmerName}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700">{t.availableInLot}</span>
                  <div className="font-bold text-stone-900">
                    {selectedListingForOffer.quantity} {selectedListingForOffer.unit}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700">{t.location}</span>
                  <div className="font-bold text-stone-900 truncate">
                    {selectedListingForOffer.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-3.5">
              {/* Field 1: Quantity Required */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  {t.quantityRequired} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="offer-quantity-input"
                    type="number"
                    min="1"
                    max={selectedListingForOffer.quantity}
                    step="any"
                    value={offerQuantity}
                    onChange={(e) => {
                      setOfferQuantity(e.target.value);
                      if (offerErrors.quantity) {
                        setOfferErrors({ ...offerErrors, quantity: undefined });
                      }
                    }}
                    placeholder={`Max ${selectedListingForOffer.quantity} Quintals`}
                    className={`w-full px-3 py-2.5 bg-stone-50 border rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 ${
                      offerErrors.quantity
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-stone-300 focus:ring-emerald-600'
                    }`}
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-stone-500 font-bold">
                    Quintals
                  </span>
                </div>
                {offerErrors.quantity ? (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{offerErrors.quantity}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    {t.availableInLot}: {selectedListingForOffer.quantity} {selectedListingForOffer.unit}
                  </p>
                )}
              </div>

              {/* Field 2: Offer Price per Quintal */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  {t.offerPricePerQuintal} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-stone-500 font-bold">
                    ₹
                  </span>
                  <input
                    id="offer-price-input"
                    type="number"
                    min="1"
                    step="any"
                    value={offerPrice}
                    onChange={(e) => {
                      setOfferPrice(e.target.value);
                      if (offerErrors.price) {
                        setOfferErrors({ ...offerErrors, price: undefined });
                      }
                    }}
                    placeholder={`${t.askingPrice}: ₹${selectedListingForOffer.expectedPrice}`}
                    className={`w-full pl-7 pr-3 py-2.5 bg-stone-50 border rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 ${
                      offerErrors.price
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-stone-300 focus:ring-emerald-600'
                    }`}
                  />
                </div>
                {offerErrors.price ? (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{offerErrors.price}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    {t.yourAskingRate}: ₹{selectedListingForOffer.expectedPrice.toLocaleString()} / quintal
                  </p>
                )}
              </div>

              {/* Real-time Calculated Total Amount */}
              {parseFloat(offerQuantity) > 0 && parseFloat(offerPrice) > 0 && !offerErrors.quantity && !offerErrors.price && (
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-medium">{t.estimatedTotalOfferValue}:</span>
                  <span className="text-sm font-black text-emerald-950">
                    ₹{Math.round(parseFloat(offerQuantity) * parseFloat(offerPrice)).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Field 3: Message to Farmer */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  {t.messageToFarmer}
                </label>
                <textarea
                  id="offer-message-input"
                  rows={2}
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  placeholder="e.g. Can arrange immediate weighment and cash settlement at farmgate within 48 hours..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-normal focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
              <button
                id="cancel-offer-btn"
                type="button"
                onClick={handleCloseOfferModal}
                className="px-4 py-2.5 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                id="submit-offer-btn"
                type="button"
                onClick={handleSubmitOffer}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.submitOffer}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST DEMAND MODAL */}
      {showDemandModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-stone-900 border-b pb-2">
              {t.postProcurementDemand}
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.demandCropLabel}
              </label>
              <input
                type="text"
                value={newCropDemand}
                onChange={(e) => setNewCropDemand(e.target.value)}
                placeholder="e.g. Chilli Teja A-Grade"
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.demandQtyLabel}
              </label>
              <input
                type="text"
                value={newQtyDemand}
                onChange={(e) => setNewQtyDemand(e.target.value)}
                placeholder="e.g. 500 Bags (50kg each)"
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowDemandModal(false)}
                className="px-4 py-2 border rounded-xl text-xs"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePostDemand}
                className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs"
              >
                {t.postDemandBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
