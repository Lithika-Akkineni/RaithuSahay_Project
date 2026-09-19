export type UserRole = 'farmer' | 'buyer' | 'trader' | 'service_provider' | 'admin';

export type LanguageCode = 'en' | 'te' | 'hi';

export type SyncStatus = 'draft' | 'pending_sync' | 'syncing' | 'synced' | 'failed';

export type RequestType = 'market_listing' | 'cold_storage' | 'logistics' | 'disease_diagnosis';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  language: LanguageCode;
  organizationName?: string;
  state?: string;
  district?: string;
  mandal?: string;
  village?: string;
  landAcres?: number;
  selectedCrops?: string[];
  isVerified?: boolean;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  expiresAt: number;
}

export interface LoginCredentials {
  identifier: string; // phone or email
  password: string;
}

export interface SignupData {
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  password: string;
  language: LanguageCode;
  organizationName?: string;
  state?: string;
  district?: string;
  mandal?: string;
  village?: string;
  landAcres?: number;
  selectedCrops?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  language: LanguageCode;
  organizationName?: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  landAcres: number;
  selectedCrops: string[];
  isRegistered: boolean;
}

export interface CropInfo {
  id: string;
  name: string;
  nameTe: string;
  nameHi: string;
  category: 'cereal' | 'spice' | 'commercial' | 'vegetable' | 'pulse' | 'fruit';
  icon: string;
  harvestSeason: string;
  standardYieldPerAcre: string;
}

export interface DiseaseInfo {
  id: string;
  cropId: string;
  cropName: string;
  diseaseName: string;
  diseaseNameTe: string;
  diseaseNameHi: string;
  causalOrganism: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  confidence?: number;
  sampleImageUrl: string;
  symptoms: string[];
  symptomsTe: string[];
  symptomsHi: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  nextSteps: string[];
  notes?: string;
}

export interface DiagnosisRecord {
  id: string;
  farmerId: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  detectedAt: string;
  imageUrl?: string;
  treatmentSummary: string;
  status: 'active' | 'resolved' | 'monitoring';
  syncStatus: SyncStatus;
}

export interface MandiPrice {
  id: string;
  crop: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  unit: string;
  dailyChangePercent: number;
  arrivalsToday: string;
  lastUpdated: string;
  historicalTrend: { date: string; price: number }[];
}

export interface BuyerFPO {
  id: string;
  name: string;
  type: 'FPO' | 'Institutional Buyer' | 'Processor' | 'Retail Chain';
  district: string;
  state: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  procuringCrops: string[];
  minimumQuantity: string;
  paymentTerms: string;
  rating: number;
  verified: boolean;
  address: string;
}

export interface ProduceListing {
  id: string;
  clientUid: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: 'Quintals' | 'Bags (50kg)' | 'Tons' | 'Kgs';
  expectedPrice: number;
  location: string;
  district: string;
  harvestDate: string;
  status: 'active' | 'in_negotiation' | 'sold' | 'draft';
  syncStatus: SyncStatus;
  createdAt: string;
  notes?: string;
}

export interface PurchaseOffer {
  id: string;
  clientUid: string;
  produceId: string;
  crop: string;
  variety: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  buyerId: string;
  buyerName: string;
  buyerPhone?: string;
  quantity: number;
  unit: string;
  offeredPrice: number;
  askingPrice: number;
  totalOfferAmount: number;
  message?: string;
  status: 'Pending' | 'Accepted' | 'Negotiating' | 'Rejected';
  syncStatus: SyncStatus;
  createdAt: string;
}

export interface ColdStorageFacility {
  id: string;
  name: string;
  district: string;
  location: string;
  supportedProduce?: string[];
  suitableCrops?: string[];
  totalCapacityMT: number;
  availableCapacityMT: number;
  temperatureRange?: string;
  tempRange?: string;
  humidityControl: boolean;
  monthlyChargePerQuintal?: number;
  pricePerBagPerMonth?: number;
  insuranceCovered?: boolean;
  hasInsurance?: boolean;
  subsidyEligible?: boolean;
  chambers?: number;
  contactNumber?: string;
  phone?: string;
  distanceKm?: number;
  rating: number;
}

export interface ColdStorageRequest {
  id: string;
  clientUid: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  facilityId: string;
  facilityName: string;
  crop: string;
  quantity: number;
  unit: string;
  durationMonths: number;
  preferredStartDate?: string;
  expectedIntakeDate?: string;
  estimatedCost?: number;
  estimatedTotalCharge?: number;
  status: 'pending' | 'submitted' | 'confirmed' | 'active' | 'cancelled';
  syncStatus: SyncStatus;
  createdAt: string;
  specialNotes?: string;
}

export interface LogisticsVehicle {
  id: string;
  driverName?: string;
  driverPhone?: string;
  vehicleType: string;
  capacityMT?: number;
  capacityTons?: number;
  basePrice?: number;
  baseFare?: number;
  pricePerKm?: number;
  ratePerKm?: number;
  currentLocation: string;
  rating: number;
  tripsCompleted?: number;
  availableToday: boolean;
  name?: string;
  phone?: string;
}

export type LogisticsProvider = LogisticsVehicle;

export interface LogisticsRequest {
  id: string;
  clientUid: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  providerId?: string;
  providerName?: string;
  vehicleType: string;
  goodsType?: string;
  produce?: string;
  weightKg?: number;
  quantityQuintals?: number;
  pickupLocation: string;
  destination?: string;
  destinationLocation?: string;
  scheduledDate?: string;
  transportDate?: string;
  estimatedDistanceKm: number;
  estimatedCost: number;
  loadingAssistance?: boolean;
  assignedDriver?: string;
  driverPhone?: string;
  status: 'requested' | 'assigned' | 'in_transit' | 'completed' | 'cancelled';
  syncStatus: SyncStatus;
  createdAt: string;
}

export interface ArchitectureService {
  serviceName: string;
  description: string;
  keyEntities: string[];
  status: string;
}

export interface BackendInfrastructure {
  name: string;
  status: string;
  purpose: string;
  details: string;
  productionEquivalent: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  titleTe?: string;
  titleHi?: string;
  message: string;
  messageTe?: string;
  messageHi?: string;
  category?: 'weather' | 'crop_care' | 'market' | 'request_update';
  type?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  read: boolean;
  actionScreen?: string;
}

export interface WeatherSummary {
  location: string;
  temperatureC: number;
  condition: string;
  humidity: number;
  rainForecast: string;
  advisory: string;
  advisoryTe: string;
  advisoryHi: string;
}
