/* CodeWitness cockpit — portfolio demo-mode shim.
 *
 * WHAT THIS IS. public/codewitness-app/ is the REAL cockpit SPA build (cw-v3,
 * apps/app), not a replica. It normally talks to a fleet of Go services
 * (ms-bff, ms-requirements, ms-comply, ms-monitor, ms-beam, ms-vv …). The
 * portfolio has no backend, so this file stands in for that fleet: it patches
 * window.fetch and answers every /api + /*-api call from static fixtures.
 *
 * The product code is UNTOUCHED. Every verdict line the cockpit renders is
 * computed by the shipped bundle's own derivation functions (safetyVerdicts,
 * requirementsVerdicts, vvVerdicts, governanceVerdicts …) from the payloads
 * below — so what a visitor reads is the real rendering path over real-shaped
 * data, not text baked into a mockup.
 *
 * The FIGURES are the product's own demo-project numbers (ADAS domain
 * controller): TARA 130 threats / 14 high-risk open · HARA ASIL D with 1 open
 * safety goal · item definition 45 elements / 7 typed interfaces ·
 * traceability 230 edges with no suspect link · witness chain 200 entries,
 * intact.
 *
 * NOTHING here is a credential and nothing leaves the iframe — there is no
 * backend to reach, and every request is answered locally.
 */
