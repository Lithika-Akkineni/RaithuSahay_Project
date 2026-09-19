import {
  CropInfo,
  DiseaseInfo,
  MandiPrice,
  BuyerFPO,
  ColdStorageFacility,
  LogisticsProvider,
  LogisticsVehicle,
  ArchitectureService,
  BackendInfrastructure,
  InAppNotification,
  WeatherSummary
} from '../types';

export const CROPS_CATALOG: CropInfo[] = [
  {
    id: 'chilli',
    name: 'Chilli (Mirchi)',
    nameTe: 'మిరప (మిర్చి)',
    nameHi: 'मिर्च',
    category: 'spice',
    icon: '🌶️',
    harvestSeason: 'Jan - Apr',
    standardYieldPerAcre: '25 - 35 Quintals'
  },
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    nameTe: 'వరి (వరి ధాన్యం)',
    nameHi: 'धान (चावल)',
    category: 'cereal',
    icon: '🌾',
    harvestSeason: 'Nov - Jan / Apr - May',
    standardYieldPerAcre: '28 - 38 Bags'
  },
  {
    id: 'cotton',
    name: 'Cotton (Patti)',
    nameTe: 'ప్రత్తి (పత్తి)',
    nameHi: 'कपास',
    category: 'commercial',
    icon: '🌱',
    harvestSeason: 'Oct - Feb',
    standardYieldPerAcre: '10 - 15 Quintals'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    nameTe: 'టమోటా',
    nameHi: 'टमाटर',
    category: 'vegetable',
    icon: '🍅',
    harvestSeason: 'All Seasons',
    standardYieldPerAcre: '150 - 200 Quintals'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    nameTe: 'మొక్కజొన్న',
    nameHi: 'मक्का',
    category: 'cereal',
    icon: '🌽',
    harvestSeason: 'Sep - Nov / Feb - Apr',
    standardYieldPerAcre: '25 - 32 Quintals'
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    nameTe: 'వేరుశనగ',
    nameHi: 'मूंगफली',
    category: 'commercial',
    icon: '🥜',
    harvestSeason: 'Oct - Dec',
    standardYieldPerAcre: '12 - 18 Quintals'
  }
];

