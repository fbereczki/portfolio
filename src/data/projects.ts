export type Phase = 'dev' | 'test' | 'prod';
export type DemoKind = 'codewitness-frontend' | 'civix' | 'beacon' | 'mimir' | 'magus' | 'realtime-errors' | 'pgp' | 'wp-planner' | 'blockchain' | null;

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
      hu: 'Tamper-evident audit trail AI-asszisztált fejlesztéshez',
      en: 'Tamper-evident audit trail for AI-assisted development',
    },
    purpose: {
      hu: 'Compliance-ready audit trail az AI-asszisztált fejlesztéshez. Bizonyíthatóvá teszi, hogy az AI által írt kód mögött szakértői review és architektúra-döntés áll. Capture → Attribute → Analyze → Comply pipeline; minden AI-generált sor mérhető, scoringolható, jogszabály elé tehető. A jelenlegi fő fókuszom.',
      en: 'Compliance-ready audit trail for AI-assisted development. Proves that AI-generated code sits behind expert review and architecture decisions. Capture → Attribute → Analyze → Comply pipeline; every AI-written line is measurable, scoreable, and audit-defensible. My current primary focus.',
    },
    phase: 'dev',
    spotlight: 'primary',
    stack: ['Go 1.23', 'CGo', 'PostgreSQL', 'Argon2id', 'HMAC-SHA256', 'Ed25519', 'TypeScript', 'React', 'Vite', 'Material-UI', 'Tailwind', 'VS Code API'],
    ai: [
      'Custom MCP server (9 working tools, 4 planned) — invoked by Claude / Cursor / Git hooks',
      'AI Maturity Score Engine (6 dimensions: complexity, prompt efficiency, parallel orchestration, agent delegation, quality outcome, learning velocity)',
      'GUARD pattern detection — preserving institutional knowledge',
      'BEAM workflow — parallel orchestration of multiple AI agents',
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

  // ===== imwy.ai platform · Mimir =====
  {
    id: 'mimir',
    name: 'Mimir',
    logo: '/logos/mimir.svg',
    tagline: {
      hu: 'Perzisztens AI-memória minden felületen — és a ledger, ami méri a munkát',
      en: 'Persistent AI memory across every surface — and the ledger that measures the work',
    },
    purpose: {
      hu: 'Az imwy.ai platform memória-rétege: egyetlen logikai memória a Claude Code, Desktop és web felületeknek, plusz bármely MCP-képes kliensnek. Determinisztikus capture-hook viszi be 1:1-ben a teljes fejlesztési rekordot — promptok, gondolatmenet, tool-hívások, fájl-diffek, tokenek — egy hash-láncolt ledgerbe. Ebből lesz déjà-vu (mikor találkoztam ezzel utoljára?) és heti coach-riport a saját teljesítményemről. A ×156-os leverage-szám ebből a ledgerből jön.',
      en: 'The memory layer of the imwy.ai platform: one logical memory for Claude Code, Desktop and web, plus any MCP-capable client. A deterministic capture hook ingests the full engineering record 1:1 — prompts, reasoning, tool calls, file diffs, tokens — into a hash-chained ledger. That becomes déjà-vu recall (when did I last hit this?) and weekly coach reports on my own performance. The ×156 leverage figure comes from this ledger.',
    },
    phase: 'prod',
    spotlight: 'secondary',
    stack: ['Go', 'PostgreSQL 16 + pgvector', 'MCP (JSON-RPC + SSE)', 'ONNX embeddings (local)', 'React 19', 'Vite', 'Tailwind', 'Docker Compose'],
    ai: [
      'MCP server — recall, search, routing, checkpoint/handoff/resume, scheduling',
      'Hybrid retrieval: Postgres full-text ⊕ pgvector cosine, fused with Reciprocal Rank Fusion',
      'Local embedding sidecar (multilingual MiniLM, 384-dim) — no third-party AI API in the loop',
      'Capability registry + routing that corrects for each helper’s actual track record',
    ],
    highlights: {
      hu: [
        '~97 500 esemény a referencia-installon, kizárólag automatikus capture-ből',
        'Coach-riportok: ×10 → ×156 heti leverage hat hét alatt, re-prompt 21,7% → 2,7%',
        'Hash-láncolt activity ledger + append-only audit log — a mérés maga is auditálható',
        'Déjà-vu recall és verbatim resume: fiók- vagy gépváltás után is folytatható a munka',
      ],
      en: [
        '~97,500 events on the reference install, all from automatic capture',
        'Coach reports: ×10 → ×156 weekly leverage in six weeks, re-prompts 21.7% → 2.7%',
        'Hash-chained activity ledger + append-only audit log — the measurement is auditable too',
        'Déjà-vu recall and verbatim resume: work survives an account, machine or surface switch',
      ],
    },
    demo: 'mimir',
    tags: ['ai', 'mcp', 'rag', 'platform', 'web'],
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
    spotlight: 'tertiary',
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

  // ===== GamfCoin — academic PoC (NOT a product) =====
  {
    id: 'gamfcoin-poc',
    name: 'GamfCoin Voting PoC',
    tagline: {
      hu: 'PROOF-OF-CONCEPT · 2022 szakdolgozat — blokklánc-alapú szavazó platform',
      en: 'PROOF-OF-CONCEPT · 2022 thesis — blockchain-based voting platform',
    },
    purpose: {
      hu: 'A 2022-es szakdolgozatomhoz épített két prototype: GamfCoin PoW (mining-puzzle, longest-chain rule) és GamfCoin PoS (validator-pool, deterministic lot-selection) — JavaScript-ben, ~30 unit teszttel, end-to-end szavazási folyamattal. Akadémiai célú demonstráció, hogy a blokklánc képes-e biztosítani a választás bizalmi szolgáltatásait. NEM termék, NEM auditált, NEM produktív — a magjából nőtt ki a Civix Platform, ami 2027 második felére céloz (lásd ott).',
      en: 'Two prototypes built for my 2022 thesis: GamfCoin PoW (mining puzzle, longest-chain rule) and GamfCoin PoS (validator pool, deterministic lot selection) — in JavaScript, with ~30 unit tests and an end-to-end voting flow. Academic demonstration that blockchain can deliver the trust services elections require. NOT a product, NOT audited, NOT in production — its seed grew into Civix Platform, which targets the second half of 2027 (see there).',
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
      hu: 'AI-first projektkontroll ISO/SAE 21434 cybersecurity programokra',
      en: 'AI-first project control for ISO/SAE 21434 cybersecurity programmes',
    },
    purpose: {
      hu: 'Az imwy.ai platform tervező-rétege: egyetlen motorból számolja, mennyibe kerül egy cybersecurity program, mikor készül el, ki csinálja és hol áll a kapukhoz képest — és ugyanabból generálja az ügyfélnek menő dokumentumot. Munkacsomag-katalógus tailoringgal, erőforrás-korlátos CPM ütemezés, gate scorecard, JIRA-szinkron, státusz-deck. Ez teszi a CodeWitness által kormányzott munkát emberi szemmel tervezhetővé és prezentálhatóvá.',
      en: 'The planning layer of the imwy.ai platform: one engine computes what a cybersecurity programme costs, when it lands, who does it and where it stands against its gates — and generates the customer-facing document from that same calculation. Work-package catalogue with tailoring, resource-levelled CPM scheduling, gate scorecards, JIRA sync, status decks. This is what makes CodeWitness-governed work plannable and presentable for humans.',
    },
    phase: 'prod',
    spotlight: 'secondary',
    stack: ['Go', 'Gin', 'PostgreSQL 16', 'React 19', 'Vite', 'TypeScript', 'Tailwind', 'MCP server (Go)', 'python-pptx', 'Docker Compose'],
    ai: [
      'Optional by design — every mechanical feature works with no AI key at all',
      'MCP server (10 tools) so an agent session can query plans, costs and schedules',
      'Reference-class forecasting: your plan checked against comparable finished projects',
      'Draft-first outbound: every generated message waits for human approval',
    ],
    highlights: {
      hu: [
        'Élesben fut — ISO/SAE 21434 munkacsomag-katalógus: 43 aktív work product, 156 task, 369,5 mérnöknap',
        'Erőforrás-korlátos CPM: az FTE párhuzamosságot vesz, nem sebességet — egy full-time task nem lesz gyorsabb több embertől',
        'Egy motor, egy igazság: a képernyő, a DOCX, az XLSX és a PPTX ugyanabból a számításból olvas',
        'Őszinteség beépítve: üres cella „—”, valódi nulla „0”, a ráta soha nem összegződik, a dátum hét-pontosságú, ha a terv nem tud napot',
      ],
      en: [
        'Running in production — ISO/SAE 21434 work-package catalogue: 43 active work products, 156 tasks, 369.5 engineering days',
        'Resource-levelled CPM: FTE buys parallelism, not speed — a full-time task never gets faster by adding people',
        'One engine, one truth: screen, DOCX, XLSX and PPTX all read the same calculation',
        'Honest by construction: empty is “—”, zero is “0”, rates are never summed, and dates stay week-precise when the plan has no day',
      ],
    },
    demo: 'beacon',
    tags: ['platform', 'web', 'compliance'],
  },
  {
    id: 'pgp-tool',
    name: 'PGP Encryption Tool',
    tagline: {
      hu: 'Belső PGP titkosító eszköz — Knorr-Bremse napi használatban',
      en: 'Internal PGP encryption tool — in daily use at Knorr-Bremse',
    },
    purpose: {
      hu: 'Saját fejlesztésű PGP titkosító munkapad a napi munkafolyamatokhoz: kulcs-menedzsment, fájl- és üzenet-titkosítás, aláírás-ellenőrzés egyetlen, telepítés nélküli HTML-fájlban. A Knorr-Bremse-nél munkatársak napi szinten használják érzékeny dokumentumok cseréjéhez — pont azért, mert semmi nem hagyja el a gépüket.',
      en: 'In-house PGP workbench for daily workflows: key management, file and message encryption, signature verification — all inside a single HTML file with nothing to install. Used daily at Knorr-Bremse for exchanging sensitive documents, precisely because nothing ever leaves the machine.',
    },
    phase: 'prod',
    stack: ['OpenPGP.js', 'Single-file HTML', 'JSZip', 'Web Crypto', 'Zero-network CSP'],
    ai: [],
    highlights: {
      hu: [
        'Élesben használt Knorr-Bremse-nél',
        'v4.1 workbench: kulcsgenerálás, import, mentett kulcsok, munkaterület egy felületen',
        'Fájl- és üzenet-titkosítás, aláírás, ellenőrzés — mind a böngészőben',
        'Egyetlen HTML-fájl, telepítés nélkül; saját CSP-je connect-src ’none’ — hálózati hívás nincs benne',
      ],
      en: [
        'Used in production at Knorr-Bremse',
        'v4.1 workbench: key generation, import, saved keys and workspace in one surface',
        'File and message encryption, signing and verification — all in the browser',
        'One HTML file, nothing to install; ships its own CSP with connect-src ’none’ — no network call exists in it',
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
