## Repository Overview

- Small Next.js-based project (see `package.json`): app pages live under `pages/` and API routes under `pages/api/`.
- Uses CommonJS-style modules in `models/` (e.g. `exports.somar`) and Jest for tests in `tests/`.

## Quick Developer Commands

- Start dev server: `npm run dev` (Next.js `next dev`).
- Run all tests: `npm test` (invokes `jest`).
- Run tests in watch mode: `npm run test:watch`.
- Format/check formatting: `npm run lint:fix` / `npm run lint:check` (Prettier).

## Important Project Patterns & Conventions

- Module style: code in `models/` uses CommonJS (`require` / `exports`). Prefer `require('../models/calculadora.js')` when editing tests or server modules.
- Pages: `pages/index.js` exports a React component as `default`. Keep page-level components simple and export default.
- API routes: follow Next.js `pages/api/...` conventions; files should export a handler (`(req, res) => { ... }`). Note: current `pages/api/v1/status/index.js` is empty — expect API route scaffolding here.

## Tests and Known Issues (actionable notes for the agent)

- Tests live in `tests/` not `__tests__`. Example failing/incorrect patterns found in `tests/calculadora.test.js`:
  - It currently `require('../models/calculadora.test.js')` which is wrong; the correct import is `require('../models/calculadora.js')`.
  - Some assertions in the test file use invalid identifiers (e.g., `exportTraceState`) — fix tests to use `expect(...).toBe(...)`.
  - Inspect `models/calculadora.js`: the `somar` function's type check is incorrect (`typeof numero1 !== "erro"`), causing unexpected return values. Prefer `if (typeof numero1 !== 'number') return 'Erro';` or throw a descriptive Error if that's intended.

When making test fixes, run `npm test` frequently. If tests fail after edits, read the stack trace; Jest will point to the test and module file lines to change.

## File examples (how to import / export in this repo)

- Export (models):

  ````javascript
  // models/calculadora.js
  function somar(a, b) { return a + b }
  exports.somar = somar
  ````

- Import in tests or server code:

  ````javascript
  const calculadora = require('../models/calculadora.js')
  const resultado = calculadora.somar(2, 2)
  ````

## Dependency & platform notes

- The `package.json` lists `next`, `react`, and `react-dom`. Use `npm` to run scripts; do not assume global Next.js or Jest installs.
- Prettier is used for code style; run `npm run lint:fix` before committing changes.
- The Next.js version in `package.json` (`^15.x`) is unusual — do not attempt dependency upgrades automatically. If you must update dependencies, verify the app boots with `npm run dev` and run tests.

## Guidance for AI agents

- Be conservative with automated changes: prefer small, test-driven edits. Run `npm test` after each functional change.
- When altering API or page routes, preserve the Next.js file structure under `pages/`.
- Document any behavior changes in `README.md` or a short commit message describing why the test/code change was necessary.

## Where to look next

- `models/calculadora.js` — core example of a module with currently incorrect logic.
- `tests/calculadora.test.js` — contains import and assertion mistakes; a good quick win for fixes.
- `pages/api/v1/status/index.js` — API route scaffold (currently empty) where status endpoints would be implemented.

If any part of this summary is unclear or you'd like the agent to also fix the failing tests and the `somar` implementation, tell me and I will proceed to implement and run `npm test`.