export const SAMPLE_DISEASES: DiseaseInfo[] = [
  {
    id: 'chilli_curl',
    cropId: 'chilli',
    cropName: 'Chilli',
    diseaseName: 'Chilli Leaf Curl Virus (Begomovirus)',
    diseaseNameTe: 'మిరపలో ఆకు ముడత వైరస్ (జెమినీ వైరస్)',
    diseaseNameHi: 'मिर्च का पर्ण कुंचन वायरस (पत्ती मुड़ना)',
    causalOrganism: 'Begomovirus transmitted by Whiteflies (Bemisia tabaci)',
    severity: 'high',
    confidence: 89,
    sampleImageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Upward curling and puckering of leaves',
      'Thickening of leaf veins with stunted plant growth',
      'Shortened internodes giving a bushy appearance',
      'Severe flower drop and deformed small fruits'
    ],
    symptomsTe: [
      'ఆకులు పైకి లేదా క్రిందికి ముడుచుకుపోవడం',
      'ఆకు ఈనెలు మందంగా మారి మొక్క ఎదుగుదల ఆగిపోవడం',
      'కణుపుల మధ్య దూరం తగ్గి మొక్క గిడసబారిపోవడం',
      'పూత రాలిపోవడం మరియు కాయలు వంకరగా చిన్నవిగా మారడం'
    ],
    symptomsHi: [
      'पत्तियों का ऊपर या नीचे की ओर मुड़ना',
      'पत्तियों की नसों का मोटा होना और पौधे का बौना रह जाना',
      'फूलों का झड़ना और फल छोटे व विकृत बनना'
    ],
    organicTreatment: [
      'Install yellow sticky traps (15-20 traps per acre) to trap whitefly vectors',
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 10,000 ppm @ 2-3 ml per litre of water',
      'Foliar spray of Sour Buttermilk (Majjiga) mixed with Asafoetida (Inguva) once every 10 days'
    ],
    chemicalTreatment: [
      'Spray Diafenthiuron 50% WP @ 1.25 g/litre or Acetamiprid 20% SP @ 0.2 g/litre during early whitefly nymph stage',
      'If severe vector infestation, apply Cyantraniliprole 10.26% OD @ 1.2 ml/litre with sticker/spreader',
      'Ensure spraying on both upper and lower leaf surfaces during morning hours (7 AM - 10 AM)'
    ],
    prevention: [
      'Use certified disease-resistant hybrid seedlings (e.g., Teja, Indam 5)',
      'Plant 3 rows of Maize or Jowar as a border crop around the chilli plot as a vector barrier',
      'Rogue out and burn heavily infected plants immediately to stop spread'
    ],
    nextSteps: [
      'Inspect field immediately for whitefly clouds by gently shaking plants',
      'Set up sticky traps within 24 hours',
      'Apply bio-agent spray in early morning before vector winds intensify'
    ]
  },
  {
    id: 'rice_blast',
    cropId: 'rice',
    cropName: 'Rice (Paddy)',
    diseaseName: 'Rice Blast (Pyricularia oryzae)',
    diseaseNameTe: 'వరిలో అగ్గి తెగులు (బ్లాస్ట్)',
    diseaseNameHi: 'धान का झोंका रोग (राइस ब्लास्ट)',
    causalOrganism: 'Magnaporthe oryzae (Fungus)',
    severity: 'critical',
    confidence: 93,
    sampleImageUrl: 'https://images.unsplash.com/photo-1536704689578-8ede404670e6?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Spindle-shaped or eye-shaped lesions with ash-grey centers and brownish borders on leaves',
      'Neck rot causing the entire panicle to fall over and turn white (Neck Blast)',
      'Nodes turning black and snapping easily during strong winds'
    ],
    symptomsTe: [
      'ఆకులపై కంటి లేదా కండె ఆకారపు బూడిద రంగు మచ్చలు, చుట్టూ గోధుమ రంగు అంచులు',
      'మెడ విరుపు (నెక్ బ్లాస్ట్) వల్ల వెన్ను విరిగిపోవడం మరియు తాలు గింజలు ఏర్పడటం',
      'వరి కణుపులు నల్లగా మారి విరిగిపోవడం'
    ],
    symptomsHi: [
      'पत्तियों पर आंख के आकार के धब्बे, जिनका केंद्र राख के रंग का और किनारे भूरे होते हैं',
      'बाली की गर्दन पर कालापन और बालियों का सफेद होकर सूख जाना'
    ],
    organicTreatment: [
      'Seed treatment with Pseudomonas fluorescens @ 10 g per kg seed before sowing',
      'Foliar spray of Panchagavya 3% or Cow urine (Gomutra) 10% solution',
      'Avoid excess nitrogenous fertilizers (Urea); apply in 3-4 split doses with organic compost'
    ],
    chemicalTreatment: [
      'Spray Tricyclazole 75% WP @ 0.6 g/litre of water at initial symptom appearance',
      'Or spray Isoprothiolane 40% EC @ 1.5 ml/litre or Kasugamycin 3% SL @ 2.5 ml/litre',
      'Repeat spray after 10-12 days if humid and foggy weather continues'
    ],
    prevention: [
      'Avoid delayed transplanting and keep spacing of 15x15 cm for proper air circulation',
      'Maintain adequate water level (2-3 inches) in the field; do not let soil crack dry during panicle stage'
    ],
    nextSteps: [
      'Immediately stop excess Urea application until infection halts',
      'Schedule fungicide spray targeting panicle base in evening hours'
    ]
  },
  {
    id: 'cotton_bollworm',
    cropId: 'cotton',
    cropName: 'Cotton',
    diseaseName: 'Pink Bollworm (Pectinophora gossypiella)',
    diseaseNameTe: 'ప్రత్తిలో గులాబీ రంగు కాయ తొలుచు పురుగు',
    diseaseNameHi: 'कपास की गुलाबी सुंडी (पिंक बॉलवर्म)',
    causalOrganism: 'Lepidoptera insect pest larva',
    severity: 'high',
    confidence: 86,
    sampleImageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Rosetted flowers (petals twisted into rosette form and not opening)',
      'Small holes bored into green bolls with frass (excreta) visible outside',
      'Premature boll opening and discoloured, stained lint'
    ],
    symptomsTe: [
      'పువ్వులు విచ్చుకోకుండా గులాబీ పువ్వులా ముడుచుకుపోవడం (రొసెట్ పూలు)',
      'పచ్చి కాయలకు చిన్న రంధ్రాలు చేసి లోపలికి చొరబడటం',
      'కాయలు సమయానికి ముందే పగలడం మరియు పత్తి దూది రంగు మారడం'
    ],
    symptomsHi: [
      'फूलों का गुलाब की कली की तरह बंद रहना',
      'हरे टिंडों में छेद होना और रुई की गुणवत्ता खराब होना'
    ],
    organicTreatment: [
      'Install Pheromone traps with Gossyplure @ 8-10 traps per acre to monitor moth activity',
      'Release Trichogramma bactrae egg parasitoid @ 60,000 per acre at 10-day intervals',
      'Spray Beauveria bassiana bio-pesticide @ 5 g per litre'
    ],
    chemicalTreatment: [
      'If ETL exceeds 8 moths/trap for 3 consecutive days, spray Chlorantraniliprole 18.5% SC @ 0.3 ml/litre',
      'Or Emamectin Benzoate 5% SG @ 0.5 g/litre of water',
      'Alternate chemical modes of action to prevent pesticide resistance'
    ],
    prevention: [
      'Avoid continuous cotton monoculture; practice crop rotation with pulses or sorghum',
      'Destroy crop residue and cotton stalks immediately after final harvest'
    ],
    nextSteps: [
      'Count trapped moths in morning to check Economic Threshold Level (ETL)',
      'Handpick and destroy rosetted flowers and dropped bolls'
    ]
  },
  {
    id: 'tomato_blight',
    cropId: 'tomato',
    cropName: 'Tomato',
    diseaseName: 'Tomato Early Blight (Alternaria solani)',
    diseaseNameTe: 'టమోటాలో ముందస్తు ఆకు ఎండు తెగులు (ఆల్టర్నేరియా)',
    diseaseNameHi: 'टमाटर का अगेती झुलसा रोग (अर्ली ब्लाइट)',
    causalOrganism: 'Alternaria solani (Fungus)',
    severity: 'moderate',
    confidence: 91,
    sampleImageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
    symptoms: [
      'Concentric dark rings resembling a target board on older lower leaves',
      'Yellow chlorotic halos surrounding brown spots',
      'Stem cankers and dark sunken leathery spots on fruit near calyx'
    ],
    symptomsTe: [
      'క్రింది ముదురు ఆకులపై వలయాకార (టార్గెట్ బోర్డు) గోధుమ రంగు మచ్చలు',
      'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం',
      'కాయల తొడిమల వద్ద నల్లటి సొట్టబడిన మచ్చలు'
    ],
    symptomsHi: [
      'निचली पत्तियों पर संकेंद्रित छल्लों (टारगेट बोर्ड) जैसे भूरे धब्बे',
      'पत्तियों का पीला पड़ना और फलों के डंठल के पास सड़न'
    ],
    organicTreatment: [
      'Trichoderma harzianum soil and foliar spray @ 5 g/litre',
      'Spray Baking Soda (Sodium bicarbonate) 5g + 2ml liquid soap per litre for pH disruption',
      'Mulch soil with dry straw to prevent fungal soil spores splashing onto lower foliage'
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2.5 g/litre or Chlorothalonil 75% WP @ 2 g/litre at first appearance',
      'For severe conditions, apply Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/litre',
      'Maintain 7-10 day interval between treatments'
    ],
    prevention: [
      'Stake tomato plants to keep leaves off damp soil',
      'Use drip irrigation instead of overhead sprinklers to keep foliage dry'
    ],
    nextSteps: [
      'Prune and safely discard all infected lower leaves from base of plant',
      'Apply protective copper fungicide barrier before next predicted rainfall'
    ]
  }
];

