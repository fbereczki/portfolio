/* Demo-mode shim for iframed SPAs (Beacon Enterprise, CodeWitness Hub).
 *
 * Strategy:
 *   1. Pre-populate localStorage with placeholder JWTs so the auth gate
 *      lets the SPA render its main shell instead of /login.
 *   2. Intercept BOTH fetch() AND XMLHttpRequest (axios uses XHR) — return
 *      a defensive base-shape that contains every common field name a
 *      consumer might call .length / .find / .map / .filter on. URL-aware
 *      overrides add specific fixtures (regulations, teams, projects, etc.)
 *   3. Suppress Service Worker registration silently.
 *
 * NOTE: tokens are placeholder; a real backend would reject the demo JWT.
 * No data leaves the iframe — there's no backend to reach.
 */
(function () {
  var demoJwt =
    'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0' +
    '.eyJzdWIiOiJkZW1vLXBvcnRmb2xpbyIsIm5hbWUiOiJEZW1vIFVzZXIiLCJlbWFpbCI6ImRlbW9AcG9ydGZvbGlvLmxvY2FsIiwidGVuYW50X2lkIjoiZGVtby10ZW5hbnQiLCJyb2xlIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6WyIqIl0sImlhdCI6MTcwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ' +
    '.demo-not-validated';

  // ── 1. localStorage seeding ──
  try {
    localStorage.setItem('token', demoJwt);
    localStorage.setItem('currentTenantId', 'demo-tenant');
    localStorage.setItem('themeMode', 'dark');
    localStorage.setItem('pl_access_token', demoJwt);
    localStorage.setItem('cw1019_jwt', demoJwt);
    localStorage.setItem('nexus_api_key', demoJwt);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 'demo',
        name: 'Demo User',
        email: 'demo@portfolio.local',
        role: 'admin',
        tenant_id: 'demo-tenant',
        permissions: ['*'],
      })
    );
  } catch (_) {}

  // ── Demo fixtures ──
  var DEMO_USER = {
    id: 'demo',
    name: 'Demo User',
    email: 'demo@portfolio.local',
    role: 'admin',
    tenant_id: 'demo-tenant',
    permissions: ['*'],
  };

  var DEMO_TENANT = {
    id: 'demo-tenant',
    tenant_id: 'demo-tenant',
    name: 'Demo Tenant',
    slug: 'demo',
    role: 'admin',
    permissions: ['*'],
    plan: 'enterprise',
    plan_tier: 'enterprise',
    features_enabled: true,
  };

  var DEMO_REGULATIONS = [
    { id: 1, country: 'HU', country_code: 'HU', name: 'NIS2 implementation', total: 14, mandatory: 9, recommended: 5 },
    { id: 2, country: 'DE', country_code: 'DE', name: 'BSI Grundschutz', total: 22, mandatory: 16, recommended: 6 },
    { id: 3, country: 'FR', country_code: 'FR', name: 'ANSSI directives', total: 18, mandatory: 12, recommended: 6 },
    { id: 4, country: 'IT', country_code: 'IT', name: 'Perimetro Cibernetico', total: 11, mandatory: 7, recommended: 4 },
    { id: 5, country: 'ES', country_code: 'ES', name: 'ENS · Esquema Nacional', total: 9, mandatory: 6, recommended: 3 },
    { id: 6, country: 'PL', country_code: 'PL', name: 'Krajowy System Cyber', total: 8, mandatory: 5, recommended: 3 },
    { id: 7, country: 'NL', country_code: 'NL', name: 'BIO baseline', total: 12, mandatory: 9, recommended: 3 },
    { id: 8, country: 'AT', country_code: 'AT', name: 'NISG · Austrian NIS', total: 10, mandatory: 7, recommended: 3 },
    { id: 9, country: 'CZ', country_code: 'CZ', name: 'NÚKIB framework', total: 7, mandatory: 4, recommended: 3 },
    { id: 10, country: 'RO', country_code: 'RO', name: 'CERT-RO directives', total: 6, mandatory: 4, recommended: 2 },
  ];
  var DEMO_COUNTRY_STATS = DEMO_REGULATIONS.map(function (r) {
    return {
      country: r.country,
      country_code: r.country_code,
      total: r.total,
      mandatory: r.mandatory,
      recommended: r.recommended,
    };
  });

  // Beacon dashboard reads: name, allocated_fte, total_fte, utilization_percent,
  // projects (ARRAY — each item has code/name/cost_per_project), special_logic.
  // The dashboard does r.projects?.map(p => ...) — projects must be an array,
  // not a number, otherwise (5).map crashes.
  function teamProjects(codes) {
    return codes.map(function (code) {
      var p = DEMO_PROJECTS_RAW.filter(function (x) { return x.code === code; })[0] || {};
      return {
        id: p.id || code,
        code: code,
        name: p.name || code,
        cost_per_project: (p.total_cost || 200000),
        revenue: p.revenue || 300000,
        margin: p.margin || 15,
        status: p.status || 'active',
      };
    });
  }
  // forward declaration — populated after DEMO_PROJECTS_RAW
  var DEMO_TEAMS;
  var DEMO_PROJECTS_RAW = [
    { id: 'p1', name: 'OEM-X Driver-Assist Gateway', code: 'HOPE-OEM-X', complexity: 'Complex', phase: 'Implementation', status: 'active', md_baseline: 468, md_effective: 762, gate: 'G3', team_id: 't1', calculation_method: 'enhanced', revenue: 1200000, total_cost: 980000, margin: 18.3 },
    { id: 'p2', name: 'OEM-Y Telematics Hub', code: 'HOPE-OEM-Y', complexity: 'Normal', phase: 'Design', status: 'planning', md_baseline: 320, md_effective: 521, gate: 'G2', team_id: 't2', calculation_method: 'enhanced', revenue: 860000, total_cost: 720000, margin: 16.3 },
    { id: 'p3', name: 'Tier-1 ECU SecureBoot', code: 'KB-T1-ECU', complexity: 'Complex', phase: 'Verification', status: 'active', md_baseline: 410, md_effective: 668, gate: 'G4', team_id: 't3', calculation_method: 'enhanced', revenue: 1100000, total_cost: 940000, margin: 14.5 },
    { id: 'p4', name: 'Fleet Telemetry Platform', code: 'FLE-TEL', complexity: 'Simple', phase: 'Concept', status: 'planning', md_baseline: 180, md_effective: 293, gate: 'G1', team_id: 't5', calculation_method: 'classic', revenue: 410000, total_cost: 360000, margin: 12.2 },
  ];
  DEMO_TEAMS = [
    { id: 't1', name: 'Cyber-Sec EU Central', code: 'CS-EU', region: 'EU', lead: 'Bereczki F.', member_count: 12, project_count: 1, projects: teamProjects(['HOPE-OEM-X']),                          capacity_md: 2200, allocated_fte: 10.1, total_fte: 12.0, utilization: 0.84, utilization_percent: 84, cost_per_project: 980000,  special_logic: null },
    { id: 't2', name: 'Automotive Compliance',  code: 'AC-DE', region: 'DE', lead: 'Schmidt M.',   member_count: 8,  project_count: 1, projects: teamProjects(['HOPE-OEM-Y']),                          capacity_md: 1500, allocated_fte: 5.7,  total_fte: 8.0,  utilization: 0.71, utilization_percent: 71, cost_per_project: 720000,  special_logic: null },
    { id: 't3', name: 'TARA & HARA Specialists', code: 'TH-SQ', region: 'EU', lead: 'Costa A.',     member_count: 6,  project_count: 1, projects: teamProjects(['KB-T1-ECU']),                            capacity_md: 1100, allocated_fte: 5.5,  total_fte: 6.0,  utilization: 0.92, utilization_percent: 92, cost_per_project: 940000,  special_logic: null },
    { id: 't4', name: 'Verification & Validation', code: 'VV-IT', region: 'IT', lead: 'Romano L.',  member_count: 9,  project_count: 2, projects: teamProjects(['HOPE-OEM-X', 'KB-T1-ECU']),               capacity_md: 1700, allocated_fte: 7.0,  total_fte: 9.0,  utilization: 0.78, utilization_percent: 78, cost_per_project: 960000,  special_logic: null },
    { id: 't5', name: 'Cloud-Sec & DevSecOps',  code: 'CD-PL', region: 'PL', lead: 'Nowak K.',     member_count: 7,  project_count: 1, projects: teamProjects(['FLE-TEL']),                              capacity_md: 1300, allocated_fte: 4.6,  total_fte: 7.0,  utilization: 0.66, utilization_percent: 66, cost_per_project: 360000,  special_logic: null },
  ];

  var DEMO_PROJECTS = DEMO_PROJECTS_RAW;

  var DEMO_CUSTOMERS = [
    { id: 'c1', name: 'OEM-X Automotive', country: 'DE', tier: 'Tier-1', revenue: 2.4, margin_pct: 18 },
    { id: 'c2', name: 'OEM-Y GmbH', country: 'IT', tier: 'Tier-1', revenue: 0.86, margin_pct: 16 },
    { id: 'c3', name: 'Knorr-Bremse Tier-1 ECU', country: 'DE', tier: 'OEM', revenue: 1.1, margin_pct: 14.5 },
  ];

  // Beacon FeatureDefinition / FeatureToggle full shape (per types in source)
  var FEATURE_LIST = [
    { key: 'global_regulations_map', name: 'Global Regulations Map', cat: 'core', icon: 'map', route: '/regulations-map', label: 'Regulations' },
    { key: 'central_teams', name: 'Central Teams', cat: 'core', icon: 'group', route: '/central-teams', label: 'Teams' },
    { key: 'projects', name: 'Projects', cat: 'core', icon: 'folder', route: '/projects', label: 'Projects' },
    { key: 'customers', name: 'Customers', cat: 'core', icon: 'business', route: '/customers', label: 'Customers' },
    { key: 'reports', name: 'Reports', cat: 'optional', icon: 'description', route: '/reports', label: 'Reports' },
    { key: 'analytics', name: 'Analytics', cat: 'optional', icon: 'analytics', route: '/analytics', label: 'Analytics' },
    { key: 'beam', name: 'BEAM Workflow', cat: 'optional', icon: 'timeline', route: '/beam', label: 'BEAM' },
    { key: 'prism', name: 'PRISM Planning', cat: 'optional', icon: 'auto-awesome', route: '/prism', label: 'PRISM' },
    { key: 'frame', name: 'FRAME Foundation', cat: 'optional', icon: 'foundation', route: '/frame', label: 'Foundation' },
    { key: 'audit', name: 'Audit Trail', cat: 'core', icon: 'verified', route: '/audit', label: 'Audit' },
    { key: 'portal', name: 'Customer Portal', cat: 'optional', icon: 'public', route: '/portal', label: 'Portal' },
  ];
  var DEMO_FEATURE_DEFINITIONS = FEATURE_LIST.map(function (f) {
    return {
      feature_key: f.key,
      feature_name: f.name,
      category: f.cat,
      description: f.name + ' — demo feature',
      depends_on: null,
      conflicts_with: null,
      ui_route: f.route,
      sidebar_visible: true,
      sidebar_label: f.label,
      sidebar_icon: f.icon,
      simple_mode_default: f.cat === 'core',
      normal_mode_default: true,
      detailed_mode_default: true,
    };
  });
  var DEMO_FEATURE_TOGGLES = DEMO_FEATURE_DEFINITIONS.map(function (def, i) {
    return {
      id: 'tog-' + i,
      tenant_id: 'demo-tenant',
      feature_key: def.feature_key,
      enabled: true,
      preset_mode: 'detailed',
      definition: def,
    };
  });
  var DEMO_FEATURES_FLAT = FEATURE_LIST.reduce(function (acc, f) {
    acc[f.key] = true;
    return acc;
  }, {});

  // NOTE on shape: Dashboard renders { teamUtilData.summary.bottleneck_team }
  // directly as a React child, so it MUST be a primitive (string), not an object.
  // Same for max_additional_projects, avg_utilization — kept as numbers.
  var DEMO_TEAM_UTIL_SUMMARY = {
    bottleneck_team: 'TARA & HARA Specialists',
    bottleneck_team_id: 't3',
    bottleneck_utilization: 92,
    avg_utilization: 78,
    max_additional_projects: 3,
    total_capacity_md: 7800,
    total_demand_md: 6080,
  };

  // ── DEFENSIVE BASE SHAPE ──
  // Every response, no matter what URL, contains all of these keys with safe
  // empty-or-zero defaults. URL-specific code below merges richer fixtures
  // on top. This guarantees `.length` / `.find` / `.map` never crash.
  function baseShape() {
    return {
      // Generic wrappers
      data: [],
      items: [],
      results: [],
      records: [],
      list: [],
      // Domain collections
      teams: [],
      projects: [],
      customers: [],
      regulations: [],
      users: [],
      members: [],
      tenants: [DEMO_TENANT],
      definitions: [],
      toggles: [],
      notifications: [],
      roles: [],
      scenarios: [],
      assumptions: [],
      categories: [],
      templates: [],
      installations: [],
      published: [],
      featured: [],
      trending: [],
      bottlenecks: [],
      conflicts: [],
      tasks: [],
      events: [],
      reports: [],
      // Singular objects
      user: DEMO_USER,
      tenant: DEMO_TENANT,
      summary: {},
      settings: {},
      preferences: {},
      // Common scalars
      permissions: ['*'],
      features: DEMO_FEATURES_FLAT,
      count: 0,
      total: 0,
      ok: true,
      status: 'ok',
    };
  }

  function merge(base, over) {
    if (!over) return base;
    for (var k in over) {
      if (Object.prototype.hasOwnProperty.call(over, k)) {
        base[k] = over[k];
      }
    }
    return base;
  }

  // URL-aware overrides — applied on top of baseShape()
  function mockBodyFor(url) {
    var u = String(url || '').toLowerCase();
    var r = baseShape();

    // Auth / identity
    if (/\/(me|user|profile|whoami|currentuser)(\?|$|\/)/.test(u)) {
      return DEMO_USER;
    }
    if (/\/auth\/(verify|check|session|login|2fa)/.test(u)) {
      return { ok: true, valid: true, user: DEMO_USER, tokens: { access: demoJwt, refresh: demoJwt } };
    }
    if (/\/auth\/me/.test(u)) {
      return DEMO_USER;
    }

    // Tenants
    if (/\/(tenants|tenant)\/current|\/tenants\/me/.test(u)) {
      return DEMO_TENANT;
    }
    if (/\/(tenants|tenant)\/switch/.test(u)) {
      return { ok: true, tenant: DEMO_TENANT };
    }
    if (/\/(tenants|tenant)\/users/.test(u)) {
      return merge(r, { users: [DEMO_USER], data: [DEMO_USER] });
    }
    if (/\/tenants(\?|$|\/)/.test(u)) {
      return merge(r, { tenants: [DEMO_TENANT], data: [DEMO_TENANT] });
    }

    // Feature toggles
    if (/\/feature-toggles\/definitions/.test(u)) {
      return { count: DEMO_FEATURE_DEFINITIONS.length, definitions: DEMO_FEATURE_DEFINITIONS };
    }
    if (/\/feature-toggles\/preset/.test(u)) {
      return { ok: true, count: DEMO_FEATURE_TOGGLES.length, toggles: DEMO_FEATURE_TOGGLES };
    }
    if (/\/feature-toggles/.test(u)) {
      return { count: DEMO_FEATURE_TOGGLES.length, toggles: DEMO_FEATURE_TOGGLES };
    }

    // Regulations
    if (/\/regulations\/country-stats/.test(u)) {
      return merge(r, { data: DEMO_COUNTRY_STATS });
    }
    if (/\/regulations/.test(u)) {
      return merge(r, { data: DEMO_REGULATIONS, regulations: DEMO_REGULATIONS });
    }

    // Teams
    if (/\/central-teams\/metrics/.test(u)) {
      return {
        teams: DEMO_TEAMS,
        data: DEMO_TEAMS,
        summary: DEMO_TEAM_UTIL_SUMMARY,
        total_teams: DEMO_TEAMS.length,
        avg_utilization: 78,
      };
    }
    if (/\/central-teams\/what-if/.test(u)) {
      return { teams: DEMO_TEAMS, summary: DEMO_TEAM_UTIL_SUMMARY };
    }
    if (/\/central-teams|\/teams/.test(u)) {
      return merge(r, { data: DEMO_TEAMS, items: DEMO_TEAMS, teams: DEMO_TEAMS });
    }

    // Analytics — Dashboard depends on these heavily
    if (/\/analytics\/team-utilization/.test(u)) {
      return {
        teams: DEMO_TEAMS,
        summary: DEMO_TEAM_UTIL_SUMMARY,
      };
    }
    if (/\/analytics\/dashboard/.test(u)) {
      return {
        teams: DEMO_TEAMS,
        projects: DEMO_PROJECTS,
        customers: DEMO_CUSTOMERS,
        summary: DEMO_TEAM_UTIL_SUMMARY,
        portfolio_value: 4570000,
        avg_margin: 16.3,
      };
    }
    if (/\/analytics\/customer-profitability|\/analytics\/profitability/.test(u)) {
      return merge(r, {
        data: DEMO_CUSTOMERS,
        customers: DEMO_CUSTOMERS,
      });
    }
    if (/\/analytics\/(bottleneck|bottlenecks|bottleneck-trends)/.test(u)) {
      return merge(r, {
        bottlenecks: [{ team: DEMO_TEAMS[2], utilization: 0.92, week: '2026-W19' }],
        data: [{ team: DEMO_TEAMS[2], utilization: 0.92, week: '2026-W19' }],
      });
    }
    if (/\/analytics\/(margin|project-comparison|resource-heatmap)/.test(u)) {
      return merge(r, { data: DEMO_PROJECTS, projects: DEMO_PROJECTS });
    }
    if (/\/analytics/.test(u)) {
      return merge(r, { data: DEMO_PROJECTS, projects: DEMO_PROJECTS, summary: DEMO_TEAM_UTIL_SUMMARY });
    }

    // Projects
    if (/\/projects\/[^/]+$/.test(u)) {
      return DEMO_PROJECTS[0];
    }
    if (/\/projects/.test(u)) {
      return merge(r, { data: DEMO_PROJECTS, items: DEMO_PROJECTS, projects: DEMO_PROJECTS });
    }

    // Customers
    if (/\/customers/.test(u)) {
      return merge(r, { data: DEMO_CUSTOMERS, customers: DEMO_CUSTOMERS });
    }

    // Settings / config
    if (/\/config\/settings\/all/.test(u)) {
      return {
        rates: {},
        complexity_distribution: {},
        complexity_settings: {},
        project_duration: null,
        project_complexity: null,
        net_working_days: null,
        target_margin: null,
      };
    }
    if (/\/config\/navigation/.test(u)) {
      return merge(r, { data: [], items: [] });
    }
    if (/\/config\/master-lists/.test(u)) {
      return merge(r, { categories: [], data: [], lists: {} });
    }
    if (/\/config\/notifications/.test(u)) {
      return merge(r, { notifications: [], unread: 0, count: 0, data: [] });
    }
    if (/\/config\/activity/.test(u)) {
      return merge(r, { data: [], items: [], history: [] });
    }
    if (/\/notifications/.test(u)) {
      return merge(r, { notifications: [], unread: 0, count: 0, data: [], items: [] });
    }
    if (/\/settings|\/preferences|\/config/.test(u)) {
      return merge(r, { settings: {}, theme: 'dark', language: 'en' });
    }

    // Health / status / completeness / dashboard / errors-log / telemetry
    if (/\/dashboard\/completeness/.test(u)) {
      return {
        modules: [
          { module: 'events', has_data: true },
          { module: 'prompts', has_data: true },
          { module: 'tests', has_data: true },
          { module: 'prism', has_data: true },
          { module: 'beam', has_data: true },
          { module: 'frame', has_data: false },
          { module: 'scope', has_data: true },
          { module: 'sessions', has_data: true },
        ],
      };
    }
    if (/\/health|\/status|\/ping|\/version/.test(u)) {
      return { ok: true, status: 'ok', version: 'demo-1.0.0' };
    }
    if (/\/errors\/log|\/errors\/report|\/telemetry|\/analytics\/event/.test(u)) {
      return { ok: true };
    }

    // Marketplace / scenarios / assumptions / etc.
    if (/\/marketplace/.test(u)) {
      return merge(r, { data: [], items: [], featured: [], trending: [], categories: [] });
    }
    if (/\/scenarios|\/assumptions|\/calculations|\/portal|\/archive|\/reports|\/skills|\/smtp|\/ad\//.test(u)) {
      return merge(r, { data: [], items: [] });
    }
    if (/\/permissions(\?|$|\/)/.test(u)) {
      return ['*'];
    }
    if (/\/roles/.test(u)) {
      return merge(r, { roles: [{ id: 'admin', name: 'Admin', permissions: ['*'] }], data: [] });
    }

    // Default: defensive base shape
    return r;
  }

  function isApiUrl(u) {
    var s = String(u || '');
    return /\/api\/|\/v1\/|\/auth\/|\/graphql/.test(s);
  }

  // ── 2a. fetch() interceptor ──
  try {
    var origFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      if (!isApiUrl(url)) return origFetch(input, init);
      var body = JSON.stringify(mockBodyFor(url));
      return Promise.resolve(
        new Response(body, {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    };
  } catch (_) {}

  // ── 2b. XMLHttpRequest interceptor — for axios/jQuery-style clients ──
  try {
    var XHR = window.XMLHttpRequest;
    var origOpen = XHR.prototype.open;
    var origSend = XHR.prototype.send;
    var origSetHeader = XHR.prototype.setRequestHeader;
    var origAbort = XHR.prototype.abort;

    XHR.prototype.open = function (method, url) {
      this.__demo = { method: method, url: url, intercept: isApiUrl(url) };
      if (!this.__demo.intercept) return origOpen.apply(this, arguments);
    };
    XHR.prototype.setRequestHeader = function () {
      if (this.__demo && this.__demo.intercept) return;
      return origSetHeader.apply(this, arguments);
    };
    XHR.prototype.abort = function () {
      if (this.__demo && this.__demo.intercept) return;
      return origAbort.apply(this, arguments);
    };
    XHR.prototype.send = function () {
      var self = this;
      if (!this.__demo || !this.__demo.intercept) {
        return origSend.apply(this, arguments);
      }
      var body = JSON.stringify(mockBodyFor(this.__demo.url));
      setTimeout(function () {
        Object.defineProperty(self, 'readyState', { value: 4, configurable: true });
        Object.defineProperty(self, 'status', { value: 200, configurable: true });
        Object.defineProperty(self, 'statusText', { value: 'OK', configurable: true });
        Object.defineProperty(self, 'response', { value: body, configurable: true });
        Object.defineProperty(self, 'responseText', { value: body, configurable: true });
        Object.defineProperty(self, 'responseURL', { value: self.__demo.url, configurable: true });
        try { self.onreadystatechange && self.onreadystatechange(); } catch (_) {}
        try { self.onload && self.onload(); } catch (_) {}
        try { self.onloadend && self.onloadend(); } catch (_) {}
        try { self.dispatchEvent(new Event('readystatechange')); } catch (_) {}
        try { self.dispatchEvent(new Event('load')); } catch (_) {}
        try { self.dispatchEvent(new Event('loadend')); } catch (_) {}
      }, 0);
    };
    XHR.prototype.getAllResponseHeaders = function () {
      if (this.__demo && this.__demo.intercept) return 'content-type: application/json\r\n';
      return '';
    };
    XHR.prototype.getResponseHeader = function (name) {
      if (this.__demo && this.__demo.intercept) {
        return /content-type/i.test(name) ? 'application/json' : null;
      }
      return null;
    };
  } catch (_) {}

  // ── 3. Suppress Service Worker registration silently ──
  try {
    if ('serviceWorker' in navigator) {
      var noopReg = {
        scope: location.pathname,
        active: null,
        installing: null,
        waiting: null,
        update: function () { return Promise.resolve(); },
        unregister: function () { return Promise.resolve(true); },
        addEventListener: function () {},
        removeEventListener: function () {},
      };
      navigator.serviceWorker.register = function () { return Promise.resolve(noopReg); };
      navigator.serviceWorker.getRegistration = function () { return Promise.resolve(undefined); };
      navigator.serviceWorker.getRegistrations = function () { return Promise.resolve([]); };
    }
  } catch (_) {}
})();
