import { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Save,
  ShieldAlert,
  Sparkles,
  History,
  FileCheck
} from 'lucide-react';
import { DiseaseInfo, LanguageCode, UserProfile, DiagnosisRecord } from '../types';
import { translations } from '../i18n/translations';
import { CROPS_CATALOG, SAMPLE_DISEASES } from '../data/mockData';
import { storage } from '../lib/storage';

interface DiseaseDetectionProps {
  profile: UserProfile;
  currentLanguage: LanguageCode;
  onNavigateToTreatment: (diseaseId: string) => void;
  initialCropId?: string;
}

export default function DiseaseDetection({
  profile,
  currentLanguage,
  onNavigateToTreatment,
  initialCropId = 'chilli'
}: DiseaseDetectionProps) {
  const t = translations[currentLanguage];

  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropId);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [diagnosisResult, setDiagnosisResult] = useState<DiseaseInfo | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [diagnosisHistory, setDiagnosisHistory] = useState<DiagnosisRecord[]>(
    storage.getDiagnosisHistory()
  );
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        setCapturedImage(null);
        setDiagnosisResult(null);
      } else {
        setCameraError('Camera access not supported on this browser. Please use photo upload.');
      }
    } catch (err: any) {
      console.warn('Camera error', err);
      setCameraError('Could not open camera stream. Please allow camera permissions or upload an image.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCamera();
      triggerAnalysis(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size & type
    if (!file.type.startsWith('image/')) {
      setCameraError('Please upload a valid image file (JPEG or PNG format).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCameraError('Image size exceeds 10MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImage(dataUrl);
      setDiagnosisResult(null);
      triggerAnalysis(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: DiseaseInfo) => {
    setSelectedCropId(sample.cropId);
    setCapturedImage(sample.sampleImageUrl);
    setDiagnosisResult(null);
    triggerAnalysis(sample.sampleImageUrl, sample);
  };

  const triggerAnalysis = (imageUrl: string, preMatchedSample?: DiseaseInfo) => {
    setAnalyzing(true);
    setAnalysisStep(1);
    setSavedSuccess(false);

    // Simulated multi-stage analysis pipeline
    setTimeout(() => {
      setAnalysisStep(2);
    }, 700);

    setTimeout(() => {
      setAnalysisStep(3);
    }, 1400);

    setTimeout(() => {
      setAnalyzing(false);
      // Pick matching disease from knowledge base or fallback
      let matched = preMatchedSample;
      if (!matched) {
        matched =
          SAMPLE_DISEASES.find((d) => d.cropId === selectedCropId) || SAMPLE_DISEASES[0];
      }
      setDiagnosisResult(matched);
    }, 2100);
  };

  const handleReset = () => {
    stopCamera();
    setCapturedImage(null);
    setDiagnosisResult(null);
    setSavedSuccess(false);
    setCameraError(null);
  };

  const handleSaveDiagnosis = () => {
    if (!diagnosisResult) return;

    const record: DiagnosisRecord = {
      id: `diag_${Date.now()}`,
      farmerId: profile.id,
      cropName: diagnosisResult.cropName,
      diseaseName: diagnosisResult.diseaseName,
      confidence: diagnosisResult.confidence || 88,
      detectedAt: new Date().toISOString(),
      imageUrl: capturedImage || diagnosisResult.sampleImageUrl,
      treatmentSummary: diagnosisResult.organicTreatment[0] || 'Treatment plan generated',
      status: 'active',
      syncStatus: storage.isOnline() ? 'synced' : 'pending_sync'
    };

    storage.addDiagnosisRecord(record);
    setDiagnosisHistory(storage.getDiagnosisHistory());
    setSavedSuccess(true);
  };

  const currentCrop = CROPS_CATALOG.find((c) => c.id === selectedCropId) || CROPS_CATALOG[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header & Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-lg">
                🌱
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.diseaseDetectTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              {t.diseaseDetectDesc}
            </p>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <History className="w-4 h-4 text-emerald-700" />
            <span>Diagnosis History ({diagnosisHistory.length})</span>
          </button>
        </div>

        {/* Diagnosis History Modal/Accordion */}
        {showHistory && (
          <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Past Crop Health Scans
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Close
              </button>
            </div>
            {diagnosisHistory.length === 0 ? (
              <p className="text-xs text-stone-500">No past diagnoses recorded yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {diagnosisHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-lg border border-stone-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-900">
                        {item.cropName}: {item.diseaseName}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {new Date(item.detectedAt).toLocaleDateString()} • {item.confidence}% confidence
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.syncStatus === 'synced' ? 'Synced' : 'Pending Sync'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Crop Selection Bar */}
        <div className="mt-5">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            1. {t.chooseCrop}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {CROPS_CATALOG.map((crop) => {
              const isSelected = selectedCropId === crop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCropId(crop.id);
                    if (capturedImage) {
                      triggerAnalysis(capturedImage);
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm ring-1 ring-emerald-500'
                      : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className="text-xl">{crop.icon}</span>
                  <span className="text-xs line-clamp-1">
                    {currentLanguage === 'te'
                      ? crop.nameTe
                      : currentLanguage === 'hi'
                      ? crop.nameHi
                      : crop.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Camera / Upload Action Area */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            2. {capturedImage ? 'Captured Leaf Image' : 'Provide Damaged Leaf Photo'}
          </label>

          {cameraError && (
            <div className="p-3 mb-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Live Video Stream View */}
          {isCameraActive && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[360px] flex items-center justify-center border-2 border-emerald-500">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-extrabold rounded-full shadow-lg flex items-center gap-2 active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture Photo</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-stone-900/80 hover:bg-stone-900 text-white font-medium rounded-full text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Captured Image Preview with Scanning Animation */}
          {!isCameraActive && capturedImage && (
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 max-h-[380px] flex items-center justify-center border border-stone-300">
              <img
                src={capturedImage}
                alt="Captured crop leaf"
                className="w-full h-full object-contain max-h-[380px]"
                crossOrigin="anonymous"
              />

              {/* Laser Scanning Effect during Analysis */}
              {analyzing && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-6">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mb-4" />
                  <div className="text-base font-bold text-amber-300 tracking-wide">
                    {t.analyzingImage}
                  </div>
                  <div className="text-xs text-stone-200 mt-2 text-center max-w-sm">
                    {analysisStep === 1 && t.analyzingStep1}
                    {analysisStep === 2 && t.analyzingStep2}
                    {analysisStep === 3 && t.analyzingStep3}
                  </div>
                </div>
              )}

              {/* Retake / Remove Controls */}
              {!analyzing && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={startCamera}
                    className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.retake}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-700 text-white backdrop-blur"
                    title={t.remove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Default Upload & Camera Triggers */}
          {!isCameraActive && !capturedImage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={startCamera}
                className="p-6 rounded-2xl border-2 border-dashed border-emerald-400/80 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950 flex flex-col items-center justify-center gap-2 transition-all group active:scale-[0.99]"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-stone-900">{t.takePhoto}</div>
                <div className="text-[11px] text-stone-500 text-center">
                  Use device camera for live leaf inspection
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-stone-300 hover:border-emerald-500 bg-stone-50/50 hover:bg-stone-50 text-stone-800 flex flex-col items-center justify-center gap-2 transition-all group active:scale-[0.99]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-stone-900">{t.uploadPhoto}</div>
                <div className="text-[11px] text-stone-500 text-center">
                  Select leaf picture from photo gallery
                </div>
              </button>
            </div>
          )}

          {/* Or Try Sample Leaves Carousel */}
          {!capturedImage && !isCameraActive && (
            <div className="mt-5 pt-4 border-t border-stone-100">
              <div className="text-xs font-bold text-stone-600 mb-2">
                {t.orTrySample}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SAMPLE_DISEASES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl border border-stone-200 hover:border-emerald-400 bg-white text-left transition-all group flex flex-col gap-1.5"
                  >
                    <div className="w-full h-20 rounded-lg overflow-hidden bg-stone-100 relative">
                      <img
                        src={sample.sampleImageUrl}
                        alt={sample.diseaseName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[9px] font-bold bg-black/70 text-white">
                        {sample.cropName}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-stone-800 line-clamp-1">
                      {currentLanguage === 'te'
                        ? sample.diseaseNameTe
                        : currentLanguage === 'hi'
                        ? sample.diseaseNameHi
                        : sample.diseaseName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DIAGNOSIS RESULTS CARD */}
      {diagnosisResult && !analyzing && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-emerald-500/30 space-y-5">
          {/* Header Result Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {t.possibleDiagnosis}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {diagnosisResult.confidence}% {t.confidenceRate}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                    diagnosisResult.severity === 'critical'
                      ? 'bg-rose-100 text-rose-800'
                      : diagnosisResult.severity === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {diagnosisResult.severity} {t.severityLevel}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2">
                {currentLanguage === 'te'
                  ? diagnosisResult.diseaseNameTe
                  : currentLanguage === 'hi'
                  ? diagnosisResult.diseaseNameHi
                  : diagnosisResult.diseaseName}
              </h2>
              <p className="text-xs text-stone-500 italic mt-0.5">
                Causal Agent: {diagnosisResult.causalOrganism}
              </p>
            </div>

            {/* Save to History / Download Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDiagnosis}
                disabled={savedSuccess}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  savedSuccess
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Saved to Records</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{t.saveDiagnosis}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mandatory Demo / Safety Disclaimer Banner */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Agricultural Advisory Notice: </span>
              {t.demoDisclaimer}
            </div>
          </div>

          {/* Symptoms breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              {t.symptomsHeading}
            </h3>
            <ul className="space-y-1.5">
              {(currentLanguage === 'te'
                ? diagnosisResult.symptomsTe
                : currentLanguage === 'hi'
                ? diagnosisResult.symptomsHi
                : diagnosisResult.symptoms
              ).map((symptom, idx) => (
                <li key={idx} className="text-xs text-stone-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Field Next Steps */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
              {t.immediateSteps}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {diagnosisResult.nextSteps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-stone-200 flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="text-stone-800">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action to Treatment Guide */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigateToTreatment(diagnosisResult.id)}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>{t.openTreatmentGuide}</span>
            </button>

            <button
              onClick={handleReset}
              className="text-xs font-medium text-stone-500 hover:text-stone-800"
            >
              Scan another leaf
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
