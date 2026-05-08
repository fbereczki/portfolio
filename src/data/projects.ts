export type Phase = 'dev' | 'test' | 'prod';
export type DemoKind = 'codewitness-frontend' | 'civix' | 'aegis' | 'beacon' | 'magus' | 'realtime-errors' | 'pgp' | 'wp-planner' | 'blockchain' | null;

export type Project = {
  id: string;
  name: string;
  logo?: string;
  tagline: { hu: string; en: string };
  purpose: { hu: string; en: string };
  phase: Phase;
  spotlight?: 'primary' | 'secondary' | 'tertiary';
  stack: string[];
  ai: string[];
  highlights: { hu: string[]; en: string[] };
  demo: DemoKind;
  tags: ('ai' | 'mcp' | 'rag' | 'compliance' | 'mobile' | 'web' | 'cli' | 'platform' | 'blockchain' | 'game')[];
};

export const projects: Project[] = [
  // ===== KIEMELT 1: CodeWitness =====
  {
    id: 'codewitness',
    name: 'CodeWitness',
    logo: '/logos/codewitness.svg',
    tagline: {
      hu: 'AI doesn’t replace seniors. It makes them unstoppable.',
      en: 'AI doesn’t replace seniors. It makes them unstoppable.',
    },
    purpose: {
      hu: 'Compliance-ready audit trail az AI-asszisztált fejlesztéshez. Bizonyíthatóvá teszi, hogy az AI által írt kód mögött szakértői review és architektúra-döntés áll. Capture → Attribute → Analyze → Comply pipeline; minden AI-generált sor mérhető, scoringolható, jogszabály elé tehető. A jelenlegi fő fókuszom.',
      en: 'Compliance-ready audit trail for AI-assisted development. Proves that AI-generated code sits behind expert review and architecture decisions. Capture → Attribute → Analyze → Comply pipeline; every AI-written line is measurable, scoreable, and audit-defensible. My current primary focus.',
    },
    phase: 'dev',
    spotlight: 'primary',
    stack: ['Go 1.23', 'CGo', 'PostgreSQL', 'Argon2id', 'HMAC-SHA256', 'Ed25519', 'TypeScript', 'React', 'Vite', 'Material-UI', 'Tailwind', 'VS Code API'],
    ai: [
      'Saját MCP-szerver (9 működő tool, 4 tervezett) — Claude / Cursor / Git hookok hívják',
      'AI Maturity Score Engine (6 dimenzió: complexity, prompt efficiency, parallel orchestration, agent delegation, quality outcome, learning velocity)',
      'GUARD pattern detection — institutional knowledge megőrzése',
      'BEAM workflow — több AI-agent párhuzamos orchestration-je',
    ],
    highlights: {
      hu: [
        'A frontend a PromptLensHub + PromptLensPlatform monorepóban él (React + Vite + MUI + Tailwind).',
        'Free / Pro / Enterprise feature-tier (lásd README): Capture / Attribution / Score Engine ingyen, Bisect / Suggest Pro, SOC 2 + EU AI Act + Policy Engine Enterprise.',
        'HMAC-SHA256 audit-lánc + Ed25519 aláírt riportok — tamper-evident.',
        'V2 roadmap: JWT RS256 + OAuth2 PKCE + multi-tenant RBAC + Cloud Anchor.',
      ],
      en: [
        'Frontend lives in the PromptLensHub + PromptLensPlatform monorepo (React + Vite + MUI + Tailwind).',
        'Free / Pro / Enterprise tiering (per README): Capture / Attribution / Score Engine free, Bisect / Suggest Pro, SOC 2 + EU AI Act + Policy Engine Enterprise.',
        'HMAC-SHA256 audit chain + Ed25519-signed reports — tamper-evident.',
        'V2 roadmap: JWT RS256 + OAuth2 PKCE + multi-tenant RBAC + Cloud Anchor.',
      ],
    },
    demo: 'codewitness-frontend',
    tags: ['ai', 'mcp', 'compliance', 'platform', 'web'],
  },

  // ===== KIEMELT 2: Civix Platform =====
  {
    id: 'civix',
    name: 'Civix Platform',
    logo: '/logos/civix.png',
    tagline: {
      hu: 'Civic Innovation Exchange — decentralizált politikai platform',
      en: 'Civic Innovation Exchange — decentralised political platform',
    },
    purpose: {
      hu: 'Polyglot mikroszerviz-platform a politikai részvétel demokratizálására: olcsó pártalapítás, transzparens belső szavazások, közvetlen polgár-politikus kommunikáció, blokklánc-alapú elszámoltathatóság. Saját Civix Network (Substrate) és CRED token. Következő nagy fókuszom a CodeWitness után.',
      en: 'Polyglot microservice platform to democratise political participation: low-cost party creation, transparent primaries, direct citizen-politician communication, blockchain-backed accountability. Custom Civix Network (Substrate) and CRED token. My next major focus after CodeWitness.',
    },
    phase: 'dev',
    spotlight: 'secondary',
    stack: ['Rust (Axum)', 'Go (Fiber)', 'Substrate (PoW)', 'ink! smart contracts', 'SvelteKit', 'Flutter', 'NATS JetStream', 'PostgreSQL HA (Patroni)', 'Redis Cluster', 'Kubernetes'],
    ai: [],
    highlights: {
      hu: [
        '7 backend mikroszerviz: Identity, Party, Citizen, Communication, Voting, Transparency, Gateway',
        'Két frontend: SvelteKit (citizen + admin portál) + Flutter mobil',
        'Saját PoW Substrate node + ink! smart contractok belső szavazásokra és kötelezettségvállalásokra',
        'Geographic-based engagement — választókerületi szintű részvétel',
      ],
      en: [
        '7 backend microservices: Identity, Party, Citizen, Communication, Voting, Transparency, Gateway',
        'Two frontends: SvelteKit (citizen + admin portals) + Flutter mobile',
        'Custom PoW Substrate node + ink! smart contracts for primaries and binding promises',
        'Geographic-based engagement — district-level participation',
      ],
    },
    demo: 'civix',
    tags: ['blockchain', 'platform', 'web', 'mobile'],
  },

  // ===== KIEMELT 3: AEGIS =====
  {
    id: 'aegis',
    name: 'AEGIS Automotive',
    logo: '/logos/aegis.jpg',
    tagline: {
      hu: 'Enterprise automotive cybersecurity & functional safety platform',
      en: 'Enterprise automotive cybersecurity & functional safety platform',
    },
    purpose: {
      hu: 'Teljes körű ISO/SAE 21434, ISO 26262, UN R155/R156 compliance platform OEM-eknek és Tier-1 beszállítóknak. TARA, HARA, FMEA dokumentumgenerálás, supply-chain audit, SIL/HIL teszt-orchestration. Harmadik fókusz a CodeWitness és a Civix után.',
      en: 'End-to-end ISO/SAE 21434, ISO 26262, UN R155/R156 compliance platform for OEMs and Tier-1 suppliers. TARA, HARA, FMEA document generation, supply-chain audit, SIL/HIL test orchestration. Third focus after CodeWitness and Civix.',
    },
    phase: 'dev',
    spotlight: 'tertiary',
    stack: ['Go 1.25', 'Gin/Fiber', 'PostgreSQL 16', 'TimescaleDB', 'GORM', 'JWT + Casbin', 'Asynq (Redis)', 'React 19', 'Vite 5', 'Material-UI 6', 'Redux Toolkit', 'TypeScript 5.6', 'Docker'],
    ai: [
      'llama.cpp submodul (function calling, SILU operátor)',
      'Tervezett: TARA / HARA dokumentumgenerálás LLM-mel',
    ],
    highlights: {
      hu: [
        'ASIL A–D safety integrity scoping',
        'Software- és Hardware-in-the-Loop teszt-integráció',
        'Supply-chain risk + audit traceability',
        'Real-time dashboard, dark theme, RBAC + ABAC',
      ],
      en: [
        'ASIL A–D safety integrity scoping',
        'Software- and Hardware-in-the-Loop test integration',
        'Supply-chain risk + audit traceability',
        'Real-time dashboard, dark theme, RBAC + ABAC',
      ],
    },
    demo: 'aegis',
    tags: ['platform', 'compliance', 'web', 'ai'],
  },

  // ===== GamfCoin — academic PoC (NOT a product) =====
  {
    id: 'gamfcoin-poc',
    name: 'GamfCoin Voting PoC',
    tagline: {
      hu: 'PROOF-OF-CONCEPT · 2022 szakdolgozat — blokklánc-alapú szavazó platform',
      en: 'PROOF-OF-CONCEPT · 2022 thesis — blockchain-based voting platform',
    },
    purpose: {
      hu: 'A 2022-es szakdolgozatomhoz épített két prototype: GamfCoin PoW (mining-puzzle, longest-chain rule) és GamfCoin PoS (validator-pool, deterministic lot-selection) — JavaScript-ben, ~30 unit teszttel, end-to-end szavazási folyamattal. Akadémiai célú demonstráció, hogy a blokklánc képes-e biztosítani a választás bizalmi szolgáltatásait. NEM termék, NEM auditált, NEM produktív — a magjából 2026-ra a Civix Platform élesedett (lásd ott).',
      en: 'Two prototypes built for my 2022 thesis: GamfCoin PoW (mining puzzle, longest-chain rule) and GamfCoin PoS (validator pool, deterministic lot selection) — in JavaScript, with ~30 unit tests and an end-to-end voting flow. Academic demonstration that blockchain can deliver the trust services elections require. NOT a product, NOT audited, NOT in production — its seed grew into Civix Platform by 2026 (see there).',
    },
    phase: 'dev',
    stack: ['JavaScript / Node.js', 'Custom PoW + PoS engine', 'libp2p (peer discovery)', 'ECDSA · SHA-256', 'Express REST API', 'Jest unit tests'],
    ai: [],
    highlights: {
      hu: [
        'Két önállóan futó prototype: PoW mining-puzzle 4-difficulty target ~13 s block-time, PoS lot-selection ~6 s.',
        '30+ unit teszt PASS · transaction signing, block validation, peer broadcast, chain replacement.',
        'End-to-end szavazási folyamat: encrypted ballot → mempool → block-seal → public tally.',
        'Akadémiai forrás (99 oldal, GAMF · Neumann J. Egyetem) bizonyítja: paper-ballot helyett tamper-evident számolás titkosság-megőrzéssel.',
        'A Civix Platform-ba átemelt elvek (Substrate node, ink! contract, CRED token) — lásd a Civix kártyát.',
      ],
      en: [
        'Two independent prototypes: PoW mining puzzle ~13 s block-time at difficulty 4, PoS lot selection ~6 s.',
        '30+ unit tests PASS · transaction signing, block validation, peer broadcast, chain replacement.',
        'End-to-end voting flow: encrypted ballot → mempool → block seal → public tally.',
        'Academic source (99 pages, GAMF · Neumann J. University) proving: tamper-evident counting with secrecy preserved, in lieu of paper ballots.',
        'Principles graduated to Civix Platform (Substrate node, ink! contracts, CRED token) — see the Civix card.',
      ],
    },
    demo: 'blockchain',
    tags: ['blockchain'],
  },

  // ===== BEACON WP Effort Planner =====
  {
    id: 'beacon-wp-planner',
    name: 'BEACON WP Effort Planner',
    tagline: {
      hu: 'Projekt-szintű kiberbiztonsági erőforrás-tervező — ISO/SAE 21434, UN R155',
      en: 'Project-level cybersecurity effort planner — ISO/SAE 21434, UN R155',
    },
    purpose: {
      hu: 'Single-file standalone planning eszköz az ISO/SAE 21434 és UN R155 szerinti automotive cybersecurity feladatokhoz. A teljes BEACON katalógust (66 munkacsomag, 172 task, 468 MD baseline) használja default adatként, és closest-possible-GATE becslést készít a tailoring döntések és csapat-kapacitás függvényében. Effort = baseline × komplexitás-multiplier × overhead inflation; tailorable per-task indoklással.',
      en: 'Single-file standalone planning tool for ISO/SAE 21434 and UN R155 automotive cybersecurity work. Uses the full BEACON catalog (66 work packages, 172 tasks, 468 MD baseline) as default data and produces a closest-possible-GATE estimate based on tailoring decisions and team capacity. Effort = baseline × complexity multiplier × overhead inflation; tailorable per task with justification.',
    },
    phase: 'prod',
    stack: ['Standalone HTML/JS', 'BEACON catalog (66 WP / 172 tasks)', 'localStorage persistence', 'JSON schema export', 'Spectral + Fraunces report style'],
    ai: [],
    highlights: {
      hu: [
        '66 munkacsomag / 172 task / 468 MD baseline a teljes ISO/SAE 21434 + UN R155 lefedettséghez.',
        'Per-gate breakdown 6 GATE-re (Concept → Release), Effective MD = baseline × complexity × overhead.',
        'Konfigurálható overhead-modell: efficiency × meeting-load × buffer (defaults: 80% / 10% / 15% → ≈ 1,63×).',
        'Task-szintű tailoring (Skip / Simple / Normal / Complex) per-task indoklással — auditálható.',
        'JSON-séma export, localStorage perzisztencia, single-file deploy — nincs build, nincs backend.',
      ],
      en: [
        '66 work packages / 172 tasks / 468 MD baseline for full ISO/SAE 21434 + UN R155 coverage.',
        'Per-gate breakdown across 6 GATEs (Concept → Release), Effective MD = baseline × complexity × overhead.',
        'Configurable overhead model: efficiency × meeting-load × buffer (defaults: 80% / 10% / 15% → ≈ 1.63×).',
        'Task-level tailoring (Skip / Simple / Normal / Complex) with justification per task — audit-ready.',
        'JSON schema export, localStorage persistence, single-file deploy — no build, no backend.',
      ],
    },
    demo: 'wp-planner',
    tags: ['compliance', 'cli'],
  },

  // ===== Production tools =====
  {
    id: 'beacon',
    name: 'Beacon',
    logo: '/logos/beacon.png',
    tagline: {
      hu: 'Cybersecurity project cost & efficiency analytics — Knorr-Bremse napi használatban',
      en: 'Cybersecurity project cost & efficiency analytics — in daily use at Knorr-Bremse',
    },
    purpose: {
      hu: 'Cybersecurity projektek költség-, kapacitás- és profitabilitás-elemzése. A Knorr-Bremse-nél én magam is napi szinten használom a jelenlegi munkámban: 23-feature toggle, bottleneck analysis, customer profitability scoring, real-time dashboard.',
      en: 'Cost, capacity and profitability analytics for cybersecurity projects. I use it myself daily at Knorr-Bremse: 23-feature toggle system, bottleneck analysis, customer profitability scoring, real-time dashboard.',
    },
    phase: 'prod',
    stack: ['Go 1.23', 'Gin', 'PostgreSQL 16', 'React 19', 'TypeScript', 'Material-UI 7', 'Recharts', 'React Query', 'Docker Compose'],
    ai: [],
    highlights: {
      hu: [
        'Élesben használt Knorr-Bremse cybersecurity portfólió-menedzsmentre',
        '23 feature-toggle, 3 preset',
        'Bottleneck analysis + resource heatmap',
        'PDF / Excel export, customer profitability scoring',
      ],
      en: [
        'Used in production at Knorr-Bremse for cybersecurity portfolio management',
        '23 feature toggles, 3 presets',
        'Bottleneck analysis + resource heatmap',
        'PDF / Excel export, customer profitability scoring',
      ],
    },
    demo: 'beacon',
    tags: ['platform', 'web'],
  },
  {
    id: 'pgp-tool',
    name: 'PGP Encryption Tool',
    tagline: {
      hu: 'Belső PGP titkosító eszköz — Knorr-Bremse napi használatban',
      en: 'Internal PGP encryption tool — in daily use at Knorr-Bremse',
    },
    purpose: {
      hu: 'Saját fejlesztésű, könnyen használható PGP/GPG titkosító segédeszköz a napi munkafolyamatokhoz: kulcs-menedzsment, fájl-titkosítás, aláírás-ellenőrzés egyszerű felülettel. A Knorr-Bremse-nél munkatársak napi szinten használják érzékeny dokumentumok cseréjéhez.',
      en: 'In-house PGP/GPG encryption helper for daily workflows: key management, file encryption, signature verification through a simple interface. Used daily at Knorr-Bremse for exchanging sensitive documents.',
    },
    phase: 'prod',
    stack: ['— TODO: pontos stack —', 'OpenPGP / GnuPG', 'Desktop UI'],
    ai: [],
    highlights: {
      hu: [
        'Élesben használt Knorr-Bremse-nél',
        'Kulcs-management egyszerű UI-jal',
        'Fájl titkosítás + aláírás',
        'TODO: a pontos technológiai részletek beillesztése',
      ],
      en: [
        'Used in production at Knorr-Bremse',
        'Key management with a simple UI',
        'File encryption + signing',
        'TODO: paste in the exact technical details',
      ],
    },
    demo: 'pgp',
    tags: ['platform', 'compliance'],
  },
  {
    id: 'realtime-error-monitoring',
    name: 'Realtime Error Monitoring',
    tagline: {
      hu: 'Self-hosted Sentry alternatíva',
      en: 'Self-hosted Sentry alternative',
    },
    purpose: {
      hu: 'Saját error-capture pipeline: TypeScript SDK + Go backend, queue-based küldés, automata retry, zero külső függőség.',
      en: 'In-house error capture pipeline: TypeScript SDK + Go backend, queue-based delivery, automatic retry, zero external dependencies.',
    },
    phase: 'prod',
    stack: ['Go 1.21+', 'Gin', 'PostgreSQL', 'TypeScript SDK'],
    ai: [],
    highlights: {
      hu: [
        'window.onerror + unhandledrejection automatikusan',
        'Singleton logger pattern',
        'Queue + retry mechanizmus',
        'npm-ready SDK',
      ],
      en: [
        'window.onerror + unhandledrejection automatically',
        'Singleton logger pattern',
        'Queue + retry mechanism',
        'npm-ready SDK',
      ],
    },
    demo: 'realtime-errors',
    tags: ['platform', 'web'],
  },

  // ===== Mobile =====
  {
    id: 'magus',
    name: 'M.A.G.U.S Mobile',
    tagline: {
      hu: 'M.A.G.U.S karakterlap — mobil app a magyar fantasy szerepjátékhoz',
      en: 'M.A.G.U.S character sheet — mobile app for the Hungarian fantasy RPG',
    },
    purpose: {
      hu: 'Flutter alapú mobil applikáció a M.A.G.U.S szerepjáték karakterlap-kezelésére: karakter létrehozás, képességek, varázslatok, harci értékek, kasztok. A 2 éves saját játékfejlesztői múltam egyik gyümölcse.',
      en: 'Flutter mobile app for managing M.A.G.U.S RPG character sheets: character creation, attributes, spells, combat values, classes. One of the fruits of my 2-year game-development team-leadership stint.',
    },
    phase: 'prod',
    stack: ['Flutter', 'Dart', 'Drift (SQLite)', 'Provider', 'PDF parsing'],
    ai: [],
    highlights: {
      hu: [
        'Teljes karakterlap-kezelés digitálisan',
        'Drift (SQLite) lokális perzisztencia, offline-first',
        'PDF parsing a hivatalos szabálykönyvből',
        'Web-deploy is támogatott',
      ],
      en: [
        'Full digital character-sheet management',
        'Drift (SQLite) local persistence, offline-first',
        'PDF parsing of the official rulebook',
        'Web deployment supported',
      ],
    },
    demo: 'magus',
    tags: ['mobile', 'game'],
  },
];
