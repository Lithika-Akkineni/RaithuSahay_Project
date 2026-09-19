import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CloudSun, CheckCircle2, Clock, Check, Info } from 'lucide-react';
import { LanguageCode, InAppNotification } from '../types';
import { translations } from '../i18n/translations';
import { storage } from '../lib/storage';

interface NotificationsCenterProps {
  currentLanguage: LanguageCode;
  onReadCountChange: (count: number) => void;
}

export default function NotificationsCenter({
  currentLanguage,
  onReadCountChange
}: NotificationsCenterProps) {
  const t = translations[currentLanguage];
  const [notifications, setNotifications] = useState<InAppNotification[]>(storage.getNotifications());

  useEffect(() => {
    const unsub = storage.subscribe(() => {
      const current = storage.getNotifications();
      setNotifications(current);
      onReadCountChange(current.filter((n) => !n.read).length);
    });
    return () => unsub();
  }, [onReadCountChange]);

  const handleMarkAsRead = (id: string) => {
    storage.markNotificationAsRead(id);
    const updated = storage.getNotifications();
    setNotifications(updated);
    onReadCountChange(updated.filter((n) => !n.read).length);
  };

  const handleMarkAllRead = () => {
    storage.markAllNotificationsAsRead();
    const updated = storage.getNotifications();
    setNotifications(updated);
    onReadCountChange(0);
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-lg">
                🔔
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                {t.notifications}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              Weather warnings, crop schedule reminders, market price fluctuations, and service order updates.
            </p>
          </div>

          {unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* SMS / Delivery Policy Notice */}
        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Notification Channel Policy: </span>
            Notifications are delivered in-app in this prototype. Live SMS delivery via telecom gateways (NIC/Kisan Portal) or push notifications require registered carrier credentials.
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-5 space-y-2.5">
          {notifications.map((n) => {
            const cat = n.category || (n as any).type;
            return (
              <div
                key={n.id}
                onClick={() => handleMarkAsRead(n.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  n.read
                    ? 'bg-stone-50/70 border-stone-200 opacity-80'
                    : 'bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-500/10'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    cat === 'weather'
                      ? 'bg-amber-100 text-amber-800'
                      : cat === 'crop_care' || cat === 'disease_alert'
                      ? 'bg-rose-100 text-rose-800'
                      : cat === 'market'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {cat === 'weather' ? (
                    <CloudSun className="w-5 h-5" />
                  ) : cat === 'crop_care' || cat === 'disease_alert' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-xs sm:text-sm text-stone-900">
                    {currentLanguage === 'te'
                      ? n.titleTe
                      : currentLanguage === 'hi'
                      ? n.titleHi
                      : n.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  {currentLanguage === 'te'
                    ? n.messageTe
                    : currentLanguage === 'hi'
                    ? n.messageHi
                    : n.message}
                </p>
              </div>

              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
