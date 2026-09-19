import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Users,
  Warehouse,
  Truck,
  FileText,
  Activity,
  Plus
} from 'lucide-react';
import { LanguageCode } from '../types';
import { storage } from '../lib/storage';
import { translations } from '../i18n/translations';

interface AdminDashboardProps {
  currentLanguage: LanguageCode;
}

export default function AdminDashboard({ currentLanguage }: AdminDashboardProps) {
  const t = translations[currentLanguage];
  const [activeTab, setActiveTab] = useState<'verifications' | 'masterData' | 'syncHealth' | 'auditLog'>('verifications');

  // Pending Verifications Queue
  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'ver_1',
      entityName: 'Krishna Delta Farmers Agro FPO',
      type: 'Buyer / FPO',
      district: 'Krishna',
      regNumber: 'AP-FPO-2024-8841',
      submittedOn: '2026-09-18',
      status: 'pending'
    },
    {
      id: 'ver_2',
      entityName: 'Coastal Chill Fresh Multi-Chamber Storage',
      type: 'Cold Storage Facility',
      district: 'Guntur',
      regNumber: 'NHM-CS-4091',
      submittedOn: '2026-09-17',
      status: 'pending'
    },
    {
      id: 'ver_3',
      entityName: 'Veera Anjaneya Farm Logistics (Bolero Fleet)',
      type: 'Transporter',
      district: 'Warangal',
      regNumber: 'TS-TRANS-5510',
      submittedOn: '2026-09-16',
      status: 'pending'
    }
  ]);

  // Master Data: Add new Mandi Price
  const [newMandiCrop, setNewMandiCrop] = useState('');
  const [newMandiYard, setNewMandiYard] = useState('');
  const [newMandiPrice, setNewMandiPrice] = useState('');
  const [masterDataAdded, setMasterDataAdded] = useState(false);

  const handleApprove = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  const handleAddPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMandiCrop || !newMandiPrice) return;
    setMasterDataAdded(true);
    setNewMandiCrop('');
    setNewMandiYard('');
    setNewMandiPrice('');
    setTimeout(() => setMasterDataAdded(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {t.adminOpsConsoleBadge}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {t.adminSystemGovTitle}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300 mt-1 max-w-xl">
          {t.adminSystemGovSub}
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-5 border-t border-emerald-900 pt-3 overflow-x-auto">
          {[
            { id: 'verifications', label: `${t.tabVerificationsLabel} (${verificationQueue.filter((v) => v.status === 'pending').length})` },
            { id: 'masterData', label: t.tabMasterDataCatalog },
            { id: 'syncHealth', label: t.tabSyncHealth },
            { id: 'auditLog', label: t.tabAuditLog }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id ? 'bg-amber-400 text-stone-950' : 'text-emerald-200 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: VERIFICATION QUEUE */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm border-b pb-2">
              {t.pendingPartnerVerifications}
            </h3>

            <div className="space-y-3">
              {verificationQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">
                        {item.entityName}
                      </span>
                      <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {item.type}
                      </span>
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          item.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'approved'
                          ? t.statusApprovedLabel
                          : item.status === 'rejected'
                          ? t.statusRejectedLabel
                          : t.statusPendingLabel}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      {t.regIdLabel}: {item.regNumber} • {t.district}: {item.district} • {t.submittedLabel}: {item.submittedOn}
                    </div>
                  </div>

                  {item.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t.approveAndVerify}</span>
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1.5 border border-stone-300 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t.rejectAction}</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-stone-500">
                      {t.processedByAdmin}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER DATA */}
      {activeTab === 'masterData' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
          <h3 className="font-bold text-stone-900 text-sm border-b pb-2">
            {t.publishMandiPriceMasterUpdate}
          </h3>

          <form onSubmit={handleAddPrice} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t.cropNameLabel}</label>
              <input
                type="text"
                value={newMandiCrop}
                onChange={(e) => setNewMandiCrop(e.target.value)}
                placeholder={t.cropPlaceholderExample}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t.mandiYardLabel}</label>
              <input
                type="text"
                value={newMandiYard}
                onChange={(e) => setNewMandiYard(e.target.value)}
                placeholder={t.yardPlaceholderExample}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t.modalPricePerQ}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newMandiPrice}
                  onChange={(e) => setNewMandiPrice(e.target.value)}
                  placeholder="2450"
                  className="flex-1 px-3 py-2 border rounded-xl text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> {t.publishAction}
                </button>
              </div>
            </div>
          </form>

          {masterDataAdded && (
            <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200">
              {t.mandiBenchmarkPublished}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SYNC TELEMETRY */}
      {activeTab === 'syncHealth' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3 text-xs">
          <h3 className="font-bold text-stone-900 text-sm border-b pb-2">
            {t.storageEngineTelemetry}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-stone-50 rounded-xl border">
              <div className="text-stone-500 font-bold">{t.syncWorkerDaemon}</div>
              <div className="text-emerald-700 font-extrabold text-base mt-1">{t.healthyActive}</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border">
              <div className="text-stone-500 font-bold">{t.clientPersistence}</div>
              <div className="text-stone-900 font-extrabold text-base mt-1">{t.clientPersistence}</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border">
              <div className="text-stone-500 font-bold">{t.syncQueue}</div>
              <div className="text-amber-600 font-extrabold text-base mt-1">
                {storage.getPendingSyncCount()} {t.itemsLabel}
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border">
              <div className="text-stone-500 font-bold">{t.telemetryErrorRate}</div>
              <div className="text-emerald-700 font-extrabold text-base mt-1">0.02% (Target &lt; 1%)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'auditLog' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-2 text-xs">
          <h3 className="font-bold text-stone-900 text-sm border-b pb-2">
            {t.auditTrailHeading}
          </h3>
          {[
            { action: t.auditFpoApproval, time: '10 mins ago', user: 'Operations Admin' },
            { action: t.auditMandiBroadcast, time: '35 mins ago', user: 'Trader Agent #42' },
            { action: t.auditColdStorageConfirmed, time: '1 hour ago', user: 'Farmer V. Ramana' },
            { action: t.auditOfflineSync, time: '2 hours ago', user: 'Client Sync Worker' }
          ].map((log, i) => (
            <div key={i} className="p-2.5 bg-stone-50 rounded-lg flex items-center justify-between">
              <span className="font-medium text-stone-800">{log.action}</span>
              <span className="text-[10px] text-stone-500">{log.time} • {log.user}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
