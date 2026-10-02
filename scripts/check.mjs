// Runs every quality check CI runs, keeps going past failures, and prints a summary.
// Usage: npm run check
import { spawnSync } from "node:child_process";

const CHECKS = [
  { name: "Lint", script: "lint" },
  { name: "Typecheck", script: "typecheck" },
  { name: "Unit tests (career data)", script: "test" },
  { name: "CV up to date", script: "test:cv", hint: "If content is missing, run `npm run generate:cv` and commit the PDF" },
  { name: "E2E (site, links, CV, contact form)", script: "test:e2e" },
];

const results = CHECKS.map((check) => {
  console.log(`\n\x1b[1m▶ ${check.name}\x1b[0m  (npm run ${check.script})\n`);
  const start = Date.now();
  const { status } = spawnSync("npm", ["run", "--silent", check.script], { stdio: "inherit" });
  return { ...check, ok: status === 0, seconds: ((Date.now() - start) / 1000).toFixed(1) };
});

console.log("\n\x1b[1mSummary\x1b[0m");
for (const r of results) {
  const mark = r.ok ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✘\x1b[0m";
  console.log(`  ${mark} ${r.name.padEnd(40)} ${r.seconds}s`);
  if (!r.ok) console.log(`      → npm run ${r.script}${r.hint ? `\n      → ${r.hint}` : ""}`);
}

const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n\x1b[31m${failed} check(s) failed\x1b[0m` : "\n\x1b[32mAll checks passed\x1b[0m");
process.exit(failed ? 1 : 0);
