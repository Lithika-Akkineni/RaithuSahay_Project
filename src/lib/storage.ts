import {
  UserProfile,
  ProduceListing,
  ColdStorageRequest,
  LogisticsRequest,
  DiagnosisRecord,
  PurchaseOffer,
  SyncStatus,
  LanguageCode,
  InAppNotification
} from '../types';
import { SAMPLE_NOTIFICATIONS } from '../data/mockData';

const DB_NAME = 'raithusahay_db';
const DB_VERSION = 1;

export interface OfflineSyncQueueItem {
  id: string;
  type: 'produce_listing' | 'cold_storage' | 'logistics' | 'diagnosis' | 'purchase_offer';
  data: ProduceListing | ColdStorageRequest | LogisticsRequest | DiagnosisRecord | PurchaseOffer;
  createdAt: string;
  syncStatus: SyncStatus;
  retryCount: number;
  errorMessage?: string;
}

export interface FormDraftState {
  produceListing?: Partial<ProduceListing>;
  coldStorage?: Partial<ColdStorageRequest>;
  logistics?: Partial<LogisticsRequest>;
}

const STORAGE_KEYS = {
  PROFILE: 'rs_user_profile',
  LANGUAGE: 'rs_app_language',
  PRODUCE_LISTINGS: 'rs_produce_listings',
  COLD_STORAGE_REQUESTS: 'rs_cold_storage_requests',
  LOGISTICS_REQUESTS: 'rs_logistics_requests',
  DIAGNOSIS_HISTORY: 'rs_diagnosis_history',
  PURCHASE_OFFERS: 'rs_purchase_offers',
  NOTIFICATIONS: 'rs_notifications',
  DRAFTS: 'rs_form_drafts',
  SIMULATE_OFFLINE: 'rs_simulate_offline',
  SIMULATE_SYNC_FAILURE: 'rs_simulate_sync_failure'
};

class StorageManager {
  private listeners: Set<() => void> = new Set();
  private isSimulatedOffline: boolean = false;
  private shouldFailNextSync: boolean = false;

