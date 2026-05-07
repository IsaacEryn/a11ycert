"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cert } from "./migrate-v1";

export type LanguageMode = "ko-only" | "parallel" | "en-only";

interface PerCertData {
  completedUnits: string[];
  bookmarks: string[];
  wrongNotes: string[];
}

interface LearningState {
  perCert: Record<string, PerCertData>;
  languageMode: LanguageMode;

  // Per-cert actions
  markUnitComplete: (cert: Cert, unitId: string) => void;
  saveQuestion: (cert: Cert, id: string) => void;
  unsaveQuestion: (cert: Cert, id: string) => void;
  addWrongAnswer: (cert: Cert, id: string) => void;
  removeWrongAnswer: (cert: Cert, id: string) => void;

  // Per-cert queries
  isCompleted: (cert: Cert, unitId: string) => boolean;
  isSaved: (cert: Cert, id: string) => boolean;
  isWrong: (cert: Cert, id: string) => boolean;
  getCompletedCount: (cert: Cert) => number;
  getBookmarks: (cert: Cert) => string[];
  getWrongNotes: (cert: Cert) => string[];

  setLanguageMode: (mode: LanguageMode) => void;
}

function emptyCert(): PerCertData {
  return { completedUnits: [], bookmarks: [], wrongNotes: [] };
}

function getCert(state: LearningState, cert: string): PerCertData {
  return state.perCert[cert] ?? emptyCert();
}

function patchCert(
  state: LearningState,
  cert: string,
  patch: Partial<PerCertData>
): Partial<LearningState> {
  return {
    perCert: {
      ...state.perCert,
      [cert]: { ...getCert(state, cert), ...patch },
    },
  };
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      perCert: {},
      languageMode: "ko-only" as LanguageMode,

      markUnitComplete: (cert, unitId) =>
        set((s) => {
          const c = getCert(s, cert);
          if (c.completedUnits.includes(unitId)) return s;
          return patchCert(s, cert, { completedUnits: [...c.completedUnits, unitId] });
        }),

      saveQuestion: (cert, id) =>
        set((s) => {
          const c = getCert(s, cert);
          if (c.bookmarks.includes(id)) return s;
          return patchCert(s, cert, { bookmarks: [...c.bookmarks, id] });
        }),

      unsaveQuestion: (cert, id) =>
        set((s) => {
          const c = getCert(s, cert);
          return patchCert(s, cert, { bookmarks: c.bookmarks.filter((x) => x !== id) });
        }),

      addWrongAnswer: (cert, id) =>
        set((s) => {
          const c = getCert(s, cert);
          if (c.wrongNotes.includes(id)) return s;
          return patchCert(s, cert, { wrongNotes: [...c.wrongNotes, id] });
        }),

      removeWrongAnswer: (cert, id) =>
        set((s) => {
          const c = getCert(s, cert);
          return patchCert(s, cert, { wrongNotes: c.wrongNotes.filter((x) => x !== id) });
        }),

      isCompleted: (cert, unitId) => getCert(get(), cert).completedUnits.includes(unitId),
      isSaved: (cert, id) => getCert(get(), cert).bookmarks.includes(id),
      isWrong: (cert, id) => getCert(get(), cert).wrongNotes.includes(id),
      getCompletedCount: (cert) => getCert(get(), cert).completedUnits.length,
      getBookmarks: (cert) => getCert(get(), cert).bookmarks,
      getWrongNotes: (cert) => getCert(get(), cert).wrongNotes,

      setLanguageMode: (mode) => set({ languageMode: mode }),
    }),
    {
      name: "a11ycert.learning.v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