(function () {
  'use strict';

  // ── identity / scope ────────────────────────────────────────────────────
  // The cockpit resolves its tenant through GET /api/v1/bff/boot; the dev-session
  // key below is what the product's own local-run mode uses, and it also selects
  // the short downstream prefixes (/comply-api, /monitor-api, /beam-api) over the
  // per-project aggregator routes — one less shape to stand in for.
  var TENANT = '00000000-0000-0000-0000-000000000001';
  var USER = '11111111-1111-1111-1111-111111111111';
  var PROJECT = '01JD8Z3K5N7Q9R2T4V6X8Y0A1B';
  var ITEM_DEF = 'ID-ADAS-DC-1';
  var HARA_MODEL = 'HARA-ADAS-DC-1';
  var TARA_MODEL = 'TARA-ADAS-DC-1';
  var CONCEPT = 'CSC-ADAS-DC-1';

  try {
    localStorage.setItem('cw_dev_tenant', TENANT);
  } catch (_) {
    /* private mode — the baked default in the bundle covers it */
  }

  // ── the project ─────────────────────────────────────────────────────────
  var PROJECT_ROW = {
    id: PROJECT,
    tenant_id: TENANT,
    name: 'ADAS Domain Controller — L2+ Highway Pilot',
    project_status: 'active',
    created_by: USER,
    created_at: '2026-02-11T09:14:00Z',
  };

  // ── fixture builders ────────────────────────────────────────────────────
  function seq(n, fn) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(fn(i));
    return out;
  }

  /* HARA — 18 hazardous events, the worst rated ASIL D; 6 safety goals of which
     1 is not yet bilaterally accepted. Drives: "ASIL D reached" / "1 of 6 safety
     goals still open — accept them." */
  var HARA_ASILS = ['D', 'C', 'C', 'B', 'D', 'B', 'A', 'C', 'B', 'QM', 'A', 'C', 'B', 'D', 'A', 'B', 'QM', 'C'];
  var HAZARD_TEXT = [
    'Unintended steering torque during highway lane-keeping',
    'Loss of longitudinal control at set cruise speed',
    'Delayed hand-over request on ODD exit',
    'Incorrect lane-boundary estimate in heavy rain',
    'Unintended full braking on a phantom obstacle',
    'Loss of driver-monitoring availability',
  ];
  var HARA_EVENTS = seq(18, function (i) {
    return {
      id: 'HE-' + (i + 1),
      malfunctionId: 'MF-' + ((i % 9) + 1),
      operationalSituationId: 'OS-' + ((i % 6) + 1),
      description: HAZARD_TEXT[i % HAZARD_TEXT.length],
      severity: (i % 3) + 1,
      exposure: (i % 4) + 1,
      controllability: (i % 3) + 1,
      asil: HARA_ASILS[i],
      safeState: 'Degraded assist, driver take-over requested',
      fttiMs: 250 + (i % 5) * 50,
      origin: i % 4 === 0 ? 'human_added' : 'ai_generated',
      status: 'active',
      createdBy: USER,
      updatedBy: USER,
      deletedBy: '',
    };
  });
  var SAFETY_GOALS = seq(6, function (i) {
    return {
      id: 'SG-' + (i + 1),
      haraId: HARA_MODEL,
      name: [
        'Prevent unintended steering torque above 3 Nm',
        'Ensure longitudinal control degrades to a safe state',
        'Guarantee hand-over request within FTTI',
        'Prevent unintended full-stop braking',
        'Maintain driver-monitoring availability',
        'Ensure lane estimate integrity in degraded vision',
      ][i],
      asil: ['D', 'C', 'D', 'C', 'B', 'C'][i],
      safeState: 'Degraded assist, driver take-over requested',
      fttiMs: 300,
      covers: ['HE-' + (i + 1)],
      // exactly ONE open goal — the honest "there is a next action" state
      accepted: i !== 2,
      acceptedBy: i !== 2 ? USER : '',
      status: i !== 2 ? 'accepted' : 'draft',
    };
  });

  /* TARA — 130 threats on the risk matrix; 14 sit in risk bands 4–5 with no
     treatment decision recorded. Drives: "130 threats" / "14 of 14 at risk 4–5
     still untreated — treat them." */
  var STRIDE = ['S', 'T', 'R', 'I', 'D', 'E'];
  var THREAT_TITLES = [
    'CAN frame injection on the private powertrain bus',
    'Debug interface left enabled in the production image',
    'Firmware rollback to a vulnerable baseline',
    'Sensor spoofing of the forward radar return',
    'Key material extraction from the HSM boundary',
    'Man-in-the-middle on the OTA update channel',
    'Denial of service on the perception scheduler',
    'Privilege escalation through the diagnostic service',
  ];
  var TARA_ROWS = seq(130, function (i) {
    var high = i < 14; // the 14 open high-risk threats
    return {
      threatId: 'TH-' + (i + 1),
      assetId: 'AS-' + ((i % 22) + 1),
      stride: STRIDE[i % 6],
      title: THREAT_TITLES[i % THREAT_TITLES.length],
      impact: high ? 5 : (i % 3) + 1,
      feasibility: high ? 4 : (i % 3) + 1,
      feasibilitySource: 'attack_path',
      feasibilityLevel: high ? 'high' : 'medium',
      risk: high ? (i % 2 === 0 ? 5 : 4) : (i % 3) + 1,
      pathCount: (i % 4) + 1,
      // '' == no treatment decision recorded == untreated
      treatment: high ? '' : ['avoid', 'reduce', 'share', 'retain'][i % 4],
    };
  });

  /* Item definition — 45 elements across all 8 ISO 26262 aspects, 7 of them
     typed external interfaces. Drives: "45 elements · 7 interfaces" and
     "8 of 8 aspects". */
  var ELEMENT_KINDS = [
    'boundary',
    'function',
    'external_interface',
    'operational_environment',
    'assumption',
    'component',
    'preliminary_architecture',
    'cybersecurity_measure',
  ];
  var INTERFACE_NAMES = [
    'Private CAN-FD — chassis domain',
    'Automotive Ethernet — perception cluster',
    'FlexRay — steering actuator',
    'LIN — driver-monitoring camera',
    'OTA update channel (TLS 1.3, mutual auth)',
    'Diagnostic UDS over DoIP',
    'Secure debug (locked, HSM-gated)',
  ];
  var ITEM_ELEMENTS = (function () {
    var els = [];
    // 7 typed external interfaces
    for (var i = 0; i < 7; i++) {
      els.push({
        id: 'EL-IF-' + (i + 1),
        kind: 'external_interface',
        ordinal: els.length + 1,
        content: INTERFACE_NAMES[i],
        origin: 'human_added',
        status: 'active',
      });
    }
    // 38 more across the remaining 7 aspects — every aspect covered
    var others = ELEMENT_KINDS.filter(function (k) {
      return k !== 'external_interface';
    });
    for (var j = 0; j < 38; j++) {
      els.push({
        id: 'EL-' + (j + 1),
        kind: others[j % others.length],
        ordinal: els.length + 1,
        content: 'ADAS domain controller — ' + others[j % others.length].replace(/_/g, ' ') + ' #' + (j + 1),
        origin: j % 3 === 0 ? 'human_added' : 'ai_generated',
        status: 'active',
      });
    }
    return els; // 45
  })();

  /* Requirements — 118 refined requirements, 4 still awaiting a triage verdict;
     quality scores average into grade B. */
  var REQ_TEXT = [
    'The system shall limit assist torque to 3 Nm when lane confidence is below 0.8.',
    'When the ODD exit is detected, the system shall issue a hand-over request within 300 ms.',
    'While driver monitoring is unavailable, the system shall degrade to assist-off.',
    'The system shall reject an OTA package whose signature chain does not verify.',
    'If the forward radar return is implausible, then the system shall suppress automatic braking.',
    'The system shall record every autonomy-relevant decision to the witness chain.',
  ];
  var EARS = ['ubiquitous', 'event_driven', 'state_driven', 'unwanted_behaviour', 'optional_feature'];
  var REQ_ITEMS = seq(118, function (i) {
    var untriaged = i < 4;
    return {
      id: 'REQ-' + (i + 1),
      statement: REQ_TEXT[i % REQ_TEXT.length],
      earsPattern: EARS[i % EARS.length],
      qualityScore: [92, 88, 84, 79, 71, 86, 90, 68, 83, 87][i % 10],
      qualityIssues: [],
      acceptance: untriaged ? 'pending' : i % 11 === 0 ? 'accept_with_deviation' : 'accepted',
      origin: i % 5 === 0 ? 'stakeholder' : 'decomposed',
      tags: [],
      hasSil: i % 3 === 0,
    };
  });

  /* V&V — 42 exercised threats, 38 state-resolved, no reproduced-undefended
     breach; 96 sealed run results. */
  var VV_RESOLVED = ['REPRODUCED_THEN_DEFENDED', 'VALIDATED_WITHIN_FTTI'];
  var VV_THREATS = seq(42, function (i) {
    var resolved = i < 38;
    return {
      id: 'TH-' + (i + 1),
      status: resolved ? VV_RESOLVED[i % 2] : 'UNTESTED',
      contributing_verdicts: resolved ? ['defended'] : [],
      result_count: resolved ? 2 : 0,
      sealed: true,
      unsealed_contributors: 0,
      run_counts: {
        total: resolved ? 2 : 0,
        by_kind: resolved ? { pentest: 1, ablation: 1 } : {},
        by_verdict: resolved ? { defended: 2 } : {},
      },
      runs: [],
    };
  });

  // ── route table ─────────────────────────────────────────────────────────
  var ROUTES = [];
  function on(re, body) {
    ROUTES.push({ re: re, body: body });
  }

  // -- ms-bff: session, identity, project scope ---------------------------
  on(/^\/api\/v1\/bff\/boot$/, {});
  on(/^\/api\/v1\/bff\/me$/, {
    user_id: USER,
    org_role: 'org_owner',
    has_org_role: true,
    tenant_id: TENANT,
    modules: ['web', 'automotive', 'mobile'],
  });
  on(/^\/api\/v1\/bff\/projects$/, { projects: [PROJECT_ROW] });
  on(/^\/api\/v1\/bff\/projects\/[^/]+$/, function () {
    return Object.assign({}, PROJECT_ROW, { org_role: 'org_owner', project_role: 'po' });
  });
  on(/^\/api\/v1\/bff\/projects\/[^/]+\/members$/, {
    project_id: PROJECT,
    caller_project_role: 'po',
    can_manage: true,
    members: [
      { user_id: USER, project_role: 'po' },
      { user_id: '22222222-2222-2222-2222-222222222222', project_role: 'architect' },
      { user_id: '33333333-3333-3333-3333-333333333333', project_role: 'security' },
      { user_id: '44444444-4444-4444-4444-444444444444', project_role: 'reviewer' },
    ],
  });
  on(/^\/api\/v1\/bff\/projects\/[^/]+\/telemetry$/, { project_id: PROJECT, items: [], next_cursor: '' });
  on(/^\/api\/v1\/bff\/org\/projects$/, {
    read_all: true,
    org_role: 'org_owner',
    projects: [
      {
        project_id: PROJECT,
        name: PROJECT_ROW.name,
        project_status: 'active',
        my_project_role: 'po',
        member_count: 4,
      },
    ],
  });
  on(/^\/api\/v1\/bff\/org\/members$/, {
    caller_org_role: 'org_owner',
    people: [
      { user_id: USER, org_role: 'org_owner', project_memberships: [{ project_id: PROJECT, project_role: 'po' }] },
      {
        user_id: '22222222-2222-2222-2222-222222222222',
        org_role: 'org_member',
        project_memberships: [{ project_id: PROJECT, project_role: 'architect' }],
      },
      {
        user_id: '33333333-3333-3333-3333-333333333333',
        org_role: 'org_member',
        project_memberships: [{ project_id: PROJECT, project_role: 'security' }],
      },
      { user_id: '44444444-4444-4444-4444-444444444444', org_role: 'org_auditor', project_memberships: [] },
    ],
  });
  on(/^\/api\/v1\/bff\/org\/entitlements$/, {
    subscription: { plan: 'enterprise', status: 'active' },
    modules: [
      { code: 'web', status: 'active', source: 'subscription' },
      { code: 'automotive', status: 'active', source: 'subscription' },
      { code: 'mobile', status: 'active', source: 'subscription' },
    ],
  });

  // -- ms-requirements: corpus, item definition, HARA, TARA ---------------
  on(/\/api\/v1\/requirements\/refined(\?|$)/, {
    total: 118,
    items: REQ_ITEMS,
    facets: { ears: [], acceptance: [], origin: [] },
  });
  on(/\/api\/v1\/requirements\/documents$/, {
    documents: [
      { manifestId: 'M-1', fileName: 'OEM_SRS_ADAS_DC_v4.pdf', sourceFormat: 'pdf', pages: 214, artifactCount: 412, requirementCount: 61 },
      { manifestId: 'M-2', fileName: 'UNECE_R157_extract.pdf', sourceFormat: 'pdf', pages: 48, artifactCount: 96, requirementCount: 24 },
      { manifestId: 'M-3', fileName: 'ISO26262_item_scope.docx', sourceFormat: 'docx', pages: 33, artifactCount: 71, requirementCount: 19 },
      { manifestId: 'M-4', fileName: 'Cybersecurity_goals_R155.md', sourceFormat: 'markdown', pages: 12, artifactCount: 40, requirementCount: 14 },
    ],
  });
  on(/\/api\/v1\/requirements\/item-definition\/items\/[^/]+\/elements(\?|$)/, { elements: ITEM_ELEMENTS });
  on(/\/api\/v1\/requirements\/item-definition$/, {
    itemDefinitions: [{ requirementId: ITEM_DEF, itemName: 'ADAS Domain Controller (L2+ Highway Pilot)' }],
  });
  on(/\/api\/v1\/requirements\/hara\/models$/, {
    models: [
      { id: HARA_MODEL, itemDefinitionId: ITEM_DEF, name: 'HARA — ADAS Domain Controller', createdAt: '2026-03-02T08:00:00Z' },
    ],
  });
  on(/\/api\/v1\/requirements\/hara\/models\/[^/]+\/safety-goals$/, { safetyGoals: SAFETY_GOALS });
  on(/\/api\/v1\/requirements\/hara\/models\/[^/?]+(\?|$)/, {
    id: HARA_MODEL,
    itemDefinitionId: ITEM_DEF,
    name: 'HARA — ADAS Domain Controller',
    status: 'in_review',
    operationalSituations: seq(6, function (i) {
      return { id: 'OS-' + (i + 1), description: 'Highway, dry, daylight #' + (i + 1), status: 'active' };
    }),
    malfunctions: seq(9, function (i) {
      return { id: 'MF-' + (i + 1), description: 'Malfunction #' + (i + 1), status: 'active' };
    }),
    hazardousEvents: HARA_EVENTS,
  });
  on(/\/api\/v1\/requirements\/tara\/models$/, {
    models: [
      { id: TARA_MODEL, itemDefinitionId: ITEM_DEF, itemName: 'ADAS Domain Controller', methodRef: 'ISO 21434 / EVITA', createdAt: '2026-03-04T08:00:00Z' },
    ],
  });
  on(/\/api\/v1\/requirements\/tara\/models\/[^/]+\/risk-matrix$/, function () {
    return { id: TARA_MODEL, rows: TARA_ROWS, cells: [] };
  });
  on(/\/api\/v1\/requirements\/tara\/models\/[^/]+\/treatment-plan$/, {
    id: TARA_MODEL,
    customerRequirements: [],
    openRisks: [],
    treatments: [],
    goals: [],
    concepts: [{ id: CONCEPT, title: 'Cybersecurity concept — ADAS Domain Controller', status: 'approved' }],
  });
  // The TARA workbench itself — assets → damage scenarios → STRIDE threats. Built
  // from the SAME rows the risk matrix serves, so the 130-threat headline on the
  // stage card and the workbench below it can never disagree.
  var ASSET_NAMES = [
    'Perception fusion ECU', 'Steering actuator controller', 'Brake-by-wire controller',
    'Private CAN-FD bus (chassis)', 'Automotive Ethernet backbone', 'Telematics control unit',
    'OTA update client', 'Secure boot chain', 'HSM key store', 'Diagnostic UDS service',
    'Driver-monitoring camera', 'Forward radar', 'Lidar cluster', 'Map & localisation store',
    'Vehicle state signal set', 'Event data recorder', 'Gateway firewall rules',
    'Debug/JTAG interface', 'Time synchronisation service', 'Watchdog & safe-state logic',
    'Calibration parameter set', 'Trajectory planner',
  ];
  var PROPERTIES = ['confidentiality', 'integrity', 'availability', 'authenticity'];
  var TARA_ASSETS = seq(22, function (i) {
    return {
      id: 'AS-' + (i + 1),
      kind: i < 7 ? 'external_interface' : i < 16 ? 'component' : 'function',
      name: ASSET_NAMES[i],
      componentType: i < 11 ? 'hardware' : 'software',
      confidentiality: i % 2 === 0,
      integrity: true,
      availability: i % 3 !== 2,
      authenticity: i % 2 === 1,
      sourceElementId: 'EL-' + (i + 1),
      rationale: 'Derived from the item definition boundary.',
      origin: i % 4 === 0 ? 'human_added' : 'ai_generated',
      status: 'active',
      createdBy: USER,
      updatedBy: USER,
    };
  });
  var TARA_DAMAGES = seq(44, function (i) {
    return {
      id: 'DS-' + (i + 1),
      assetId: 'AS-' + ((i % 22) + 1),
      property: PROPERTIES[i % 4],
      description:
        'Loss of ' + PROPERTIES[i % 4] + ' on ' + ASSET_NAMES[i % 22] + ' — safety-relevant consequence.',
      origin: 'ai_generated',
      status: 'active',
    };
  });
  var TARA_THREATS = TARA_ROWS.map(function (r, i) {
    return {
      id: r.threatId,
      assetId: r.assetId,
      stride: r.stride,
      property: PROPERTIES[i % 4],
      title: r.title,
      description: 'STRIDE ' + r.stride + ' scenario on ' + r.assetId + ' (ISO/SAE 21434 §15).',
      impact: r.impact,
      feasibility: r.feasibility,
      risk: r.risk,
      impactSafety: r.impact,
      impactFinancial: Math.max(1, r.impact - 1),
      impactOperational: Math.max(1, r.impact - 1),
      impactPrivacy: Math.max(1, r.impact - 2),
      derivedAsil: r.risk >= 4 ? 'C' : 'QM',
      linkedHazardousEventId: i < 18 ? 'HE-' + (i + 1) : '',
      origin: i % 5 === 0 ? 'human_added' : 'ai_generated',
      status: 'active',
      createdBy: USER,
      updatedBy: USER,
      deletedBy: '',
    };
  });

  on(/\/api\/v1\/requirements\/tara\/models\/[^/]+\/coeng-conformance$/, {
    id: CONCEPT,
    state: 'conformant',
    conformant: true,
    reasons: [],
    open: [],
    obligations: seq(9, function (i) {
      return {
        id: 'DEF-' + (i + 1),
        threatId: 'TH-' + (i + 1),
        targetKind: 'safety_goal',
        targetId: 'SG-' + ((i % 6) + 1),
        targetAsil: ['D', 'C', 'D', 'C', 'B', 'C', 'D', 'C', 'B'][i],
        requiresReduceGoal: true,
        satisfied: true,
        satisfiedByGoalId: 'SG-' + ((i % 6) + 1),
        status: 'active',
      };
    }),
  });

  // Registered LAST of the TARA routes: the bare model read must not shadow the
  // /risk-matrix, /treatment-plan and /coeng-conformance sub-paths above.
  on(/\/api\/v1\/requirements\/tara\/models\/[^/?]+(\?|$)/, {
    id: TARA_MODEL,
    itemDefinitionId: ITEM_DEF,
    itemName: 'ADAS Domain Controller (L2+ Highway Pilot)',
    methodRef: 'ISO 21434 / EVITA',
    status: 'in_review',
    assets: TARA_ASSETS,
    damageScenarios: TARA_DAMAGES,
    threats: TARA_THREATS,
  });

  // -- ms-comply: AI-Act classification, risk register, ISO census --------
  on(/\/risk-classification\/required$/, { required: false });
  on(/\/risk-classification$/, {
    project_id: PROJECT,
    category: 'high',
    classifier_version: 'annex3.v1',
    classified: true,
  });
  on(/\/v1\/projects\/[^/]+\/risks(\?|$)/, {
    contract_id: 'riskregister.oscal_read_shape.v1',
    items: [
      { statement: 'Perception model drift outside the validated ODD', likelihood: 'medium', impact: 'high', mitigation: '', status: 'open', owner: 'security', aged: false },
      { statement: 'Training-data lineage incomplete for the 2025 corpus', likelihood: 'low', impact: 'medium', mitigation: 'partial', status: 'open', owner: 'po', aged: false },
      { statement: 'Human-oversight instructions not versioned with the release', likelihood: 'low', impact: 'medium', mitigation: 'documented', status: 'closed', owner: 'po', aged: false },
    ],
  });
  on(/\/v1\/iso\/evidence-pack\/census(\?|$)/, {
    computable: true,
    census: {
      catalog_version: 'iso27001:2022',
      total_controls: 93,
      covered_count: 71,
      partial_count: 12,
      na_count: 4,
      pdf_byte_len: 0,
    },
  });

  // -- ms-monitor: sealed reports, findings, witness chain ----------------
  on(/\/v1\/monitor\/sealed-reports(\?|$)/, {
    count: 4,
    chain_valid: true,
    linkage_valid: true,
    hmac_valid: true,
    reports: seq(4, function (i) {
      return {
        report_id: 'REP-' + (i + 1),
        tenant_seq: i + 1,
        report_kind: ['post_market', 'serious_incident', 'post_market', 'conformity'][i],
        prev_hash: i === 0 ? '0000000000000000' : 'h' + i,
        entry_hash: 'h' + (i + 1),
        hmac: 'm' + (i + 1),
        hmac_key_version: 'v1',
      };
    }),
  });
  on(/\/v1\/monitor\/reports\/verify(\?|$)/, {
    valid: true,
    count: 200,
    linkage_valid: true,
    hmac_valid: true,
  });
  on(/\/v1\/monitor\/findings(\?|$)/, {
    findings: [
      {
        finding_id: 'F-1',
        kind: 'policy_deviation',
        severity: 'major',
        status: 'open',
        strike_count: 1,
        root_cause_record_id: 'RC-9',
        created_at: '2026-06-18T11:20:00Z',
      },
    ],
  });

  // -- ms-beam: approval gates -------------------------------------------
  on(/\/v1\/beam\/gates(\?|$)/, { project_id: PROJECT, status: 'pending', scope: 'all', count: 3, gates: [] });

  // -- tasks / agent board ------------------------------------------------
  var TASK_TITLES = [
    'Decompose UNECE R157 §5.1 into refined requirements',
    'Close the 14 open high-risk TARA threats',
    'Accept safety goal SG-3 (ASIL D hand-over)',
    'Seal the V&V evidence pack for the concept',
    'Wire the driver-monitoring availability monitor',
    'Re-run the ablation suite after the perception bump',
  ];
  on(/\/svc\/tasks\/v1\/agent-board(\?|$)|\/v1\/agent-board(\?|$)/, {
    items: seq(24, function (i) {
      var blocked = i === 3 || i === 11;
      return {
        item_id: 'T-' + (i + 1),
        item_key: 'AB-' + (i + 1),
        title: TASK_TITLES[i % TASK_TITLES.length],
        status: blocked ? 'blocked' : ['done', 'in_progress', 'review', 'backlog'][i % 4],
        priority: 'P' + (i % 3),
      };
    }),
  });

  // -- code provenance ----------------------------------------------------
  on(/\/v1\/codebrowser\/tree(\?|$)/, {
    summary: { ai_lines: 12480, human_lines: 3120 },
    entries: [],
  });

  // -- traceability -------------------------------------------------------
  var TRACE_STATES = ['covered', 'verified', 'covered', 'verified', 'covered'];
  on(/\/v1\/trace\/edges(\?|$)/, {
    edges: seq(230, function (i) {
      return {
        id: 'E-' + (i + 1),
        state: TRACE_STATES[i % TRACE_STATES.length],
        from: 'REQ-' + ((i % 118) + 1),
        to: i % 2 === 0 ? 'TC-' + (i + 1) : 'DES-' + (i + 1),
        suspect: false,
      };
    }),
  });

  // -- canvas -------------------------------------------------------------
  on(/\/v1\/canvas\/projects(\?|$)/, {
    projects: seq(6, function (i) {
      return {
        id: 'CV-' + (i + 1),
        name: [
          'Item boundary — ADAS domain',
          'Signal flow — perception to actuation',
          'Preliminary architecture',
          'Attack paths — OTA channel',
          'Safety mechanism allocation',
          'Degradation states',
        ][i],
      };
    }),
  });

  // -- V&V ----------------------------------------------------------------
  on(/\/v1\/vv\/coverage\/by-concept\/[^/?]+(\?|$)/, {
    concept_id: CONCEPT,
    count: VV_THREATS.length,
    threats: VV_THREATS,
    safety_goals: [],
    status_counts: { REPRODUCED_THEN_DEFENDED: 19, VALIDATED_WITHIN_FTTI: 19, UNTESTED: 4 },
    gaps: { live_gaps: [], model_gaps: [], untested: ['TH-39', 'TH-40', 'TH-41', 'TH-42'], tautological_flags: [] },
    honesty: {
      sealed_result_count: 96,
      unsealed_result_count: 0,
      trust_downgraded: false,
      total_results: 96,
      unattributed_count: 0,
    },
    overall: { proven: false, blockers: ['4 threats untested'], qualifiers: [] },
  });

  // ── the fallback shape ──────────────────────────────────────────────────
  // Surfaces this shim has no fixture for still get a 200 with a structurally
  // valid empty envelope, so they render their own honest EMPTY state instead
  // of an error. Every list key the cockpit's coercers look for is present as
  // an empty array — a coercer never sees a missing collection.
  var EMPTY_KEYS = [
    'items', 'results', 'data', 'rows', 'entries', 'records', 'models', 'documents',
    'elements', 'projects', 'reports', 'findings', 'gates', 'edges', 'nodes', 'goals',
    'concepts', 'threats', 'people', 'members', 'tasks', 'events', 'mappings', 'risks',
    'obligations', 'runs', 'versions', 'artifacts', 'issues', 'sessions', 'decisions',
  ];
  var FALLBACK = (function () {
    var o = { total: 0, count: 0, next_cursor: '', status: 'ok', valid: false };
    EMPTY_KEYS.forEach(function (k) {
      o[k] = [];
    });
    return o;
  })();

  function bodyFor(path) {
    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].re.test(path)) {
        var b = ROUTES[i].body;
        return typeof b === 'function' ? b(path) : b;
      }
    }
    return FALLBACK;
  }

  // ── fetch interception ──────────────────────────────────────────────────
  // Everything under /api/ or /<service>-api/ is answered locally; anything else
  // (the bundle's own chunks, fonts, images) goes to the network untouched.
  var API_PREFIX = /^\/(api|[a-z0-9]+(-[a-z0-9]+)*-api)\//;
  var nativeFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    var raw = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
    var path;
    try {
      path = new URL(raw, location.origin).pathname;
    } catch (_) {
      path = raw;
    }
    if (!API_PREFIX.test(path)) return nativeFetch(input, init);

    var method = (init && init.method) || (input instanceof Request && input.method) || 'GET';
    var search = raw.indexOf('?') > -1 ? raw.slice(raw.indexOf('?')) : '';
    var body = bodyFor(path + search);
    // Writes are inert in the demo: echo the read shape so the surface's
    // optimistic path completes rather than showing a fabricated success.
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': 'demo-' + method.toLowerCase(),
        },
      })
    );
  };

  // ── live-tail WebSocket (a Governance drill-in) ─────────────────────────
  // There is no socket to open; a no-op stub keeps the pane in its "connecting"
  // state instead of throwing on an unreachable ws:// URL.
  var NativeWS = window.WebSocket;
  window.WebSocket = function (url) {
    if (typeof url === 'string' && url.indexOf('/api/') > -1) {
      return {
        readyState: 0,
        close: function () {},
        send: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
      };
    }
    return new NativeWS(url);
  };

  // ── service worker suppression ──────────────────────────────────────────
  if (navigator.serviceWorker && navigator.serviceWorker.register) {
    navigator.serviceWorker.register = function () {
      return Promise.resolve({ unregister: function () {} });
    };
  }

  // ── route bootstrap ─────────────────────────────────────────────────────
  // The cockpit ships a react-router BROWSER router whose paths are absolute
  // ('/projects', '/p/:projectId/...') with no basename, so the shell HTML's own
  // path (/codewitness-app/app.html) matches nothing. Rewriting the iframe's
  // history entry BEFORE the module entry evaluates puts the router on a path it
  // recognises. ES module specifiers resolve against the importing module's URL,
  // not the document's, so the bundle's own lazy chunks keep loading from
  // /codewitness-app/assets/ — and every absolute reference in the build was
  // rewritten to that mount at install time (scripts/install-codewitness-build.sh).
  // The host frame picks the landing surface with ?route=… on the shell URL
  // (read BEFORE the rewrite, which discards it). Only same-origin absolute
  // paths are honoured, so the parameter can never point the frame off-site.
  var route = '/projects';
  try {
    var wanted = new URLSearchParams(location.search).get('route');
    if (wanted && /^\/[A-Za-z0-9/_-]*$/.test(wanted)) route = wanted;
  } catch (_) {
    /* no URLSearchParams — keep the default */
  }
  try {
    history.replaceState(null, '', route);
  } catch (_) {
    /* cross-origin sandbox — the router falls through to its no-match route */
  }
})();
