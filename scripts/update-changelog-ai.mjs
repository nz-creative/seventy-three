#!/usr/bin/env node
/**
 * Updates ## [Unreleased] in CHANGELOG.md using the OpenAI API from recent git commits.
 *
 * Env:
 *   OPENAI_API_KEY   (required for API mode)
 *   OPENAI_MODEL     (optional, default gpt-4o-mini)
 *   GIT_LOG_COUNT    (optional, default 25)
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/update-changelog-ai.mjs
 *   node scripts/update-changelog-ai.mjs --dry-run   # print prompt size; no API
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CHANGELOG = path.join(ROOT, "CHANGELOG.md");

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function gitLog(count) {
  try {
    const raw = execSync(`git log -${count} --pretty=format:%H%x01%s%x01%b%x02`, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 5 * 1024 * 1024,
    });
    return raw
      .split("\x02")
      .filter(Boolean)
      .map((chunk) => {
        const parts = chunk.trim().split("\x01");
        const sha = (parts[0] || "").slice(0, 7);
        const subject = parts[1] || "";
        const body = parts.slice(2).join("\x01").trim();
        if (!subject) return null;
        if (/changelog|update-changelog-ai|skip changelog/i.test(subject))
          return null;
        const line = `- ${sha} ${subject}`;
        const detail = body ? `\n  ${body.replace(/\n/g, "\n  ")}` : "";
        return line + detail;
      })
      .filter(Boolean)
      .join("\n");
  } catch {
    return "(git log unavailable)";
  }
}

function extractUnreleased(md) {
  const start = md.indexOf("## [Unreleased]");
  if (start === -1) return null;
  const rest = md.slice(start + "## [Unreleased]".length);
  const nextHeader = rest.search(/\n## \[/);
  const block =
    nextHeader === -1 ? rest : rest.slice(0, nextHeader);
  return block.trim();
}

function replaceUnreleased(md, newSectionBody) {
  const start = md.indexOf("## [Unreleased]");
  if (start === -1) throw new Error("CHANGELOG.md missing ## [Unreleased]");
  const afterStart = md.slice(start);
  const nextIdx = afterStart.search(/\n---\s*\n## \[/);
  if (nextIdx === -1)
    throw new Error("CHANGELOG.md: expected --- before next ## [version]");
  const before = md.slice(0, start);
  const tail = md.slice(start + nextIdx);
  const unreleased =
    `## [Unreleased]\n\n${newSectionBody.trim()}\n\n` +
    tail.slice(tail.indexOf("---"));
  return before + unreleased;
}

async function callOpenAI(system, user) {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY is not set");

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.25,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from OpenAI");
  return text;
}

function stripFence(s) {
  let t = s.trim();
  if (t.startsWith("```markdown")) t = t.slice("```markdown".length);
  else if (t.startsWith("```md")) t = t.slice("```md".length);
  else if (t.startsWith("```")) t = t.slice(3);
  t = t.trim();
  if (t.endsWith("```")) t = t.slice(0, -3).trim();
  return t;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const count = Number(process.env.GIT_LOG_COUNT || "25") || 25;

  const md = fs.readFileSync(CHANGELOG, "utf8");
  const currentUnreleased = extractUnreleased(md) ?? "";
  const commits = gitLog(count);

  const system = `You update CHANGELOG.md for a design-system monorepo (Seventy-Three: tokens, React UI, Storybook, Next docs). Follow Keep a Changelog style.

Rules:
- Output ONLY the body that goes immediately after "## [Unreleased]" — start with optional blank line then use ### Added, ### Changed, ### Fixed, ### Removed as needed (omit empty sections).
- Use bullet lists. Past tense for changes. Bold notable symbols like **@seventythree/ui** when helpful.
- Merge new git commits with existing unreleased bullets; deduplicate; do not remove accurate older unreleased items unless superseded.
- Ignore noisy commits (typo-only, merge commits without substance) when no user-facing change.
- Do not repeat the ## [Unreleased] heading in your output.
- Keep concise (typically under 40 bullets total across sections).`;

  const user = `Current unreleased section content:

${currentUnreleased || "(empty placeholder)"}

---

Recent commits (newest first, hash + subject):

${commits || "(none)"}

---

Produce the updated unreleased section body (markdown only, starting with ### Added or another subsection).`;

  if (dryRun) {
    console.log("--- dry-run: would send ~", user.length, "chars user message");
    console.log(commits.slice(0, 2000));
    process.exit(0);
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    console.error(
      "OPENAI_API_KEY not set; skipping AI changelog update (set secret in CI or export locally).",
    );
    process.exit(0);
  }

  const raw = await callOpenAI(system, user);
  const body = stripFence(raw);
  const nextMd = replaceUnreleased(md, body);
  fs.writeFileSync(CHANGELOG, nextMd, "utf8");
  console.log(`Updated ${path.relative(ROOT, CHANGELOG)}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
