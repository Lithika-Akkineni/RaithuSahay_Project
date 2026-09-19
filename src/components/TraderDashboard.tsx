import { useState } from 'react';
import {
  TrendingUp,
  Gavel,
  Radio,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { LanguageCode } from '../types';
import { MANDI_PRICES } from '../data/mockData';
import { translations } from '../i18n/translations';

interface TraderDashboardProps {
  currentLanguage: LanguageCode;
  onNavigate: (screen: string) => void;
}

export default function TraderDashboard({ currentLanguage, onNavigate }: TraderDashboardProps) {
  const t = translations[currentLanguage];
  const [broadcastRate, setBroadcastRate] = useState('21,800');
  const [selectedCommodity, setSelectedCommodity] = useState('Chilli (Teja Variety)');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Live Mandi Auction Lots
  const [auctionLots, setAuctionLots] = useState([
    {
      lotId: 'LOT-GNT-104',
      farmer: 'K. Sambasiva Rao',
      village: 'Tenali Rural',
      crop: 'Chilli - Teja Grade 1',
      bags: 45,
      weightQ: 22.5,
      currentBid: 21600,
      minBid: 21000,
      statusKey: 'open' as const
    },
    {
      lotId: 'LOT-GNT-105',
      farmer: 'M. Venkateswarlu',
      village: 'Prathipadu',
      crop: 'Cotton - Bunny Bt',
      bags: 60,
      weightQ: 30,
      currentBid: 7350,
      minBid: 7100,
      statusKey: 'open' as const
    },
    {
      lotId: 'LOT-GNT-106',
      farmer: 'P. Lakshmi Narayana',
      village: 'Kollipara',
      crop: 'Rice - BPT 5204',
      bags: 120,
      weightQ: 60,
      currentBid: 2320,
      minBid: 2250,
      statusKey: 'final' as const
    }
  ]);

  const handlePlaceBid = (lotId: string, increment: number) => {
    setAuctionLots((prev) =>
      prev.map((lot) => {
        if (lot.lotId === lotId) {
          return {
            ...lot,
            currentBid: lot.currentBid + increment
          };
        }
        return lot;
      })
    );
  };

  const handleBroadcast = () => {
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold">
            {t.mandiAgentTerminalBadge}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {t.apmcYardBroadcast}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
          {t.traderDashboardSub}
        </p>
      </div>

      {/* Broadcast Rate Banner */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>{t.dailyMandiBroadcastHeading}</span>
          </div>
          <span className="text-xs text-emerald-700 font-semibold">{t.gunturApmcYard}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="w-full sm:w-60 px-3 py-2 border border-stone-300 rounded-xl text-xs bg-white"
          >
            <option value="Chilli (Teja Variety)">Chilli (Teja Variety)</option>
            <option value="Cotton (Bunny/Bt)">Cotton (Bunny/Bt)</option>
            <option value="Rice (BPT 5204)">Rice (BPT 5204)</option>
          </select>

          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-2 text-stone-400 font-bold text-xs">₹</span>
            <input
              type="text"
              value={broadcastRate}
              onChange={(e) => setBroadcastRate(e.target.value)}
              placeholder={t.enterClosingPricePlaceholder}
              className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-emerald-800"
            />
          </div>

          <button
            onClick={handleBroadcast}
            className="w-full sm:w-auto px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{t.broadcastRateAction}</span>
          </button>
        </div>

        {broadcastSuccess && (
          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.broadcastRateSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Live Auction Lots */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <Gavel className="w-4 h-4 text-amber-600" />
            <span>{t.liveLotsOnAuctionFloor}</span>
          </div>
          <span className="text-xs text-stone-500">{t.autoRefreshActive}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {auctionLots.map((lot) => (
            <div
              key={lot.lotId}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-stone-500">
                    {lot.lotId}
                  </span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    {lot.statusKey === 'open' ? t.openForBiddingStatus : t.finalCallStatus}
                  </span>
                </div>
                <h4 className="font-extrabold text-stone-900 text-sm mt-1">{lot.crop}</h4>
                <div className="text-xs text-stone-600">
                  {t.farmerLabel}: {lot.farmer} ({lot.village})
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {t.lotNumber} {lot.bags} {t.bagsLabel} (~{lot.weightQ} {t.quintals})
                </div>
              </div>

              <div className="border-t border-stone-200 pt-2">
                <span className="text-[10px] uppercase font-bold text-stone-400">{t.currentHighestBid}</span>
                <div className="text-xl font-black text-amber-600">
                  ₹{lot.currentBid.toLocaleString()} / Q
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                  <button
                    onClick={() => handlePlaceBid(lot.lotId, 50)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                  >
                    + ₹50
                  </button>
                  <button
                    onClick={() => handlePlaceBid(lot.lotId, 100)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                  >
                    + ₹100
                  </button>
                  <button
                    onClick={() => handlePlaceBid(lot.lotId, 250)}
                    className="flex-1 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer"
                  >
                    + ₹250
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Link to Logistics for dispatch */}
      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
        <div>
          <div className="font-bold text-xs text-emerald-950">
            {t.needDispatchTrucks}
          </div>
          <div className="text-[11px] text-emerald-800">
            {t.arrangeTrucksDesc}
          </div>
        </div>
        <button
          onClick={() => onNavigate('logistics')}
          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
        >
          <span>{t.bookTrucksBtn}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