export const MANDI_PRICES: MandiPrice[] = [
  {
    id: 'm1',
    crop: 'Chilli (Teja Variety)',
    variety: 'Teja S17 Deluxe',
    mandi: 'Guntur Agricultural Market Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 18200,
    modalPrice: 21500,
    maxPrice: 24800,
    unit: '₹ / Quintal',
    dailyChangePercent: 3.2,
    arrivalsToday: '42,500 Quintals',
    lastUpdated: 'Today, 11:30 AM',
    historicalTrend: [
      { date: '14 Sep', price: 19800 },
      { date: '15 Sep', price: 20100 },
      { date: '16 Sep', price: 20500 },
      { date: '17 Sep', price: 20900 },
      { date: '18 Sep', price: 21200 },
      { date: '19 Sep', price: 21500 }
    ]
  },
  {
    id: 'm2',
    crop: 'Rice (BPT 5204 Samba Masuri)',
    variety: 'Grade-A Fine',
    mandi: 'Miryalguda Grain Market',
    district: 'Nalgonda',
    state: 'Telangana',
    minPrice: 2450,
    modalPrice: 2850,
    maxPrice: 3100,
    unit: '₹ / Quintal',
    dailyChangePercent: 1.1,
    arrivalsToday: '18,200 Quintals',
    lastUpdated: 'Today, 10:45 AM',
    historicalTrend: [
      { date: '14 Sep', price: 2750 },
      { date: '15 Sep', price: 2780 },
      { date: '16 Sep', price: 2800 },
      { date: '17 Sep', price: 2820 },
      { date: '18 Sep', price: 2840 },
      { date: '19 Sep', price: 2850 }
    ]
  },
  {
    id: 'm3',
    crop: 'Cotton (Bunny/Bt)',
    variety: 'Medium Staple 28mm',
    mandi: 'Warangal Cotton Market Yard',
    district: 'Warangal',
    state: 'Telangana',
    minPrice: 6900,
    modalPrice: 7450,
    maxPrice: 7900,
    unit: '₹ / Quintal',
    dailyChangePercent: -0.8,
    arrivalsToday: '12,400 Quintals',
    lastUpdated: 'Today, 01:15 PM',
    historicalTrend: [
      { date: '14 Sep', price: 7600 },
      { date: '15 Sep', price: 7550 },
      { date: '16 Sep', price: 7500 },
      { date: '17 Sep', price: 7480 },
      { date: '18 Sep', price: 7450 },
      { date: '19 Sep', price: 7450 }
    ]
  },
  {
    id: 'm4',
    crop: 'Tomato (Hybrid)',
    variety: 'Saaho / Shivam',
    mandi: 'Madanapalle Tomato Yard',
    district: 'Chittoor',
    state: 'Andhra Pradesh',
    minPrice: 1400,
    modalPrice: 1850,
    maxPrice: 2300,
    unit: '₹ / Quintal',
    dailyChangePercent: 4.8,
    arrivalsToday: '9,800 Crates',
    lastUpdated: 'Today, 09:15 AM',
    historicalTrend: [
      { date: '14 Sep', price: 1550 },
      { date: '15 Sep', price: 1600 },
      { date: '16 Sep', price: 1720 },
      { date: '17 Sep', price: 1780 },
      { date: '18 Sep', price: 1800 },
      { date: '19 Sep', price: 1850 }
    ]
  },
  {
    id: 'm5',
    crop: 'Maize (Yellow Corn)',
    variety: 'Industrial Feed Grade',
    mandi: 'Khammam APMC Yard',
    district: 'Khammam',
    state: 'Telangana',
    minPrice: 2150,
    modalPrice: 2320,
    maxPrice: 2480,
    unit: '₹ / Quintal',
    dailyChangePercent: 0.5,
    arrivalsToday: '7,300 Quintals',
    lastUpdated: 'Today, 12:00 PM',
    historicalTrend: [
      { date: '14 Sep', price: 2280 },
      { date: '15 Sep', price: 2290 },
      { date: '16 Sep', price: 2300 },
      { date: '17 Sep', price: 2310 },
      { date: '18 Sep', price: 2315 },
      { date: '19 Sep', price: 2320 }
    ]
  }
];

