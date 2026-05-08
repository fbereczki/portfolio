# portfolio — CodeWitness

Project: portfolio
Language: node
Tech stack: framer-motion, lucide-react, react, react-dom
Dashboard: http://127.0.0.1:9142/projects/01KQMVBC0KDSYDF2KJ3NZ1602P

## Critical rules

- Parameterized SQL only. Never concatenate user input into a query.
- No hardcoded secrets. Read from env or a vault.
- crypto/rand for security randomness. math/rand is for games only.
- Errors are handled explicitly — no silent drops.
- Test coverage must not regress on changes.

## How to use CodeWitness

Every AI-assisted edit in this repo is captured to the dashboard above.
Commits trigger the first capture; subsequent work is streamed.
