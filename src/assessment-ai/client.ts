// Client side of the AI assist. Both calls are optional decoration on a
// deterministic flow: any non-200 (the route absent under `vite`, no key on
// the server, a timeout, a rate limit) resolves to "nothing" and the page
// never shows an error for it.

import type { ChipId } from "../pages/v3/opportunityEngine";

export type AssistStatus = "suggested" | "empty" | "unavailable" | "timeout" | "error";

export interface ChipSuggestion {
  chip: ChipId;
  reason: string;
}

async function post(body: unknown, timeoutMs: number): Promise<{ status: AssistStatus; data: unknown }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch("/api/read-assist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (res.status === 204) return { status: "unavailable", data: null };
    if (!res.ok) return { status: res.status === 404 ? "unavailable" : "error", data: null };
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("application/json")) return { status: "unavailable", data: null };
    return { status: "suggested", data: await res.json() };
  } catch (err) {
    return { status: err instanceof DOMException && err.name === "AbortError" ? "timeout" : "error", data: null };
  } finally {
    clearTimeout(timer);
  }
}

export async function suggestChips(text: string, chips: ChipId[], validChips: readonly ChipId[]): Promise<{ status: AssistStatus; suggestions: ChipSuggestion[] }> {
  const { status, data } = await post({ mode: "chips", text: text.slice(0, 200), chips }, 3500);
  if (status !== "suggested") return { status, suggestions: [] };
  const raw = (data as { suggestions?: unknown })?.suggestions;
  const suggestions: ChipSuggestion[] = Array.isArray(raw)
    ? raw
        .filter((s): s is ChipSuggestion => !!s && typeof s === "object" && typeof (s as ChipSuggestion).chip === "string" && typeof (s as ChipSuggestion).reason === "string")
        .filter(s => validChips.includes(s.chip) && !chips.includes(s.chip))
        .slice(0, 3)
    : [];
  return { status: suggestions.length ? "suggested" : "empty", suggestions };
}

export async function bridgeHeard(input: { title: string; heard: string[]; summary: string }): Promise<{ status: AssistStatus; paragraph: string | null }> {
  const { status, data } = await post({ mode: "bridge", ...input }, 3000);
  if (status !== "suggested") return { status, paragraph: null };
  const paragraph = (data as { paragraph?: unknown })?.paragraph;
  return typeof paragraph === "string" && paragraph.trim()
    ? { status: "suggested", paragraph: paragraph.trim() }
    : { status: "empty", paragraph: null };
}
