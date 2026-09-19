import { useState, useEffect } from 'react';
import { UserRole, LanguageCode, UserProfile, AuthUser } from './types';
import { storage } from './lib/storage';
import { auth } from './lib/auth';
import { SAMPLE_NOTIFICATIONS } from './data/mockData';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import AccessDenied from './components/AccessDenied';
import FarmerOnboarding from './components/FarmerOnboarding';
import FarmerDashboard from './components/FarmerDashboard';
import DiseaseDetection from './components/DiseaseDetection';
import TreatmentGuide from './components/TreatmentGuide';
import MarketAndBuyers from './components/MarketAndBuyers';
import ColdStorageBooking from './components/ColdStorageBooking';
import LogisticsBooking from './components/LogisticsBooking';
import ServiceProviderDashboard from './components/ServiceProviderDashboard';
import MyRequestsAndSync from './components/MyRequestsAndSync';
import BuyerDashboard from './components/BuyerDashboard';
import TraderDashboard from './components/TraderDashboard';
import AdminDashboard from './components/AdminDashboard';
import ArchitectureStatus from './components/ArchitectureStatus';
import NotificationsCenter from './components/NotificationsCenter';
import SettingsModal from './components/SettingsModal';

export default function App() {
  // Session & User Authentication State
  const initialSession = auth.getCurrentSession();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(
    initialSession ? initialSession.user : null
  );
  const [showAuthModal, setShowAuthModal] = useState<boolean>(!initialSession);

  // Core App State
  const [profile, setProfile] = useState<UserProfile>(storage.getProfile());
  const [currentRole, setCurrentRole] = useState<UserRole>(
    currentUser ? currentUser.role : 'farmer'
  );
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(storage.getLanguage());
  const [currentScreen, setCurrentScreen] = useState<string>(
    currentUser ? auth.getDefaultScreenForRole(currentUser.role) : 'home'
  );
  const [unreadNotifications, setUnreadNotifications] = useState<number>(
    storage.getNotifications().filter((n) => !n.read).length
  );
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(storage.getPendingSyncCount());

  // Deep linking between journeys
  const [selectedDiseaseForTreatment, setSelectedDiseaseForTreatment] = useState<string | null>(null);
  const [preSelectedCropForSell, setPreSelectedCropForSell] = useState<string | undefined>(undefined);
  const [preSelectedCropForScan, setPreSelectedCropForScan] = useState<string | undefined>(undefined);

  // Sync listener & Auth listener
  useEffect(() => {
    const unsubStorage = storage.subscribe(() => {
      setPendingSyncCount(storage.getPendingSyncCount());
      setProfile(storage.getProfile());
      setCurrentLanguage(storage.getLanguage());
      setUnreadNotifications(storage.getNotifications().filter((n) => !n.read).length);
    });

    const unsubAuth = auth.subscribe((session) => {
      if (session) {
        setCurrentUser(session.user);
        setCurrentRole(session.user.role);
      } else {
        setCurrentUser(null);
        setShowAuthModal(true);
      }
    });

    return () => {
      unsubStorage();
      unsubAuth();
    };
  }, []);

  // Handle Role Change via Dropdown / Quick Switcher
  const handleRoleChange = async (role: UserRole) => {
    // Authenticate into that role's demo account
    const res = await auth.quickDemoLogin(role);
    if (res.success && res.session) {
      setCurrentUser(res.session.user);
      setCurrentRole(role);
      const defaultScreen = auth.getDefaultScreenForRole(role);
      setCurrentScreen(defaultScreen);
    } else {
      setCurrentRole(role);
      setCurrentScreen(auth.getDefaultScreenForRole(role));
    }
  };

  // Handle Login / Registration Success
  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setShowAuthModal(false);

    // Sync profile details if role is farmer
    if (user.role === 'farmer') {
      const updatedProfile: UserProfile = {
        ...profile,
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        district: user.district || profile.district,
        landAcres: user.landAcres || profile.landAcres,
        selectedCrops: user.selectedCrops || profile.selectedCrops,
        isRegistered: true
      };
      storage.saveProfile(updatedProfile);
      setProfile(updatedProfile);
    }

    // Direct to role's home view
    const defaultScreen = auth.getDefaultScreenForRole(user.role);
    setCurrentScreen(defaultScreen);
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentUser(null);
    setShowAuthModal(true);
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    storage.setLanguage(lang);
  };

  const handleNavigateToTreatment = (diseaseId: string) => {
    setSelectedDiseaseForTreatment(diseaseId);
    setCurrentScreen('treatmentGuide');
  };

  const handleOnboardingComplete = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setCurrentScreen('home');
  };

  const handleResetOnboarding = () => {
    setProfile((prev) => ({ ...prev, isRegistered: false }));
    setCurrentScreen('onboarding');
  };

  // Farmer Onboarding view
  if (currentRole === 'farmer' && (!profile.isRegistered || currentScreen === 'onboarding')) {
    return (
      <div className="min-h-screen bg-stone-100 font-sans text-stone-900 flex flex-col">
        <Header
          currentRole={currentRole}
          currentUser={currentUser}
          onRoleChange={handleRoleChange}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onNavigate={setCurrentScreen}
          unreadCount={unreadNotifications}
          onLogout={handleLogout}
          onOpenAuth={() => setShowAuthModal(true)}
        />
        <main className="flex-1">
          <FarmerOnboarding
            initialProfile={profile}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onComplete={handleOnboardingComplete}
          />
        </main>
      </div>
    );
  }

  // Authorization Check: Can the active user access this screen?
  const isAuthorized = currentUser
    ? auth.canAccessScreen(currentUser.role, currentScreen)
    : auth.canAccessScreen(currentRole, currentScreen);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 flex flex-col antialiased selection:bg-amber-200">
      {/* Sticky Header with Network Status, User Identity & Role Switcher */}
      <Header
        currentRole={currentRole}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onNavigate={setCurrentScreen}
        unreadCount={unreadNotifications}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Navigation Bars (Desktop Sub-bar & Mobile Sticky Bottom Bar) */}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        currentRole={currentRole}
        currentLanguage={currentLanguage}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Main Content Area with RBAC Route Guarding */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6">
        {/* UNAUTHORIZED ACCESS ATTEMPT (403 FORBIDDEN) */}
        {!isAuthorized ? (
          <AccessDenied
            currentUser={
              currentUser || {
                id: 'anon',
                name: 'Guest',
                phone: '',
                role: currentRole,
                language: currentLanguage,
                createdAt: ''
              }
            }
            attemptedScreen={currentScreen}
            currentLanguage={currentLanguage}
            onNavigateHome={() => setCurrentScreen(auth.getDefaultScreenForRole(currentRole))}
            onSwitchAccount={() => setShowAuthModal(true)}
          />
        ) : (
          /* AUTHORIZED SCREENS */
          <>
            {/* SCREEN: FARMER HOME */}
            {currentScreen === 'home' && currentRole === 'farmer' && (
              <FarmerDashboard
                profile={profile}
                currentLanguage={currentLanguage}
                onNavigate={setCurrentScreen}
                onSelectCropForScan={(cropId) => {
                  setPreSelectedCropForScan(cropId);
                  setCurrentScreen('diseaseDetect');
                }}
              />
            )}

            {/* SCREEN: CROP DISEASE DETECTION */}
            {currentScreen === 'diseaseDetect' && (
              <DiseaseDetection
                profile={profile}
                currentLanguage={currentLanguage}
                onNavigateToTreatment={handleNavigateToTreatment}
                initialCropId={preSelectedCropForScan || 'chilli'}
              />
            )}

            {/* SCREEN: TREATMENT GUIDE */}
            {currentScreen === 'treatmentGuide' && (
              <TreatmentGuide
                currentLanguage={currentLanguage}
                selectedDiseaseId={selectedDiseaseForTreatment}
              />
            )}

            {/* SCREEN: MARKET & MANDI PRICES */}
            {currentScreen === 'marketPrices' && (
              <>
                {currentRole === 'trader' ? (
                  <TraderDashboard
                    currentLanguage={currentLanguage}
                    onNavigate={setCurrentScreen}
                  />
                ) : (
                  <MarketAndBuyers
                    profile={profile}
                    currentLanguage={currentLanguage}
                    initialTab="prices"
                  />
                )}
              </>
            )}

            {/* SCREEN: BUYERS & FPOS */}
            {currentScreen === 'buyersFPOs' && (
              <>
                {currentRole === 'buyer' ? (
                  <BuyerDashboard
                    currentLanguage={currentLanguage}
                    onNavigate={setCurrentScreen}
                  />
                ) : (
                  <MarketAndBuyers
                    profile={profile}
                    currentLanguage={currentLanguage}
                    initialTab="buyers"
                    preSelectedCrop={preSelectedCropForSell}
                  />
                )}
              </>
            )}

            {/* SCREEN: COLD STORAGE BOOKING */}
            {currentScreen === 'coldStorage' && (
              <ColdStorageBooking
                profile={profile}
                currentLanguage={currentLanguage}
              />
            )}

            {/* SCREEN: FARM-GATE LOGISTICS BOOKING */}
            {currentScreen === 'logistics' && (
              <LogisticsBooking
                profile={profile}
                currentLanguage={currentLanguage}
              />
            )}

            {/* SCREEN: SERVICE PROVIDER OPERATIONS (COLD STORAGE & FLEET) */}
            {currentScreen === 'serviceProvider' && (
              <ServiceProviderDashboard
                currentLanguage={currentLanguage}
                onNavigate={setCurrentScreen}
              />
            )}

            {/* SCREEN: OFFLINE REQUESTS & SYNC */}
            {currentScreen === 'myRequests' && (
              <MyRequestsAndSync currentLanguage={currentLanguage} />
            )}

            {/* SCREEN: NOTIFICATIONS & WEATHER ALERTS */}
            {currentScreen === 'notifications' && (
              <NotificationsCenter
                currentLanguage={currentLanguage}
                onReadCountChange={setUnreadNotifications}
              />
            )}

            {/* SCREEN: SETTINGS & PREFERENCES */}
            {currentScreen === 'settings' && (
              <SettingsModal
                profile={profile}
                currentUser={currentUser}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                onProfileUpdate={setProfile}
                onResetOnboarding={handleResetOnboarding}
                onLogout={handleLogout}
                onOpenAuth={() => setShowAuthModal(true)}
              />
            )}

            {/* SCREEN: ADMIN DASHBOARD */}
            {currentScreen === 'admin' && (
              <AdminDashboard currentLanguage={currentLanguage} />
            )}

            {/* SCREEN: SYSTEM ARCHITECTURE & TELEMETRY */}
            {currentScreen === 'architecture' && <ArchitectureStatus />}
          </>
        )}
      </main>

      {/* LOGIN & SIGNUP AUTHENTICATION MODAL */}
      {showAuthModal && (
        <AuthModal
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onSuccess={handleAuthSuccess}
          onClose={() => {
            if (currentUser) setShowAuthModal(false);
          }}
          initialRole={currentRole}
        />
      )}
    </div>
  );
}
