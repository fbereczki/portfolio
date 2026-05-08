export type SkillCat = 'backend' | 'frontend' | 'ai' | 'data' | 'compliance' | 'mobile';

export type Skill = { name: string; category: SkillCat; level: 1 | 2 | 3 };

export const skills: Skill[] = [
  // Backend
  { name: 'Go', category: 'backend', level: 3 },
  { name: 'Gin / Fiber', category: 'backend', level: 3 },
  { name: 'GORM', category: 'backend', level: 3 },
  { name: 'Rust (Axum)', category: 'backend', level: 2 },
  { name: 'Node.js / TypeScript', category: 'backend', level: 3 },

  // Frontend
  { name: 'React 18 / 19', category: 'frontend', level: 3 },
  { name: 'TypeScript', category: 'frontend', level: 3 },
  { name: 'Vite', category: 'frontend', level: 3 },
  { name: 'Material-UI', category: 'frontend', level: 3 },
  { name: 'Tailwind CSS', category: 'frontend', level: 3 },
  { name: 'SvelteKit', category: 'frontend', level: 2 },
  { name: 'VS Code Extension API', category: 'frontend', level: 3 },

  // AI
  { name: 'MCP (Model Context Protocol)', category: 'ai', level: 3 },
  { name: 'RAG architectures', category: 'ai', level: 3 },
  { name: 'pgvector', category: 'ai', level: 3 },
  { name: 'Ollama (self-hosted LLMs)', category: 'ai', level: 3 },
  { name: 'llama.cpp', category: 'ai', level: 2 },
  { name: 'LangChain / LangGraph', category: 'ai', level: 2 },
  { name: 'Anthropic / OpenAI SDK', category: 'ai', level: 2 },

  // Data
  { name: 'PostgreSQL', category: 'data', level: 3 },
  { name: 'TimescaleDB', category: 'data', level: 2 },
  { name: 'Redis', category: 'data', level: 3 },
  { name: 'NATS JetStream', category: 'data', level: 2 },
  { name: 'Docker / Compose', category: 'data', level: 3 },
  { name: 'Kubernetes', category: 'data', level: 2 },

  // Compliance
  { name: 'ISO/SAE 21434', category: 'compliance', level: 3 },
  { name: 'ISO 26262 (ASIL)', category: 'compliance', level: 3 },
  { name: 'UN R155 / R156', category: 'compliance', level: 3 },
  { name: 'EU AI Act', category: 'compliance', level: 2 },
  { name: 'SOC 2 reports', category: 'compliance', level: 2 },
  { name: 'GDPR / pszeudonymizáció', category: 'compliance', level: 3 },

  // Mobile
  { name: 'Flutter / Dart', category: 'mobile', level: 2 },
];
