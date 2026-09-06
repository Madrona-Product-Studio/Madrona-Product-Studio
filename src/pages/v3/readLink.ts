// The read's permalink: OpportunityAnswers packed into a short, stable
// `?r=` value so a refresh, a pasted link, or the emailed copy lands on the
// same report. Layout (bit-packed, then base64url; version nibble first so
// the format can change without breaking old links):
//
//   4  version (1)
//   12 chip mask, openerChips order
//   4x3 anchors, 0 = unanswered, else option index + 1
//   4x5 evidence masks, option index = bit
//   3  ai (0 = skipped), 5 blocker mask, 3 readiness (0 = skipped)
//
// followed by "." + base64url(utf-8 free text) when the visitor wrote any.
// Isomorphic on purpose: api/read.ts decodes the same string on the server.

import { openerChips, type ChipId, type OpportunityAnswers } from "./opportunityEngine";

const VERSION = 1;
const CHIP_ORDER: ChipId[] = openerChips.map(c => c.chip);
const ANCHORS = ["moneyHours", "customersHours", "wordsHours", "glueHours"] as const;
const EVIDENCE = ["moneyEvidence", "customersEvidence", "wordsEvidence", "glueEvidence"] as const;
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function toBase64url(bytes: number[]): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
    if (i + 1 < bytes.length) out += B64[(n >> 6) & 63];
    if (i + 2 < bytes.length) out += B64[n & 63];
  }
  return out;
}

function fromBase64url(s: string): number[] | null {
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;
  for (const ch of s) {
    const v = B64.indexOf(ch);
    if (v < 0) return null;
    buffer = (buffer << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 255);
    }
  }
  return bytes;
}

class BitWriter {
  private bits: number[] = [];
  write(value: number, width: number) {
    for (let i = width - 1; i >= 0; i--) this.bits.push((value >> i) & 1);
  }
  bytes(): number[] {
    const out: number[] = [];
    for (let i = 0; i < this.bits.length; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | (this.bits[i + j] ?? 0);
      out.push(b);
    }
    return out;
  }
}

class BitReader {
  private pos = 0;
  private bytes: number[];
  constructor(bytes: number[]) { this.bytes = bytes; }
  read(width: number): number {
    let v = 0;
    for (let i = 0; i < width; i++) {
      const byte = this.bytes[this.pos >> 3] ?? 0;
      v = (v << 1) | ((byte >> (7 - (this.pos & 7))) & 1);
      this.pos++;
    }
    return v;
  }
}

function mask(indexes: number[] | undefined, width: number): number {
  return (indexes ?? []).reduce((m, i) => (i >= 0 && i < width ? m | (1 << i) : m), 0);
}

function unmask(m: number, width: number): number[] | undefined {
  const out: number[] = [];
  for (let i = 0; i < width; i++) if (m & (1 << i)) out.push(i);
  return out.length ? out : undefined;
}

export function encodeAnswers(a: OpportunityAnswers): string {
  const w = new BitWriter();
  w.write(VERSION, 4);
  w.write(mask(a.chips.map(c => CHIP_ORDER.indexOf(c)), 12), 12);
  for (const key of ANCHORS) w.write(a[key] === undefined ? 0 : (a[key] as number) + 1, 3);
  for (const key of EVIDENCE) w.write(mask(a[key], 5), 5);
  w.write(a.ai === undefined ? 0 : a.ai + 1, 3);
  w.write(mask(a.blocker, 5), 5);
  w.write(a.readiness === undefined ? 0 : a.readiness + 1, 3);
  let out = toBase64url(w.bytes());
  const text = a.otherText?.trim();
  if (text) out += "." + toBase64url(Array.from(new TextEncoder().encode(text.slice(0, 200))));
  return out;
}

export function decodeAnswers(code: string | null | undefined): OpportunityAnswers | null {
  if (!code || code.length > 400) return null;
  const [head, tail] = code.split(".");
  const bytes = fromBase64url(head);
  if (!bytes || bytes.length < 8) return null;
  const r = new BitReader(bytes);
  if (r.read(4) !== VERSION) return null;
  const chipMask = r.read(12);
  const a: OpportunityAnswers = { chips: CHIP_ORDER.filter((_, i) => chipMask & (1 << i)) };
  for (const key of ANCHORS) {
    const v = r.read(3);
    if (v >= 1 && v <= 5) a[key] = v - 1;
  }
  for (const key of EVIDENCE) {
    const v = unmask(r.read(5), 5);
    if (v) a[key] = v;
  }
  const ai = r.read(3);
  if (ai >= 1 && ai <= 5) a.ai = ai - 1;
  const blocker = unmask(r.read(5), 5);
  if (blocker) a.blocker = blocker;
  const readiness = r.read(3);
  if (readiness >= 1 && readiness <= 5) a.readiness = readiness - 1;
  if (tail) {
    const textBytes = fromBase64url(tail);
    if (textBytes) {
      try {
        const text = new TextDecoder().decode(new Uint8Array(textBytes)).trim().slice(0, 200);
        if (text) a.otherText = text;
      } catch {
        // A mangled tail just loses the free text.
      }
    }
  }
  return a;
}
