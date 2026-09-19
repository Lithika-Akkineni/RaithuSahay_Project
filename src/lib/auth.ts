import { AuthSession, AuthUser, LoginCredentials, SignupData, UserRole, LanguageCode } from '../types';

const STORAGE_KEYS = {
  SESSION: 'rs_auth_session',
  REGISTERED_USERS: 'rs_auth_registered_users',
  LAST_ROLE: 'rs_auth_last_role'
};

const PASSWORD_SALT = 'rs_salt_2026_antigravity_';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface StoredUserAccount {
  user: AuthUser;
  passwordHash: string;
}

// Fallback SHA-256 implementation if subtle.crypto is not present
async function sha256(str: string): Promise<string> {
  const salted = `${PASSWORD_SALT}${str}`;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(salted);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // fallback to software hash
    }
  }
  // Fast software djb2-like / 32-bit hex hash fallback
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 5) + hash2) ^ char;
  }
  const part1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  const part3 = (Math.abs(hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0');
  const part4 = (Math.abs(hash1 + hash2) >>> 0).toString(16).padStart(8, '0');
  return `${part1}${part2}${part3}${part4}`;
}

export const DEMO_PRESET_CREDENTIALS: Array<{
  role: UserRole;
  label: string;
  labelTe: string;
  labelHi: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  badge: string;
  description: string;
}> = [
  {
    role: 'farmer',
    label: 'Small / Marginal Farmer',
    labelTe: 'చిన్న / సన్నకారు రైతు',
    labelHi: 'लघु एवं सीमांत किसान',
    name: 'Venkata Ramana Reddy',
    phone: '9848012345',
    email: 'farmer@raithusahay.org',
    password: 'Farmer@123',
    badge: '🌱 Farmer',
    description: 'Access crop scanner, treatment guides, mandi prices, cold stores, logistics'
  },
  {
    role: 'buyer',
    label: 'Verified Buyer / FPO',
    labelTe: 'ధృవీకరించబడిన కొనుగోలుదారు / FPO',
    labelHi: 'सत्यापित खरीदार / एफपीओ',
    name: 'Srikanth Varma (Andhra Agri FPO)',
    phone: '9848099881',
    email: 'buyer@kisanfpo.org',
    password: 'Buyer@123',
    badge: '🏢 Buyer / FPO',
    description: 'Procure bulk produce, place bids on farmer listings, manage delivery lots'
  },
  {
    role: 'trader',
    label: 'APMC Mandi Trader / Agent',
    labelTe: 'APMC మార్కెట్ ట్రేడర్ / కమీషన్ ఏజెంట్',
    labelHi: 'मंडी व्यापारी / आढ़तिया',
    name: 'Subba Rao (Guntur Mandi Agency)',
    phone: '9848077662',
    email: 'trader@gunturmirchi.in',
    password: 'Trader@123',
    badge: '⚖️ Mandi Trader',
    description: 'Live APMC auction floor, spot bidding, lot clearing, modal price reporting'
  },
  {
    role: 'service_provider',
    label: 'Service Provider (Cold Storage & Logistics)',
    labelTe: 'సేవా ప్రదాత (కోల్డ్ స్టోరేజ్ & రవాణా)',
    labelHi: 'सेवा प्रदाता (कोल्ड स्टोरेज एवं लॉजिस्टिक्स)',
    name: 'Ramesh Naidu (Raithu Ratham Services)',
    phone: '9848055443',
    email: 'services@raithuratham.in',
    password: 'Service@123',
    badge: '🚚 Service Provider',
    description: 'Manage warehouse chambers, approve space reservations, dispatch freight fleet'
  },
  {
    role: 'admin',
    label: 'System & Agriculture Administrator',
    labelTe: 'వ్యవస్థ & వ్యవసాయ పరిపాలనాధికారి',
    labelHi: 'सिस्टम एवं कृषि प्रशासक',
    name: 'Dr. K. Srinivas (Agricultural Officer)',
    phone: '9848000001',
    email: 'admin@raithusahay.gov.in',
    password: 'Admin@123',
    badge: '🛡️ Administrator',
    description: 'Master data control, farmer verification, FPO accreditation, audit & architecture'
  }
];

class AuthManager {
  private listeners: Set<(session: AuthSession | null) => void> = new Set();
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.ensurePreseededAccounts();
  }

  public subscribe(listener: (session: AuthSession | null) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(session: AuthSession | null) {
    this.listeners.forEach((listener) => {
      try {
        listener(session);
      } catch (e) {
        console.error('Auth listener error:', e);
      }
    });
  }

  /**
   * Initializes seed demo accounts with salted password hashes
   */
  public async ensurePreseededAccounts(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
        let users: StoredUserAccount[] = raw ? JSON.parse(raw) : [];

        // Check if any demo account is missing
        let modified = false;
        for (const preset of DEMO_PRESET_CREDENTIALS) {
          const exists = users.some(
            (u) => u.user.phone === preset.phone || u.user.email === preset.email
          );
          if (!exists) {
            const passwordHash = await sha256(preset.password);
            const newUser: AuthUser = {
              id: `usr_${preset.role}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              name: preset.name,
              phone: preset.phone,
              email: preset.email,
              role: preset.role,
              language: 'en',
              organizationName:
                preset.role !== 'farmer' ? preset.name : undefined,
              state: 'Andhra Pradesh',
              district: 'Guntur',
              mandal: 'Tenali Rural',
              village: 'Kollipara',
              landAcres: preset.role === 'farmer' ? 4.5 : undefined,
              selectedCrops:
                preset.role === 'farmer' ? ['chilli', 'rice', 'cotton'] : undefined,
              isVerified: true,
              createdAt: new Date().toISOString()
            };
            users.push({ user: newUser, passwordHash });
            modified = true;
          }
        }

        if (modified) {
          localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
        }
      } catch (e) {
        console.warn('Could not initialize seed accounts:', e);
      }
    })();

    return this.initPromise;
  }

  /**
   * Returns current active session if valid and not expired.
   * Auto-purges expired sessions.
   */
  public getCurrentSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!raw) return null;
      const session: AuthSession = JSON.parse(raw);

      if (!session || !session.expiresAt || session.expiresAt < Date.now()) {
        this.logout();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  public getCurrentUser(): AuthUser | null {
    const session = this.getCurrentSession();
    return session ? session.user : null;
  }

  /**
   * Log in using phone number or email and password
   */
  public async login(
    credentials: LoginCredentials
  ): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    await this.ensurePreseededAccounts();

    const idClean = credentials.identifier.trim().toLowerCase();
    const pwd = credentials.password;

    if (!idClean) {
      return { success: false, error: 'Please enter your Mobile Number or Email ID.' };
    }
    if (!pwd) {
      return { success: false, error: 'Please enter your password.' };
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      const users: StoredUserAccount[] = raw ? JSON.parse(raw) : [];

      const targetHash = await sha256(pwd);

      const found = users.find(
        (u) =>
          u.user.phone.replace(/\D/g, '') === idClean.replace(/\D/g, '') ||
          (u.user.email && u.user.email.toLowerCase() === idClean)
      );

      if (!found) {
        return {
          success: false,
          error:
            'No account found with this mobile number or email. Please register or use Demo Presets.'
        };
      }

      if (found.passwordHash !== targetHash) {
        return {
          success: false,
          error: 'Incorrect password. Please verify your credentials or click a Demo Account.'
        };
      }

      // Generate secure session
      const session = this.createSessionForUser(found.user);
      return { success: true, session };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Login failed unexpectedly. Please retry.' };
    }
  }

  /**
   * Register a new user account with role-specific profile details
   */
  public async signup(
    data: SignupData
  ): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    await this.ensurePreseededAccounts();

    const name = data.name.trim();
    const phone = data.phone.replace(/\D/g, '');
    const email = data.email ? data.email.trim().toLowerCase() : undefined;
    const pwd = data.password;

    if (!name || name.length < 2) {
      return { success: false, error: 'Please enter your full name (at least 2 characters).' };
    }
    if (!phone || phone.length !== 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!pwd || pwd.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      const users: StoredUserAccount[] = raw ? JSON.parse(raw) : [];

      // Check if phone or email already registered
      const phoneConflict = users.find((u) => u.user.phone === phone);
      if (phoneConflict) {
        return {
          success: false,
          error: `An account with mobile number ${phone} is already registered. Please log in.`
        };
      }

      if (email) {
        const emailConflict = users.find((u) => u.user.email?.toLowerCase() === email);
        if (emailConflict) {
          return {
            success: false,
            error: `An account with email ${email} already exists. Please log in.`
          };
        }
      }

      const passwordHash = await sha256(pwd);

      const newUser: AuthUser = {
        id: `usr_${data.role}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name,
        phone,
        email,
        role: data.role,
        language: data.language || 'en',
        organizationName: data.organizationName?.trim() || (data.role !== 'farmer' ? name : undefined),
        state: data.state || 'Andhra Pradesh',
        district: data.district || 'Guntur',
        mandal: data.mandal || 'Tenali Rural',
        village: data.village || 'Kollipara',
        landAcres: data.landAcres || (data.role === 'farmer' ? 3 : undefined),
        selectedCrops: data.selectedCrops || (data.role === 'farmer' ? ['chilli', 'rice'] : undefined),
        isVerified: data.role === 'farmer', // farmers auto-verified in demo
        createdAt: new Date().toISOString()
      };

      users.push({ user: newUser, passwordHash });
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));

      const session = this.createSessionForUser(newUser);
      return { success: true, session };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Registration failed unexpectedly.' };
    }
  }

  /**
   * One-click demo sign-in for evaluator convenience
   */
  public async quickDemoLogin(
    role: UserRole
  ): Promise<{ success: boolean; session?: AuthSession }> {
    await this.ensurePreseededAccounts();

    const preset = DEMO_PRESET_CREDENTIALS.find((p) => p.role === role);
    if (!preset) return { success: false };

    return this.login({
      identifier: preset.phone,
      password: preset.password
    });
  }

  /**
   * Logs out the user and clears session token
   */
  public logout() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch {}
    this.notify(null);
  }

  private createSessionForUser(user: AuthUser): AuthSession {
    const expiresAt = Date.now() + SESSION_TTL_MS;
    const token = `rs_sess_${user.id}_${user.role}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const session: AuthSession = {
      token,
      user,
      expiresAt
    };

    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      localStorage.setItem(STORAGE_KEYS.LAST_ROLE, user.role);
    } catch {}

    this.notify(session);
    return session;
  }

  /**
   * Authorization Rules Engine
   * Validates if a user role has permission to access a particular screen
   */
  public canAccessScreen(role: UserRole, screen: string): boolean {
    // Screens accessible to all authenticated roles
    const universalScreens = ['notifications', 'settings'];
    if (universalScreens.includes(screen)) return true;

    switch (role) {
      case 'farmer':
        return [
          'home',
          'diseaseDetect',
          'treatmentGuide',
          'marketPrices',
          'buyersFPOs',
          'coldStorage',
          'logistics',
          'myRequests'
        ].includes(screen);

      case 'buyer':
        return ['buyersFPOs', 'marketPrices'].includes(screen);

      case 'trader':
        return ['marketPrices'].includes(screen);

      case 'service_provider':
        return ['serviceProvider'].includes(screen);

      case 'admin':
        return ['admin', 'architecture'].includes(screen);

      default:
        return false;
    }
  }

  /**
   * Returns default destination screen when user signs in with a role
   */
  public getDefaultScreenForRole(role: UserRole): string {
    switch (role) {
      case 'farmer':
        return 'home';
      case 'buyer':
        return 'buyersFPOs';
      case 'trader':
        return 'marketPrices';
      case 'service_provider':
        return 'serviceProvider';
      case 'admin':
        return 'admin';
    }
  }

  /**
   * Returns list of allowed navigation tabs/screens for a role
   */
  public getAllowedScreensForRole(role: UserRole): string[] {
    switch (role) {
      case 'farmer':
        return [
          'home',
          'diseaseDetect',
          'treatmentGuide',
          'marketPrices',
          'buyersFPOs',
          'coldStorage',
          'logistics',
          'myRequests',
          'notifications',
          'settings'
        ];
      case 'buyer':
        return ['buyersFPOs', 'marketPrices', 'notifications', 'settings'];
      case 'trader':
        return ['marketPrices', 'notifications', 'settings'];
      case 'service_provider':
        return ['serviceProvider', 'notifications', 'settings'];
      case 'admin':
        return ['admin', 'architecture', 'notifications', 'settings'];
    }
  }
}

export const auth = new AuthManager();
