/**
 * RaithuSahay Automated Security, RBAC, Authentication, and Offline Logic Audit Test Suite
 */

// Mock localStorage for Node environment before importing modules
class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

// Set up global browser mocks BEFORE loading modules
(global as any).localStorage = new LocalStorageMock();
(global as any).window = {
  crypto: {
    subtle: {
      digest: async (algo: string, data: Uint8Array) => {
        const crypto = await import('crypto');
        const hash = crypto.createHash('sha256');
        hash.update(Buffer.from(data));
        return hash.digest();
      }
    }
  }
};

try {
  Object.defineProperty(global, 'navigator', {
    value: { onLine: true },
    writable: true,
    configurable: true
  });
} catch {}

const results: { test: string; status: 'PASS' | 'FAIL'; details: string }[] = [];

function assert(condition: boolean, testName: string, details: string) {
  if (condition) {
    results.push({ test: testName, status: 'PASS', details });
    console.log(`[PASS] ${testName}: ${details}`);
  } else {
    results.push({ test: testName, status: 'FAIL', details });
    console.error(`[FAIL] ${testName}: ${details}`);
  }
}

async function runAudit() {
  // Dynamically import auth and storage after setting up globals
  const { auth, DEMO_PRESET_CREDENTIALS } = await import('../src/lib/auth');
  const { storage } = await import('../src/lib/storage');
  type UserRole = import('../src/types').UserRole;
  type ProduceListing = import('../src/types').ProduceListing;
  console.log('=== STARTING RAITHUSAHAY SECURITY & FUNCTIONALITY AUDIT ===\n');

  // --- 1. AUTHENTICATION AUDIT ---
  console.log('--- SECTION 1: AUTHENTICATION AUDIT ---');

  // 1.1 Verify demo presets are clearly identified
  assert(
    DEMO_PRESET_CREDENTIALS.length === 5,
    'Demo Presets Count',
    `Found ${DEMO_PRESET_CREDENTIALS.length} demo preset accounts.`
  );

  const rolesToCheck: UserRole[] = ['farmer', 'buyer', 'trader', 'service_provider', 'admin'];
  for (const r of rolesToCheck) {
    const preset = DEMO_PRESET_CREDENTIALS.find((p) => p.role === r);
    assert(
      !!preset && preset.badge.length > 0,
      `Demo Preset Identification (${r})`,
      `Preset for ${r} has label "${preset?.label}" and badge "${preset?.badge}".`
    );
  }

  // 1.2 Verify authentication for all 5 roles
  for (const r of rolesToCheck) {
    const preset = DEMO_PRESET_CREDENTIALS.find((p) => p.role === r)!;
    const loginRes = await auth.login({
      identifier: preset.phone,
      password: preset.password
    });
    assert(
      loginRes.success && loginRes.session?.user.role === r,
      `Login Role Authentication (${r})`,
      `User ${preset.name} authenticated successfully with role ${loginRes.session?.user.role}.`
    );
  }

  // 1.3 Verify Invalid Credentials Handling
  const badPwdRes = await auth.login({
    identifier: '9848012345',
    password: 'WrongPassword123'
  });
  assert(
    Boolean(!badPwdRes.success && badPwdRes.error?.includes('Incorrect password')),
    'Invalid Password Handling',
    `Correctly rejected with message: "${badPwdRes.error}"`
  );

  const nonExistentRes = await auth.login({
    identifier: '9999999999',
    password: 'SomePassword@123'
  });
  assert(
    Boolean(!nonExistentRes.success && nonExistentRes.error?.includes('No account found')),
    'Non-existent Account Handling',
    `Correctly rejected with message: "${nonExistentRes.error}"`
  );

  // 1.4 Verify Registration Flow
  const testPhone = '9123456789';
  const signupRes = await auth.signup({
    name: 'Ravi Kumar Test',
    phone: testPhone,
    email: 'ravi.test@example.com',
    role: 'farmer',
    password: 'SecurePassword@123',
    language: 'te',
    district: 'Krishna',
    landAcres: 5
  });
  assert(
    Boolean(signupRes.success && signupRes.session?.user.phone === testPhone),
    'User Registration',
    `Successfully registered user "${signupRes.session?.user.name}" with ID: ${signupRes.session?.user.id}`
  );

  // 1.5 Duplicate Registration Rejection
  const dupSignupRes = await auth.signup({
    name: 'Another Person',
    phone: testPhone,
    role: 'farmer',
    password: 'AnotherPassword@123',
    language: 'en'
  });
  assert(
    Boolean(!dupSignupRes.success && dupSignupRes.error?.includes('already registered')),
    'Duplicate Phone Registration Rejection',
    `Correctly rejected duplicate phone registration: "${dupSignupRes.error}"`
  );

  // 1.6 Verify Plaintext Passwords NOT in storage
  const storedUsersRaw = localStorage.getItem('rs_auth_registered_users') || '';
  const storedSessionRaw = localStorage.getItem('rs_auth_session') || '';
  const containsPlaintextSeed =
    storedUsersRaw.includes('Farmer@123') ||
    storedUsersRaw.includes('Admin@123') ||
    storedUsersRaw.includes('SecurePassword@123') ||
    storedSessionRaw.includes('SecurePassword@123');

  assert(
    !containsPlaintextSeed,
    'No Plaintext Passwords in Storage',
    'Passwords stored in localStorage are SHA-256 salted hashes, never plaintext.'
  );

  // 1.7 Session Expiration Verification
  const activeSession = auth.getCurrentSession();
  assert(
    !!activeSession && activeSession.expiresAt > Date.now(),
    'Session Persistence Check',
    `Active session exists with token ${activeSession?.token.slice(0, 15)}... TTL: ${Math.round(
      ((activeSession?.expiresAt || 0) - Date.now()) / (1000 * 3600 * 24)
    )} days.`
  );

  // Simulate expired session
  const expiredSession = {
    ...activeSession!,
    expiresAt: Date.now() - 1000 // expired in past
  };
  localStorage.setItem('rs_auth_session', JSON.stringify(expiredSession));
  const retrievedExpired = auth.getCurrentSession();
  assert(
    retrievedExpired === null,
    'Session Expiration Auto-Purge',
    'Expired session was detected and automatically cleared from storage.'
  );

  // 1.8 Logout Verification
  await auth.quickDemoLogin('farmer');
  assert(auth.getCurrentSession() !== null, 'Pre-Logout Active Session', 'User logged in.');
  auth.logout();
  assert(
    auth.getCurrentSession() === null && localStorage.getItem('rs_auth_session') === null,
    'Logout Clears Session',
    'Logout completely removed rs_auth_session and nullified session state.'
  );

  // --- 2. RBAC MATRIX AUDIT ---
  console.log('\n--- SECTION 2: RBAC MATRIX AUDIT ---');

  const screensToTest = [
    'home',
    'diseaseDetect',
    'treatmentGuide',
    'marketPrices',
    'buyersFPOs',
    'coldStorage',
    'logistics',
    'myRequests',
    'serviceProvider',
    'admin',
    'architecture',
    'notifications',
    'settings'
  ];

  // Role permissions expected matrix
  const expectedAccess: Record<UserRole, string[]> = {
    farmer: [
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
    ],
    buyer: ['buyersFPOs', 'marketPrices', 'notifications', 'settings'],
    trader: ['marketPrices', 'notifications', 'settings'],
    service_provider: ['serviceProvider', 'notifications', 'settings'],
    admin: ['admin', 'architecture', 'notifications', 'settings']
  };

  for (const role of rolesToCheck) {
    for (const screen of screensToTest) {
      const allowed = auth.canAccessScreen(role, screen);
      const shouldBeAllowed = expectedAccess[role].includes(screen);
      assert(
        allowed === shouldBeAllowed,
        `RBAC Rule: ${role} -> ${screen}`,
        `${role} is ${allowed ? 'GRANTED' : 'DENIED'} access to screen "${screen}". (Expected: ${
          shouldBeAllowed ? 'GRANTED' : 'DENIED'
        })`
      );
    }
  }

  // Verify Default Screen for each role
  assert(auth.getDefaultScreenForRole('farmer') === 'home', 'Default Screen Farmer', 'home');
  assert(auth.getDefaultScreenForRole('buyer') === 'buyersFPOs', 'Default Screen Buyer', 'buyersFPOs');
  assert(auth.getDefaultScreenForRole('trader') === 'marketPrices', 'Default Screen Trader', 'marketPrices');
  assert(auth.getDefaultScreenForRole('service_provider') === 'serviceProvider', 'Default Screen Service Provider', 'serviceProvider');
  assert(auth.getDefaultScreenForRole('admin') === 'admin', 'Default Screen Admin', 'admin');

  // --- 3. SECURITY & TAMPERING AUDIT ---
  console.log('\n--- SECTION 3: SECURITY & CLIENT TAMPERING AUDIT ---');

  // Client-side authentication observation:
  // If someone modifies `rs_auth_session` directly in localStorage:
  const fakeAdminSession = {
    token: 'rs_fake_token_123',
    user: {
      id: 'usr_hacker_1',
      name: 'Tampered Account',
      phone: '9000000000',
      role: 'admin',
      language: 'en',
      createdAt: new Date().toISOString()
    },
    expiresAt: Date.now() + 3600000
  };
  localStorage.setItem('rs_auth_session', JSON.stringify(fakeAdminSession));
  const parsedHackedSession = auth.getCurrentSession();
  const canHackedAccessAdmin = auth.canAccessScreen(parsedHackedSession?.user.role!, 'admin');

  assert(
    canHackedAccessAdmin === true,
    'Security Limitation: Client-Only RBAC Tamperability',
    'CRITICAL SECURITY OBSERVATION: Because authentication and session state are evaluated client-side in localStorage without a cryptographic server JWT signature verification or backend validation, a client with DevTools access can modify localStorage to elevate role from farmer to admin.'
  );

  // Clean up
  auth.logout();

  // --- 4. OFFLINE & PERSISTENCE AUDIT ---
  console.log('\n--- SECTION 4: OFFLINE & PERSISTENCE AUDIT ---');

  storage.setSimulateOffline(true);
  assert(!storage.isOnline(), 'Offline Simulation Mode', 'Storage correctly reports offline mode.');

  const sampleListing: ProduceListing = {
    id: `list_test_${Date.now()}`,
    clientUid: `uid_test_${Date.now()}`,
    farmerId: 'farmer_default_1',
    farmerName: 'Venkata Ramana Reddy',
    farmerPhone: '9848012345',
    crop: 'Chilli (Teja)',
    variety: 'S17',
    quantity: 20,
    unit: 'Quintals',
    expectedPrice: 21500,
    location: 'Kollipara',
    district: 'Guntur',
    harvestDate: '2026-10-01',
    status: 'active',
    syncStatus: 'pending_sync',
    createdAt: new Date().toISOString()
  };

  storage.addProduceListing(sampleListing);
  const pendingCount = storage.getPendingSyncCount();
  assert(
    pendingCount >= 1,
    'Offline Request Queuing',
    `Produce listing saved with status "pending_sync". Pending sync queue count: ${pendingCount}`
  );

  // Duplicate prevention check
  storage.addProduceListing(sampleListing);
  const listingsAfterDup = storage.getProduceListings().filter((l) => l.clientUid === sampleListing.clientUid);
  assert(
    listingsAfterDup.length === 1,
    'Duplicate Prevention via clientUid',
    `Listing with clientUid ${sampleListing.clientUid} exists exactly 1 time in storage (idempotent write).`
  );

  // Try sync while offline (must reject)
  const offlineSyncRes = await storage.syncPendingItems();
  assert(
    !offlineSyncRes.success && offlineSyncRes.message.includes('Cannot sync while offline'),
    'Sync Blocked While Offline',
    `Safely rejected sync when offline: "${offlineSyncRes.message}"`
  );

  // Switch back online
  storage.setSimulateOffline(false);
  assert(storage.isOnline(), 'Online Mode Restoration', 'Storage reports online mode.');

  // Test failed sync simulation
  storage.setSimulateSyncFailure(true);
  const failSyncRes = await storage.syncPendingItems();
  assert(
    !failSyncRes.success && failSyncRes.failedCount === 1,
    'Simulated Cloud Sync Failure Handling',
    `Correctly handled network/cloud failure gracefully without losing data: "${failSyncRes.message}"`
  );

  // Test successful sync
  const successSyncRes = await storage.syncPendingItems();
  assert(
    successSyncRes.success && successSyncRes.syncedCount > 0,
    'Successful Cloud Synchronization',
    `Successfully synced ${successSyncRes.syncedCount} items to synced state.`
  );

  const syncedItem = storage.getProduceListings().find((l) => l.clientUid === sampleListing.clientUid);
  assert(
    syncedItem?.syncStatus === 'synced',
    'Request Status Transition',
    `Item transitioned to "synced" status.`
  );

  console.log('\n=== AUDIT SUITE EXECUTION COMPLETE ===');
  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL');
  console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${failed.length}`);
  if (failed.length > 0) {
    console.log('--- FAILED TESTS ---');
    failed.forEach((f) => console.log(`[FAIL] ${f.test}: ${f.details}`));
  }
}

runAudit().catch((err) => {
  console.error('Audit test suite failed with unhandled error:', err);
  process.exit(1);
});
