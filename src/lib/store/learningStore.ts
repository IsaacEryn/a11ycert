"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cert } from "./migrate-v1";
import { gradeCard, type SrsCardState, type SrsGrade } from "@/lib/srs/leitner";

export type LanguageMode = "ko-only" | "parallel" | "en-only";

/** 비로그인 사용자의 로컬 시도 이력 (cert별 최근 MAX_LOCAL_ATTEMPTS개) */
export interface LocalAttempt {
  id: string;
  mode: "practice" | "mock";
  total: number;
  correct: number;
  durationSeconds: number | null;
  domainStats: Record<string, { total: number; correct: number }>;
  createdAt: string;
}

const MAX_LOCAL_ATTEMPTS = 20;

interface PerCertData {
  completedUnits: string[];
  bookmarks: string[];
  wrongNotes: string[];
  srs: Record<string, SrsCardState>;
  attempts: LocalAttempt[];
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
  gradeFlashcard: (cert: Cert, cardId: string, grade: SrsGrade) => SrsCardState;
  recordAttempt: (cert: Cert, attempt: LocalAttempt) => void;

  // Per-cert queries
  isCompleted: (cert: Cert, unitId: string) => boolean;
  isSaved: (cert: Cert, id: string) => boolean;
  isWrong: (cert: Cert, id: string) => boolean;
  getCompletedCount: (cert: Cert) => number;
  getBookmarks: (cert: Cert) => string[];
  getWrongNotes: (cert: Cert) => string[];
  getSrsMap: (cert: Cert) => Record<string, SrsCardState>;
  getAttempts: (cert: Cert) => LocalAttempt[];

  setLanguageMode: (mode: LanguageMode) => void;
}

function emptyCert(): PerCertData {
  return { completedUnits: [], bookmarks: [], wrongNotes: [], srs: {}, attempts: [] };
}

function getCert(state: LearningState, cert: string): PerCertData {
  // 구버전 persist 데이터에 없는 필드(srs/attempts)를 기본값으로 보정
  return { ...emptyCert(), ...state.perCert[cert] };
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

      gradeFlashcard: (cert, cardId, grade) => {
        const next = gradeCard(getCert(get(), cert).srs[cardId], grade);
        set((s) => {
          const c = getCert(s, cert);
          return patchCert(s, cert, { srs: { ...c.srs, [cardId]: next } });
        });
        return next;
      },

      recordAttempt: (cert, attempt) =>
        set((s) => {
          const c = getCert(s, cert);
          return patchCert(s, cert, {
            attempts: [attempt, ...c.attempts].slice(0, MAX_LOCAL_ATTEMPTS),
          });
        }),

      isCompleted: (cert, unitId) => getCert(get(), cert).completedUnits.includes(unitId),
      isSaved: (cert, id) => getCert(get(), cert).bookmarks.includes(id),
      isWrong: (cert, id) => getCert(get(), cert).wrongNotes.includes(id),
      getCompletedCount: (cert) => getCert(get(), cert).completedUnits.length,
      getBookmarks: (cert) => getCert(get(), cert).bookmarks,
      getWrongNotes: (cert) => getCert(get(), cert).wrongNotes,
      getSrsMap: (cert) => getCert(get(), cert).srs,
      getAttempts: (cert) => getCert(get(), cert).attempts,

      setLanguageMode: (mode) => set({ languageMode: mode }),
    }),
    {
      name: "a11ycert.learning.v2",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // v0(필드 없음) → v1: getCert()가 누락 필드를 lazy 보정하므로 그대로 통과
      migrate: (persisted) => persisted as LearningState,
    }
  )
);
