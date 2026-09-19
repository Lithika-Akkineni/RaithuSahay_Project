import { Server, Database, Cpu, HardDrive, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { ARCHITECTURE_SERVICES, BACKEND_INFRASTRUCTURE } from '../data/mockData';
import { storage } from '../lib/storage';

export default function ArchitectureStatus() {
  const pendingCount = storage.getPendingSyncCount();
  const isOnline = storage.isOnline();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1">
            <Server className="w-3.5 h-3.5" /> Architecture Specification & Status
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          RaithuSahay Microservice & Infrastructure Map
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Complete transparent mapping of backend services, offline sync engine, database tier, caching layer, and Gemini AI diagnostic model status.
        </p>
      </div>

      {/* Backend Infrastructure Status Cards (PostgreSQL, Redis, Gemini, Object Storage, Sync Worker) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>Infrastructure Components & Production Alignment</span>
          </h2>
          <span className="text-xs text-stone-500">Live vs Simulated Specification</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BACKEND_INFRASTRUCTURE.map((infra) => {
            const isSimulated = infra.status.includes('Simulated');
            return (
              <div
                key={infra.name}
                className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-stone-900 text-sm">{infra.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSimulated
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {infra.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 mt-1">{infra.purpose}</div>
                  <p className="text-[11px] text-stone-600 mt-1">{infra.details}</p>
                </div>

                <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                  <span className="font-bold text-stone-700">Production Plan: </span>
                  <span>{infra.productionEquivalent}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Microservices Matrix */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>RaithuSahay Core Service Domains</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Domain-driven service responsibilities and data models.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
            8 Core Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ARCHITECTURE_SERVICES.map((srv) => (
            <div
              key={srv.serviceName}
              className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">{srv.serviceName}</span>
                <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                  {srv.status}
                </span>
              </div>
              <p className="text-xs text-stone-700 font-medium">{srv.description}</p>
              <div className="text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700">Key Entities: </span>
                {srv.keyEntities.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Storage Engine State & Client Diagnostics */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-xs text-emerald-950 uppercase tracking-wider">
              Offline Storage Engine Diagnostics
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-800">
            {isOnline ? 'Online (Real-time Link)' : 'Offline Simulation Active'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
            <span className="text-[10px] text-stone-500">Storage Driver</span>
            <div className="font-bold text-stone-900">localStorage / IndexedDB</div>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
            <span className="text-[10px] text-stone-500">Pending Outbox</span>
            <div className="font-bold text-amber-700">{pendingCount} items</div>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
            <span className="text-[10px] text-stone-500">Idempotency Keys</span>
            <div className="font-bold text-stone-900">Client UIDs (UUIDv4)</div>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
            <span className="text-[10px] text-stone-500">Conflict Policy</span>
            <div className="font-bold text-stone-900">Client Wins / Merge</div>
          </div>
        </div>
      </div>
    </div>
  );
}
