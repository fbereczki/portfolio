# CodeWitness — portfolio

**Project:** portfolio
**Language:** Node.js
**Hub URL:** http://127.0.0.1:9142
**Onboarded:** 2026-05-02

## What is CodeWitness?

CodeWitness tracks AI-assisted development and generates compliance reports
(SOC 2, EU AI Act, ISO 42001). It captures every AI prompt, attributes code
to its origin, and maintains an HMAC-SHA256 audit chain.

## Quick Start

```bash
# Check status
codewitness status

# Start a work session
codewitness session start --task PROJ-123

# View attribution
codewitness blame <file>

# Generate report
codewitness report --format json
```

## Directory Structure

- `.nexus/` — Project configuration and local state
- `.claude/` — Claude Code hook configuration
- `.cwt/workflows/` — BEAM workflow definitions
