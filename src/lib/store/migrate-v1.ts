"use client";

// One-time migration: a11ycert-learning (v0 flat) → a11ycert.learning.v2 (per-cert)
// Safe to call multiple times — bails immediately if old key is absent.

export type Cert = "cpacc" | "was";

interface V0Data {
  state?: {
    savedQuestions?: string[];
    wrongAnswers?: string[];
    completedUnits?: string[];
    languageMode?: string;
  };
}

interface PerCertData {
  completedUnits: string[];
  bookmarks: string[];
  wrongNotes: string[];
}

const OLD_KEY = "a11ycert-learning";
const NEW_KEY = "a11ycert.learning.v2";
const MIGRATED_FLAG = "a11ycert.migrated.v1";

function certOf(id: string): Cert | null {
  if (id.startsWith("cpacc-")) return "cpacc";
  if (id.startsWith("was-")) return "was";
  return null;
}

export function migrateV1(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(MIGRATED_FLAG)) return;

    const raw = localStorage.getItem(OLD_KEY);
    if (!raw) {
      localStorage.setItem(MIGRATED_FLAG, "1");
      return;
    }

    const v0: V0Data = JSON.parse(raw);
    const state = v0.state ?? {};

    const data: Record<Cert, PerCertData> = {
      cpacc: { completedUnits: [], bookmarks: [], wrongNotes: [] },
      was: { completedUnits: [], bookmarks: [], wrongNotes: [] },
    };

    for (const id of state.completedUnits ?? []) {
      const cert = certOf(id);
      if (cert) data[cert].completedUnits.push(id);
    }
    for (const id of state.savedQuestions ?? []) {
      const cert = certOf(id);
      if (cert) data[cert].bookmarks.push(id);
    }
    for (const id of state.wrongAnswers ?? []) {
      const cert = certOf(id);
      if (cert) data[cert].wrongNotes.push(id);
    }

    localStorage.setItem(NEW_KEY, JSON.stringify({ state: { perCert: data } }));
    localStorage.setItem(MIGRATED_FLAG, "1");
    // Leave old key intact so Zustand v0 code still works if someone rolls back
  } catch {}
}