export const BUYERS_DIRECTORY: BuyerFPO[] = [
  {
    id: 'b1',
    name: 'Guntur Chilli Producers FPO Collective',
    type: 'FPO',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    contactPerson: 'K. Sambasiva Rao (Managing Director)',
    phone: '+91 94401 23890',
    whatsapp: '+91 94401 23890',
    procuringCrops: ['Chilli', 'Turmeric', 'Cotton'],
    minimumQuantity: '10 Quintals',
    paymentTerms: 'Direct NEFT/RTGS within 24 hours of weighment',
    rating: 4.8,
    verified: true,
    address: 'Near Old Mirchi Yard, Guntur Rural, AP'
  },
  {
    id: 'b2',
    name: 'Godavari Bio-Organic Agri FPO',
    type: 'FPO',
    district: 'Krishna',
    state: 'Andhra Pradesh',
    contactPerson: 'Smt. Lakshmi Prasanna',
    phone: '+91 98480 54123',
    whatsapp: '+91 98480 54123',
    procuringCrops: ['Rice', 'Black Gram', 'Turmeric'],
    minimumQuantity: '15 Bags',
    paymentTerms: 'e-NAM Instant Settlement / Rythu Bank Transfer',
    rating: 4.9,
    verified: true,
    address: 'Main Road, Gudivada, Krishna District, AP'
  },
  {
    id: 'b3',
    name: 'DeHaat Agro Procurement Hub',
    type: 'Institutional Buyer',
    district: 'Warangal',
    state: 'Telangana',
    contactPerson: 'Rajesh Kumar (Field Officer)',
    phone: '+91 99590 87654',
    whatsapp: '+91 99590 87654',
    procuringCrops: ['Cotton', 'Maize', 'Chilli', 'Paddy'],
    minimumQuantity: '20 Quintals',
    paymentTerms: 'Direct DBT to Kisan Account in 48 hrs',
    rating: 4.7,
    verified: true,
    address: 'Enkoor Crossroads, Warangal Agri Industrial Zone'
  },
  {
    id: 'b4',
    name: 'ITC Agri Business Division (e-Choupal)',
    type: 'Processor',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    contactPerson: 'Venkata Ramana (Procurement Lead)',
    phone: '+91 91212 34567',
    whatsapp: '+91 91212 34567',
    procuringCrops: ['Chilli (Stemless & Stemmed)', 'Maize'],
    minimumQuantity: '50 Quintals',
    paymentTerms: 'Institutional Bank Draft with Grade Premium',
    rating: 4.9,
    verified: true,
    address: 'NH-16 By-pass Road, Guntur, AP'
  },
  {
    id: 'b5',
    name: 'Kurnool Farmers Seed & Grain Society',
    type: 'FPO',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    contactPerson: 'N. Raghavendra Reddy',
    phone: '+91 94411 98712',
    whatsapp: '+91 94411 98712',
    procuringCrops: ['Groundnut', 'Bengal Gram', 'Cotton'],
    minimumQuantity: '10 Quintals',
    paymentTerms: 'Immediate Weighment Cash / UPI slip',
    rating: 4.6,
    verified: true,
    address: 'APMC Market Yard Gate 2, Kurnool, AP'
  }
];

