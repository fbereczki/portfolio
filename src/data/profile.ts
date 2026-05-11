// Source of truth: LinkedIn (authoritative, current). The older PDF CV was
// merged in but LinkedIn timeline takes precedence where they conflict.

export const profile = {
  name: 'Bereczki Ferenc',
  headline: {
    hu: 'Cybersecurity Project Manager · AI Builder & VibeCode Fixer',
    en: 'Cybersecurity Project Manager · AI Builder & VibeCode Fixer',
  },
  location: 'Budapest, Magyarország',
  phone: '+36 20 349 6421',
  email: 'ferenc.bereczki@codewitness.ai',
  emailPersonal: 'fbereczki@gmail.com',
  portrait: '/portrait.jpg?v=3', // 600×662 LANCZOS-resized + JPEG q92, 66 KB. Version query busts CF edge cache when the underlying file changes.
  currentRole: {
    hu: 'Cybersecurity Project Manager — Knorr-Bremse R&D Center',
    en: 'Cybersecurity Project Manager — Knorr-Bremse R&D Center',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/ferenc-bereczki/',
    github: '',
    email: 'mailto:ferenc.bereczki@codewitness.ai',
    emailPersonal: 'mailto:fbereczki@gmail.com',
  },
  bio: {
    hu: `Pályám során az IT szinte minden fő területén megfordultam. Hálózati és szerver-üzemeltető mérnökként kezdtem a Pfizer Hungary Kft.-nél, ahol szilárd alapokat kaptam a vállalati infrastruktúra és üzemeltetés területén. Később webfejlesztéssel, játékprogramozással, csapatvezetéssel, projektmenedzsmenttel és vállalkozással is foglalkoztam.

Idővel a kiberbiztonság és a legújabb technológiák lettek az igazi szenvedélyem, ami a Belügyminisztériumhoz vezetett. Ott életem egyik legfontosabb projektjéhez járulhattam hozzá: egy új nemzeti IT-biztonsági réteg megteremtéséhez, amely képes megvédeni a kritikus rendszereket és az alapvető adatokat katasztrófák, kibertámadások vagy háborús helyzet esetén is.

E fejezet után csatlakoztam a Knorr-Bremse R&D Centeréhez — az autóipar egyik vezető beszállítójához —, ahol az automotive cybersecurity területén dolgozom. Munkánk az új generációs összekapcsolt és önvezető járművek megalkotásához járul hozzá.

Ma a számítástechnika történetének egyik legizgalmasabb korszakát éljük. Az AI térnyerése alapjaiban változtatta meg, ahogyan dolgozom, és újra felélesztette a mérnöki munka iránti lelkesedésemet. Minden héten új képességek bukkannak fel, amelyek néhány éve még tudományos-fantasztikusnak tűntek volna.

Ez a szenvedély vezetett a CodeWitness megalapításához — a saját válaszomhoz az AI-kor egyik meghatározó kérdésére: hogyan bizonyítjuk, mit hozott létre valójában az AI, és hogyan igazoljuk, hogy egy szakértő ember valóban ott állt mögötte?

A CodeWitness egy tamper-evident audit- és compliance-platform az AI-asszisztált szoftverfejlesztéshez, vállalati szintű nyomon követhetőségre tervezve, és olyan keretrendszerekhez igazítva, mint a SOC 2 vagy az EU AI Act.

Körülötte kísérletek és innovációk egész ökoszisztémája nőtt fel, amelyek többségét ezen a portfolió-oldalon és az IMWY.ai-n is megnézheted. MCP-szerverektől és a SIL módszertantól kezdve egészen a Civix, Aegis, Beacon, Magus projektekig és blokklánc-prototípusokig — mindegyik azt feszegeti, mi válik lehetővé, amikor több mint két évtizednyi mérnöki tapasztalat találkozik a modern AI-jal.

Egyes projektek production-ready állapotban vannak, mások nagyra törő kísérletek — de mindegyik tanított valami értékeset.

Ha ez az út egyvalamit megtanított: a mérnökök, akik virágzanak, nem azok, akik ellenállnak a változásnak — hanem azok, akik szembefutnak vele.

Az AI nem helyettesíti a senior mérnököket. Felerősíti őket.

És őszintén szólva: pályafutásom során soha nem élveztem ennyire a munkámat, mint most.`,
    en: `During my career, I have worked across nearly every major area of IT. I started as a network and server operations engineer at Pfizer Hungary Ltd., building a strong foundation in enterprise infrastructure and operations. Later, I moved into web development, game programming, team leadership, project management, and entrepreneurship.

Over time, cybersecurity and emerging technologies became my true passion, which led me to the Hungarian Ministry of the Interior. There, I contributed to one of the most important projects of my career: creating a new layer of national IT security infrastructure capable of protecting critical systems and essential data even during disasters, cyberattacks, or wartime scenarios.

Later, I joined the R&D Center of Knorr-Bremse, one of the automotive industry's leading suppliers, where I work in automotive cybersecurity. Our work contributes to the next generation of connected and autonomous vehicles.

Today, we are living through one of the most exciting periods in the history of computing. The rise of AI has completely transformed the way I work and reignited my passion for engineering. Every week introduces new capabilities that would have felt like science fiction only a few years ago.

That passion evolved into CodeWitness — my answer to one of the defining challenges of the AI era: how do we prove what AI actually created, and how do we verify that a human expert truly stood behind it?

CodeWitness is a tamper-evident audit and compliance platform for AI-assisted software development, designed around enterprise-grade traceability and aligned with frameworks such as SOC 2 and the EU AI Act.

Around it, an entire ecosystem of experiments and innovations has grown, many of which are showcased throughout this portfolio and on IMWY.ai. From MCP servers and the SIL methodology to projects such as Civix, Aegis, Beacon, Magus, and blockchain prototypes, each project explores what becomes possible when more than two decades of engineering experience meet modern AI.

Some projects are production-ready, others are ambitious experiments — but all of them taught me something valuable.

If this journey has taught me one thing, it is this: the engineers who thrive are not the ones who resist change — they are the ones who run toward it.

AI does not replace senior engineers. It amplifies them.

And honestly, I have never enjoyed my career more than I do right now.`,
  },
  experience: [
    {
      role: { hu: 'Founder', en: 'Founder' },
      company: 'CodeWitness',
      employmentType: { hu: 'Önfoglalkoztatás · Hibrid', en: 'Self-employed · Hybrid' },
      location: 'Budapest',
      period: { hu: '2025 — jelenleg', en: '2025 — Present' },
      duration: { hu: '1 év', en: '1 yr' },
      bullets: {
        hu: [
          'Compliance-ready audit- és nyomon követhetőségi platform alapítása AI-asszisztált szoftverfejlesztéshez.',
          'Misszió: bizonyíthatóvá tenni, mit írt valójában az AI, és hogy minden architektúra-döntés mögött szenior mérnök állt.',
          'Capture → Attribute → Analyze → Comply pipeline — minden AI-generált kódsor mérhető, scoringolható és auditálható.',
          'SOC 2 Type II és EU AI Act megfelelőségre tervezve: tamper-evident HMAC-SHA256 audit-lánc, Ed25519-cel aláírt riportok.',
          'AI Maturity Score Engine — hatdimenziós scoring (complexity, prompt efficiency, parallel orchestration, agent delegation, quality outcome, learning velocity).',
          'Saját MCP-szerver (9 production tool) integrálva Claude / Cursor / Git workflow-kba; Free / Pro / Enterprise feature-tier.',
        ],
        en: [
          'Founded a compliance-ready audit and traceability platform for AI-assisted software development.',
          'Mission: prove what AI actually wrote, and that a senior engineer truly stood behind every architectural decision.',
          'Capture → Attribute → Analyze → Comply pipeline — every AI-generated line is measurable, scoreable, and audit-defensible.',
          'Designed for SOC 2 Type II and EU AI Act readiness: tamper-evident HMAC-SHA256 audit chain with Ed25519-signed reports.',
          'AI Maturity Score Engine — six-dimensional scoring (complexity, prompt efficiency, parallel orchestration, agent delegation, quality outcome, learning velocity).',
          'Custom MCP server (9 production tools) integrated into Claude / Cursor / Git workflows; Free / Pro / Enterprise tiering.',
        ],
      },
    },
    {
      role: { hu: 'Cybersecurity Project Manager', en: 'Cybersecurity Project Manager' },
      company: 'Knorr-Bremse R&D Center',
      employmentType: { hu: 'Teljes munkaidős · Hibrid', en: 'Full-time · Hybrid' },
      location: 'Budapest',
      period: { hu: '2022 szeptember — jelenleg', en: 'Sep 2022 — Present' },
      duration: { hu: '3 év 9 hónap', en: '3 yrs 9 mos' },
      bullets: {
        hu: [
          'Ügyfélkapcsolat-menedzsment fenntartása.',
          'Belső és ügyféloldali kiberbiztonsági követelmények lefedettségének biztosítása.',
          'Kiberbiztonsági terv készítése és karbantartása a projektcsapattal összhangban.',
          'Projektstátusz-monitoring és riportálás belső és külső stakeholderek felé.',
          'Kiberbiztonsági kockázatmenedzsment a projekt teljes életciklusa alatt.',
          'Kiberbiztonsági assessment és audit koordinációja.',
          'Munkatermékek létrehozásának koordinációja az ISO 21434 és UN-ECE R155/156 szabványok szerint.',
          'Saját fejlesztésű Beacon és belső PGP-titkosító eszközök éles használata a napi munkafolyamatban.',
        ],
        en: [
          'Maintaining customer relationship management.',
          'Ensure coverage of internal and customer cybersecurity requirements.',
          'Create and maintain cybersecurity plan in alignment with the project team.',
          'Project status monitoring and reporting towards internal and external stakeholders.',
          'Cybersecurity risk management during the project lifecycle.',
          'Coordination of cybersecurity assessment / audit.',
          'Coordination of cybersecurity work-product creation per ISO 21434 and UN-ECE R155/156.',
          'In-house Beacon and internal PGP utility shipped into the daily workflow.',
        ],
      },
    },
    {
      role: {
        hu: 'IT Biztonsági Szakértő és Projektmenedzser',
        en: 'Information Technology Security Specialist & Project Manager',
      },
      company: 'Belügyminisztérium · Magyarország',
      employmentType: { hu: 'Teljes munkaidős · Helyszíni', en: 'Full-time · On-site' },
      location: 'Budapest',
      period: { hu: '2017 június — 2022 szeptember', en: 'Jun 2017 — Sep 2022' },
      duration: { hu: '5 év 4 hónap', en: '5 yrs 4 mos' },
      bullets: {
        hu: [
          'Kiberbiztonsági feladatok — kockázat- és fenyegetésmenedzsment a Belügyminisztérium alá tartozó szervezeteknél.',
          'Új IT-fejlesztések biztonsági követelményeinek meghatározása a várható fenyegetések alapján.',
          'Oktatási anyagok elkészítése és előadások tartása a Belügyminisztérium dolgozóinak.',
          'K+F kiberbiztonsági projekt — 10,8 Mrd Ft költségvetés. Customer-side projektvezetés: ügyfélérdek-képviselet a teljes projekt során, projektcélok és követelménykatalógus definiálása, CapEx/OpEx tervezés.',
          'Customer-side kiberbiztonsági szakértői feladatok: funkcionális specifikáció, logikai rendszerterv, logikai adatmodell és HLD dokumentumok készítése; kiberbiztonsági követelmények meghatározása és teljesülésük igazolása.',
        ],
        en: [
          'Cybersecurity tasks — risk and threat management for organisations under the Ministry of the Interior.',
          'Defining security requirements for new IT developments according to expected threats.',
          'Preparation of educational materials and presentations for Ministry of Interior employees.',
          'R+D Cybersecurity project — HUF 10.8 billion budget. Customer-side PM: representing customer interests for the duration, defining goals and requirements catalogue, CapEx & OpEx design.',
          'Customer-side cybersecurity expert: functional spec, logical system design, logical data model and HLD documents; defining cybersecurity requirements and certifying their fulfilment.',
        ],
      },
    },
    {
      role: {
        hu: 'Vállalkozó — fejlesztő, architect, projektmenedzser',
        en: 'Contractor — developer, architect, project manager',
      },
      company: { hu: 'Saját vállalkozás', en: 'Self-employed' },
      employmentType: { hu: 'Önfoglalkoztatás', en: 'Self-employed' },
      location: 'Budapest',
      period: { hu: '2007 — 2017', en: '2007 — 2017' },
      duration: { hu: '10 év', en: '10 yrs' },
      bullets: {
        hu: [
          'Szoftverarchitektúra-tervezés: monolit rendszerek, microservice-architektúrák, blokklánc-alapú elosztott rendszerek.',
          'Funkcionális specifikáció, logikai rendszerterv, logikai adatmodell, biztonsági tervezés és egyéb Solution Architect feladatok.',
          'Programozási nyelvek: C++, C#, SQL, JavaScript, Python, Go.',
          '18 fős játékfejlesztő csapat irányítása 2 éven át.',
        ],
        en: [
          'Software architecture design: monolithic systems, microservice architectures, distributed blockchain-based systems.',
          'Functional spec, logical system design, logical data model, security design and other Solution Architect tasks.',
          'Programming languages: C++, C#, SQL, JavaScript, Python, Go.',
          'Led an 18-person game-development team for 2 years.',
        ],
      },
    },
  ],
  education: [
    {
      title: { hu: 'Mérnökinformatikus — Mobil és webfejlesztés', en: 'BSc Computer Engineering — Mobile & Web' },
      school: 'Neumann János Egyetem · GAMF',
      year: '2022',
    },
    {
      title: { hu: 'Üzleti menedzser — Agrárium specializáció', en: 'Business Manager — Agriculture specialisation' },
      school: 'Szent István Egyetem · KTI',
      year: '2008',
    },
    {
      title: { hu: 'Programozó — Beágyazott rendszerek', en: 'Programmer — Embedded systems' },
      school: 'BME · Kandó Kálmán Villamosmérnöki Kar',
      year: '2002',
    },
  ],
  achievements: [
    {
      title: { hu: 'CodeWitness — startup alapító', en: 'CodeWitness — startup founder' },
      detail: {
        hu: 'AI-asszisztált fejlesztés audit-trail platform alapítása; SOC 2 / EU AI Act compliance-ready.',
        en: 'Founded an AI-assisted development audit-trail platform; SOC 2 / EU AI Act compliance-ready.',
      },
    },
    {
      title: { hu: 'SIL — saját módszertan', en: 'SIL — original methodology' },
      detail: {
        hu: 'Structured Intent Language: dual-layer szoftver-spec nyelv. Spec v1.1 publikus, lint + CI integrációval.',
        en: 'Structured Intent Language: dual-layer software-spec language. Spec v1.1 published with lint + CI integration.',
      },
    },
    {
      title: { hu: '5 lezárt automotive cybersecurity projekt', en: '5 automotive cybersecurity projects delivered' },
      detail: {
        hu: 'ISO/SAE 21434 + UN R155/156 szerinti projektzárások a Knorr-Bremse R&D Centerben.',
        en: 'Project closures under ISO/SAE 21434 + UN R155/156 at Knorr-Bremse R&D Center.',
      },
    },
    {
      title: { hu: 'Belügyminiszteri elismerő oklevél', en: 'Award of the Minister of Interior' },
      detail: {
        hu: 'A K+F projekt létrehozásában nyújtott kiemelkedő tevékenységért.',
        en: 'For outstanding contribution to launching the R&D programme.',
      },
    },
    {
      title: { hu: '10,8 Mrd Ft K+F projekt', en: '10.8 Bn HUF R&D programme' },
      detail: {
        hu: 'A Belügyminisztérium új IT-biztonsági rétegének projektvezetése.',
        en: 'Led the Ministry of Interior\'s new IT-security layer.',
      },
    },
    {
      title: { hu: '600 fő edukációja', en: '600-person training reach' },
      detail: {
        hu: 'Több konferencia-előadás, egyidejűleg ~600 fő számára.',
        en: 'Multiple conference talks, ~600 attendees simultaneously.',
      },
    },
    {
      title: { hu: '62 fős projektteam vezetése', en: 'Led a 62-person project team' },
      detail: { hu: 'A legnagyobb csapatméret pályafutásom során.', en: 'The largest team size in my career.' },
    },
    {
      title: { hu: 'Nemzetbiztonsági átvilágítás', en: 'National security clearance' },
      detail: {
        hu: 'Érvényes átvilágítás kritikus projektekhez.',
        en: 'Valid clearance for critical-infrastructure projects.',
      },
    },
  ],
  // LinkedIn-endorsed skills, grouped by class. `n` = endorsement count where listed.
  skills: {
    industry: [
      { hu: 'Kiberbiztonság', en: 'Cybersecurity', n: 1 },
      { hu: 'Mesterséges intelligencia (AI)', en: 'Artificial Intelligence (AI)', n: 3 },
      { hu: 'IT', en: 'Information Technology', n: 3 },
      { hu: 'Számítástechnika', en: 'Computer Science', n: 0 },
      { hu: 'Programozás', en: 'Programming', n: 0 },
      { hu: 'Blokklánc', en: 'Blockchain', n: 1 },
      { hu: 'Projektmenedzsment', en: 'Project Management', n: 1 },
      { hu: 'Menedzsment', en: 'Management', n: 1 },
      { hu: 'Kockázatmenedzsment', en: 'Risk Management', n: 0 },
    ],
    interpersonal: [
      { hu: 'Vezetés', en: 'Leadership', n: 3 },
      { hu: 'Ügyfélkiszolgálás', en: 'Customer Service', n: 4 },
      { hu: 'Előadás · Public Speaking', en: 'Public Speaking', n: 2 },
      { hu: 'Kritikus gondolkodás', en: 'Critical Thinking', n: 0 },
      { hu: 'Tárgyalás', en: 'Negotiation', n: 0 },
    ],
    standards: [
      { hu: 'ISO/SAE 21434', en: 'ISO/SAE 21434', n: 0 },
      { hu: 'UN-ECE R155/R156', en: 'UN-ECE R155/R156', n: 0 },
      { hu: 'ISO 26262 (ASIL)', en: 'ISO 26262 (ASIL)', n: 0 },
      { hu: 'EU AI Act', en: 'EU AI Act', n: 0 },
      { hu: 'SOC 2 Type II', en: 'SOC 2 Type II', n: 0 },
      { hu: 'IBTV · ISO 27001', en: 'IBTV · ISO 27001', n: 0 },
      { hu: 'GDPR · pszeudonymizáció', en: 'GDPR · pseudonymisation', n: 0 },
      { hu: 'Nemzetbiztonsági átvilágítás', en: 'National security clearance', n: 0 },
      { hu: 'B2 angol', en: 'English B2', n: 0 },
    ],
  },
};