  constructor() {
    try {
      this.isSimulatedOffline = localStorage.getItem(STORAGE_KEYS.SIMULATE_OFFLINE) === 'true';
      this.shouldFailNextSync = localStorage.getItem(STORAGE_KEYS.SIMULATE_SYNC_FAILURE) === 'true';
    } catch {
      this.isSimulatedOffline = false;
      this.shouldFailNextSync = false;
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Listener notify error', e);
      }
    });
  }

  // Network Simulation Controls
  public isOnline(): boolean {
    if (this.isSimulatedOffline) return false;
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  public getSimulateOffline(): boolean {
    return this.isSimulatedOffline;
  }

  public setSimulateOffline(val: boolean) {
    this.isSimulatedOffline = val;
    try {
      localStorage.setItem(STORAGE_KEYS.SIMULATE_OFFLINE, String(val));
    } catch {}
    this.notify();
  }

  public getSimulateSyncFailure(): boolean {
    return this.shouldFailNextSync;
  }

  public setSimulateSyncFailure(val: boolean) {
    this.shouldFailNextSync = val;
    try {
      localStorage.setItem(STORAGE_KEYS.SIMULATE_SYNC_FAILURE, String(val));
    } catch {}
    this.notify();
  }

  // Language
  public getLanguage(): LanguageCode {
    try {
      return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  }

  public setLanguage(lang: LanguageCode) {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {}
    this.notify();
  }

  // Profile
  public getProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read stored profile', e);
    }

    return {
      id: 'farmer_default_1',
      name: 'Venkata Ramana Reddy',
      phone: '9848012345',
      role: 'farmer',
      language: this.getLanguage(),
      state: 'Andhra Pradesh',
      district: 'Guntur',
      mandal: 'Tenali Rural',
      village: 'Kollipara',
      landAcres: 4.5,
      selectedCrops: ['chilli', 'rice', 'cotton'],
      isRegistered: true
    };
  }

  public saveProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
    this.notify();
  }

  // Drafts for Form auto-recovery
  public getDraft<T extends keyof FormDraftState>(key: T): FormDraftState[T] | undefined {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      if (raw) {
        const parsed: FormDraftState = JSON.parse(raw);
        return parsed[key];
      }
    } catch {}
    return undefined;
  }

  public saveDraft<T extends keyof FormDraftState>(key: T, data: FormDraftState[T]) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      const parsed: FormDraftState = raw ? JSON.parse(raw) : {};
      parsed[key] = data;
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(parsed));
    } catch {}
    this.notify();
  }

  public clearDraft(key: keyof FormDraftState) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      if (raw) {
        const parsed: FormDraftState = JSON.parse(raw);
        delete parsed[key];
        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(parsed));
      }
    } catch {}
    this.notify();
  }

  // Produce Listings
  public getProduceListings(): ProduceListing[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRODUCE_LISTINGS);
      if (raw) return JSON.parse(raw);
    } catch {}
    // Seed initial demo items across multiple crops and farmers
    const initial: ProduceListing[] = [
      {
        id: 'list_demo_1',
        clientUid: 'uid_listing_1',
        farmerId: 'farmer_default_1',
        farmerName: 'Venkata Ramana Reddy',
        farmerPhone: '9848012345',
        crop: 'Chilli (Teja Variety)',
        variety: 'S17 Stemless',
        quantity: 35,
        unit: 'Quintals',
        expectedPrice: 22000,
        location: 'Kollipara, Guntur',
        district: 'Guntur',
        harvestDate: '2026-09-28',
        status: 'active',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: 'Dry pods sun-cured, moisture under 10%.'
      },
      {
        id: 'list_demo_2',
        clientUid: 'uid_listing_2',
        farmerId: 'farmer_demo_2',
        farmerName: 'Ramesh Babu',
        farmerPhone: '9440123456',
        crop: 'Cotton (Bunny Bt)',
        variety: 'Medium Staple A-Grade',
        quantity: 50,
        unit: 'Quintals',
        expectedPrice: 7400,
        location: 'Nandyal Rural, Kurnool',
        district: 'Kurnool',
        harvestDate: '2026-10-02',
        status: 'active',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        notes: 'Handpicked clean lint, trash content below 3%.'
      },
      {
        id: 'list_demo_3',
        clientUid: 'uid_listing_3',
        farmerId: 'farmer_demo_3',
        farmerName: 'Srinivasa Rao',
        farmerPhone: '9849234567',
        crop: 'Paddy / Rice (BPT 5204)',
        variety: 'Sona Masoori Super Fine',
        quantity: 80,
        unit: 'Quintals',
        expectedPrice: 2850,
        location: 'Tenali Rural, Guntur',
        district: 'Guntur',
        harvestDate: '2026-10-10',
        status: 'active',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        notes: 'Aged grain quality, moisture 12.5%, single-origin lot.'
      },
      {
        id: 'list_demo_4',
        clientUid: 'uid_listing_4',
        farmerId: 'farmer_demo_4',
        farmerName: 'Appala Naidu',
        farmerPhone: '9490345678',
        crop: 'Turmeric (Salem Variety)',
        variety: 'Cured Double Polished Finger',
        quantity: 25,
        unit: 'Quintals',
        expectedPrice: 14200,
        location: 'Duggirala, Guntur',
        district: 'Guntur',
        harvestDate: '2026-10-15',
        status: 'active',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        notes: 'High curcumin content (>4.2%), clean boiled finger.'
      }
    ];
    this.saveProduceListings(initial);
    return initial;
  }

  public saveProduceListings(listings: ProduceListing[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCE_LISTINGS, JSON.stringify(listings));
    } catch {}
    this.notify();
  }

  public addProduceListing(listing: ProduceListing): ProduceListing {
    const listings = this.getProduceListings();
    // Prevent duplicate clientUid
    const existingIndex = listings.findIndex((l) => l.clientUid === listing.clientUid);
    if (existingIndex >= 0) {
      listings[existingIndex] = listing;
    } else {
      listings.unshift(listing);
    }
    this.saveProduceListings(listings);
    this.clearDraft('produceListing');
    return listing;
  }

  // Purchase Offers (Buyer & FPO Produce Offers)
  public getPurchaseOffers(): PurchaseOffer[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PURCHASE_OFFERS);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  }

  public savePurchaseOffers(offers: PurchaseOffer[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PURCHASE_OFFERS, JSON.stringify(offers));
    } catch {}
    this.notify();
  }

  public addPurchaseOffer(offer: PurchaseOffer): PurchaseOffer {
    const offers = this.getPurchaseOffers();
    const existingIndex = offers.findIndex((o) => o.clientUid === offer.clientUid);
    if (existingIndex >= 0) {
      offers[existingIndex] = offer;
    } else {
      offers.unshift(offer);
    }
    this.savePurchaseOffers(offers);
    return offer;
  }

  public updatePurchaseOfferStatus(
    offerIdOrClientUid: string,
    newStatus: 'Pending' | 'Accepted' | 'Negotiating' | 'Rejected'
  ): PurchaseOffer | null {
    const offers = this.getPurchaseOffers();
    const index = offers.findIndex(
      (o) => o.id === offerIdOrClientUid || o.clientUid === offerIdOrClientUid
    );
    if (index === -1) return null;

    const offer = offers[index];
    const isOffline = !this.isOnline();
    const updatedOffer: PurchaseOffer = {
      ...offer,
      status: newStatus,
      syncStatus: isOffline ? 'pending_sync' : 'synced'
    };
    offers[index] = updatedOffer;
    this.savePurchaseOffers(offers);

    // If accepted or rejected, create corresponding notifications for buyer & farmer
    const statusLabel = newStatus === 'Accepted' ? 'Accepted' : 'Declined';
    const statusLabelTe = newStatus === 'Accepted' ? 'ఆమోదించబడింది' : 'తిరస్కరించబడింది';
    const statusLabelHi = newStatus === 'Accepted' ? 'स्वीकार किया गया' : 'अस्वीकार किया गया';

    this.addNotification({
      id: 'notif_offer_' + Date.now(),
      title: `Offer ${statusLabel}: ${updatedOffer.crop} (${updatedOffer.quantity} ${updatedOffer.unit})`,
      titleTe: `ఆఫర్ ${statusLabelTe}: ${updatedOffer.crop} (${updatedOffer.quantity} ${updatedOffer.unit})`,
      titleHi: `ऑफर ${statusLabelHi}: ${updatedOffer.crop} (${updatedOffer.quantity} ${updatedOffer.unit})`,
      message: `Farmer ${updatedOffer.farmerName} has ${newStatus.toLowerCase()} the purchase offer of ₹${updatedOffer.offeredPrice}/Q from ${updatedOffer.buyerName}. Total amount: ₹${updatedOffer.totalOfferAmount.toLocaleString()}.`,
      messageTe: `రైతు ${updatedOffer.farmerName} కొనుగోలుదారు ${updatedOffer.buyerName} నుండి వచ్చిన ₹${updatedOffer.offeredPrice}/క్వింటా ఆఫర్‌ను ${statusLabelTe}. మొత్తం: ₹${updatedOffer.totalOfferAmount.toLocaleString()}.`,
      messageHi: `किसान ${updatedOffer.farmerName} ने खरीदार ${updatedOffer.buyerName} से ₹${updatedOffer.offeredPrice}/क्विंटल का ऑफर ${statusLabelHi}। कुल राशि: ₹${updatedOffer.totalOfferAmount.toLocaleString()}।`,
      category: 'market',
      priority: newStatus === 'Accepted' ? 'high' : 'medium',
      timestamp: 'Just now',
      read: false,
      actionScreen: 'buyersFPOs'
    });

    return updatedOffer;
  }

  // In-App Notifications
  public getNotifications(): InAppNotification[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (raw) return JSON.parse(raw);
    } catch {}
    this.saveNotifications(SAMPLE_NOTIFICATIONS);
    return SAMPLE_NOTIFICATIONS;
  }

  public saveNotifications(notifs: InAppNotification[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    } catch {}
    this.notify();
  }

  public addNotification(notification: InAppNotification): InAppNotification {
    const notifs = this.getNotifications();
    notifs.unshift(notification);
    this.saveNotifications(notifs);
    return notification;
  }

  public markNotificationAsRead(id: string) {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.saveNotifications(updated);
  }

  public markAllNotificationsAsRead() {
    const notifs = this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, read: true }));
    this.saveNotifications(updated);
  }

  // Cold Storage Requests
  public getColdStorageRequests(): ColdStorageRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COLD_STORAGE_REQUESTS);
      if (raw) return JSON.parse(raw);
    } catch {}
    const initial: ColdStorageRequest[] = [
      {
        id: 'cs_req_demo_1',
        clientUid: 'uid_cs_req_1',
        farmerId: 'farmer_default_1',
        farmerName: 'Venkata Ramana Reddy',
        farmerPhone: '9848012345',
        facilityId: 'cs1',
        facilityName: 'Sri Venkateswara Mega Cold Storage',
        crop: 'Chilli (Dry)',
        quantity: 50,
        unit: 'Quintals',
        durationMonths: 4,
        expectedIntakeDate: '2026-10-05',
        estimatedTotalCharge: 9000,
        status: 'confirmed',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];
    this.saveColdStorageRequests(initial);
    return initial;
  }

  public saveColdStorageRequests(reqs: ColdStorageRequest[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.COLD_STORAGE_REQUESTS, JSON.stringify(reqs));
    } catch {}
    this.notify();
  }

  public addColdStorageRequest(req: ColdStorageRequest): ColdStorageRequest {
    const reqs = this.getColdStorageRequests();
    const existingIndex = reqs.findIndex((r) => r.clientUid === req.clientUid);
    if (existingIndex >= 0) {
      reqs[existingIndex] = req;
    } else {
      reqs.unshift(req);
    }
    this.saveColdStorageRequests(reqs);
    this.clearDraft('coldStorage');
    return req;
  }

  // Logistics Requests
  public getLogisticsRequests(): LogisticsRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LOGISTICS_REQUESTS);
      if (raw) return JSON.parse(raw);
    } catch {}
    const initial: LogisticsRequest[] = [
      {
        id: 'log_req_demo_1',
        clientUid: 'uid_log_1',
        farmerId: 'farmer_default_1',
        farmerName: 'Venkata Ramana Reddy',
        farmerPhone: '9848012345',
        providerId: 'lp1',
        providerName: 'Raithu Ratham Farm Transport',
        vehicleType: 'Pickup (1.5T)',
        produce: 'Chilli Bags',
        quantityQuintals: 15,
        pickupLocation: 'Farm Gate, Kollipara Village',
        destination: 'Guntur Market Yard',
        destinationLocation: 'Guntur Market Yard',
        transportDate: '2026-09-24',
        estimatedDistanceKm: 28,
        estimatedCost: 1066,
        loadingAssistance: true,
        status: 'assigned',
        syncStatus: 'synced',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ];
    this.saveLogisticsRequests(initial);
    return initial;
  }

  public saveLogisticsRequests(reqs: LogisticsRequest[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGISTICS_REQUESTS, JSON.stringify(reqs));
    } catch {}
    this.notify();
  }

  public addLogisticsRequest(req: LogisticsRequest): LogisticsRequest {
    const reqs = this.getLogisticsRequests();
    const existingIndex = reqs.findIndex((r) => r.clientUid === req.clientUid);
    if (existingIndex >= 0) {
      reqs[existingIndex] = req;
    } else {
      reqs.unshift(req);
    }
    this.saveLogisticsRequests(reqs);
    this.clearDraft('logistics');
    return req;
  }

  // Diagnosis History
  public getDiagnosisHistory(): DiagnosisRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS_HISTORY);
      if (raw) return JSON.parse(raw);
    } catch {}
    const initial: DiagnosisRecord[] = [
      {
        id: 'diag_1',
        farmerId: 'farmer_default_1',
        cropName: 'Chilli',
        diseaseName: 'Chilli Leaf Curl Virus (Begomovirus)',
        confidence: 89,
        detectedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
        treatmentSummary: 'Sticky traps installed + NSKE 5% Neem spray applied',
        status: 'active',
        syncStatus: 'synced'
      }
    ];
    this.saveDiagnosisHistory(initial);
    return initial;
  }

  public saveDiagnosisHistory(records: DiagnosisRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(records));
    } catch {}
    this.notify();
  }

  public addDiagnosisRecord(record: DiagnosisRecord): DiagnosisRecord {
    const records = this.getDiagnosisHistory();
    records.unshift(record);
    this.saveDiagnosisHistory(records);
    return record;
  }

  // Pending Sync Counters
  public getPendingSyncCount(): number {
    const pl = this.getProduceListings().filter(
      (i) => i.syncStatus === 'pending_sync' || i.syncStatus === 'draft' || i.syncStatus === 'failed'
    );
    const cs = this.getColdStorageRequests().filter(
      (i) => i.syncStatus === 'pending_sync' || i.syncStatus === 'draft' || i.syncStatus === 'failed'
    );
    const lg = this.getLogisticsRequests().filter(
      (i) => i.syncStatus === 'pending_sync' || i.syncStatus === 'draft' || i.syncStatus === 'failed'
    );
    const dg = this.getDiagnosisHistory().filter(
      (i) => i.syncStatus === 'pending_sync' || i.syncStatus === 'draft' || i.syncStatus === 'failed'
    );
    const po = this.getPurchaseOffers().filter(
      (i) => i.syncStatus === 'pending_sync' || i.syncStatus === 'draft' || i.syncStatus === 'failed'
    );
    return pl.length + cs.length + lg.length + dg.length + po.length;
  }

  // Execute Synchronization
  public async syncPendingItems(): Promise<{
    success: boolean;
    syncedCount: number;
    failedCount: number;
    message: string;
  }> {
    if (!this.isOnline()) {
      return {
        success: false,
        syncedCount: 0,
        failedCount: 0,
        message: 'Cannot sync while offline. Please connect to the internet or switch online.'
      };
    }

    // Mark items as 'syncing'
    const listings = this.getProduceListings().map((item) =>
      item.syncStatus === 'pending_sync' || item.syncStatus === 'failed' || item.syncStatus === 'draft'
        ? { ...item, syncStatus: 'syncing' as SyncStatus }
        : item
    );
    this.saveProduceListings(listings);

    const coldStorage = this.getColdStorageRequests().map((item) =>
      item.syncStatus === 'pending_sync' || item.syncStatus === 'failed' || item.syncStatus === 'draft'
        ? { ...item, syncStatus: 'syncing' as SyncStatus }
        : item
    );
    this.saveColdStorageRequests(coldStorage);

    const logistics = this.getLogisticsRequests().map((item) =>
      item.syncStatus === 'pending_sync' || item.syncStatus === 'failed' || item.syncStatus === 'draft'
        ? { ...item, syncStatus: 'syncing' as SyncStatus }
        : item
    );
    this.saveLogisticsRequests(logistics);

    const purchaseOffers = this.getPurchaseOffers().map((item) =>
      item.syncStatus === 'pending_sync' || item.syncStatus === 'failed' || item.syncStatus === 'draft'
        ? { ...item, syncStatus: 'syncing' as SyncStatus }
        : item
    );
    this.savePurchaseOffers(purchaseOffers);

    // Simulate network roundtrip latency
    await new Promise((resolve) => setTimeout(resolve, 1400));

    if (this.shouldFailNextSync) {
      // Simulate failure scenario for testing error handling & retry
      const failListings = listings.map((i) =>
        i.syncStatus === 'syncing' ? { ...i, syncStatus: 'failed' as SyncStatus } : i
      );
      this.saveProduceListings(failListings);

      const failCs = coldStorage.map((i) =>
        i.syncStatus === 'syncing' ? { ...i, syncStatus: 'failed' as SyncStatus } : i
      );
      this.saveColdStorageRequests(failCs);

      const failLg = logistics.map((i) =>
        i.syncStatus === 'syncing' ? { ...i, syncStatus: 'failed' as SyncStatus } : i
      );
      this.saveLogisticsRequests(failLg);

      const failOffers = purchaseOffers.map((i) =>
        i.syncStatus === 'syncing' ? { ...i, syncStatus: 'failed' as SyncStatus } : i
      );
      this.savePurchaseOffers(failOffers);

      // Reset the one-shot failure trigger
      this.setSimulateSyncFailure(false);

      return {
        success: false,
        syncedCount: 0,
        failedCount: 1,
        message: 'Sync failed due to simulated cloud timeout. You can retry with "Sync Now".'
      };
    }

    // Successful sync: Transition items from 'syncing' to 'synced'
    let count = 0;
    const syncedListings = listings.map((item) => {
      if (item.syncStatus === 'syncing') {
        count++;
        return { ...item, syncStatus: 'synced' as SyncStatus };
      }
      return item;
    });
    this.saveProduceListings(syncedListings);

    const syncedCs = coldStorage.map((item) => {
      if (item.syncStatus === 'syncing') {
        count++;
        return { ...item, syncStatus: 'synced' as SyncStatus };
      }
      return item;
    });
    this.saveColdStorageRequests(syncedCs);

    const syncedLg = logistics.map((item) => {
      if (item.syncStatus === 'syncing') {
        count++;
        return { ...item, syncStatus: 'synced' as SyncStatus };
      }
      return item;
    });
    this.saveLogisticsRequests(syncedLg);

    const syncedOffers = purchaseOffers.map((item) => {
      if (item.syncStatus === 'syncing') {
        count++;
        return { ...item, syncStatus: 'synced' as SyncStatus };
      }
      return item;
    });
    this.savePurchaseOffers(syncedOffers);

    return {
      success: true,
      syncedCount: count,
      failedCount: 0,
      message: `Successfully synchronized ${count} item(s) to cloud database.`
    };
  }

  public getSimulateFailure(): boolean {
    return this.getSimulateSyncFailure();
  }

  public setSimulateFailure(val: boolean) {
    this.setSimulateSyncFailure(val);
  }

  public resetAllData() {
    try {
      localStorage.clear();
    } catch {}
    this.notify();
  }
}

export const storage = new StorageManager();