export const COLD_STORAGES: ColdStorageFacility[] = [
  {
    id: 'cs1',
    name: 'Sri Venkateswara Mega Cold Storage',
    district: 'Guntur',
    location: 'Perecherla Road, Guntur (12 km from city center)',
    supportedProduce: ['Chilli (Dry)', 'Turmeric', 'Spices', 'Grains'],
    totalCapacityMT: 12000,
    availableCapacityMT: 3400,
    temperatureRange: '4°C to 10°C (Controlled Humidity)',
    humidityControl: true,
    monthlyChargePerQuintal: 45,
    insuranceCovered: true,
    contactNumber: '+91 863 2234567',
    distanceKm: 8,
    rating: 4.8
  },
  {
    id: 'cs2',
    name: 'Kisan Mitra Agro Cold Hub',
    district: 'Warangal',
    location: 'Enumamula Market By-pass, Warangal',
    supportedProduce: ['Chilli', 'Cotton Bales', 'Turmeric', 'Maize'],
    totalCapacityMT: 8500,
    availableCapacityMT: 1800,
    temperatureRange: '2°C to 8°C',
    humidityControl: true,
    monthlyChargePerQuintal: 42,
    insuranceCovered: true,
    contactNumber: '+91 870 2456789',
    distanceKm: 14,
    rating: 4.7
  },
  {
    id: 'cs3',
    name: 'Rythu Seva Multi-Chamber Cold Store',
    district: 'Kurnool',
    location: 'Nandyal Highway, Kurnool District',
    supportedProduce: ['Onion', 'Tomato', 'Fruits', 'Groundnut Seeds'],
    totalCapacityMT: 6000,
    availableCapacityMT: 2200,
    temperatureRange: '0°C to 4°C (For Fresh Veg & Onion)',
    humidityControl: true,
    monthlyChargePerQuintal: 50,
    insuranceCovered: true,
    contactNumber: '+91 8518 278901',
    distanceKm: 19,
    rating: 4.6
  },
  {
    id: 'cs4',
    name: 'Krishna Delta Agri Preservation Facility',
    district: 'Krishna',
    location: 'Vuyyuru Road, Vijayawada Rural',
    supportedProduce: ['Mango (Pre-cooling)', 'Vegetables', 'Paddy Seeds'],
    totalCapacityMT: 5000,
    availableCapacityMT: 950,
    temperatureRange: '8°C to 14°C (Fruit Friendly)',
    humidityControl: true,
    monthlyChargePerQuintal: 48,
    insuranceCovered: true,
    contactNumber: '+91 866 2890123',
    distanceKm: 22,
    rating: 4.7
  }
];

export const LOGISTICS_PROVIDERS: LogisticsProvider[] = [
  {
    id: 'lp1',
    name: 'Raithu Ratham Farm Transport (Bolero Maxi)',
    vehicleType: 'Pickup (1.5T)',
    capacityTons: 1.5,
    baseFare: 450,
    ratePerKm: 22,
    phone: '+91 97012 34567',
    currentLocation: 'Guntur Rural Stand',
    availableToday: true,
    rating: 4.9
  },
  {
    id: 'lp2',
    name: 'Kisan Speed Logistics (Eicher Pro 2049)',
    vehicleType: 'Eicher Mini-Truck (4T)',
    capacityTons: 4.0,
    baseFare: 900,
    ratePerKm: 34,
    phone: '+91 98491 23456',
    currentLocation: 'Warangal Enumamula Depot',
    availableToday: true,
    rating: 4.8
  },
  {
    id: 'lp3',
    name: 'Jai Kisan Heavy Agro Carriers (10 Wheeler)',
    vehicleType: 'Heavy Truck (10T)',
    capacityTons: 10.0,
    baseFare: 2200,
    ratePerKm: 55,
    phone: '+91 94402 78901',
    currentLocation: 'Vijayawada Transport Hub',
    availableToday: true,
    rating: 4.7
  },
  {
    id: 'lp4',
    name: 'Village Tractor Trolley Service (Local)',
    vehicleType: 'Tractor Trolley (3T)',
    capacityTons: 3.0,
    baseFare: 350,
    ratePerKm: 18,
    phone: '+91 99890 12345',
    currentLocation: 'Within 15km of Mandal',
    availableToday: true,
    rating: 4.6
  }
];

