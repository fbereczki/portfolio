// Source of truth: LinkedIn (authoritative, current). The older PDF CV was
// merged in but LinkedIn timeline takes precedence where they conflict.

export const profile = {
  name: 'Bereczki Ferenc',
  headline: {
    hu: 'Cybersecurity Project Manager · IT biztonság · AI builder',
    en: 'Cybersecurity Project Manager · IT security · AI builder',
  },
  location: 'Budapest, Magyarország',
  phone: '+36 20 349 6421',
  email: 'ferenc.bereczki@codewitness.ai',
  emailPersonal: 'fbereczki@gmail.com',
  portrait: '/portrait.jpg', // 600×661 LANCZOS-resized + JPEG q92, 88 KB — natív megjelenítés Hero-ban
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
    hu:
      'Pályám során az IT minden főbb területén szereztem tapasztalatot. A korai években hálózati és szerver-üzemeltető mérnök voltam a Pfizer Hungary Kft.-nél, később webprogramozóként és játékfejlesztőként is kipróbáltam magam. Megéltem a csapatvezetés és a projektmenedzsment kihívásait, és a vállalkozói lét minden oldalát. Hamar kiderült, hogy a kiberbiztonság és a legújabb technológiák azok, amik igazán érdekelnek — így kerültem a Belügyminisztériumba. Büszke vagyok rá, hogy a legnagyobb projektünkben létrehoztunk egy új IT-biztonsági réteget, amely garantálja Magyarország működőképességét és a kritikus adatok biztonságát természeti, mesterséges katasztrófa vagy háború esetén is. A projekt zárása után a Knorr-Bremse R&D Centerben kezdtem el dolgozni az automotive cybersecurity új területén — a munkánk az új generációs járművek megalkotásához és az autonóm közlekedéshez vezető úthoz járul hozzá.',
    en:
      'During my time in the profession, I gained experience in all major areas within the field of IT. In the early years, I was a network and server operations engineer at Pfizer Hungary Ltd. Later in my career, I tried myself as both a web programmer and a game developer. I have experienced the challenges of team leadership and project management, as well as all aspects of being an entrepreneur. It soon became clear to me that cybersecurity and cutting-edge technologies were what really attracted me — which is how I got into the Ministry of the Interior. I am very proud that in my biggest project to date, we have created a new layer of IT security for Hungary, capable of guaranteeing the country’s operability and the security of essential data, even in the event of a natural or artificial disaster or war. At the end of the project, I started working in the new field of cybersecurity at the R&D Center of Knorr-Bremse, one of the most important suppliers of the automotive industry. Our work here contributes to the creation of a new generation of vehicles and thus opens the way for autonomous vehicles.',
  },
  experience: [
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
