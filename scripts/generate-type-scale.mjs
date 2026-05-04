#!/usr/bin/env node
/**
 * Regenerates the modular type scale block in primitives.css from --text-base (1rem)
 * and a ratio (default from scripts/type-scale.config.json).
 *
 * Usage:
 *   node scripts/generate-type-scale.mjs
 *   node scripts/generate-type-scale.mjs --ratio 1.2          # override config for one run
 *   node scripts/generate-type-scale.mjs --ratio 1.333 --dry-run
 *   node scripts/generate-type-scale.mjs --check              # CI: fail if primitives.css drifts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(REPO_ROOT, "scripts/type-scale.config.json");
const PRIMITIVES = path.join(
  REPO_ROOT,
  "packages/tokens/src/themes/primitives.css",
);

const MARKER_START = "/* TYPE-SCALE-BLOCK:START */";
const MARKER_END = "/* TYPE-SCALE-BLOCK:END */";

const FALLBACK_RATIO = 1.25;
const BASE_REM = 1;

/** Tailwind step → exponent offset from base (base = 0). */
const STEP_EXPONENT = {
  xs: -2,
  sm: -1,
  base: 0,
  lg: 1,
  xl: 2,
  "2xl": 3,
  "3xl": 4,
  "4xl": 5,
  "5xl": 6,
  "6xl": 7,
  "7xl": 8,
  "8xl": 9,
  "9xl": 10,
};

/** Line-height (rem) for body-sized steps; display steps use 1 */
const LEADING_REM = {
  xs: 1,
  sm: 1.25,
  base: 1.5,
  lg: 1.75,
  xl: 2,
  "2xl": 2.375,
  "3xl": 2.875,
  "4xl": 3.5,
};

function loadConfigRatio() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    const data = JSON.parse(raw);
    const r = Number(data.ratio);
    if (Number.isFinite(r) && r > 0) return r;
  } catch {
    // missing or invalid config
  }
  return FALLBACK_RATIO;
}

function parseArgs() {
  const argv = process.argv.slice(2);
  let ratioFromCli = null;
  let dryRun = false;
  let check = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--ratio" && argv[i + 1]) {
      ratioFromCli = Number(argv[++i]);
    } else if (argv[i] === "--dry-run") {
      dryRun = true;
    } else if (argv[i] === "--check") {
      check = true;
    }
  }
  const configRatio = loadConfigRatio();
  const ratio =
    ratioFromCli != null && Number.isFinite(ratioFromCli) && ratioFromCli > 0
      ? ratioFromCli
      : configRatio;

  if (ratioFromCli != null && (!Number.isFinite(ratioFromCli) || ratioFromCli <= 0)) {
    console.error("Invalid --ratio; use a positive number (e.g. 1.25)");
    process.exit(1);
  }
  if (!Number.isFinite(ratio) || ratio <= 0) {
    console.error(
      `Invalid ratio from ${path.relative(REPO_ROOT, CONFIG_PATH)} or --ratio.`,
    );
    process.exit(1);
  }
  if (dryRun && check) {
    console.error("Use either --dry-run or --check, not both.");
    process.exit(1);
  }
  return { ratio, dryRun, check, ratioSource: ratioFromCli != null ? "cli" : "config" };
}

function formatRem(rem) {
  const rounded = Math.round(rem * 1e6) / 1e6;
  const s = rounded.toFixed(6).replace(/\.?0+$/, "");
  return s;
}

function buildBlock(ratio) {
  const lines = [
    "  /* -------------------------------------------------------------------------",
    "     Layout — typography (modular scale; regenerate with pnpm run generate:type-scale)",
    `     Ratio ${ratio} (from scripts/type-scale.config.json unless --ratio). Base body ${BASE_REM}rem (16px).`,
    "     ------------------------------------------------------------------------- */",
    `  --type-scale-ratio: ${ratio};`,
  ];

  const order = [
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ];

  for (const step of order) {
    const exp = STEP_EXPONENT[step];
    const fontRem = BASE_REM * ratio ** exp;
    const remStr = formatRem(fontRem);
    const pxApprox = Math.round(fontRem * 16);
    const suffix =
      step === "base"
        ? " /* 16px — body */"
        : ` /* ~${pxApprox}px */`;

    if (LEADING_REM[step] !== undefined) {
      lines.push(
        `  --text-${step}: ${remStr}rem;${suffix}`,
        `  --leading-${step}: ${LEADING_REM[step]}rem;`,
      );
    } else {
      lines.push(
        `  --text-${step}: ${remStr}rem;${suffix}`,
        `  --leading-${step}: 1;`,
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

function inject(css, block) {
  if (!css.includes(MARKER_START) || !css.includes(MARKER_END)) {
    console.error(
      `Missing markers in ${PRIMITIVES}:\n  ${MARKER_START}\n  ${MARKER_END}`,
    );
    process.exit(1);
  }
  const start = css.indexOf(MARKER_START);
  const end = css.indexOf(MARKER_END);
  if (end <= start) {
    console.error("Invalid marker order in primitives.css");
    process.exit(1);
  }
  const before = css.slice(0, start);
  const after = css.slice(end + MARKER_END.length);
  return `${before}${MARKER_START}\n${block}  ${MARKER_END}${after}`;
}

const { ratio, dryRun, check, ratioSource } = parseArgs();
const block = buildBlock(ratio);

if (dryRun) {
  console.log(block);
  process.exit(0);
}

const css = fs.readFileSync(PRIMITIVES, "utf8");

if (check) {
  const next = inject(css, block);
  if (css !== next) {
    console.error(
      `Type scale block in ${path.relative(REPO_ROOT, PRIMITIVES)} does not match generated output (ratio=${ratio} from ${ratioSource}).\n` +
        `Expected ratio from ${path.relative(REPO_ROOT, CONFIG_PATH)} (or pass --ratio).\n` +
        "Run: pnpm generate:type-scale\n" +
        "Then commit the updated primitives.css.",
    );
    process.exit(1);
  }
  console.log(
    `OK: type scale matches generator (ratio=${ratio}, source=${ratioSource}).`,
  );
  process.exit(0);
}

const next = inject(css, block);
fs.writeFileSync(PRIMITIVES, next, "utf8");
console.log(
  `Updated ${path.relative(REPO_ROOT, PRIMITIVES)} (ratio=${ratio}, source=${ratioSource}).`,
);