export const SAMPLE_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif_1',
    title: 'Thunderstorm Advisory - Guntur District',
    titleTe: 'ఉరుములతో కూడిన వర్ష హెచ్చరిక - గుంటూరు జిల్లా',
    titleHi: 'गरज के साथ बारिश की चेतावनी - गुंटूर जिला',
    message: 'IMD predicts unseasonal evening showers with 35kmph winds. Please cover dried red chillies in open yards with tarpaulin.',
    messageTe: 'సాయంత్రం వేళ అకాల వర్షం కురిసే అవకాశం ఉంది. కళ్లాలలో ఆరబెట్టిన ఎర్ర మిరపకాయలను టార్పాలిన్లతో కప్పి ఉంచండి.',
    messageHi: 'शाम को बेमौसम बारिश की संभावना है। खलिहान में सूखने रखी मिर्च को तिरपाल से ढक लें।',
    category: 'weather',
    priority: 'high',
    timestamp: '15 mins ago',
    read: false,
    actionScreen: 'notifications'
  },
  {
    id: 'notif_2',
    title: 'Fertilizer Top-Dressing Reminder',
    titleTe: 'ఎరువుల రెండో విడత వేసే సమయం',
    titleHi: 'दूसरी खाद की खुराक का समय',
    message: 'Your Paddy crop (BPT 5204) is at Day 35. Apply second dose of Nitrogen (25kg Urea + 10kg Potash per acre) with standing water.',
    messageTe: 'మీ వరి పంట 35వ రోజుకు చేరింది. ఎకరాకు 25 కేజీల యూరియా మరియు 10 కేజీల పొటాష్ రెండవ దఫాగా వేయండి.',
    messageHi: 'आपकी धान की फसल 35 दिन की हो गई है। प्रति एकड़ 25 किग्रा यूरिया और 10 किग्रा पोटाश की दूसरी खुराक दें।',
    category: 'crop_care',
    priority: 'medium',
    timestamp: '2 hours ago',
    read: false,
    actionScreen: 'myCrops'
  },
  {
    id: 'notif_3',
    title: 'Guntur Mandi Teja Chilli Spike (+₹800/Q)',
    titleTe: 'గుంటూరు మార్కెట్‌లో తేజ మిర్చి ధర పెరుగుదల (+₹800/క్వింటా)',
    titleHi: 'गुंटूर मंडी में तेजा मिर्च भाव में उछाल (+₹800/क्विंटल)',
    message: 'Modal price for deluxe dry chilli reached ₹21,500/Quintal due to strong export demand to Bangladesh & China.',
    messageTe: 'ఎగుమతి డిమాండ్ పెరగడంతో గుంటూరు మార్కెట్లో డీలక్స్ తేజ మిర్చి సగటు ధర ₹21,500 కు చేరింది.',
    messageHi: 'निर्यात मांग बढ़ने से गुंटूर मंडी में तेजा मिर्च का भाव ₹21,500/क्विंटल तक पहुंच गया है।',
    category: 'market',
    priority: 'medium',
    timestamp: 'Today, 9:30 AM',
    read: true,
    actionScreen: 'marketPrices'
  }
];

export const INITIAL_WEATHER: WeatherSummary = {
  location: 'Guntur Rural / Vijayawada Belt',
  temperatureC: 31,
  condition: 'Partly Cloudy with Humid Breeze',
  humidity: 78,
  rainForecast: '25% chance of light showers in late afternoon',
  advisory: 'Optimal weather for bio-pesticide spray between 7 AM and 10 AM. Secure harvested drying crops.',
  advisoryTe: 'ఉదయం 7 నుండి 10 గంటల మధ్య మందు పిచికారీ చేయడానికి అనుకూలం. ఆరబోసిన పంటలను భద్రపరచండి.',
  advisoryHi: 'सुबह 7 से 10 बजे के बीच छिड़काव के लिए अनुकूल समय। कटी हुई फसल को सुरक्षित स्थान पर रखें।'
};

