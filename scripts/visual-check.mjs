// Compares every section's screenshots between a git ref (default: main) and the current working
// tree, including uncommitted edits, at the screen sizes in playwright.visual.config.ts.
// Usage: npm run visual:check [-- <ref>]   e.g. `-- HEAD` to see only uncommitted changes.
// Prints one line when nothing changed, otherwise one line per changed size and section.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const base = process.argv[2] ?? "main";
const RESULTS = "visual-report/results.json";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

function run(command, args, options = {}) {
  const { status, stdout, stderr } = spawnSync(command, args, { encoding: "utf8", ...options });
  if (status !== 0 && !options.allowFailure) {
    // Thrown, not process.exit(), so the worktree cleanup in `finally` still runs.
    throw new Error(`${command} ${args.join(" ")} failed:\n${(stdout + stderr).split("\n").slice(-30).join("\n")}`);
  }
  return status;
}

const playwright = (dist, extraArgs) =>
  run("npx", ["playwright", "test", "-c", "playwright.visual.config.ts", ...extraArgs], {
    env: { ...process.env, VISUAL_DIST: dist },
    allowFailure: true,
  });

function failures() {
  if (!existsSync(RESULTS)) return ["no results: see `npx playwright show-report visual-report/html`"];
  const sizes = new Map();
  const walk = (suite) => {
    suite.suites?.forEach(walk);
    for (const spec of suite.specs ?? [])
      for (const t of spec.tests)
        for (const result of t.results)
          for (const error of result.errors ?? []) {
            const what = error.message.replace(/\x1b\[[0-9;]*m/g, "").split("\n")[0].replace(/^Error: /, "");
            sizes.set(what, [...(sizes.get(what) ?? []), t.projectName.replace(/^.*-(?=\d+x\d+$)/, "")]);
          }
  };
  const results = JSON.parse(readFileSync(RESULTS, "utf8"));
  results.suites.forEach(walk);
  // Errors outside any test, e.g. port 4173 already in use: nothing was compared.
  const setup = (results.errors ?? []).map((e) => `did not run: ${e.message.replace(/\x1b\[[0-9;]*m/g, "").split("\n")[0]}`);
  return [...setup, ...[...sizes].map(([what, at]) => `${what}: ${at.join(", ")}`)];
}

const baseSha = git("rev-parse", "--short", base);
const worktree = mkdtempSync(join(tmpdir(), "visual-base-"));
try {
  console.log(`Building ${base} (${baseSha}) and the working tree...`);
  git("worktree", "add", "--detach", worktree, base);
  if (git("diff", base, "--", "package-lock.json")) {
    run("npm", ["ci", "--silent"], { cwd: worktree });
  } else {
    symlinkSync(resolve("node_modules"), join(worktree, "node_modules"));
  }
  run("npx", ["vite", "build"], { cwd: worktree });
  run("npx", ["vite", "build"]);

  // The same test code screenshots both builds: first the base as the baseline, then the working tree.
  playwright(join(worktree, "dist"), ["--update-snapshots=all"]);
  const baseProblems = failures();
  const status = playwright(resolve("dist"), []);
  const changed = failures();

  if (baseProblems.length) console.log(`Note: ${base} itself has problems:\n  ${baseProblems.join("\n  ")}`);
  if (status === 0) {
    console.log(`No visual changes against ${base} at any screen size.`);
  } else if (changed[0]?.startsWith("did not run")) {
    console.log(`Comparison did not run:\n  ${changed.join("\n  ")}`);
    process.exitCode = 1;
  } else {
    console.log(`Changed against ${base} (section: screen sizes):\n  ${changed.join("\n  ")}`);
    console.log("Diff images: test-results/**/<section>-diff.png, or `npx playwright show-report visual-report/html`");
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  git("worktree", "remove", "--force", worktree);
  rmSync(worktree, { recursive: true, force: true });
}
