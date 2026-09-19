import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  welcome: string;
  selectLanguage: string;
  continueBtn: string;
  getStarted: string;
  loginRegister: string;
  phoneLabel: string;
  phonePlaceholder: string;
  fullNameLabel: string;
  villageLabel: string;
  mandalLabel: string;
  districtLabel: string;
  stateLabel: string;
  landAcresLabel: string;
  selectPrimaryCrops: string;
  completeProfile: string;
  farmer: string;
  buyer: string;
  trader: string;
  serviceProvider: string;
  admin: string;
  switchRole: string;
  logout: string;
  accessDenied: string;

  // Nav
  home: string;
  myCrops: string;
  diseaseDetect: string;
  treatmentGuide: string;
  marketPrices: string;
  buyersFPOs: string;
  coldStorage: string;
  logistics: string;
  myRequests: string;
  notifications: string;
  settings: string;
  architecture: string;

  // Dashboard
  greeting: string;
  weatherAdvisory: string;
  todayMandiHighlight: string;
  quickActions: string;
  scanCropHealth: string;
  checkLivePrices: string;
  bookColdStorage: string;
  bookTransport: string;
  sellProduce: string;
  activeReminders: string;
  recentRequests: string;
  viewAll: string;

  // Disease Detection
  diseaseDetectTitle: string;
  diseaseDetectDesc: string;
  chooseCrop: string;
  takePhoto: string;
  uploadPhoto: string;
  orTrySample: string;
  retake: string;
  remove: string;
  analyzingImage: string;
  analyzingStep1: string;
  analyzingStep2: string;
  analyzingStep3: string;
  possibleDiagnosis: string;
  confidenceRate: string;
  severityLevel: string;
  symptomsHeading: string;
  immediateSteps: string;
  openTreatmentGuide: string;
  saveDiagnosis: string;
  diagnosisSavedSuccess: string;
  demoDisclaimer: string;

  // Treatment
  treatmentTitle: string;
  searchTreatment: string;
  problemOverview: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventionTips: string;
  safetyAdvice: string;
  readAloud: string;

  // Market & Buyers
  marketTitle: string;
  searchMandi: string;
  modalPrice: string;
  minMaxPrice: string;
  trendWeekly: string;
  buyersDirectory: string;
  contactBuyer: string;
  verifiedFPO: string;
  listProduceForSale: string;
  cropToSell: string;
  quantityAvailable: string;
  expectedPriceQuintal: string;
  harvestDate: string;
  submitListing: string;
  listingSaved: string;
  demoPriceNotice: string;

  // Cold Storage
  coldStorageTitle: string;
  coldStorageSubtitle: string;
  searchByCropLocation: string;
  availableCapacity: string;
  chargesPerMonth: string;
  bookStorageSpace: string;
  durationMonths: string;
  quantityToStore: string;
  confirmBooking: string;
  bookingConfirmed: string;

  // Logistics
  logisticsTitle: string;
  logisticsSubtitle: string;
  pickupPoint: string;
  dropPoint: string;
  vehicleType: string;
  estimatedFare: string;
  bookTransportVehicle: string;

  // Requests & Offline
  requestsTitle: string;
  allFilter: string;
  statusDraft: string;
  statusPendingSync: string;
  statusSyncing: string;
  statusSynced: string;
  statusFailed: string;
  syncNow: string;
  offlineModeNotice: string;
  onlineModeNotice: string;
  simulateOfflineToggle: string;

  // Common Buttons & Actions
  cancel: string;
  confirm: string;
  dismiss: string;
  save: string;
  saved: string;
  edit: string;
  deleteBtn: string;
  search: string;
  filter: string;
  close: string;
  back: string;
  submit: string;
  clear: string;
  details: string;
  status: string;
  actions: string;
  date: string;
  phone: string;
  location: string;
  farmerName: string;
  loading: string;

  // Header & Network
  networkOnline: string;
  networkOffline: string;
  switchToOnline: string;
  simulateOffline: string;
  authorizedUser: string;
  safeSession: string;
  switchActiveRole: string;
  switchUserDemo: string;

  // Navigation Consoles
  adminConsole: string;
  platformGovernance: string;
  adminManagement: string;
  systemArchitecture: string;
  systemArchitectureDesc: string;
  serviceProviderHub: string;
  coldStorageFleetOps: string;
  operationsConsole: string;
  buyerFpoConsole: string;
  directFarmProcurement: string;
  farmerProduceLots: string;
  apmcMandiRates: string;
  apmcTraderConsole: string;
  liveMandiYardAuction: string;
  auctionFloorPrices: string;

  // Farmer Dashboard Offers
  farmerWelcomeSub: string;
  aiOfflineDiagnosis: string;
  directToVerifiedFPOs: string;
  organicChemicalDoses: string;
  scanCropHealthAction: string;
  estYield: string;
  todayChange: string;
  offersReceivedHeading: string;
  offersReceivedSub: string;
  noOffersReceivedYet: string;
  noOffersReceivedDesc: string;
  totalOfferDeal: string;
  offeredQuantity: string;
  offeredRate: string;
  yourAskingRate: string;
  priceMatch: string;
  meetsAsk: string;
  belowAsk: string;
  fromBuyer: string;
  noteFromBuyer: string;
  callBuyer: string;
  acceptOffer: string;
  rejectOffer: string;
  dealConfirmed: string;
  offerRejectedStatus: string;
  offerAcceptedMsg: string;
  offerRejectedMsg: string;
  pendingAction: string;

  // Buyer / FPO Dashboard & Purchase Offers
  fpoBuyerConsoleTag: string;
  directFarmerProcurementTitle: string;
  directFarmerProcurementSub: string;
  postProcurementDemand: string;
  browseFarmgateListings: string;
  myPurchaseOffers: string;
  activeProcurementDemands: string;
  makePurchaseOffer: string;
  quantityRequired: string;
  offerPricePerQuintal: string;
  messageToFarmer: string;
  submitOffer: string;
  pending: string;
  accepted: string;
  rejected: string;
  purchaseOfferSubmittedSuccess: string;
  validQuantityError: string;
  quantityExceedError: string;
  validPriceError: string;
  estimatedTotalOfferValue: string;
  farmerAskingRate: string;
  availableInLot: string;
  callFarmer: string;
  lotSpecifications: string;
  askingPrice: string;
  moistureContent: string;
  qualityGrade: string;
  perQuintal: string;
  availableLot: string;
  demandTitle: string;
  demandCropLabel: string;
  demandQtyLabel: string;
  postDemandBtn: string;
  target: string;
  district: string;
  broadcastedToFarmers: string;
  makePurchaseOfferModalDesc: string;

  // Trader Dashboard
  traderConsoleTitle: string;
  traderConsoleSub: string;
  certifiedAPMCLicensed: string;
  activeAuctionLots: string;
  todaysArrivals: string;
  avgModalRate: string;
  activeTradersBidding: string;
  liveAuctionFloor: string;
  mandiRateBroadcast: string;
  placeBid: string;
  currentHighestBid: string;
  biddingEndsIn: string;
  enterBidAmount: string;
  confirmBid: string;
  lotNumber: string;
  broadcastModalTitle: string;
  broadcastRateBtn: string;
  rateBroadcastSuccess: string;
  bidPlacedSuccess: string;
  mandiAgentTerminalBadge: string;
  apmcYardBroadcast: string;
  traderDashboardSub: string;
  dailyMandiBroadcastHeading: string;
  gunturApmcYard: string;
  enterClosingPricePlaceholder: string;
  broadcastRateAction: string;
  broadcastRateSuccessMessage: string;
  liveLotsOnAuctionFloor: string;
  autoRefreshActive: string;
  openForBiddingStatus: string;
  finalCallStatus: string;
  bagsLabel: string;
  needDispatchTrucks: string;
  arrangeTrucksDesc: string;
  bookTrucksBtn: string;
  village: string;
  quintals: string;
  farmerLabel: string;

  // Service Provider Dashboard
  serviceProviderTitle: string;
  serviceProviderSubtitle: string;
  certifiedPartnerBadge: string;
  activeColdStores: string;
  totalStorageCapacity: string;
  fleetVehicles: string;
  activeDriversOnTrip: string;
  coldStoreChambers: string;
  farmgateLogisticsFleet: string;
  updateStatus: string;
  assignVehicle: string;
  statusUpdatedSuccess: string;

  // Cold Storage Booking
  farmgateDoorstepPickup: string;
  commodityCrop: string;
  preferredDepositDate: string;
  transportNeededQuestion: string;
  transportNeededDesc: string;
  estimatedStorageRent: string;
  storageRentCalculationNote: string;
  specialNotesMoisture: string;
  confirmSpaceReservation: string;
  myColdStorageBookings: string;

  // Logistics Booking
  distanceKm: string;
  commodityGoods: string;
  totalLoadWeight: string;
  includeLaborers: string;
  laborersDesc: string;
  estimatedTripFare: string;
  fareCalculationNote: string;
  confirmVehicleBooking: string;
  myTransportTrips: string;
  driver: string;

  // Disease Detection & Treatment
  provideLeafPhoto: string;
  capturedLeafImage: string;
  deviceCameraInspection: string;
  selectFromGallery: string;
  capturePhoto: string;
  scanAnotherLeaf: string;
  savedToRecords: string;
  allCrops: string;
  pathogen: string;
  stopAudio: string;
  cropLabel: string;
  causalAgent: string;
  advisoryNotice: string;
  cameraError: string;

  // Admin Dashboard & Architecture
  adminDashboardTitle: string;
  adminDashboardSubtitle: string;
  registeredUsers: string;
  pendingVerifications: string;
  syncQueue: string;
  serverStatus: string;
  tabUserManagement: string;
  tabVerifications: string;
  tabSystemHealth: string;
  tabMasterData: string;
  verifyApprove: string;
  suspendUser: string;
  viewDetails: string;
  systemArchitectureTitle: string;
  adminOpsConsoleBadge: string;
  adminSystemGovTitle: string;
  adminSystemGovSub: string;
  tabVerificationsLabel: string;
  tabMasterDataCatalog: string;
  tabSyncHealth: string;
  tabAuditLog: string;
  pendingPartnerVerifications: string;
  approveAndVerify: string;
  rejectAction: string;
  processedByAdmin: string;
  regIdLabel: string;
  submittedLabel: string;
  statusApprovedLabel: string;
  statusRejectedLabel: string;
  statusPendingLabel: string;
  publishMandiPriceMasterUpdate: string;
  cropNameLabel: string;
  mandiYardLabel: string;
  modalPricePerQ: string;
  publishAction: string;
  mandiBenchmarkPublished: string;
  cropPlaceholderExample: string;
  yardPlaceholderExample: string;
  storageEngineTelemetry: string;
  syncWorkerDaemon: string;
  healthyActive: string;
  clientPersistence: string;
  telemetryErrorRate: string;
  itemsLabel: string;
  auditTrailHeading: string;
  auditFpoApproval: string;
  auditMandiBroadcast: string;
  auditColdStorageConfirmed: string;
  auditOfflineSync: string;

  // Settings Modal
  settingsTitle: string;
  profileSettings: string;
  networkSimulation: string;
  dataManagement: string;
  resetAllDemoData: string;
  resetSuccess: string;
  registeredOn: string;
  offlineStorageStatus: string;
  profileUpdatedSuccess: string;
  activeUserSession: string;
  authenticatedStatus: string;
  signedInUser: string;
  assignedRole: string;
  interfaceLanguage: string;
  userProfileLocation: string;
  saveProfileChanges: string;
  applicationMaintenance: string;
  rerunOnboardingTour: string;
  clearLocalStorageReset: string;
  confirmClearStorage: string;
  accountSession: string;
  rbacEnforced: string;
  clientSessionToken: string;
  safeSessionNoPassword: string;
  switchUserTestRole: string;

  // Auth Modal & Access Denied
  loginTitle: string;
  loginSubtitle: string;
  demoAccountsQuickLogin: string;
  orLoginWithPhone: string;
  sendOtp: string;
  enterOtp: string;
  verifyLogin: string;
  registrationSuccess: string;
  accessRestrictedTitle: string;
  accessRestrictedDesc: string;
  requiredRole: string;
  yourCurrentRole: string;
  returnToHome: string;
  switchUserAccount: string;
  identityAndAccess: string;
  signInTitle: string;
  createAccountTitle: string;
  signInSub: string;
  signUpSub: string;
  demoEnvNotice: string;
  oneClickDemoLogin: string;
  instantPreset: string;
  signIn: string;
  manualSignIn: string;
  createNewAccount: string;
  mobileOrEmail: string;
  password: string;
  enterPasswordPlaceholder: string;
  signInToAccount: string;
  verifyingCredentials: string;
  selectYourRole: string;
  fullName: string;
  mobileNumberTen: string;
  emailOptional: string;
  companyFirmName: string;
  landSizeAcres: string;
  passwordMinSix: string;
  confirmPasswordLabel: string;
  createPasswordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  completeRegistration: string;
  creatingSecureProfile: string;
  enterMobileOrEmailError: string;
  enterPasswordError: string;
  invalidCredentialsError: string;
  enterValidNameError: string;
  enterValidPhoneError: string;
  passwordMinCharsError: string;
  passwordsDoNotMatchError: string;
  accountCreatedSuccess: string;
  demoLoginFailed: string;
  loginErrorOccurred: string;
  roleFarmerLabel: string;
  roleBuyerLabel: string;
  roleTraderLabel: string;
  roleServiceProviderLabel: string;
  roleAdminLabel: string;

  // Notifications
  markAllAsRead: string;
  notificationPolicyNotice: string;
  notificationPolicyDesc: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: "RaithuSahay",
    tagline: "Smart Crop Care & Direct Market Access",
    welcome: "Welcome to RaithuSahay",
    selectLanguage: "Choose Preferred Language",
    continueBtn: "Continue",
    getStarted: "Get Started",
    loginRegister: "Farmer Registration & Login",
    phoneLabel: "Mobile Number",
    phonePlaceholder: "10-digit mobile number",
    fullNameLabel: "Farmer Full Name",
    villageLabel: "Village",
    mandalLabel: "Mandal / Block",
    districtLabel: "District",
    stateLabel: "State",
    landAcresLabel: "Land Holding (Acres)",
    selectPrimaryCrops: "Select Your Crops",
    completeProfile: "Complete & Enter Dashboard",
    farmer: "Farmer",
    buyer: "Buyer / FPO",
    trader: "Trader / Mandi Agent",
    serviceProvider: "Service Provider",
    admin: "Administrator",
    switchRole: "Switch Role",
    logout: "Logout",
    accessDenied: "Access Denied",

    home: "Home",
    myCrops: "My Crops",
    diseaseDetect: "Crop Disease Scan",
    treatmentGuide: "Treatment Guide",
    marketPrices: "Market Prices",
    buyersFPOs: "Buyers & FPOs",
    coldStorage: "Cold Storage",
    logistics: "Logistics",
    myRequests: "Saved Requests",
    notifications: "Alerts & Weather",
    settings: "Settings",
    architecture: "System Arch & Status",

    greeting: "Namaste",
    weatherAdvisory: "Local Weather & Farm Advisory",
    todayMandiHighlight: "Live Mandi Rates Highlight",
    quickActions: "Quick Farm Services",
    scanCropHealth: "Scan Crop Disease",
    checkLivePrices: "Mandi Market Prices",
    bookColdStorage: "Find Cold Storage",
    bookTransport: "Book Farm Transport",
    sellProduce: "Sell Crop to Buyers",
    activeReminders: "Active Crop Reminders",
    recentRequests: "Recent Service Requests",
    viewAll: "View All",

    diseaseDetectTitle: "Crop Disease & Pest Scanner",
    diseaseDetectDesc: "Capture or upload leaf photo for instant identification, symptoms, and step-by-step treatment guidance.",
    chooseCrop: "Select Crop",
    takePhoto: "Take Leaf Photo",
    uploadPhoto: "Upload from Gallery",
    orTrySample: "Or try sample damaged leaves:",
    retake: "Retake Photo",
    remove: "Remove",
    analyzingImage: "Analyzing Crop Image...",
    analyzingStep1: "Scanning leaf color pigmentation and spots...",
    analyzingStep2: "Comparing with regional pathology database...",
    analyzingStep3: "Generating verified treatment plan...",
    possibleDiagnosis: "Possible Diagnosis Result",
    confidenceRate: "Confidence Level",
    severityLevel: "Severity",
    symptomsHeading: "Observed Symptoms",
    immediateSteps: "Immediate Field Actions",
    openTreatmentGuide: "View Full Treatment & Dosage Guide",
    saveDiagnosis: "Save to My Crop Health Records",
    diagnosisSavedSuccess: "Diagnosis saved to your offline records!",
    demoDisclaimer: "Notice: Demonstration Diagnostic Engine. Predictions are AI heuristics based on regional pathology. Always consult your local Rythu Bharosa Kendram (RBK) or Agricultural Officer before applying strong chemicals.",

    treatmentTitle: "Comprehensive Crop Treatment Library",
    searchTreatment: "Search by crop or disease name...",
    problemOverview: "Problem Overview & Pathogen",
    organicRemedy: "Organic & Bio-Control Remedies",
    chemicalRemedy: "Recommended Chemical Treatment & Dosages",
    preventionTips: "Preventive Cultivation Measures",
    safetyAdvice: "Spraying Safety & Precautions",
    readAloud: "Listen (Read Aloud)",

    marketTitle: "APMC Mandi Prices & Direct Buyers",
    searchMandi: "Search mandi or crop (e.g., Guntur, Warangal, Chilli)...",
    modalPrice: "Modal Price",
    minMaxPrice: "Min - Max Range",
    trendWeekly: "7-Day Price Trend",
    buyersDirectory: "Verified Buyers & FPOs",
    contactBuyer: "Contact Buyer",
    verifiedFPO: "Verified Collective",
    listProduceForSale: "List My Produce for Sale",
    cropToSell: "Crop to Sell",
    quantityAvailable: "Quantity Available",
    expectedPriceQuintal: "Expected Price (₹/Quintal)",
    harvestDate: "Harvest / Ready Date",
    submitListing: "Publish Produce Listing",
    listingSaved: "Produce listing created successfully!",
    demoPriceNotice: "Mandi prices and buyer listings shown reflect demonstration APMC & e-NAM market data formats. Real-time contracts require direct party confirmation.",

    coldStorageTitle: "Find & Book Nearby Cold Storage",
    coldStorageSubtitle: "Prevent distress sales. Preserve your produce at certified cold stores with climate control.",
    searchByCropLocation: "Filter by crop or district...",
    availableCapacity: "Available Capacity",
    chargesPerMonth: "Monthly Charges",
    bookStorageSpace: "Reserve Storage Space",
    durationMonths: "Storage Duration (Months)",
    quantityToStore: "Quantity (Quintals)",
    confirmBooking: "Confirm Storage Request",
    bookingConfirmed: "Request Saved Successfully",

    logisticsTitle: "Farm Produce Logistics & Transport",
    logisticsSubtitle: "Book verified farm transport vehicles from your farm gate directly to mandis and cold stores.",
    pickupPoint: "Pickup Farm / Village",
    dropPoint: "Destination Mandi / Storage",
    vehicleType: "Vehicle Type",
    estimatedFare: "Estimated Freight Cost",
    bookTransportVehicle: "Book Transport",

    requestsTitle: "Saved Requests & Offline Sync Manager",
    allFilter: "All Requests",
    statusDraft: "Draft",
    statusPendingSync: "Pending Sync",
    statusSyncing: "Syncing...",
    statusSynced: "Synced to Cloud",
    statusFailed: "Sync Failed",
    syncNow: "Sync Now",
    offlineModeNotice: "Working in Offline Mode. All requests saved locally to IndexedDB/LocalStorage and will queue for sync.",
    onlineModeNotice: "Online. Connected to cloud network.",
    simulateOfflineToggle: "Toggle Network Simulation",

    // Common Buttons & Actions
    cancel: "Cancel",
    confirm: "Confirm",
    dismiss: "Dismiss",
    save: "Save",
    saved: "Saved",
    edit: "Edit",
    deleteBtn: "Delete",
    search: "Search",
    filter: "Filter",
    close: "Close",
    back: "Back",
    submit: "Submit",
    clear: "Clear",
    details: "Details",
    status: "Status",
    actions: "Actions",
    date: "Date",
    phone: "Phone",
    location: "Location",
    farmerName: "Farmer Name",
    loading: "Loading...",

    // Header & Network
    networkOnline: "Network Online",
    networkOffline: "Offline Mode",
    switchToOnline: "Switch to Online",
    simulateOffline: "Simulate Offline",
    authorizedUser: "Authorized User",
    safeSession: "Safe Session",
    switchActiveRole: "Switch Active Role & Auth",
    switchUserDemo: "Switch User / Demo Accounts",

    // Navigation Consoles
    adminConsole: "Admin Console",
    platformGovernance: "Platform Governance & Master Data",
    adminManagement: "Admin Management",
    systemArchitecture: "System Architecture",
    systemArchitectureDesc: "High-level architecture, offline resilience, and data flow telemetry.",
    serviceProviderHub: "Service Provider Hub",
    coldStorageFleetOps: "Cold Storage & Logistics Fleet Operations",
    operationsConsole: "Operations Console",
    buyerFpoConsole: "Buyer / FPO Console",
    directFarmProcurement: "Direct Farm Procurement & Lot Bidding",
    farmerProduceLots: "Farmer Produce Lots",
    apmcMandiRates: "APMC Mandi Rates",
    apmcTraderConsole: "APMC Trader Console",
    liveMandiYardAuction: "Live Mandi Yard Auction & Spot Rates",
    auctionFloorPrices: "Auction Floor & Prices",

    // Farmer Dashboard Offers
    farmerWelcomeSub: "Unified farm advisory, live APMC mandis, cold stores, and verified FPO buyers.",
    aiOfflineDiagnosis: "AI Offline Diagnosis",
    directToVerifiedFPOs: "Direct to Verified FPOs",
    organicChemicalDoses: "Organic & Chemical Doses",
    scanCropHealthAction: "Scan Crop Health",
    estYield: "Est. Yield",
    todayChange: "Today Change",
    offersReceivedHeading: "Purchase Offers Received from Buyers & FPOs",
    offersReceivedSub: "Review live bids placed on your listed produce. Accept to confirm buyer contact.",
    noOffersReceivedYet: "No Purchase Offers Received Yet",
    noOffersReceivedDesc: "When verified buyers place bids on your crop listings, they will appear here with deal details and direct phone contact.",
    totalOfferDeal: "Total Deal Value",
    offeredQuantity: "Offered Quantity",
    offeredRate: "Offered Rate",
    yourAskingRate: "Your Asking Rate",
    priceMatch: "Price Match",
    meetsAsk: "Meets Ask",
    belowAsk: "Below Ask",
    fromBuyer: "Buyer",
    noteFromBuyer: "Note from Buyer",
    callBuyer: "Call Buyer",
    acceptOffer: "Accept Offer",
    rejectOffer: "Reject Offer",
    dealConfirmed: "Deal Confirmed",
    offerRejectedStatus: "Offer Rejected",
    offerAcceptedMsg: "Offer accepted! Buyer contact details have been unlocked.",
    offerRejectedMsg: "Offer has been rejected.",
    pendingAction: "Pending Decision",

    // Buyer / FPO Dashboard & Purchase Offers
    fpoBuyerConsoleTag: "FPO & Institutional Buyer Console",
    directFarmerProcurementTitle: "Direct Farm-gate Procurement & Bidding",
    directFarmerProcurementSub: "Browse farmer harvest listings, inspect lot specifications, and place direct purchase offers.",
    postProcurementDemand: "Post Procurement Demand",
    browseFarmgateListings: "Browse Farmgate Lots",
    myPurchaseOffers: "My Purchase Offers",
    activeProcurementDemands: "Active Procurement Demands",
    makePurchaseOffer: "Make Purchase Offer",
    quantityRequired: "Quantity Required (Quintals)",
    offerPricePerQuintal: "Offer Price (₹/Quintal)",
    messageToFarmer: "Message / Terms to Farmer (Optional)",
    submitOffer: "Submit Purchase Offer",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    purchaseOfferSubmittedSuccess: "Purchase offer submitted successfully.",
    validQuantityError: "Please enter a valid quantity greater than 0.",
    quantityExceedError: "Quantity cannot exceed available lot size",
    validPriceError: "Please enter a valid price per quintal greater than 0.",
    estimatedTotalOfferValue: "Estimated Total Offer Value",
    farmerAskingRate: "Farmer Asking Rate",
    availableInLot: "Available in Lot",
    callFarmer: "Call Farmer",
    lotSpecifications: "Lot Specifications",
    askingPrice: "Asking Price",
    moistureContent: "Moisture Content",
    qualityGrade: "Quality Grade",
    perQuintal: "/ Quintal",
    availableLot: "Available in Lot",
    demandTitle: "Demand Title",
    demandCropLabel: "Crop",
    demandQtyLabel: "Target Quantity (Quintals)",
    postDemandBtn: "Publish Procurement Demand",
    target: "Target",
    district: "District",
    broadcastedToFarmers: "Broadcasted to 450+ Farmers",
    makePurchaseOfferModalDesc: "Send a formal purchase quotation directly to the farmer",

    // Trader Dashboard
    traderConsoleTitle: "APMC Mandi Yard & Trader Terminal",
    traderConsoleSub: "Live yard auction bidding, commission agent floor, and daily e-NAM rate broadcast.",
    certifiedAPMCLicensed: "Certified APMC Licensed Trader",
    activeAuctionLots: "Active Auction Lots",
    todaysArrivals: "Today's Arrivals",
    avgModalRate: "Avg Modal Rate",
    activeTradersBidding: "Active Traders",
    liveAuctionFloor: "Live Mandi Auction Floor",
    mandiRateBroadcast: "Daily Mandi Rate Broadcast",
    placeBid: "Place Bid",
    currentHighestBid: "Highest Bid",
    biddingEndsIn: "Bidding Closes In",
    enterBidAmount: "Enter Bid Amount (₹/Quintal)",
    confirmBid: "Confirm Bid",
    lotNumber: "Lot #",
    broadcastModalTitle: "Broadcast Live Mandi Rate",
    broadcastRateBtn: "Publish Rate Broadcast",
    rateBroadcastSuccess: "Mandi rate broadcasted successfully to all connected farmers!",
    bidPlacedSuccess: "Bid placed successfully on lot!",
    mandiAgentTerminalBadge: "Mandi Commission Agent & Trader Terminal",
    apmcYardBroadcast: "APMC Yard Auction Floor & Rate Broadcast",
    traderDashboardSub: "Participate in open mandi yard electronic auctions, submit verified bids, broadcast closing prices, and match arriving farmer produce with mills.",
    dailyMandiBroadcastHeading: "Daily Mandi Rate Broadcast to Farmers & WhatsApp Groups",
    gunturApmcYard: "Guntur APMC Yard",
    enterClosingPricePlaceholder: "Enter closing modal price",
    broadcastRateAction: "Broadcast Rate",
    broadcastRateSuccessMessage: "Rates broadcasted successfully to 2,400+ registered farmers in Tenali, Prathipadu & Guntur Mandals.",
    liveLotsOnAuctionFloor: "Live Mandi Yard Lots on Auction Floor",
    autoRefreshActive: "Auto-refresh active",
    openForBiddingStatus: "Open for Bidding",
    finalCallStatus: "Final Call",
    bagsLabel: "Bags",
    needDispatchTrucks: "Need dispatch trucks for winning lots?",
    arrangeTrucksDesc: "Arrange 6-wheeler and 10-wheeler trucks directly to delivery mills.",
    bookTrucksBtn: "Book Trucks",
    village: "Village",
    quintals: "Quintals",
    farmerLabel: "Farmer",

    // Service Provider Dashboard
    serviceProviderTitle: "Operations Hub (Cold Storage & Logistics Fleet)",
    serviceProviderSubtitle: "Manage cold store chamber occupancy, incoming farmer bookings, and dispatch transport vehicles.",
    certifiedPartnerBadge: "Certified Agri-Infrastructure Partner",
    activeColdStores: "Active Cold Stores",
    totalStorageCapacity: "Total Storage Capacity",
    fleetVehicles: "Fleet Vehicles",
    activeDriversOnTrip: "Drivers on Transit",
    coldStoreChambers: "Cold Storage Chambers & Bookings",
    farmgateLogisticsFleet: "Farmgate Logistics Fleet",
    updateStatus: "Update Status",
    assignVehicle: "Assign Vehicle",
    statusUpdatedSuccess: "Status updated successfully.",

    // Cold Storage Booking
    farmgateDoorstepPickup: "Includes Farmgate Doorstep Pickup option",
    commodityCrop: "Commodity / Crop",
    preferredDepositDate: "Preferred Deposit Date",
    transportNeededQuestion: "Need Farmgate Transport to Cold Store?",
    transportNeededDesc: "Check to automatically arrange pickup vehicle from your field directly to this warehouse.",
    estimatedStorageRent: "Estimated Total Storage Rent",
    storageRentCalculationNote: "Charges calculated as (Quintals × Monthly Rent × Months). Electricity & insurance included.",
    specialNotesMoisture: "Special Notes / Moisture Condition",
    confirmSpaceReservation: "Confirm Space Reservation",
    myColdStorageBookings: "My Cold Storage Bookings",

    // Logistics Booking
    distanceKm: "Estimated Distance (km)",
    commodityGoods: "Commodity / Goods to Transport",
    totalLoadWeight: "Total Load Weight (Quintals)",
    includeLaborers: "Include Loading/Unloading Laborers?",
    laborersDesc: "Trained farm laborers will accompany vehicle for doorstep loading and mandi offloading.",
    estimatedTripFare: "Estimated Trip Fare",
    fareCalculationNote: "Base fare includes vehicle dispatch, fuel, and standard transit toll allowances.",
    confirmVehicleBooking: "Confirm Vehicle Booking",
    myTransportTrips: "My Transport Bookings",
    driver: "Driver",

    // Disease Detection & Treatment
    provideLeafPhoto: "Provide Damaged Leaf Photo",
    capturedLeafImage: "Captured Leaf Image",
    deviceCameraInspection: "Use device camera for live leaf inspection",
    selectFromGallery: "Select leaf picture from photo gallery",
    capturePhoto: "Capture Photo",
    scanAnotherLeaf: "Scan Another Leaf",
    savedToRecords: "Saved to Records",
    allCrops: "All Crops",
    pathogen: "Pathogen",
    stopAudio: "Stop Audio",
    cropLabel: "Crop",
    causalAgent: "Causal Agent",
    advisoryNotice: "Agricultural Advisory Notice",
    cameraError: "Camera access unavailable. Please use file upload or sample leaves.",

    // Admin Dashboard & Architecture
    adminDashboardTitle: "Platform Administration & Operations",
    adminDashboardSubtitle: "Unified monitoring for APMC market feeds, user verifications, system health, and offline telemetry.",
    registeredUsers: "Registered Users",
    pendingVerifications: "Pending Verifications",
    syncQueue: "Sync Queue",
    serverStatus: "Server Status",
    tabUserManagement: "User Management",
    tabVerifications: "Verification Requests",
    tabSystemHealth: "System Health & PWA",
    tabMasterData: "APMC Master Data",
    verifyApprove: "Verify & Approve",
    suspendUser: "Suspend User",
    viewDetails: "View Details",
    systemArchitectureTitle: "System Architecture & Offline-First Resilience",
    adminOpsConsoleBadge: "Operations & Admin Console",
    adminSystemGovTitle: "System Governance, Master Data & Verification Queue",
    adminSystemGovSub: "Review institutional KYC verification queues, maintain agricultural price master lists, monitor sync engine telemetry, and audit operations.",
    tabVerificationsLabel: "Verification Queue",
    tabMasterDataCatalog: "Master Data Catalog",
    tabSyncHealth: "Sync Telemetry & Queues",
    tabAuditLog: "Security Audit Log",
    pendingPartnerVerifications: "Pending Partner Verification Requests",
    approveAndVerify: "Approve & Verify",
    rejectAction: "Reject",
    processedByAdmin: "Processed by Admin",
    regIdLabel: "Reg ID",
    submittedLabel: "Submitted",
    statusApprovedLabel: "APPROVED",
    statusRejectedLabel: "REJECTED",
    statusPendingLabel: "PENDING",
    publishMandiPriceMasterUpdate: "Publish Mandi Price Master Update",
    cropNameLabel: "Crop Name",
    mandiYardLabel: "Mandi Yard",
    modalPricePerQ: "Modal Price (₹/Q)",
    publishAction: "Publish",
    mandiBenchmarkPublished: "✓ New mandi benchmark rate published to farmer dashboards.",
    cropPlaceholderExample: "e.g. Tomato (Hybrid Red)",
    yardPlaceholderExample: "e.g. Madanapalle Tomato Market",
    storageEngineTelemetry: "Storage Engine Telemetry & Worker Health",
    syncWorkerDaemon: "Sync Worker Daemon",
    healthyActive: "Healthy (Active)",
    clientPersistence: "IndexedDB / Local",
    telemetryErrorRate: "Telemetry Error Rate",
    itemsLabel: "items",
    auditTrailHeading: "System Operations Audit Trail",
    auditFpoApproval: "Admin approved FPO license verification",
    auditMandiBroadcast: "Mandi price broadcast to Guntur region",
    auditColdStorageConfirmed: "Cold storage reservation confirmed: Sri Lakshmi CS",
    auditOfflineSync: "Offline queue synchronization completed (3 items)",

    // Settings Modal
    settingsTitle: "Settings & Application Preferences",
    profileSettings: "Profile Details",
    networkSimulation: "Network & Resilience Testing",
    dataManagement: "Local Data Management",
    resetAllDemoData: "Reset All Demo Data",
    resetSuccess: "Demo data reset successfully to initial state.",
    registeredOn: "Registered",
    offlineStorageStatus: "Offline Storage Status",
    profileUpdatedSuccess: "Profile and agricultural settings updated successfully.",
    activeUserSession: "Active User Session & Role Authorization",
    authenticatedStatus: "Authenticated",
    signedInUser: "Signed In User",
    assignedRole: "Assigned Role",
    interfaceLanguage: "Interface & Voice Guidance Language",
    userProfileLocation: "User Profile & Location",
    saveProfileChanges: "Save Profile Changes",
    applicationMaintenance: "Application Maintenance",
    rerunOnboardingTour: "Re-run Farmer Onboarding Tour",
    clearLocalStorageReset: "Clear Local Storage & Reset Prototype",
    confirmClearStorage: "Clear local drafts and restart app?",
    accountSession: "Account Session",
    rbacEnforced: "RBAC Enforced",
    clientSessionToken: "Client Session Token",
    safeSessionNoPassword: "Safe Session (No Plaintext PW)",
    switchUserTestRole: "Switch User / Test Another Role",

    // Auth Modal & Access Denied
    loginTitle: "Login or Switch Account",
    loginSubtitle: "Sign in to access your farm records, listings, and market consoles.",
    demoAccountsQuickLogin: "Demo Accounts (One-Click Login)",
    orLoginWithPhone: "Or Login with Mobile Number",
    sendOtp: "Send OTP",
    enterOtp: "Enter 4-Digit OTP",
    verifyLogin: "Verify & Login",
    registrationSuccess: "Signed in successfully!",
    accessRestrictedTitle: "Access Restricted",
    accessRestrictedDesc: "You do not have the required permissions to view this console. Please switch to an authorized role.",
    requiredRole: "Required Role",
    yourCurrentRole: "Your Current Role",
    returnToHome: "Return to Home",
    switchUserAccount: "Switch User Account",
    identityAndAccess: "Identity & Role-Based Access Control",
    signInTitle: "Sign In to RaithuSahay",
    createAccountTitle: "Create New Account",
    signInSub: "Select a 1-click Demo Role below or enter your registered credentials.",
    signUpSub: "Register as a Farmer, Buyer, Trader, Service Provider, or Administrator.",
    demoEnvNotice: "DEMO ENVIRONMENT: Simulated authentication with SHA-256 salted hashing and session tokens. In production, this integrates with AgriStack SSO and SMS OTP gateway.",
    oneClickDemoLogin: "1-Click Demo Login (Select Any Role):",
    instantPreset: "Instant Preset",
    signIn: "Sign In",
    manualSignIn: "Manual Sign In",
    createNewAccount: "Create New Account",
    mobileOrEmail: "Mobile Number or Email ID",
    password: "Password",
    enterPasswordPlaceholder: "Enter password (e.g. Farmer@123)",
    signInToAccount: "Sign In to Account",
    verifyingCredentials: "Verifying Credentials...",
    selectYourRole: "Select Your Role in the Agriculture Ecosystem:",
    fullName: "Full Name",
    mobileNumberTen: "Mobile Number (10 digits)",
    emailOptional: "Email ID (Optional)",
    companyFirmName: "Company / Organization / Firm Name",
    landSizeAcres: "Agricultural Land Size (Acres)",
    passwordMinSix: "Password (min 6 chars)",
    confirmPasswordLabel: "Confirm Password",
    createPasswordPlaceholder: "Create password",
    confirmPasswordPlaceholder: "Confirm password",
    completeRegistration: "Complete Registration",
    creatingSecureProfile: "Creating Secure Profile...",
    enterMobileOrEmailError: "Please enter your mobile number or email ID.",
    enterPasswordError: "Please enter your password.",
    invalidCredentialsError: "Invalid credentials.",
    enterValidNameError: "Please enter your full name (at least 2 letters).",
    enterValidPhoneError: "Please enter a valid 10-digit mobile number.",
    passwordMinCharsError: "Password must contain at least 6 characters.",
    passwordsDoNotMatchError: "Passwords do not match. Please verify.",
    accountCreatedSuccess: "Account created successfully! Logging you in...",
    demoLoginFailed: "Demo login failed",
    loginErrorOccurred: "Login error occurred",
    roleFarmerLabel: "Farmer",
    roleBuyerLabel: "Buyer / FPO",
    roleTraderLabel: "Mandi Trader",
    roleServiceProviderLabel: "Service Provider",
    roleAdminLabel: "Admin",

    // Notifications
    markAllAsRead: "Mark all as read",
    notificationPolicyNotice: "Notification Channel Policy",
    notificationPolicyDesc: "Notifications are delivered in-app in this prototype. Live SMS delivery via telecom gateways (NIC/Kisan Portal) or push notifications require registered carrier credentials."
  },
  te: {
    appName: "రైతు సహాయ్",
    tagline: "స్మార్ట్ పంట రక్షణ మరియు ప్రత్యక్ష మార్కెట్ సేవలు",
    welcome: "రైతు సహాయ్ కు స్వాగతం",
    selectLanguage: "మీ భాషను ఎంచుకోండి",
    continueBtn: "ముందుకు సాగండి",
    getStarted: "ప్రారంభించండి",
    loginRegister: "రైతు నమోదు / లాగిన్",
    phoneLabel: "మొబైల్ నంబర్",
    phonePlaceholder: "10 అంకెల మొబైల్ నంబర్",
    fullNameLabel: "రైతు పూర్తి పేరు",
    villageLabel: "గ్రామం",
    mandalLabel: "మండలం",
    districtLabel: "జిల్లా",
    stateLabel: "రాష్ట్రం",
    landAcresLabel: "వ్యవసాయ భూమి (ఎకరాలు)",
    selectPrimaryCrops: "మీరు పండించే పంటలు ఎంచుకోండి",
    completeProfile: "ప్రొఫైల్ పూర్తి చేయండి",
    farmer: "రైతు",
    buyer: "కొనుగోలుదారు / FPO",
    trader: "వ్యాపారి / మార్కెట్ ఏజెంట్",
    serviceProvider: "సేవా ప్రదాత",
    admin: "నిర్వాహకుడు",
    switchRole: "పాత్ర మార్చండి",
    logout: "లాగ్ అవుట్",
    accessDenied: "యాక్సెస్ తిరస్కరించబడింది",

    home: "హోమ్",
    myCrops: "నా పంటలు",
    diseaseDetect: "తెగుళ్ల గుర్తింపు",
    treatmentGuide: "నివారణ పద్ధతులు",
    marketPrices: "మార్కెట్ ధరలు",
    buyersFPOs: "కొనుగోలుదారులు & FPOలు",
    coldStorage: "శీతల గిడ్డంగులు",
    logistics: "రవాణా సేవలు",
    myRequests: "నా అభ్యర్థనలు",
    notifications: "సమాచారం & వాతావరణం",
    settings: "సెట్టింగ్స్",
    architecture: "సిస్టమ్ ఆర్కిటెక్చర్",

    greeting: "నమస్కారం",
    weatherAdvisory: "వాతావరణ సమాచారం & వ్యవసాయ సూచనలు",
    todayMandiHighlight: "నేటి ప్రధాన మార్కెట్ ధరలు",
    quickActions: "త్వరిత సేవలు",
    scanCropHealth: "తెగులు స్కాన్ చేయండి",
    checkLivePrices: "మార్కెట్ ధరలు చూడండి",
    bookColdStorage: "శీతల గిడ్డంగి బుక్ చేయండి",
    bookTransport: "రవాణా బుక్ చేయండి",
    sellProduce: "పంట విక్రయించండి",
    activeReminders: "పంట సంరక్షణ హెచ్చరికలు",
    recentRequests: "ఇటీవలి అభ్యర్థనలు",
    viewAll: "అన్నీ చూడండి",

    diseaseDetectTitle: "పంట తెగుళ్లు & పురుగుల గుర్తింపు",
    diseaseDetectDesc: "తెగులు సోకిన ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి. తక్షణ నివారణ సలహా పొందండి.",
    chooseCrop: "పంటను ఎంచుకోండి",
    takePhoto: "ఆకు ఫోటో తీయండి",
    uploadPhoto: "గ్యాలరీ నుండి అప్‌లోడ్ చేయండి",
    orTrySample: "లేదా నమూనా ఆకులతో ప్రయత్నించండి:",
    retake: "మళ్ళీ తీయండి",
    remove: "తొలగించండి",
    analyzingImage: "ఫోటోను పరీక్షిస్తున్నాము...",
    analyzingStep1: "ఆకు రంగు మరియు మచ్చలను లెక్కిస్తున్నాము...",
    analyzingStep2: "వ్యవసాయ తెగుళ్ల సమాచారంతో సరిపోలుస్తున్నాము...",
    analyzingStep3: "సరైన నివారణ విధానాన్ని సిద్ధం చేస్తున్నాము...",
    possibleDiagnosis: "గుర్తించిన తెగులు ఫలితం",
    confidenceRate: "ఖచ్చితత్వ శాతం",
    severityLevel: "తీవ్రత",
    symptomsHeading: "కనిపించే లక్షణాలు",
    immediateSteps: "తక్షణ చర్యలు",
    openTreatmentGuide: "పూర్తి నివారణ మార్గదర్శిని చూడండి",
    saveDiagnosis: "నా రికార్డులలో సేవ్ చేయండి",
    diagnosisSavedSuccess: "తెగులు రికార్డు విజయవంతంగా సేవ్ అయ్యింది!",
    demoDisclaimer: "గమనిక: ఇది డెమో డయాగ్నోస్టిక్ మోడల్. విష రసాయనాలు వాడే ముందు రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ అధికారిని సంప్రదించండి.",

    treatmentTitle: "సమగ్ర పంట నివారణ సమాచారం",
    searchTreatment: "పంట లేదా తెగులు పేరుతో వెతకండి...",
    problemOverview: "సమస్య వివరాలు & కారణం",
    organicRemedy: "సేంద్రీయ & జీవ నియంత్రణ పద్ధతులు",
    chemicalRemedy: "సిఫార్సు చేయబడిన రసాయన మందులు & మోతాదు",
    preventionTips: "ముందస్తు జాగ్రత్తలు",
    safetyAdvice: "మందు పిచికారీ భద్రతా జాగ్రత్తలు",
    readAloud: "చదివి వినిపించండి (ఆడియో)",

    marketTitle: "మార్కెట్ యార్డ్ ధరలు & కొనుగోలుదారులు",
    searchMandi: "మార్కెట్ లేదా పంట పేరుతో వెతకండి (ఉదా: గుంటూరు మిర్చి, వరంగల్)...",
    modalPrice: "సగటు ధర",
    minMaxPrice: "కనిష్ట - గరిష్ట ధర",
    trendWeekly: "వారపు ధరల సరళి",
    buyersDirectory: "ధృవీకరించబడిన కొనుగోలుదారులు & FPOలు",
    contactBuyer: "సంప్రదించండి",
    verifiedFPO: "ధృవీకరించబడిన సంస్థ",
    listProduceForSale: "నా పంట విక్రయానికి పెట్టండి",
    cropToSell: "విక్రయించాల్సిన పంట",
    quantityAvailable: "లభ్యత పరిమాణం",
    expectedPriceQuintal: "ఆశించే ధర (₹/క్వింటాలు)",
    harvestDate: "కోత / సిద్ధంగా ఉన్న తేదీ",
    submitListing: "విక్రయ జాబితా నమోదు చేయండి",
    listingSaved: "మీ పంట జాబితా విజయవంతంగా నమోదైంది!",
    demoPriceNotice: "మార్కెట్ ధరలు మరియు కొనుగోలుదారుల సమాచారం డెమో డేటా. ప్రత్యక్ష విక్రయాల కోసం ముందస్తు నిర్ధారణ అవసరం.",

    coldStorageTitle: "సమీప శీతల గిడ్డంగులు (కోల్డ్ స్టోరేజ్)",
    coldStorageSubtitle: "తక్కువ ధరకు అమ్ముకోకుండా నాణ్యత కాపాడుకోవడానికి శీతల గిడ్డంగులను ఉపయోగించుకోండి.",
    searchByCropLocation: "పంట లేదా జిల్లా వారీగా ఫిల్టర్ చేయండి...",
    availableCapacity: "అందుబాటులో ఉన్న సామర్థ్యం",
    chargesPerMonth: "నెలకు చార్జీలు",
    bookStorageSpace: "నిల్వ కోసం బుక్ చేయండి",
    durationMonths: "నిల్వ కాలం (నెలలు)",
    quantityToStore: "నిల్వ చేయాల్సిన పరిమాణం (క్వింటాళ్లు)",
    confirmBooking: "బుకింగ్ నిర్ధారించండి",
    bookingConfirmed: "అభ్యర్థన విజయవంతంగా సేవ్ చేయబడింది",

    logisticsTitle: "రైతు రవాణా సేవలు",
    logisticsSubtitle: "మీ పొలం వద్దకే వాహనాన్ని రప్పించి మార్కెట్ లేదా కోల్డ్ స్టోరేజ్ కు తరలించండి.",
    pickupPoint: "పికప్ గ్రామం / పొలం",
    dropPoint: "గమ్యస్థాన మార్కెట్ / కోల్డ్ స్టోరేజ్",
    vehicleType: "వాహన రకం",
    estimatedFare: "అంచనా ఖర్చు",
    bookTransportVehicle: "వాహనం బుక్ చేయండి",

    requestsTitle: "నా అభ్యర్థనలు & ఆఫ్‌లైన్ సమకాలీకరణ",
    allFilter: "అన్ని అభ్యర్థనలు",
    statusDraft: "డ్రాఫ్ట్",
    statusPendingSync: "సింక్ పెండింగ్",
    statusSyncing: "సర్వర్‌కు పంపుతోంది...",
    statusSynced: "క్లౌడ్‌లో భద్రపరచబడింది",
    statusFailed: "విఫలమైంది (మళ్ళీ ప్రయత్నించండి)",
    syncNow: "ఇప్పుడే సింక్ చేయండి",
    offlineModeNotice: "మీరు ఆఫ్‌లైన్ మోడ్‌లో ఉన్నారు. మీ వివరాలు ఫోన్‌లో సురక్షితంగా సేవ్ అయ్యాయి. ఇంటర్నెట్ వచ్చినప్పుడు సింక్ అవుతాయి.",
    onlineModeNotice: "మీరు ఆన్‌లైన్‌లో ఉన్నారు. సర్వర్‌తో అనుసంధానించబడ్డారు.",
    simulateOfflineToggle: "నెట్‌వర్క్ సిమ్యులేషన్ మార్చండి",

    // Common Buttons & Actions
    cancel: "రద్దు చేయండి",
    confirm: "నిర్ధారించండి",
    dismiss: "తీసివేయండి",
    save: "సేవ్ చేయండి",
    saved: "సేవ్ చేయబడింది",
    edit: "సవరించండి",
    deleteBtn: "తొలగించండి",
    search: "శోధించండి",
    filter: "ఫిల్టర్",
    close: "మూసివేయండి",
    back: "వెనుకకు",
    submit: "సమర్పించండి",
    clear: "క్లియర్ చేయండి",
    details: "వివరాలు",
    status: "స్థితి",
    actions: "చర్యలు",
    date: "తేదీ",
    phone: "ఫోన్ నంబర్",
    location: "స్థలం",
    farmerName: "రైతు పేరు",
    loading: "లోడ్ అవుతోంది...",

    // Header & Network
    networkOnline: "నెట్‌వర్క్ ఆన్‌లైన్",
    networkOffline: "ఆఫ్‌లైన్ మోడ్",
    switchToOnline: "ఆన్‌లైన్‌కు మారండి",
    simulateOffline: "ఆఫ్‌లైన్ మోడ్ మార్చండి",
    authorizedUser: "ధృవీకరించబడిన వినియోగదారు",
    safeSession: "సురక్షిత సెషన్",
    switchActiveRole: "పాత్ర & ఖాతా మార్చండి",
    switchUserDemo: "యూజర్ మార్చండి / డెమో ఖాతాలు",

    // Navigation Consoles
    adminConsole: "అడ్మిన్ కన్సోల్",
    platformGovernance: "ప్లాట్‌ఫామ్ నిర్వహణ & మాస్టర్ డేటా",
    adminManagement: "అడ్మిన్ నిర్వహణ",
    systemArchitecture: "సిస్టమ్ ఆర్కిటెక్చర్",
    systemArchitectureDesc: "ఆర్కిటెక్చర్, ఆఫ్‌లైన్ కార్యాచరణ మరియు డేటా సమన్వయం.",
    serviceProviderHub: "సేవా ప్రదాత కేంద్రం",
    coldStorageFleetOps: "శీతల గిడ్డంగులు & రవాణా నిర్వహణ",
    operationsConsole: "ఆపరేషన్స్ కన్సోల్",
    buyerFpoConsole: "కొనుగోలుదారు / FPO కన్సోల్",
    directFarmProcurement: "ప్రత్యక్ష పంట సేకరణ & బిడ్డింగ్",
    farmerProduceLots: "రైతు పంటల జాబితా",
    apmcMandiRates: "APMC మార్కెట్ ధరలు",
    apmcTraderConsole: "APMC వ్యాపారి కన్సోల్",
    liveMandiYardAuction: "లైవ్ మార్కెట్ వేలం & ధరలు",
    auctionFloorPrices: "వేలం వేదిక & ధరలు",

    // Farmer Dashboard Offers
    farmerWelcomeSub: "వ్యవసాయ సలహాలు, మార్కెట్ ధరలు, శీతల గిడ్డంగులు మరియు కొనుగోలుదారులతో అనుసంధానం.",
    aiOfflineDiagnosis: "AI ఆఫ్‌లైన్ తెగుళ్ల గుర్తింపు",
    directToVerifiedFPOs: "ధృవీకరించబడిన FPOలతో ప్రత్యక్ష వ్యాపారం",
    organicChemicalDoses: "సేంద్రీయ & రసాయన మోతాదులు",
    scanCropHealthAction: "పంట తెగులు స్కాన్ చేయండి",
    estYield: "అంచనా దిగుబడి",
    todayChange: "నేటి మార్పు",
    offersReceivedHeading: "కొనుగోలుదారులు & FPOల నుండి వచ్చిన కొనుగోలు ఆఫర్లు",
    offersReceivedSub: "మీ పంట విక్రయ జాబితాపై కొనుగోలుదారులు ఇచ్చిన ఆఫర్లను పరిశీలించండి. ఆమోదించి రైతు-కొనుగోలుదారు బంధాన్ని ఏర్పరుచుకోండి.",
    noOffersReceivedYet: "ఇంకా కొనుగోలు ఆఫర్లు రాలేదు",
    noOffersReceivedDesc: "ధృవీకరించబడిన కొనుగోలుదారులు మీ పంటపై బిడ్ చేసినప్పుడు, పూర్తి వివరాలు మరియు ఫోన్ నంబర్‌తో ఇక్కడ కనిపిస్తాయి.",
    totalOfferDeal: "మొత్తం ఆఫర్ విలువ",
    offeredQuantity: "ఆఫర్ చేసిన పరిమాణం",
    offeredRate: "ఆఫర్ చేసిన ధర",
    yourAskingRate: "మీరు ఆశించిన ధర",
    priceMatch: "ధర సరిపోలిక",
    meetsAsk: "ఆశించిన ధర లభించింది",
    belowAsk: "ఆశించిన దానికంటే తక్కువ",
    fromBuyer: "కొనుగోలుదారు",
    noteFromBuyer: "కొనుగోలుదారు సందేశం",
    callBuyer: "కొనుగోలుదారుకు కాల్ చేయండి",
    acceptOffer: "ఆఫర్‌ను ఆమోదించండి",
    rejectOffer: "ఆఫర్‌ను తిరస్కరించండి",
    dealConfirmed: "డీల్ నిర్ధారించబడింది",
    offerRejectedStatus: "ఆఫర్ తిరస్కరించబడింది",
    offerAcceptedMsg: "ఆఫర్ ఆమోదించబడింది! కొనుగోలుదారు సంప్రదింపు వివరాలు అన్‌లాక్ చేయబడ్డాయి.",
    offerRejectedMsg: "ఆఫర్ తిరస్కరించబడింది.",
    pendingAction: "నిర్ణయం పెండింగ్‌లో ఉంది",

    // Buyer / FPO Dashboard & Purchase Offers
    fpoBuyerConsoleTag: "FPO & సంస్థాగత కొనుగోలుదారుల కన్సోల్",
    directFarmerProcurementTitle: "రైతు వద్ద నుండి ప్రత్యక్ష కొనుగోలు & బిడ్డింగ్",
    directFarmerProcurementSub: "రైతుల పంట వివరాలను పరిశీలించి నేరుగా కొనుగోలు ఆఫర్లను సమర్పించండి.",
    postProcurementDemand: "సేకరణ అవసరాన్ని నమోదు చేయండి",
    browseFarmgateListings: "రైతుల పంటల జాబితా చూడండి",
    myPurchaseOffers: "నా కొనుగోలు ఆఫర్లు",
    activeProcurementDemands: "ప్రస్తుత కొనుగోలు అవసరాలు",
    makePurchaseOffer: "కొనుగోలు ఆఫర్ చేయండి",
    quantityRequired: "అవసరమైన పరిమాణం (క్వింటాళ్లు)",
    offerPricePerQuintal: "క్వింటాల్‌కు ఆఫర్ ధర (₹)",
    messageToFarmer: "రైతుకు సందేశం / షరతులు (ఐచ్ఛికం)",
    submitOffer: "ఆఫర్ సమర్పించండి",
    pending: "పెండింగ్‌లో ఉంది",
    accepted: "ఆమోదించబడింది",
    rejected: "తిరస్కరించబడింది",
    purchaseOfferSubmittedSuccess: "కొనుగోలు ఆఫర్ విజయవంతంగా సమర్పించబడింది.",
    validQuantityError: "దయచేసి 0 కంటే ఎక్కువ సరైన పరిమాణాన్ని నమోదు చేయండి.",
    quantityExceedError: "పరిమాణం అందుబాటులో ఉన్న పంట కంటే ఎక్కువ ఉండకూడదు",
    validPriceError: "దయచేసి 0 కంటే ఎక్కువ సరైన క్వింటాల్ ధరను నమోదు చేయండి.",
    estimatedTotalOfferValue: "అంచనా మొత్తం ఆఫర్ విలువ",
    farmerAskingRate: "రైతు ఆశించిన ధర",
    availableInLot: "లభ్యత పరిమాణం",
    callFarmer: "రైతుకు కాల్ చేయండి",
    lotSpecifications: "పంట వివరాలు",
    askingPrice: "ఆశించిన ధర",
    moistureContent: "తేమ శాతం",
    qualityGrade: "నాణ్యత గ్రేడ్",
    perQuintal: "/ క్వింటాలు",
    availableLot: "లభ్యత పరిమాణం",
    demandTitle: "సేకరణ శీర్షిక",
    demandCropLabel: "పంట",
    demandQtyLabel: "లక్ష్య పరిమాణం (క్వింటాళ్లు)",
    postDemandBtn: "సేకరణ ప్రకటన ప్రచురించండి",
    target: "లక్ష్యం",
    district: "జిల్లా",
    broadcastedToFarmers: "450+ రైతులకు ప్రసారం చేయబడింది",
    makePurchaseOfferModalDesc: "రైతుకు నేరుగా అధికారిక కొనుగోలు కొటేషన్‌ను పంపండి",

    // Trader Dashboard
    traderConsoleTitle: "APMC మార్కెట్ యార్డ్ & ట్రేడర్ టెర్మినల్",
    traderConsoleSub: "లైవ్ యార్డ్ వేలం పాట, కమీషన్ ఏజెంట్ వేదిక మరియు రోజువారీ e-NAM ధరల సమాచారం.",
    certifiedAPMCLicensed: "ధృవీకరించబడిన APMC లైసెన్స్ పొందిన వ్యాపారి",
    activeAuctionLots: "ప్రస్తుత వేలం లాట్‌లు",
    todaysArrivals: "నేటి మార్కెట్ రాక",
    avgModalRate: "సగటు మోడల్ ధర",
    activeTradersBidding: "పాల్గొంటున్న వ్యాపారులు",
    liveAuctionFloor: "లైవ్ మార్కెట్ వేలం వేదిక",
    mandiRateBroadcast: "రోజువారీ మార్కెట్ ధరల ప్రకటన",
    placeBid: "బిడ్ వేయండి",
    currentHighestBid: "ప్రస్తుత గరిష్ట బిడ్",
    biddingEndsIn: "వేలం ముగింపు సమయం",
    enterBidAmount: "బిడ్ మొత్తం నమోదు చేయండి (₹/క్వింటాలు)",
    confirmBid: "బిడ్ నిర్ధారించండి",
    lotNumber: "లాట్ #",
    broadcastModalTitle: "లైవ్ మార్కెట్ ధరను ప్రసారం చేయండి",
    broadcastRateBtn: "ధరను ప్రసారం చేయండి",
    rateBroadcastSuccess: "మార్కెట్ ధర విజయవంతంగా రైతులకు చేరవేయబడింది!",
    bidPlacedSuccess: "లాట్‌పై బిడ్ విజయవంతంగా నమోదు చేయబడింది!",
    mandiAgentTerminalBadge: "మార్కెట్ కమీషన్ ఏజెంట్ & వ్యాపారి టెర్మినల్",
    apmcYardBroadcast: "APMC యార్డ్ వేలం మరియు ధరల ప్రసారం",
    traderDashboardSub: "మార్కెట్ యార్డ్ వేలంలో పాల్గొనండి, ధృవీకరించిన బిడ్లను సమర్పించండి, తాజా ధరలను ప్రసారం చేయండి మరియు రైతుల పంటను మిల్లులతో అనుసంధానించండి.",
    dailyMandiBroadcastHeading: "రైతులు మరియు వాట్సాప్ గ్రూపులకు రోజువారీ మార్కెట్ ధరల ప్రసారం",
    gunturApmcYard: "గుంటూరు మార్కెట్ యార్డ్",
    enterClosingPricePlaceholder: "ముగింపు మార్కెట్ ధరను నమోదు చేయండి",
    broadcastRateAction: "ధరను ప్రసారం చేయండి",
    broadcastRateSuccessMessage: "తెనాలి, ప్రత్తిపాడు & గుంటూరు మండలాల్లోని 2,400+ నమోదైన రైతులకు ధరలు విజయవంతంగా ప్రసారం చేయబడ్డాయి.",
    liveLotsOnAuctionFloor: "వేలం ఫ్లోర్‌లో ఉన్న ప్రత్యక్ష మార్కెట్ యార్డ్ లాట్‌లు",
    autoRefreshActive: "ఆటో-రిఫ్రెష్ యాక్టివ్",
    openForBiddingStatus: "బిడ్డింగ్‌కు సిద్ధం",
    finalCallStatus: "చివరి పిలుపు",
    bagsLabel: "బస్తాలు",
    needDispatchTrucks: "గెలుచుకున్న లాట్‌ల రవాణాకు లారీలు అవసరమా?",
    arrangeTrucksDesc: "డెలివరీ మిల్లులకు నేరుగా 6-వీలర్ మరియు 10-వీలర్ ట్రక్కులను బుక్ చేసుకోండి.",
    bookTrucksBtn: "ట్రక్కులను బుక్ చేయండి",
    village: "గ్రామం",
    quintals: "క్వింటాళ్లు",
    farmerLabel: "రైతు",

    // Service Provider Dashboard
    serviceProviderTitle: "ఆపరేషన్స్ హబ్ (కోల్డ్ స్టోరేజ్ & రవాణా నెట్‌వర్క్)",
    serviceProviderSubtitle: "శీతల గిడ్డంగి నిల్వలు, రైతుల బుకింగ్‌లు మరియు రవాణా వాహనాల పర్యవేక్షణ.",
    certifiedPartnerBadge: "ధృవీకరించబడిన వ్యవసాయ మౌలిక వసతుల భాగస్వామి",
    activeColdStores: "కార్యాచరణలో ఉన్న కోల్డ్ స్టోర్లు",
    totalStorageCapacity: "మొత్తం నిల్వ సామర్థ్యం",
    fleetVehicles: "రవాణా వాహనాలు",
    activeDriversOnTrip: "ప్రయాణంలో ఉన్న డ్రైవర్లు",
    coldStoreChambers: "కోల్డ్ స్టోరేజ్ ఛాంబర్లు & బుకింగ్‌లు",
    farmgateLogisticsFleet: "రైతు రవాణా వాహనాల నెట్‌వర్క్",
    updateStatus: "స్థితిని నవీకరించండి",
    assignVehicle: "వాహనాన్ని కేటాయించండి",
    statusUpdatedSuccess: "స్థితి విజయవంతంగా నవీకరించబడింది.",

    // Cold Storage Booking
    farmgateDoorstepPickup: "పొలం వద్దకే వాహనం వచ్చే సదుపాయం కలదు",
    commodityCrop: "నిల్వ చేసే పంట / వస్తువు",
    preferredDepositDate: "నిల్వ చేయదలచిన తేదీ",
    transportNeededQuestion: "పొలం నుండి కోల్డ్ స్టోరేజ్‌కు రవాణా వాహనం కావాలా?",
    transportNeededDesc: "ఎంచుకుంటే మీ పొలం వద్దకే వాహనం వచ్చి పంటను కోల్డ్ స్టోరేజ్ కు చేరుస్తుంది.",
    estimatedStorageRent: "అంచనా మొత్తం నిల్వ అద్దె",
    storageRentCalculationNote: "చార్జీల లెక్క: (క్వింటాళ్లు × నెలవారీ అద్దె × నెలలు). విద్యుత్ మరియు బీమా కలుపుకొని.",
    specialNotesMoisture: "ప్రత్యేక గమనికలు / తేమ స్థితి",
    confirmSpaceReservation: "స్థలాన్ని రిజర్వ్ చేయండి",
    myColdStorageBookings: "నా శీతల గిడ్డంగి బుకింగ్‌లు",

    // Logistics Booking
    distanceKm: "అంచనా దూరం (కి.మీ)",
    commodityGoods: "రవాణా చేయాల్సిన పంట / వస్తువులు",
    totalLoadWeight: "మొత్తం బరువు (క్వింటాళ్లు)",
    includeLaborers: "లోడింగ్/అన్‌లోడింగ్ కోసం కూలీలు కావాలా?",
    laborersDesc: "పొలం వద్ద ఎక్కించడానికి మరియు మార్కెట్ వద్ద దించడానికి సహాయకులు వాహనంతో వస్తారు.",
    estimatedTripFare: "అంచనా రవాణా ఖర్చు",
    fareCalculationNote: "మూల ఛార్జీలలో వాహనం, ఇంధనం మరియు టోల్ ఛార్జీలు కలిసి ఉంటాయి.",
    confirmVehicleBooking: "వాహనం బుకింగ్ నిర్ధారించండి",
    myTransportTrips: "నా రవాణా బుకింగ్‌లు",
    driver: "డ్రైవర్",

    // Disease Detection & Treatment
    provideLeafPhoto: "తెగులు సోకిన ఆకు ఫోటో అందించండి",
    capturedLeafImage: "సేకరించిన ఆకు చిత్రం",
    deviceCameraInspection: "ప్రత్యక్ష ఆకు తనిఖీ కోసం కెమెరా వాడండి",
    selectFromGallery: "గ్యాలరీ నుండి ఆకు ఫోటో ఎంచుకోండి",
    capturePhoto: "ఫోటో తీయండి",
    scanAnotherLeaf: "మరొక ఆకును స్కాన్ చేయండి",
    savedToRecords: "రికార్డులలో సేవ్ చేయబడింది",
    allCrops: "అన్ని పంటలు",
    pathogen: "తెగులు కారకం",
    stopAudio: "ఆడియో ఆపండి",
    cropLabel: "పంట",
    causalAgent: "తెగులు కారకం",
    advisoryNotice: "వ్యవసాయ సలహా సూచన",
    cameraError: "కెమెరా అందుబాటులో లేదు. దయచేసి గ్యాలరీ ఫోటో లేదా నమూనా ఆకును వాడండి.",

    // Admin Dashboard & Architecture
    adminDashboardTitle: "ప్లాట్‌ఫామ్ నిర్వహణ & కార్యకలాపాలు",
    adminDashboardSubtitle: "మార్కెట్ ఫీడ్లు, యూజర్ ధృవీకరణలు, సిస్టమ్ ఆరోగ్యం మరియు ఆఫ్‌లైన్ సమన్వయం.",
    registeredUsers: "నమోదైన వినియోగదారులు",
    pendingVerifications: "ధృవీకరణ కోసం వేచి ఉన్నవి",
    syncQueue: "సింక్ క్యూ",
    serverStatus: "సర్వర్ స్థితి",
    tabUserManagement: "వినియోగదారుల నిర్వహణ",
    tabVerifications: "ధృవీకరణ అభ్యర్థనలు",
    tabSystemHealth: "సిస్టమ్ ఆరోగ్యం & PWA",
    tabMasterData: "APMC మాస్టర్ డేటా",
    verifyApprove: "ధృవీకరించి ఆమోదించండి",
    suspendUser: "తాత్కాలికంగా నిలిపివేయండి",
    viewDetails: "వివరాలు చూడండి",
    systemArchitectureTitle: "సిస్టమ్ ఆర్కిటెక్చర్ & ఆఫ్‌లైన్ సామర్థ్యం",
    adminOpsConsoleBadge: "కార్యకలాపాలు & అడ్మిన్ కన్సోల్",
    adminSystemGovTitle: "సిస్టమ్ పాలన, మాస్టర్ డేటా & ధృవీకరణ క్యూ",
    adminSystemGovSub: "సంస్థాగత కేవైసీ ధృవీకరణలను సమీక్షించండి, వ్యవసాయ ధరల జాబితాను నిర్వహించండి, సింక్ టెలిమెట్రీని పర్యవేక్షించండి మరియు ఆడిట్ చేయండి.",
    tabVerificationsLabel: "ధృవీకరణ క్యూ",
    tabMasterDataCatalog: "మాస్టర్ డేటా కేటలాగ్",
    tabSyncHealth: "సింక్ టెలిమెట్రీ & క్యూలు",
    tabAuditLog: "భద్రతా ఆడిట్ లాగ్",
    pendingPartnerVerifications: "పెండింగ్‌లో ఉన్న భాగస్వామి ధృవీకరణ అభ్యర్థనలు",
    approveAndVerify: "ఆమోదించి ధృవీకరించండి",
    rejectAction: "తిరస్కరించండి",
    processedByAdmin: "అడ్మిన్ ద్వారా ప్రాసెస్ చేయబడింది",
    regIdLabel: "రిజిస్ట్రేషన్ ID",
    submittedLabel: "సమర్పించిన తేదీ",
    statusApprovedLabel: "ఆమోదించబడింది",
    statusRejectedLabel: "తిరస్కరించబడింది",
    statusPendingLabel: "పెండింగ్‌లో ఉంది",
    publishMandiPriceMasterUpdate: "మార్కెట్ ధర మాస్టర్ అప్‌డేట్ ప్రచురించండి",
    cropNameLabel: "పంట పేరు",
    mandiYardLabel: "మార్కెట్ యార్డ్",
    modalPricePerQ: "మోడల్ ధర (₹/క్వింటాలు)",
    publishAction: "ప్రచురించండి",
    mandiBenchmarkPublished: "✓ కొత్త మార్కెట్ ధర విజయవంతంగా రైతు డ్యాష్‌బోర్డులకు ప్రచురించబడింది.",
    cropPlaceholderExample: "ఉదా: టమోటా (హైబ్రిడ్ రెడ్)",
    yardPlaceholderExample: "ఉదా: మదనపల్లె టమోటా మార్కెట్",
    storageEngineTelemetry: "స్టోరేజ్ ఇంజిన్ టెలిమెట్రీ & వర్కర్ ఆరోగ్యం",
    syncWorkerDaemon: "సింక్ వర్కర్ డెమోన్",
    healthyActive: "ఆరోగ్యకరమైనది (యాక్టివ్)",
    clientPersistence: "IndexedDB / స్థానిక",
    telemetryErrorRate: "టెలిమెట్రీ ఎర్రర్ రేటు",
    itemsLabel: "అంశాలు",
    auditTrailHeading: "సిస్టమ్ కార్యకలాపాల ఆడిట్ ట్రయల్",
    auditFpoApproval: "అడ్మిన్ FPO లైసెన్స్ ధృవీకరణను ఆమోదించారు",
    auditMandiBroadcast: "గుంటూరు ప్రాంతానికి మార్కెట్ ధర ప్రసారం చేయబడింది",
    auditColdStorageConfirmed: "కోల్డ్ స్టోరేజ్ రిజర్వేషన్ ధృవీకరించబడింది: శ్రీ లక్ష్మి CS",
    auditOfflineSync: "ఆఫ్‌లైన్ క్యూ సమకాలీకరణ పూర్తయింది (3 అంశాలు)",

    // Settings Modal
    settingsTitle: "సెట్టింగ్స్ & అప్లికేషన్ ప్రాధాన్యతలు",
    profileSettings: "ప్రొఫైల్ వివరాలు",
    networkSimulation: "నెట్‌వర్క్ & ఆఫ్‌లైన్ పరీక్షలు",
    dataManagement: "స్థానిక డేటా నిర్వహణ",
    resetAllDemoData: "డెమో డేటాను రీసెట్ చేయండి",
    resetSuccess: "డెమో డేటా విజయవంతంగా ప్రారంభ స్థితికి రీసెట్ చేయబడింది.",
    registeredOn: "నమోదైన తేదీ",
    offlineStorageStatus: "ఆఫ్‌లైన్ నిల్వ స్థితి",
    profileUpdatedSuccess: "ప్రొఫైల్ వివరాలు విజయవంతంగా నవీకరించబడ్డాయి.",
    activeUserSession: "యాక్టివ్ యూజర్ సెషన్ & పాత్ర అధికారం",
    authenticatedStatus: "ధృవీకరించబడింది",
    signedInUser: "లాగిన్ అయిన వినియోగదారు",
    assignedRole: "కేటాయించిన పాత్ర",
    interfaceLanguage: "ఇంటర్‌ఫేస్ మరియు వాయిస్ మార్గదర్శక భాష",
    userProfileLocation: "వినియోగదారు ప్రొఫైల్ & ప్రాంతం",
    saveProfileChanges: "ప్రొఫైల్ మార్పులను భద్రపరచండి",
    applicationMaintenance: "అప్లికేషన్ నిర్వహణ",
    rerunOnboardingTour: "రైతు పరిచయ మార్గదర్శిని తిరిగి ప్రారంభించండి",
    clearLocalStorageReset: "స్థానిక డేటాను తొలగించి రీసెట్ చేయండి",
    confirmClearStorage: "స్థానిక డ్రాఫ్ట్‌లను తొలగించి యాప్‌ను పునఃప్రారంభించాలా?",
    accountSession: "ఖాతా సెషన్",
    rbacEnforced: "RBAC అమలులో ఉంది",
    clientSessionToken: "క్లయింట్ సెషన్ టోకెన్",
    safeSessionNoPassword: "సురక్షిత సెషన్ (పాస్‌వర్డ్ నిల్వ చేయబడలేదు)",
    switchUserTestRole: "వినియోగదారుని మార్చండి / మరొక పాత్రను పరీక్షించండి",

    // Auth Modal & Access Denied
    loginTitle: "లాగిన్ అవ్వండి లేదా ఖాతా మార్చండి",
    loginSubtitle: "మీ పంట రికార్డులు, లిస్టింగ్‌లు మరియు మార్కెట్ సేవలను పొందడానికి లాగిన్ అవ్వండి.",
    demoAccountsQuickLogin: "డెమో ఖాతాలు (ఒక్క క్లిక్‌తో లాగిన్)",
    orLoginWithPhone: "లేదా మొబైల్ నంబర్‌తో లాగిన్ అవ్వండి",
    sendOtp: "OTP పంపండి",
    enterOtp: "4 అంకెల OTP నమోదు చేయండి",
    verifyLogin: "ధృవీకరించి లాగిన్ అవ్వండి",
    registrationSuccess: "విజయవంతంగా లాగిన్ అయ్యారు!",
    accessRestrictedTitle: "యాక్సెస్ పరిమితం చేయబడింది",
    accessRestrictedDesc: "ఈ కన్సోల్‌ను చూడటానికి మీకు తగిన అనుమతులు లేవు. దయచేసి సరైన పాత్రకు మారండి.",
    requiredRole: "అవసరమైన పాత్ర",
    yourCurrentRole: "మీ ప్రస్తుత పాత్ర",
    returnToHome: "హోమ్‌కు తిరిగి వెళ్ళండి",
    switchUserAccount: "వేరొక ఖాతాకు మారండి",
    identityAndAccess: "గుర్తింపు & పాత్ర ఆధారిత యాక్సెస్ నియంత్రణ",
    signInTitle: "రైతు సహాయ్ లోకి లాగిన్ అవ్వండి",
    createAccountTitle: "కొత్త ఖాతాను సృష్టించండి",
    signInSub: "క్రింద ఉన్న 1-క్లిక్ డెమో పాత్రను ఎంచుకోండి లేదా మీ ఆధారాలను నమోదు చేయండి.",
    signUpSub: "రైతు, కొనుగోలుదారు, వ్యాపారి, సేవా ప్రదాత లేదా అడ్మినిస్ట్రేటర్‌గా నమోదు చేసుకోండి.",
    demoEnvNotice: "డెమో వాతావరణం: SHA-256 సాల్టెడ్ హాషింగ్ మరియు సెషన్ టోకెన్‌లతో అనుకరణ వ్యవస్థ. ఉత్పత్తిలో, ఇది అగ్రిస్టాక్ SSO మరియు SMS OTP తో అనుసంధానించబడుతుంది.",
    oneClickDemoLogin: "1-క్లిక్ డెమో లాగిన్ (ఏదైనా పాత్రను ఎంచుకోండి):",
    instantPreset: "తక్షణ ప్రవేశం",
    signIn: "లాగిన్ అవ్వండి",
    manualSignIn: "నేరుగా లాగిన్",
    createNewAccount: "కొత్త ఖాతా తెరవండి",
    mobileOrEmail: "మొబైల్ నంబర్ లేదా ఇమెయిల్ ID",
    password: "పాస్‌వర్డ్",
    enterPasswordPlaceholder: "పాస్‌వర్డ్ నమోదు చేయండి (ఉదా. Farmer@123)",
    signInToAccount: "ఖాతాలోకి లాగిన్ అవ్వండి",
    verifyingCredentials: "వివరాలను ధృవీకరిస్తోంది...",
    selectYourRole: "వ్యవసాయ వ్యవస్థలో మీ పాత్రను ఎంచుకోండి:",
    fullName: "పూర్తి పేరు",
    mobileNumberTen: "మొబైల్ నంబర్ (10 అంకెలు)",
    emailOptional: "ఇమెయిల్ ID (ఐచ్ఛికం)",
    companyFirmName: "కంపెనీ / సంస్థ / వ్యాపార సంస్థ పేరు",
    landSizeAcres: "వ్యవసాయ భూమి పరిమాణం (ఎకరాలు)",
    passwordMinSix: "పాస్‌వర్డ్ (కనీసం 6 అక్షరాలు)",
    confirmPasswordLabel: "పాస్‌వర్డ్ నిర్ధారించండి",
    createPasswordPlaceholder: "పాస్‌వర్డ్ సృష్టించండి",
    confirmPasswordPlaceholder: "పాస్‌వర్డ్ నిర్ధారించండి",
    completeRegistration: "నమోదును పూర్తి చేయండి",
    creatingSecureProfile: "సురక్షిత ప్రొఫైల్‌ను సృష్టిస్తోంది...",
    enterMobileOrEmailError: "దయచేసి మీ మొబైల్ నంబర్ లేదా ఇమెయిల్ IDని నమోదు చేయండి.",
    enterPasswordError: "దయచేసి మీ పాస్‌వర్డ్‌ను నమోదు చేయండి.",
    invalidCredentialsError: "చెల్లని లాగిన్ వివరాలు.",
    enterValidNameError: "దయచేసి మీ పూర్తి పేరును (కనీసం 2 అక్షరాలు) నమోదు చేయండి.",
    enterValidPhoneError: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.",
    passwordMinCharsError: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు కలిగి ఉండాలి.",
    passwordsDoNotMatchError: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు. దయచేసి సరిచూసుకోండి.",
    accountCreatedSuccess: "ఖాతా విజయవంతంగా సృష్టించబడింది! లాగిన్ అవుతోంది...",
    demoLoginFailed: "డెమో లాగిన్ విఫలమైంది",
    loginErrorOccurred: "లాగిన్ లోపం సంభవించింది",
    roleFarmerLabel: "రైతు",
    roleBuyerLabel: "కొనుగోలుదారు / FPO",
    roleTraderLabel: "మార్కెట్ వ్యాపారి",
    roleServiceProviderLabel: "సేవా ప్రదాత",
    roleAdminLabel: "అడ్మిన్",

    // Notifications
    markAllAsRead: "అన్నీ చదివినట్లు గుర్తించండి",
    notificationPolicyNotice: "నోటిఫికేషన్ విధానం",
    notificationPolicyDesc: "ఈ ప్రోటోటైప్‌లో నోటిఫికేషన్‌లు యాప్‌లోనే అందించబడతాయి. లైవ్ SMS కోసం రిజిస్టర్డ్ టెలికాం గేట్‌వే అవసరం."
  },
  hi: {
    appName: "रैतुसहाय",
    tagline: "स्मार्ट फसल देखभाल एवं सीधा बाजार संपर्क",
    welcome: "रैतुसहाय में आपका स्वागत है",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",
    continueBtn: "आगे बढ़ें",
    getStarted: "शुरू करें",
    loginRegister: "किसान पंजीकरण एवं लॉगिन",
    phoneLabel: "मोबाइल नंबर",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर",
    fullNameLabel: "किसान का पूरा नाम",
    villageLabel: "गाँव",
    mandalLabel: "तहसील / ब्लॉक",
    districtLabel: "जिला",
    stateLabel: "राज्य",
    landAcresLabel: "कृषि भूमि (एकड़)",
    selectPrimaryCrops: "अपनी मुख्य फसलें चुनें",
    completeProfile: "प्रोफ़ाइल पूरी करें",
    farmer: "किसान",
    buyer: "खरीदार / FPO",
    trader: "व्यापारी / मंडी एजेंट",
    serviceProvider: "सेवा प्रदाता",
    admin: "प्रशासक",
    switchRole: "भूमिका बदलें",
    logout: "लॉग आउट",
    accessDenied: "पहुंच अस्वीकृत",

    home: "होम",
    myCrops: "मेरी फसलें",
    diseaseDetect: "रोग पहचान",
    treatmentGuide: "उपचार मार्गदर्शिका",
    marketPrices: "मंडी भाव",
    buyersFPOs: "खरीदार और FPO",
    coldStorage: "कोल्ड स्टोरेज",
    logistics: "परिवहन सेवा",
    myRequests: "मेरे अनुरोध",
    notifications: "सूचनाएं और मौसम",
    settings: "सेटिंग्स",
    architecture: "सिस्टम आर्किटेक्चर",

    greeting: "नमस्ते",
    weatherAdvisory: "स्थानीय मौसम एवं कृषि सलाह",
    todayMandiHighlight: "आज के प्रमुख मंडी भाव",
    quickActions: "त्वरित सेवाएं",
    scanCropHealth: "फसल रोग स्कैन करें",
    checkLivePrices: "मंडी भाव देखें",
    bookColdStorage: "कोल्ड स्टोरेज बुक करें",
    bookTransport: "परिवहन बुक करें",
    sellProduce: "फसल बेचें",
    activeReminders: "फसल देखभाल अनुस्मारक",
    recentRequests: "हाल के अनुरोध",
    viewAll: "सभी देखें",

    diseaseDetectTitle: "फसल रोग एवं कीट स्कैनर",
    diseaseDetectDesc: "प्रभावित पत्ती की फोटो खींचें या अपलोड करें। तुरंत लक्षण और संपूर्ण उपचार सलाह पाएं।",
    chooseCrop: "फसल चुनें",
    takePhoto: "पत्ती की फोटो लें",
    uploadPhoto: "गैलरी से अपलोड करें",
    orTrySample: "या नमूना पत्तियों से परीक्षण करें:",
    retake: "दोबारा फोटो लें",
    remove: "हटाएं",
    analyzingImage: "फोटो का विश्लेषण हो रहा है...",
    analyzingStep1: "पत्तियों के धब्बों और रंग की जांच...",
    analyzingStep2: "कृषि रोग डेटाबेस से मिलान...",
    analyzingStep3: "सटीक उपचार योजना तैयार की जा रही है...",
    possibleDiagnosis: "संभावित रोग निदान",
    confidenceRate: "सटीकता दर",
    severityLevel: "गंभीरता",
    symptomsHeading: "दिखने वाले लक्षण",
    immediateSteps: "तत्काल खेत में उठाए जाने वाले कदम",
    openTreatmentGuide: "संपूर्ण उपचार एवं खुराक मार्गदर्शिका",
    saveDiagnosis: "मेरे रिकॉर्ड में सहेजें",
    diagnosisSavedSuccess: "रोग निदान आपके स्थानीय रिकॉर्ड में सहेजा गया!",
    demoDisclaimer: "सूचना: यह प्रदर्शन मॉडल है। भारी कीटनाशक छिड़काव से पहले अपने स्थानीय कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से अवश्य परामर्श लें।",

    treatmentTitle: "विस्तृत फसल उपचार लाइब्रेरी",
    searchTreatment: "फसल या रोग के नाम से खोजें...",
    problemOverview: "समस्या का विवरण एवं रोगजनक",
    organicRemedy: "जैविक एवं प्राकृतिक उपचार",
    chemicalRemedy: "अनुशंसित रासायनिक उपचार एवं खुराक",
    preventionTips: "निवारक कृषि उपाय",
    safetyAdvice: "छिड़काव सुरक्षा सावधानियां",
    readAloud: "सुनें (बोलकर बताएं)",

    marketTitle: "मंडी भाव और सीधे खरीदार",
    searchMandi: "मंडी या फसल खोजें (उदा. मिर्च, कपास, धान)...",
    modalPrice: "मॉडल भाव",
    minMaxPrice: "न्यूनतम - अधिकतम दर",
    trendWeekly: "7-दिवसीय मूल्य रुझान",
    buyersDirectory: "सत्यापित खरीदार एवं FPO",
    contactBuyer: "संपर्क करें",
    verifiedFPO: "सत्यापित समूह",
    listProduceForSale: "बिक्री हेतु फसल दर्ज करें",
    cropToSell: "बेचने वाली फसल",
    quantityAvailable: "उपलब्ध मात्रा",
    expectedPriceQuintal: "अपेक्षित मूल्य (₹/क्विंटल)",
    harvestDate: "कटाई / तैयार होने की तिथि",
    submitListing: "फसल लिस्टिंग जमा करें",
    listingSaved: "आपकी फसल लिस्टिंग सफलतापूर्वक सहेजी गई!",
    demoPriceNotice: "दिखाए गए मंडी भाव और खरीदार डेटा प्रदर्शन प्रारूप में हैं। वास्तविक सौदों के लिए दोनों पक्षों की पुष्टि आवश्यक है।",

    coldStorageTitle: "निकटतम कोल्ड स्टोरेज खोजें एवं बुक करें",
    coldStorageSubtitle: "मजबूरी में कम दाम पर न बेचें। अपनी उपज को सुरक्षित कोल्ड स्टोरेज में रखें।",
    searchByCropLocation: "फसल या जिले के आधार पर खोजें...",
    availableCapacity: "उपलब्ध क्षमता",
    chargesPerMonth: "मासिक शुल्क",
    bookStorageSpace: "भंडारण स्थान आरक्षित करें",
    durationMonths: "भंडारण अवधि (महीने)",
    quantityToStore: "मात्रा (क्विंटल)",
    confirmBooking: "बुकिंग की पुष्टि करें",
    bookingConfirmed: "अनुरोध सफलतापूर्वक सहेजा गया",

    logisticsTitle: "कृषि उपज परिवहन सेवा",
    logisticsSubtitle: "खेत से सीधे मंडी या गोदाम तक पहुंचाने के लिए वाहन बुक करें।",
    pickupPoint: "पिकअप गाँव / खेत",
    dropPoint: "गंतव्य मंडी / कोल्ड स्टोरेज",
    vehicleType: "वाहन का प्रकार",
    estimatedFare: "अनुमानित किराया",
    bookTransportVehicle: "परिवहन बुक करें",

    requestsTitle: "सहेजे गए अनुरोध एवं ऑफलाइन सिंक",
    allFilter: "सभी अनुरोध",
    statusDraft: "ड्राफ्ट",
    statusPendingSync: "सिंक लंबित",
    statusSyncing: "सर्वर पर भेजा जा रहा है...",
    statusSynced: "क्लाउड पर सुरक्षित",
    statusFailed: "विफल (पुनः प्रयास करें)",
    syncNow: "अभी सिंक करें",
    offlineModeNotice: "आप ऑफलाइन मोड में हैं। आपका डेटा फोन में सुरक्षित सहेज लिया गया है और इंटरनेट आने पर स्वतः सिंक होगा।",
    onlineModeNotice: "आप ऑनलाइन हैं। क्लाउड सर्वर से जुड़े हैं।",
    simulateOfflineToggle: "नेटवर्क स्थिति बदलें",

    // Common Buttons & Actions
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    dismiss: "खारिज करें",
    save: "सहेजें",
    saved: "सहेजा गया",
    edit: "संपादित करें",
    deleteBtn: "हटाएं",
    search: "खोजें",
    filter: "फ़िल्टर",
    close: "बंद करें",
    back: "वापस",
    submit: "जमा करें",
    clear: "साफ़ करें",
    details: "विवरण",
    status: "स्थिति",
    actions: "कार्रवाई",
    date: "दिनांक",
    phone: "फ़ोन नंबर",
    location: "स्थान",
    farmerName: "किसान का नाम",
    loading: "लोड हो रहा है...",

    // Header & Network
    networkOnline: "नेटवर्क ऑनलाइन",
    networkOffline: "ऑफलाइन मोड",
    switchToOnline: "ऑनलाइन में बदलें",
    simulateOffline: "ऑफलाइन अनुकरण करें",
    authorizedUser: "अधिकृत उपयोगकर्ता",
    safeSession: "सुरक्षित सत्र",
    switchActiveRole: "भूमिका व खाता बदलें",
    switchUserDemo: "खाता बदलें / डेमो खाते",

    // Navigation Consoles
    adminConsole: "व्यवस्थापक कंसोल",
    platformGovernance: "प्लेटफ़ॉर्म गवर्नेंस एवं मास्टर डेटा",
    adminManagement: "व्यवस्थापक प्रबंधन",
    systemArchitecture: "सिस्टम आर्किटेक्चर",
    systemArchitectureDesc: "आर्किटेक्चर, ऑफ़लाइन लचीलापन और डेटा फ्लो टेलीमेट्री।",
    serviceProviderHub: "सेवा प्रदाता केंद्र",
    coldStorageFleetOps: "कोल्ड स्टोरेज और परिवहन संचालन",
    operationsConsole: "संचालन कंसोल",
    buyerFpoConsole: "खरीदार / FPO कंसोल",
    directFarmProcurement: "प्रत्यक्ष कृषि उपज खरीद एवं बोली",
    farmerProduceLots: "किसान फसल लॉट",
    apmcMandiRates: "APMC मंडी भाव",
    apmcTraderConsole: "APMC व्यापारी कंसोल",
    liveMandiYardAuction: "लाइव मंडी यार्ड नीलामी और भाव",
    auctionFloorPrices: "नीलामी तल और भाव",

    // Farmer Dashboard Offers
    farmerWelcomeSub: "एकीकृत कृषि सलाह, लाइव एपीएमसी मंडियां, कोल्ड स्टोरेज और सत्यापित एफपीओ खरीदार।",
    aiOfflineDiagnosis: "AI ऑफ़लाइन रोग पहचान",
    directToVerifiedFPOs: "सत्यापित एफपीओ को सीधा विक्रय",
    organicChemicalDoses: "जैविक व रासायनिक खुराक",
    scanCropHealthAction: "फसल स्वास्थ्य स्कैन करें",
    estYield: "अनुमानित उपज",
    todayChange: "आज का बदलाव",
    offersReceivedHeading: "खरीदारों और एफपीओ से प्राप्त खरीद प्रस्ताव",
    offersReceivedSub: "अपनी सूचीबद्ध उपज पर खरीदारों द्वारा लगाए गए प्रस्तावों की समीक्षा करें। स्वीकार करके सीधा संपर्क बनाएं।",
    noOffersReceivedYet: "अभी तक कोई खरीद प्रस्ताव प्राप्त नहीं हुआ",
    noOffersReceivedDesc: "जब सत्यापित खरीदार आपकी फसल पर बोली लगाएंगे, तो वे विवरण और फोन नंबर के साथ यहां दिखाई देंगे।",
    totalOfferDeal: "कुल सौदा मूल्य",
    offeredQuantity: "प्रस्तावित मात्रा",
    offeredRate: "प्रस्तावित दर",
    yourAskingRate: "आपकी मांग दर",
    priceMatch: "मूल्य मिलान",
    meetsAsk: "मांग के अनुरूप",
    belowAsk: "मांग से कम",
    fromBuyer: "खरीदार",
    noteFromBuyer: "खरीदार का संदेश",
    callBuyer: "खरीदार को कॉल करें",
    acceptOffer: "प्रस्ताव स्वीकार करें",
    rejectOffer: "प्रस्ताव अस्वीकार करें",
    dealConfirmed: "सौदा पक्का हुआ",
    offerRejectedStatus: "प्रस्ताव अस्वीकृत",
    offerAcceptedMsg: "प्रस्ताव स्वीकृत! खरीदार की संपर्क जानकारी अनलॉक कर दी गई है।",
    offerRejectedMsg: "प्रस्ताव अस्वीकार कर दिया गया है।",
    pendingAction: "निर्णय प्रतीक्षित",

    // Buyer / FPO Dashboard & Purchase Offers
    fpoBuyerConsoleTag: "एफपीओ और संस्थागत खरीदार कंसोल",
    directFarmerProcurementTitle: "खेत से सीधी खरीद एवं बोली",
    directFarmerProcurementSub: "किसानों की फसल लिस्टिंग देखें, गुणवत्ता विनिर्देश जांचें और सीधे खरीद प्रस्ताव दें।",
    postProcurementDemand: "खरीद मांग दर्ज करें",
    browseFarmgateListings: "किसान उपज लॉट देखें",
    myPurchaseOffers: "मेरे खरीद प्रस्ताव",
    activeProcurementDemands: "सक्रिय खरीद मांगें",
    makePurchaseOffer: "खरीद प्रस्ताव दें",
    quantityRequired: "आवश्यक मात्रा (क्विंटल)",
    offerPricePerQuintal: "प्रस्तावित दर (₹/क्विंटल)",
    messageToFarmer: "किसान के लिए संदेश / शर्तें (वैकल्पिक)",
    submitOffer: "प्रस्ताव जमा करें",
    pending: "लंबित",
    accepted: "स्वीकृत",
    rejected: "अस्वीकृत",
    purchaseOfferSubmittedSuccess: "खरीद प्रस्ताव सफलतापूर्वक जमा किया गया।",
    validQuantityError: "कृपया 0 से अधिक वैध मात्रा दर्ज करें।",
    quantityExceedError: "मात्रा उपलब्ध लॉट आकार से अधिक नहीं हो सकती",
    validPriceError: "कृपया प्रति क्विंटल 0 से अधिक वैध मूल्य दर्ज करें।",
    estimatedTotalOfferValue: "अनुमानित कुल प्रस्ताव मूल्य",
    farmerAskingRate: "किसान की मांग दर",
    availableInLot: "लॉट में उपलब्ध",
    callFarmer: "किसान को कॉल करें",
    lotSpecifications: "लॉट विनिर्देश",
    askingPrice: "मांग मूल्य",
    moistureContent: "नमी की मात्रा",
    qualityGrade: "गुणवत्ता ग्रेड",
    perQuintal: "/ क्विंटल",
    availableLot: "लॉट में उपलब्ध",
    demandTitle: "मांग शीर्षक",
    demandCropLabel: "फसल",
    demandQtyLabel: "लक्ष्य मात्रा (क्विंटल)",
    postDemandBtn: "खरीद मांग प्रकाशित करें",
    target: "लक्ष्य",
    district: "जिला",
    broadcastedToFarmers: "450+ किसानों को प्रसारित किया गया",
    makePurchaseOfferModalDesc: "सीधे किसान को औपचारिक खरीद कोटेशन भेजें",

    // Trader Dashboard
    traderConsoleTitle: "APMC मंडी यार्ड और व्यापारी टर्मिनल",
    traderConsoleSub: "लाइव यार्ड नीलामी बोली, कमीशन एजेंट तल और दैनिक ई-नाम दर प्रसारण।",
    certifiedAPMCLicensed: "प्रमाणित एपीएमसी लाइसेंस प्राप्त व्यापारी",
    activeAuctionLots: "सक्रिय नीलामी लॉट",
    todaysArrivals: "आज की आवक",
    avgModalRate: "औसत मॉडल दर",
    activeTradersBidding: "सक्रिय व्यापारी",
    liveAuctionFloor: "लाइव मंडी नीलामी तल",
    mandiRateBroadcast: "दैनिक मंडी भाव प्रसारण",
    placeBid: "बोली लगाएं",
    currentHighestBid: "उच्चतम बोली",
    biddingEndsIn: "बोली समाप्त होने में समय",
    enterBidAmount: "बोली राशि दर्ज करें (₹/क्विंटल)",
    confirmBid: "बोली की पुष्टि करें",
    lotNumber: "लॉट #",
    broadcastModalTitle: "लाइव मंडी भाव प्रसारित करें",
    broadcastRateBtn: "भाव प्रकाशित करें",
    rateBroadcastSuccess: "मंडी भाव सभी जुड़े किसानों को सफलतापूर्वक प्रसारित किया गया!",
    bidPlacedSuccess: "लॉट पर बोली सफलतापूर्वक दर्ज की गई!",
    mandiAgentTerminalBadge: "मंडी कमीशन एजेंट एवं व्यापारी टर्मिनल",
    apmcYardBroadcast: "एपीएमसी यार्ड नीलामी एवं भाव प्रसारण",
    traderDashboardSub: "मंडी यार्ड नीलामी में भाग लें, सत्यापित बोलियां जमा करें, अंतिम मूल्य प्रसारित करें और किसानों की उपज को मिलों से जोड़ें।",
    dailyMandiBroadcastHeading: "किसानों और व्हाट्सएप समूहों को दैनिक मंडी भाव प्रसारण",
    gunturApmcYard: "गुंटूर एपीएमसी यार्ड",
    enterClosingPricePlaceholder: "अंतिम मॉडल मूल्य दर्ज करें",
    broadcastRateAction: "भाव प्रसारित करें",
    broadcastRateSuccessMessage: "तेनाली, प्रतीपाडु और गुंटूर मंडल के 2,400+ किसानों को भाव सफलतापूर्वक प्रसारित किए गए।",
    liveLotsOnAuctionFloor: "नीलामी फ़्लोर पर लाइव मंडी यार्ड लॉट",
    autoRefreshActive: "ऑटो-रिफ्रेश सक्रिय",
    openForBiddingStatus: "बोली लगाने हेतु खुला",
    finalCallStatus: "अंतिम अवसर",
    bagsLabel: "बोरियां",
    needDispatchTrucks: "जीते गए लॉट के लिए ट्रकों की आवश्यकता है?",
    arrangeTrucksDesc: "डिलीवरी मिलों तक सीधे 6-पहिया और 10-पहिया ट्रकों की व्यवस्था करें।",
    bookTrucksBtn: "ट्रक बुक करें",
    village: "गाँव",
    quintals: "क्विंटल",
    farmerLabel: "किसान",

    // Service Provider Dashboard
    serviceProviderTitle: "संचालन केंद्र (कोल्ड स्टोरेज एवं वाहन बेड़ा)",
    serviceProviderSubtitle: "कोल्ड स्टोर कक्ष भंडारण, आवक किसान बुकिंग और परिवहन वाहनों का प्रबंधन करें।",
    certifiedPartnerBadge: "प्रमाणित कृषि-बुनियादी ढांचा भागीदार",
    activeColdStores: "सक्रिय कोल्ड स्टोर",
    totalStorageCapacity: "कुल भंडारण क्षमता",
    fleetVehicles: "परिवहन वाहन",
    activeDriversOnTrip: "यात्रा पर चालक",
    coldStoreChambers: "कोल्ड स्टोरेज कक्ष और बुकिंग",
    farmgateLogisticsFleet: "कृषि परिवहन वाहन बेड़ा",
    updateStatus: "स्थिति अपडेट करें",
    assignVehicle: "वाहन सौंपें",
    statusUpdatedSuccess: "स्थिति सफलतापूर्वक अपडेट की गई।",

    // Cold Storage Booking
    farmgateDoorstepPickup: "खेत से पिकअप सुविधा शामिल",
    commodityCrop: "फसल / वस्तु",
    preferredDepositDate: "पसंदीदा जमा तिथि",
    transportNeededQuestion: "खेत से कोल्ड स्टोर तक वाहन चाहिए?",
    transportNeededDesc: "चयन करने पर आपके खेत से सीधे इस गोदाम तक पिकअप वाहन की व्यवस्था होगी।",
    estimatedStorageRent: "अनुमानित कुल भंडारण किराया",
    storageRentCalculationNote: "शुल्क गणना: (क्विंटल × मासिक किराया × महीने)। बिजली और बीमा शामिल।",
    specialNotesMoisture: "विशेष टिप्पणी / नमी की स्थिति",
    confirmSpaceReservation: "स्थान आरक्षित करें",
    myColdStorageBookings: "मेरी कोल्ड स्टोरेज बुकिंग",

    // Logistics Booking
    distanceKm: "अनुमानित दूरी (किमी)",
    commodityGoods: "परिवहन की जाने वाली फसल / वस्तुएं",
    totalLoadWeight: "कुल भार (क्विंटल)",
    includeLaborers: "लोडिंग/अनलोडिंग हेतु मजदूर शामिल करें?",
    laborersDesc: "प्रशिक्षित कृषि मजदूर खेत पर चढ़ाने और मंडी में उतारने के लिए वाहन के साथ आएंगे।",
    estimatedTripFare: "अनुमानित यात्रा किराया",
    fareCalculationNote: "मूल किराए में वाहन रवानगी, ईंधन और सामान्य टोल भत्ते शामिल हैं।",
    confirmVehicleBooking: "वाहन बुकिंग की पुष्टि करें",
    myTransportTrips: "मेरी परिवहन बुकिंग",
    driver: "चालक",

    // Disease Detection & Treatment
    provideLeafPhoto: "प्रभावित पत्ती की फोटो प्रदान करें",
    capturedLeafImage: "ली गई पत्ती की छवि",
    deviceCameraInspection: "लाइव निरीक्षण हेतु कैमरे का उपयोग करें",
    selectFromGallery: "गैलरी से पत्ती की फोटो चुनें",
    capturePhoto: "फोटो लें",
    scanAnotherLeaf: "दूसरी पत्ती स्कैन करें",
    savedToRecords: "रिकॉर्ड में सहेजा गया",
    allCrops: "सभी फसलें",
    pathogen: "रोगजनक",
    stopAudio: "ऑडियो रोकें",
    cropLabel: "फसल",
    causalAgent: "रोगजनक कारण",
    advisoryNotice: "कृषि सलाह सूचना",
    cameraError: "कैमरा उपलब्ध नहीं है। कृपया गैलरी या नमूना पत्तियों का उपयोग करें।",

    // Admin Dashboard & Architecture
    adminDashboardTitle: "प्लेटफ़ॉर्म प्रशासन एवं संचालन",
    adminDashboardSubtitle: "मंडी फ़ीड, उपयोगकर्ता सत्यापन, सिस्टम स्वास्थ्य और ऑफ़लाइन स्थिति की एकीकृत निगरानी।",
    registeredUsers: "पंजीकृत उपयोगकर्ता",
    pendingVerifications: "लंबित सत्यापन",
    syncQueue: "सिंक कतार",
    serverStatus: "सर्वर स्थिति",
    tabUserManagement: "उपयोगकर्ता प्रबंधन",
    tabVerifications: "सत्यापन अनुरोध",
    tabSystemHealth: "सिस्टम स्वास्थ्य एवं PWA",
    tabMasterData: "APMC मास्टर डेटा",
    verifyApprove: "सत्यापित एवं स्वीकृत करें",
    suspendUser: "निलंबित करें",
    viewDetails: "विवरण देखें",
    systemArchitectureTitle: "सिस्टम आर्किटेक्चर और ऑफ़लाइन लचीलापन",
    adminOpsConsoleBadge: "संचालन एवं व्यवस्थापक कंसोल",
    adminSystemGovTitle: "सिस्टम शासन, मास्टर डेटा एवं सत्यापन कतार",
    adminSystemGovSub: "संस्थागत केवाईसी सत्यापन कतारों की समीक्षा करें, कृषि मूल्य मास्टर सूचियां बनाएं, सिंक टेलीमेट्री की निगरानी करें।",
    tabVerificationsLabel: "सत्यापन कतार",
    tabMasterDataCatalog: "मास्टर डेटा कैटलॉग",
    tabSyncHealth: "सिंक टेलीमेट्री एवं कतारें",
    tabAuditLog: "सुरक्षा ऑडिट लॉग",
    pendingPartnerVerifications: "लंबित भागीदार सत्यापन अनुरोध",
    approveAndVerify: "स्वीकृत एवं सत्यापित करें",
    rejectAction: "अस्वीकार करें",
    processedByAdmin: "व्यवस्थापक द्वारा संसाधित",
    regIdLabel: "पंजीकरण संख्या",
    submittedLabel: "प्रस्तुत किया गया",
    statusApprovedLabel: "स्वीकृत",
    statusRejectedLabel: "अस्वीकृत",
    statusPendingLabel: "लंबित",
    publishMandiPriceMasterUpdate: "मंडी मूल्य मास्टर अपडेट प्रकाशित करें",
    cropNameLabel: "फसल का नाम",
    mandiYardLabel: "मंडी यार्ड",
    modalPricePerQ: "मॉडल मूल्य (₹/क्विंटल)",
    publishAction: "प्रकाशित करें",
    mandiBenchmarkPublished: "✓ नया मंडी बेंचमार्क मूल्य किसान डैशबोर्ड पर प्रकाशित कर दिया गया है।",
    cropPlaceholderExample: "उदा. टमाटर (हाइब्रिड लाल)",
    yardPlaceholderExample: "उदा. मदनपल्ले टमाटर मंडी",
    storageEngineTelemetry: "स्टोरेज इंजन टेलीमेट्री एवं वर्कर स्वास्थ्य",
    syncWorkerDaemon: "सिंक वर्कर डेमॉन",
    healthyActive: "स्वस्थ (सक्रिय)",
    clientPersistence: "IndexedDB / स्थानीय",
    telemetryErrorRate: "टेलीमेट्री त्रुटि दर",
    itemsLabel: "आइटम",
    auditTrailHeading: "सिस्टम संचालन ऑडिट ट्रेल",
    auditFpoApproval: "व्यवस्थापक ने एफपीओ लाइसेंस सत्यापन को मंजूरी दी",
    auditMandiBroadcast: "गुंटूर क्षेत्र में मंडी भाव प्रसारित किया गया",
    auditColdStorageConfirmed: "कोल्ड स्टोरेज आरक्षण की पुष्टि: श्री लक्ष्मी सीएस",
    auditOfflineSync: "ऑफ़लाइन कतार सिंक्रनाइज़ेशन पूर्ण (3 आइटम)",

    // Settings Modal
    settingsTitle: "सेटिंग्स और एप्लिकेशन प्राथमिकताएं",
    profileSettings: "प्रोफ़ाइल विवरण",
    networkSimulation: "नेटवर्क और लचीलापन परीक्षण",
    dataManagement: "स्थानीय डेटा प्रबंधन",
    resetAllDemoData: "सभी डेमो डेटा रीसेट करें",
    resetSuccess: "डेमो डेटा सफलतापूर्वक प्रारंभिक स्थिति में रीसेट हो गया।",
    registeredOn: "पंजीकरण तिथि",
    offlineStorageStatus: "ऑफलाइन भंडारण स्थिति",
    profileUpdatedSuccess: "प्रोफ़ाइल एवं कृषि प्राथमिकताएं सफलतापूर्वक अपडेट की गईं।",
    activeUserSession: "सक्रिय उपयोगकर्ता सत्र एवं भूमिका प्राधिकरण",
    authenticatedStatus: "प्रमाणित",
    signedInUser: "साइन इन उपयोगकर्ता",
    assignedRole: "सौंपी गई भूमिका",
    interfaceLanguage: "इंटरफ़ेस एवं ध्वनि मार्गदर्शन भाषा",
    userProfileLocation: "उपयोगकर्ता प्रोफ़ाइल एवं स्थान",
    saveProfileChanges: "प्रोफ़ाइल परिवर्तन सहेजें",
    applicationMaintenance: "एप्लिकेशन रखरखाव",
    rerunOnboardingTour: "किसान ऑनबोर्डिंग पुनः शुरू करें",
    clearLocalStorageReset: "लोकल स्टोरेज साफ़ करें एवं रीसेट करें",
    confirmClearStorage: "स्थानीय ड्राफ्ट साफ़ करें और ऐप रीस्टार्ट करें?",
    accountSession: "खाता सत्र",
    rbacEnforced: "RBAC लागू",
    clientSessionToken: "क्लाइंट सत्र टोकन",
    safeSessionNoPassword: "सुरक्षित सत्र (पासवर्ड सुरक्षित)",
    switchUserTestRole: "उपयोगकर्ता बदलें / अन्य भूमिका का परीक्षण करें",

    // Auth Modal & Access Denied
    loginTitle: "लॉगिन करें या खाता बदलें",
    loginSubtitle: "अपने फसल रिकॉर्ड, लिस्टिंग और मंडी सेवाओं तक पहुंचने के लिए साइन इन करें।",
    demoAccountsQuickLogin: "डेमो खाते (एक-क्लिक लॉगिन)",
    orLoginWithPhone: "या मोबाइल नंबर से लॉगिन करें",
    sendOtp: "ओटीपी भेजें",
    enterOtp: "4-अंकों का ओटीपी दर्ज करें",
    verifyLogin: "सत्यापित एवं लॉगिन करें",
    registrationSuccess: "सफलतापूर्वक साइन इन किया गया!",
    accessRestrictedTitle: "पहुंच प्रतिबंधित",
    accessRestrictedDesc: "इस कंसोल को देखने के लिए आपके पास आवश्यक अनुमतियां नहीं हैं। कृपया उचित भूमिका पर स्विच करें।",
    requiredRole: "आवश्यक भूमिका",
    yourCurrentRole: "आपकी वर्तमान भूमिका",
    returnToHome: "होम पर लौटें",
    switchUserAccount: "उपयोगकर्ता खाता बदलें",
    identityAndAccess: "पहचान एवं भूमिका आधारित अभिगम नियंत्रण",
    signInTitle: "रैतुसहाय में साइन इन करें",
    createAccountTitle: "नया खाता बनाएं",
    signInSub: "नीचे 1-क्लिक डेमो भूमिका चुनें या अपने पंजीकृत क्रेडेंशियल दर्ज करें।",
    signUpSub: "किसान, खरीदार, व्यापारी, सेवा प्रदाता या प्रशासक के रूप में पंजीकरण करें।",
    demoEnvNotice: "डेमो वातावरण: SHA-256 सॉल्टेड हैशिंग और सत्र टोकन के साथ सिम्युलेटेड प्रणाली। वास्तविक में यह एग्रीस्टैक एसएसओ और एसएमएस ओटीपी से जुड़ता है।",
    oneClickDemoLogin: "1-क्लिक डेमो लॉगिन (कोई भी भूमिका चुनें):",
    instantPreset: "त्वरित प्रवेश",
    signIn: "साइन इन करें",
    manualSignIn: "मैनुअल साइन इन",
    createNewAccount: "नया खाता बनाएं",
    mobileOrEmail: "मोबाइल नंबर या ईमेल आईडी",
    password: "पासवर्ड",
    enterPasswordPlaceholder: "पासवर्ड दर्ज करें (उदा. Farmer@123)",
    signInToAccount: "खाते में साइन इन करें",
    verifyingCredentials: "प्रमाणपत्र सत्यापित हो रहे हैं...",
    selectYourRole: "कृषि पारिस्थितिकी तंत्र में अपनी भूमिका चुनें:",
    fullName: "पूरा नाम",
    mobileNumberTen: "मोबाइल नंबर (10 अंक)",
    emailOptional: "ईमेल आईडी (वैकल्पिक)",
    companyFirmName: "कंपनी / संगठन / फर्म का नाम",
    landSizeAcres: "कृषि भूमि का आकार (एकड़)",
    passwordMinSix: "पासवर्ड (न्यूनतम 6 अक्षर)",
    confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
    createPasswordPlaceholder: "पासवर्ड बनाएं",
    confirmPasswordPlaceholder: "पासवर्ड की पुष्टि करें",
    completeRegistration: "पंजीकरण पूरा करें",
    creatingSecureProfile: "सुरक्षित प्रोफ़ाइल बनाई जा रही है...",
    enterMobileOrEmailError: "कृपया अपना मोबाइल नंबर या ईमेल आईडी दर्ज करें।",
    enterPasswordError: "कृपया अपना पासवर्ड दर्ज करें।",
    invalidCredentialsError: "अमान्य क्रेडेंशियल।",
    enterValidNameError: "कृपया अपना पूरा नाम (कम से कम 2 अक्षर) दर्ज करें।",
    enterValidPhoneError: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें।",
    passwordMinCharsError: "पासवर्ड में कम से कम 6 अक्षर होने चाहिए।",
    passwordsDoNotMatchError: "पासवर्ड मेल नहीं खाते। कृपया जांचें।",
    accountCreatedSuccess: "खाता सफलतापूर्वक बन गया! आपको लॉग इन किया जा रहा है...",
    demoLoginFailed: "डेमो लॉगिन विफल रहा",
    loginErrorOccurred: "लॉगिन त्रुटि हुई",
    roleFarmerLabel: "किसान",
    roleBuyerLabel: "खरीदार / एफपीओ",
    roleTraderLabel: "मंडी व्यापारी",
    roleServiceProviderLabel: "सेवा प्रदाता",
    roleAdminLabel: "प्रशासक",

    // Notifications
    markAllAsRead: "सभी को पढ़ा हुआ चिह्नित करें",
    notificationPolicyNotice: "अधिसूचना नीति",
    notificationPolicyDesc: "इस प्रोटोटाइप में सूचनाएं ऐप में दी जाती हैं। लाइव एसएमएस के लिए टेलीकॉम गेटवे आवश्यक है।"
  }
};