export const COLD_STORAGE_FACILITIES: ColdStorageFacility[] = [
  {
    id: 'cs1',
    name: 'Sri Venkateswara Mega Cold Storage',
    district: 'Guntur',
    location: 'Perecherla Road, Guntur (12 km from city center)',
    suitableCrops: ['Chilli (Dry)', 'Turmeric', 'Spices', 'Grains'],
    totalCapacityMT: 12000,
    availableCapacityMT: 3400,
    tempRange: '4°C to 10°C (Controlled Humidity)',
    humidityControl: true,
    pricePerBagPerMonth: 45,
    hasInsurance: true,
    subsidyEligible: true,
    chambers: 6,
    phone: '+91 863 2234567',
    distanceKm: 8,
    rating: 4.8
  },
  {
    id: 'cs2',
    name: 'Kisan Mitra Agro Cold Hub',
    district: 'Warangal',
    location: 'Enumamula Market By-pass, Warangal',
    suitableCrops: ['Chilli', 'Cotton Bales', 'Turmeric', 'Maize'],
    totalCapacityMT: 8500,
    availableCapacityMT: 1800,
    tempRange: '2°C to 8°C',
    humidityControl: true,
    pricePerBagPerMonth: 42,
    hasInsurance: true,
    subsidyEligible: true,
    chambers: 4,
    phone: '+91 870 2456789',
    distanceKm: 14,
    rating: 4.7
  },
  {
    id: 'cs3',
    name: 'Rythu Seva Multi-Chamber Cold Store',
    district: 'Kurnool',
    location: 'Nandyal Highway, Kurnool District',
    suitableCrops: ['Onion', 'Tomato', 'Fruits', 'Groundnut Seeds'],
    totalCapacityMT: 6000,
    availableCapacityMT: 2200,
    tempRange: '0°C to 4°C (For Fresh Veg & Onion)',
    humidityControl: true,
    pricePerBagPerMonth: 50,
    hasInsurance: true,
    subsidyEligible: false,
    chambers: 3,
    phone: '+91 8518 278901',
    distanceKm: 19,
    rating: 4.6
  },
  {
    id: 'cs4',
    name: 'Krishna Delta Agri Preservation Facility',
    district: 'Krishna',
    location: 'Vuyyuru Road, Vijayawada Rural',
    suitableCrops: ['Mango (Pre-cooling)', 'Vegetables', 'Paddy Seeds'],
    totalCapacityMT: 5000,
    availableCapacityMT: 950,
    tempRange: '8°C to 14°C (Fruit Friendly)',
    humidityControl: true,
    pricePerBagPerMonth: 48,
    hasInsurance: true,
    subsidyEligible: true,
    chambers: 4,
    phone: '+91 866 2890123',
    distanceKm: 22,
    rating: 4.7
  }
];

export const LOGISTICS_VEHICLES: LogisticsVehicle[] = [
  {
    id: 'lp1',
    driverName: 'Suresh Naidu',
    driverPhone: '+91 97012 34567',
    vehicleType: 'Mahindra Bolero Pickup (1.5 MT)',
    capacityMT: 1.5,
    basePrice: 450,
    pricePerKm: 22,
    currentLocation: 'Guntur Rural Stand (5 km away)',
    rating: 4.9,
    tripsCompleted: 142,
    availableToday: true
  },
  {
    id: 'lp2',
    driverName: 'Ramu Yadav',
    driverPhone: '+91 98491 23456',
    vehicleType: 'Eicher Pro 2049 Mini-Truck (4 MT)',
    capacityMT: 4.0,
    basePrice: 900,
    pricePerKm: 34,
    currentLocation: 'Warangal Enumamula Depot (8 km away)',
    rating: 4.8,
    tripsCompleted: 88,
    availableToday: true
  },
  {
    id: 'lp3',
    driverName: 'Mallikarjuna Rao',
    driverPhone: '+91 94402 78901',
    vehicleType: 'Tata 1613 Heavy Truck (10 MT)',
    capacityMT: 10.0,
    basePrice: 2200,
    pricePerKm: 55,
    currentLocation: 'Vijayawada Transport Hub (15 km away)',
    rating: 4.7,
    tripsCompleted: 310,
    availableToday: true
  },
  {
    id: 'lp4',
    driverName: 'Koteswara Rao',
    driverPhone: '+91 99890 12345',
    vehicleType: 'Village Tractor Trolley (3 MT)',
    capacityMT: 3.0,
    basePrice: 350,
    pricePerKm: 18,
    currentLocation: 'Within 10km of Mandal Center',
    rating: 4.6,
    tripsCompleted: 65,
    availableToday: true
  }
];

