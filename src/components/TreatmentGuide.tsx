import { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  ShieldCheck,
  AlertTriangle,
  Leaf,
  FlaskConical,
  Sprout,
  CheckCircle2
} from 'lucide-react';
import { DiseaseInfo, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { SAMPLE_DISEASES, CROPS_CATALOG } from '../data/mockData';

interface TreatmentGuideProps {
  currentLanguage: LanguageCode;
  selectedDiseaseId?: string | null;
}

export default function TreatmentGuide({
  currentLanguage,
  selectedDiseaseId
}: TreatmentGuideProps) {
  const t = translations[currentLanguage];

  const [activeCropFilter, setActiveCropFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo>(
    SAMPLE_DISEASES.find((d) => d.id === selectedDiseaseId) || SAMPLE_DISEASES[0]
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (selectedDiseaseId) {
      const match = SAMPLE_DISEASES.find((d) => d.id === selectedDiseaseId);
      if (match) setSelectedDisease(match);
    }
  }, [selectedDiseaseId]);

  // Handle Speech Read Aloud
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech audio guidance is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const titleText =
      currentLanguage === 'te'
        ? `${selectedDisease.diseaseNameTe}. ముఖ్య లక్షణాలు: ${selectedDisease.symptomsTe.join('. ')}. సేంద్రీయ నివారణ: ${selectedDisease.organicTreatment.join('. ')}`
        : currentLanguage === 'hi'
        ? `${selectedDisease.diseaseNameHi}. मुख्य लक्षण: ${selectedDisease.symptomsHi.join('. ')}. जैविक उपचार: ${selectedDisease.organicTreatment.join('. ')}`
        : `${selectedDisease.diseaseName}. Symptoms: ${selectedDisease.symptoms.join('. ')}. Treatment: ${selectedDisease.organicTreatment.join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(titleText);
    utterance.lang = currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const filteredDiseases = SAMPLE_DISEASES.filter((disease) => {
    const matchCrop = activeCropFilter === 'all' || disease.cropId === activeCropFilter;
    const matchSearch =
      searchQuery === '' ||
      disease.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.diseaseNameTe.includes(searchQuery) ||
      disease.diseaseNameHi.includes(searchQuery) ||
      disease.cropName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCrop && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-lg">
                📖
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.treatmentTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Verified organic and chemical remedies, dosages per acre, spray schedules, and safety instructions.
            </p>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto ${
              isPlayingAudio
                ? 'bg-amber-500 text-stone-900 animate-pulse'
                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-800" />}
            <span>{isPlayingAudio ? 'Stop Audio' : t.readAloud}</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchTreatment}
              className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Crop quick filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCropFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                activeCropFilter === 'all'
                  ? 'bg-emerald-700 text-white font-bold shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              All Crops
            </button>
            {CROPS_CATALOG.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setActiveCropFilter(crop.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1 ${
                  activeCropFilter === crop.id
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{crop.icon}</span>
                <span>
                  {currentLanguage === 'te'
                    ? crop.nameTe
                    : currentLanguage === 'hi'
                    ? crop.nameHi
                    : crop.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Selection Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {filteredDiseases.map((item) => {
          const isSelected = selectedDisease.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedDisease(item)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[90px] ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-stone-200 hover:border-emerald-300 bg-white text-stone-800 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-200/80 text-stone-800">
                  {item.cropName}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.severity === 'critical'
                      ? 'bg-rose-500'
                      : item.severity === 'high'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />
              </div>
              <div className="text-xs font-bold line-clamp-2 mt-1">
                {currentLanguage === 'te'
                  ? item.diseaseNameTe
                  : currentLanguage === 'hi'
                  ? item.diseaseNameHi
                  : item.diseaseName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Treatment Details Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200 space-y-6">
        {/* Title & Pathogen */}
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Crop: {selectedDisease.cropName}
            </span>
            <span className="text-xs text-stone-500">•</span>
            <span className="text-xs text-stone-600 italic">
              Pathogen: {selectedDisease.causalOrganism}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            {currentLanguage === 'te'
              ? selectedDisease.diseaseNameTe
              : currentLanguage === 'hi'
              ? selectedDisease.diseaseNameHi
              : selectedDisease.diseaseName}
          </h2>
        </div>

        {/* Symptoms Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{t.symptomsHeading}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(currentLanguage === 'te'
              ? selectedDisease.symptomsTe
              : currentLanguage === 'hi'
              ? selectedDisease.symptomsHi
              : selectedDisease.symptoms
            ).map((symptom, i) => (
              <div
                key={i}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Treatment Cards: Organic vs Chemical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Organic / Bio-control Card */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm border-b border-emerald-200 pb-2">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>{t.organicRemedy}</span>
            </div>
            <ul className="space-y-2">
              {selectedDisease.organicTreatment.map((item, idx) => (
                <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical Treatment & Dosage Card */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm border-b border-amber-200 pb-2">
              <FlaskConical className="w-4 h-4 text-amber-700" />
              <span>{t.chemicalRemedy}</span>
            </div>
            <ul className="space-y-2">
              {selectedDisease.chemicalTreatment.map((item, idx) => (
                <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preventive Measures */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>{t.preventionTips}</span>
          </h3>
          <ul className="space-y-1.5">
            {selectedDisease.prevention.map((item, idx) => (
              <li key={idx} className="text-xs text-stone-800 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety & Precaution Notice */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-rose-900">{t.safetyAdvice}:</div>
            <p>
              Always wear protective rubber gloves, face mask, and eye protection while preparing chemical solutions. Never spray against wind direction. Maintain a 14-day minimum waiting period (pre-harvest interval) between chemical spray and crop harvest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
