import { useState, useEffect } from 'react';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Database,
  SlidersHorizontal,
  FileText,
  Warehouse,
  Truck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ProduceListing, ColdStorageRequest, LogisticsRequest, DiagnosisRecord, PurchaseOffer, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { storage } from '../lib/storage';

interface MyRequestsAndSyncProps {
  currentLanguage: LanguageCode;
}

export default function MyRequestsAndSync({ currentLanguage }: MyRequestsAndSyncProps) {
  const t = translations[currentLanguage];

  const [isOnline, setIsOnline] = useState(storage.isOnline());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(storage.getSimulateOffline());
  const [shouldFailNextSync, setShouldFailNextSync] = useState(storage.getSimulateFailure());
  const [isSyncing, setIsSyncing] = useState(false);

  // All local stored records
  const [produceListings, setProduceListings] = useState<ProduceListing[]>(storage.getProduceListings());
  const [coldStorageRequests, setColdStorageRequests] = useState<ColdStorageRequest[]>(storage.getColdStorageRequests());
  const [logisticsRequests, setLogisticsRequests] = useState<LogisticsRequest[]>(storage.getLogisticsRequests());
  const [diagnosisRecords, setDiagnosisRecords] = useState<DiagnosisRecord[]>(storage.getDiagnosisHistory());
  const [purchaseOffers, setPurchaseOffers] = useState<PurchaseOffer[]>(storage.getPurchaseOffers());

  const [activeTab, setActiveTab] = useState<'all' | 'produce' | 'storage' | 'logistics' | 'diagnosis' | 'offers'>('all');

  const refreshAllState = () => {
    setIsOnline(storage.isOnline());
    setIsSimulatedOffline(storage.getSimulateOffline());
    setShouldFailNextSync(storage.getSimulateFailure());
    setProduceListings(storage.getProduceListings());
    setColdStorageRequests(storage.getColdStorageRequests());
    setLogisticsRequests(storage.getLogisticsRequests());
    setDiagnosisRecords(storage.getDiagnosisHistory());
    setPurchaseOffers(storage.getPurchaseOffers());
  };

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      refreshAllState();
    });
    return () => unsub();
  }, []);

  const handleToggleOffline = () => {
    const nextVal = !isSimulatedOffline;
    storage.setSimulateOffline(nextVal);
    setIsSimulatedOffline(nextVal);
    setIsOnline(storage.isOnline());
  };

  const handleToggleFailure = () => {
    const nextVal = !shouldFailNextSync;
    storage.setSimulateFailure(nextVal);
    setShouldFailNextSync(nextVal);
  };

  const handleTriggerSync = async () => {
    if (!isOnline) {
      alert(t.offlineModeNotice);
      return;
    }
    setIsSyncing(true);
    await storage.syncPendingItems();
    setIsSyncing(false);
    refreshAllState();
  };

  const pendingProduce = produceListings.filter((i) => i.syncStatus === 'pending_sync');
  const pendingCold = coldStorageRequests.filter((i) => i.syncStatus === 'pending_sync');
  const pendingLogistics = logisticsRequests.filter((i) => i.syncStatus === 'pending_sync');
  const pendingDiagnosis = diagnosisRecords.filter((i) => i.syncStatus === 'pending_sync');
  const pendingOffers = purchaseOffers.filter((i) => i.syncStatus === 'pending_sync');

  const totalPending = pendingProduce.length + pendingCold.length + pendingLogistics.length + pendingDiagnosis.length + pendingOffers.length;
  const totalRecords = produceListings.length + coldStorageRequests.length + logisticsRequests.length + diagnosisRecords.length + purchaseOffers.length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-lg">
                <Database className="w-5 h-5 text-emerald-800" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.requestsTitle} & Offline Engine
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Offline-first persistence (IndexedDB/localStorage pattern). Requests created in poor connectivity are safely preserved and synchronized when reconnected.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing || !isOnline || totalPending === 0}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing...' : t.syncNow}</span>
            </button>
          </div>
        </div>

        {/* Sync Status Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <div className="text-[10px] uppercase font-bold text-stone-500">
              Total Saved Records
            </div>
            <div className="text-xl font-extrabold text-stone-900 mt-0.5">{totalRecords}</div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <div className="text-[10px] uppercase font-bold text-amber-800">
              Pending Sync
            </div>
            <div className="text-xl font-extrabold text-amber-900 mt-0.5">{totalPending}</div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <div className="text-[10px] uppercase font-bold text-emerald-800">
              Synced to Cloud
            </div>
            <div className="text-xl font-extrabold text-emerald-900 mt-0.5">
              {totalRecords - totalPending}
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <div className="text-[10px] uppercase font-bold text-stone-500">
              Network Status
            </div>
            <div className="flex items-center justify-center gap-1 text-sm font-bold mt-1">
              {isOnline ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> Online
                </span>
              ) : (
                <span className="text-amber-700 flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> Offline
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Simulation Panel for Tester / Evaluator */}
        <div className="mt-5 p-4 bg-stone-900 text-white rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="font-bold uppercase tracking-wider text-amber-300">
                Evaluation Controls: Test Offline & Error Recovery
              </span>
            </div>
            <span className="text-[11px] text-stone-400">
              Simulate village network scenarios
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleToggleOffline}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSimulatedOffline
                  ? 'bg-amber-500 text-stone-900 shadow'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              }`}
            >
              {isSimulatedOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isSimulatedOffline ? 'Simulating Offline Mode' : 'Simulate Network Disconnection'}</span>
            </button>

            <button
              onClick={handleToggleFailure}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                shouldFailNextSync
                  ? 'bg-rose-500 text-white shadow'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                {shouldFailNextSync ? 'Failure Mode Active (Next Sync Fails)' : 'Test Sync Failure & Retry'}
              </span>
            </button>
          </div>

          <p className="text-[11px] text-stone-400">
            Tip: Turn on "Simulate Network Disconnection", then go book a Cold Storage or list Produce. Notice it saves instantly locally with an amber "Pending Sync" badge. Then reconnect and click "Sync All Now" to watch it transition to synced!
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: `All Records (${totalRecords})` },
          { id: 'produce', label: `Produce Listings (${produceListings.length})` },
          { id: 'offers', label: `Purchase Offers (${purchaseOffers.length})` },
          { id: 'storage', label: `Cold Storage (${coldStorageRequests.length})` },
          { id: 'logistics', label: `Logistics (${logisticsRequests.length})` },
          { id: 'diagnosis', label: `Diagnoses (${diagnosisRecords.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Unified List of Records */}
      <div className="space-y-3">
        {/* PRODUCE LISTINGS */}
        {(activeTab === 'all' || activeTab === 'produce') &&
          produceListings.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                    Produce
                  </span>
                  <span className="font-extrabold text-sm text-stone-900">
                    {item.crop} ({item.variety})
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.syncStatus === 'failed'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced'
                      ? '✓ Synced'
                      : item.syncStatus === 'failed'
                      ? '✕ Sync Failed'
                      : '⏳ Pending Sync'}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  {item.quantity} {item.unit} @ ₹{item.expectedPrice}/Q • {item.location} • Ready: {item.harvestDate}
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  UID: {item.clientUid || item.id} • Created: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-sm font-black text-amber-600">
                  ₹{(item.quantity * item.expectedPrice).toLocaleString()}
                </span>
                {item.syncStatus !== 'synced' && isOnline && (
                  <button
                    onClick={handleTriggerSync}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300"
                  >
                    Sync
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* PURCHASE OFFERS */}
        {(activeTab === 'all' || activeTab === 'offers') &&
          purchaseOffers.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1 rounded text-xs font-bold ${
                      item.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Offer: {item.status}
                  </span>
                  <span className="font-extrabold text-sm text-stone-900">
                    {item.crop} ({item.variety})
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.syncStatus === 'failed'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced'
                      ? '✓ Synced'
                      : item.syncStatus === 'failed'
                      ? '✕ Sync Failed'
                      : '⏳ Pending Sync'}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  Offered: {item.quantity} {item.unit} @ ₹{item.offeredPrice.toLocaleString()}/Q (Asking: ₹{item.askingPrice.toLocaleString()}/Q) • Farmer: {item.farmerName} • {item.farmerLocation}
                </div>
                {item.message && (
                  <div className="text-xs italic text-stone-500">
                    "{item.message}"
                  </div>
                )}
                <div className="text-[10px] text-stone-400 font-mono">
                  Buyer: {item.buyerName} • UID: {item.clientUid || item.id} • Created: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-sm font-black text-emerald-700">
                  ₹{item.totalOfferAmount.toLocaleString()}
                </span>
                {item.syncStatus !== 'synced' && isOnline && (
                  <button
                    onClick={handleTriggerSync}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300"
                  >
                    Sync
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* COLD STORAGE REQUESTS */}
        {(activeTab === 'all' || activeTab === 'storage') &&
          coldStorageRequests.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-sky-100 text-sky-800 text-xs font-bold">
                    Cold Storage
                  </span>
                  <span className="font-extrabold text-sm text-stone-900">
                    {item.facilityName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.syncStatus === 'failed'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced'
                      ? '✓ Synced'
                      : item.syncStatus === 'failed'
                      ? '✕ Sync Failed'
                      : '⏳ Pending Sync'}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  {item.crop} • {item.quantity} {item.unit} for {item.durationMonths} months • From: {item.preferredStartDate}
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  UID: {item.clientUid || item.id} • Created: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-amber-600">
                  Est. ₹{item.estimatedCost?.toLocaleString()}
                </span>
                {item.syncStatus !== 'synced' && isOnline && (
                  <button
                    onClick={handleTriggerSync}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300"
                  >
                    Sync
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* LOGISTICS REQUESTS */}
        {(activeTab === 'all' || activeTab === 'logistics') &&
          logisticsRequests.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-indigo-100 text-indigo-800 text-xs font-bold">
                    Logistics
                  </span>
                  <span className="font-extrabold text-sm text-stone-900">
                    {item.vehicleType} ({item.assignedDriver})
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.syncStatus === 'failed'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced'
                      ? '✓ Synced'
                      : item.syncStatus === 'failed'
                      ? '✕ Sync Failed'
                      : '⏳ Pending Sync'}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  {item.pickupLocation} ➔ {item.destination} • {item.goodsType} ({item.weightKg} kg) • {item.scheduledDate}
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  UID: {item.clientUid || item.id} • Created: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-amber-600">
                  Fare ₹{item.estimatedCost?.toLocaleString()}
                </span>
                {item.syncStatus !== 'synced' && isOnline && (
                  <button
                    onClick={handleTriggerSync}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300"
                  >
                    Sync
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* DIAGNOSIS RECORDS */}
        {(activeTab === 'all' || activeTab === 'diagnosis') &&
          diagnosisRecords.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Crop Health
                  </span>
                  <span className="font-extrabold text-sm text-stone-900">
                    {item.cropName}: {item.diseaseName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.syncStatus === 'synced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.syncStatus === 'synced' ? '✓ Synced' : '⏳ Pending Sync'}
                  </span>
                </div>
                <div className="text-xs text-stone-600">
                  {item.treatmentSummary} • {item.confidence}% confidence
                </div>
                <div className="text-[10px] text-stone-400">
                  Scanned: {new Date(item.detectedAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-emerald-800">Saved in Local Log</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