export const ARCHITECTURE_SERVICES: ArchitectureService[] = [
  {
    serviceName: 'User & Farmer Identity Service',
    description: 'Manages multi-lingual profiles, landholding records, phone OTP auth, and role-based permissions.',
    keyEntities: ['UserProfile', 'FarmerRecord', 'RoleAuthToken', 'LanguagePreference'],
    status: 'Implemented in Client / Node.js Bridge'
  },
  {
    serviceName: 'Crop & Agronomy Service',
    description: 'Caters crop master data, harvest cycles, package of practices, and weather-driven advisory.',
    keyEntities: ['CropMaster', 'HarvestCalendar', 'FertilizerDoseSchedule'],
    status: 'Implemented in Client Core'
  },
  {
    serviceName: 'Disease Detection & AI Inference Service',
    description: 'Multimodal image analysis pipeline with pre-processing, confidence scoring, organic/chemical treatment, and audio guidance.',
    keyEntities: ['DiagnosisRecord', 'TreatmentGuide', 'PathogenCatalog'],
    status: 'Client AI Simulator with Gemini 2.5 API Bridge Ready'
  },
  {
    serviceName: 'Market & Price Discovery Service',
    description: 'Aggregates APMC mandi rates, daily arrivals, historical modal trends, and direct buyer/FPO matching.',
    keyEntities: ['MandiPrice', 'ProduceListing', 'BuyerProfile', 'OfferNegotiation'],
    status: 'Simulated Agmarknet / e-NAM Feeds'
  },
  {
    serviceName: 'Cold Storage Service',
    description: 'Discovery of temperature-controlled storage, chamber capacity reservations, humidity guarantees, and intake tracking.',
    keyEntities: ['ColdStorageFacility', 'StorageReservation', 'WarehouseReceipt'],
    status: 'Local + Outbox Persistence Engine'
  },
  {
    serviceName: 'Logistics & Transport Service',
    description: 'Farmgate-to-market dispatch matching, distance-based fare estimation, driver assignment, and trip booking.',
    keyEntities: ['LogisticsVehicle', 'TripBooking', 'Waybill'],
    status: 'Local + Outbox Persistence Engine'
  },
  {
    serviceName: 'Notification & Advisory Service',
    description: 'In-app storm and pest alerts, crop growth milestones, and transactional notifications.',
    keyEntities: ['InAppNotification', 'PushAlert', 'AdvisoryFeed'],
    status: 'In-App Active (SMS Carrier simulated with transparent disclaimer)'
  },
  {
    serviceName: 'Offline Sync & Outbox Engine',
    description: 'Client-first transactional outbox pattern with UUID idempotency, retry policies, and network reconnect sync.',
    keyEntities: ['OutboxRecord', 'SyncQueueItem', 'ConflictResolutionLog'],
    status: 'Active LocalStorage / IndexedDB Driver'
  }
];

export const BACKEND_INFRASTRUCTURE: BackendInfrastructure[] = [
  {
    name: 'PostgreSQL Relational DB',
    status: 'Simulated (In-Memory + LocalStorage)',
    purpose: 'Stores transactional records (orders, listings, storage bookings, user identities) with ACID compliance.',
    details: 'Current prototype uses StorageManager persistence with UUID idempotency keys to mirror relational schema.',
    productionEquivalent: 'Managed Cloud SQL for PostgreSQL 16 with Row Level Security (RLS).'
  },
  {
    name: 'Redis In-Memory Cache',
    status: 'Simulated (Client State Cache)',
    purpose: 'Sub-millisecond Mandi price lookups, session token store, and rate limiting.',
    details: 'Mandi pricing and arrival counts cached with reactive subscribers for instant UI rendering.',
    productionEquivalent: 'Google Cloud Memorystore for Redis with pub/sub clustering.'
  },
  {
    name: 'Gemini / AI Diagnostic Service',
    status: 'Production Architecture Pattern (Simulated Multi-stage Pipeline)',
    purpose: 'Vision analysis of crop leaf lesions, blight, and pest symptoms with agronomic guidance generation.',
    details: 'Structured multi-stage inference: Image pre-processing -> Feature extraction -> Pathogen match -> Organic/chemical prescription.',
    productionEquivalent: 'Google Gemini 2.5 Flash multimodal endpoint via secure server-side API proxy.'
  },
  {
    name: 'Cloud Object Storage',
    status: 'Simulated (Data URLs / Web Storage)',
    purpose: 'Secure hosting of leaf diagnosis photos, produce grading photos, and warehouse receipts.',
    details: 'Leaf photos converted to canvas base64 and persistent object URLs.',
    productionEquivalent: 'Google Cloud Storage (GCS) with signed URLs and CDN caching.'
  },
  {
    name: 'Background Worker & Sync Engine',
    status: 'Live Client-Side Implementation',
    purpose: 'Offline-first outbox draining, exponential backoff retries, and network reconnection handling.',
    details: 'StorageManager monitors window online/offline events, simulates network failures on demand, and maintains draft recovery.',
    productionEquivalent: 'Service Worker + Cloud Run background worker with Cloud Pub/Sub queue.'
  }
];
