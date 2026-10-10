#!/usr/bin/env node
/**
 * Validate that every schema in schemas/ is well-formed JSON and that the
 * JSON Schema draft declaration is present. Run with: node scripts/validate-schemas.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMAS = join(ROOT, "schemas");

let failed = 0;
for (const file of readdirSync(SCHEMAS).filter((f) => f.endsWith(".json"))) {
  const path = join(SCHEMAS, file);
  try {
    const doc = JSON.parse(readFileSync(path, "utf8"));
    const checks = [
      ["has $schema", typeof doc.$schema === "string"],
      ["has $id", typeof doc.$id === "string"],
      ["has title", typeof doc.title === "string"],
      ["has type", typeof doc.type === "string"],
    ];
    const bad = checks.filter(([, ok]) => !ok).map(([name]) => name);
    if (bad.length) {
      console.log(`✗ ${file}: missing ${bad.join(", ")}`);
      failed++;
    } else {
      console.log(`✓ ${file}`);
    }
  } catch (e) {
    console.log(`✗ ${file}: invalid JSON — ${e.message}`);
    failed++;
  }
}
process.exit(failed ? 1 : 0);
