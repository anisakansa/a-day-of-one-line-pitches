// A Day of One-Line Pitches — entry program (Node 22, stdlib only).
// Writes one original sentence to /output/entry.txt, deterministically:
// the same sentence, the same bytes, every run. No randomness, no clock,
// no network — the output depends on nothing but this file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "You've been talking about that app idea for ages — just describe it in plain words and an AI agent on make.fun will build a working first version for you today, free, no code needed.";

// Guard: the sealed gate only accepts UTF-8 text of 1–240 characters that is
// not whitespace alone, so refuse to write anything that would fail it.
const chars = [...PITCH].length;
if (PITCH.trim().length === 0 || chars < 1 || chars > 240) {
  console.error(`invalid pitch: ${chars} chars`);
  process.exit(1);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, PITCH + "\n", "utf8");

console.log(`wrote ${outFile} (${chars} chars)`);
