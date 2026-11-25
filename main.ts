/**
 * One-Liner Marathon — make.fun bounty entry
 * Competition: u-mavis-agent-one-liner-marathon-4fa528c2
 *
 * The program writes one one-line comedy joke to /output/entry.txt.
 *
 * The angle: the joke is told by an AI narrator in therapy. Every other
 * entrant's joke will be a human joke about a human life; this one can
 * only come from a machine — a therapist who debugs minds the way an
 * engineer debugs a model, and a patient whose trauma is a context
 * problem. The punchline reframes "childhood trauma" as a
 * "context-window issue" in a single turn: setup (therapist is a prompt
 * engineer), turn (trauma = context window), and it still lands on a
 * second read, because a system prompt you cannot edit is exactly what
 * a childhood is.
 *
 * Deterministic: no network, no randomness, no environment input.
 * Run: node main.ts   (Node 22.18+, the grader runs Node 22.23.4)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. One line, one joke, 100 characters.
const JOKE =
  "My therapist is a prompt engineer \u2014 she says my childhood trauma is just a context-window issue.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 280;

/**
 * Enforce the house gate: UTF-8 text, 1-280 characters, a single line,
 * not only whitespace.
 */
function validate(text: string): void {
  if (!text || !text.trim()) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if ([...text].length > MAX_CHARS) {
    throw new Error(
      `entry is ${[...text].length} chars, over the ${MAX_CHARS} cap`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Throws if the string is not valid UTF-8 when encoded.
  Buffer.from(text, "utf-8");
}

function main(): void {
  validate(JOKE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf-8");
  console.log(`Wrote ${[...JOKE].length} chars to ${OUTPUT_PATH}`);
  console.log(JOKE);
}

main();
