"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LanguageMode = "ko-only" | "parallel" | "en-only";

interface LearningState {
	savedQuestions: string[];
	wrongAnswers: string[];
	completedUnits: string[];
	languageMode: LanguageMode;

	saveQuestion: (id: string) => void;
	unsaveQuestion: (id: string) => void;
	addWrongAnswer: (id: string) => void;
	removeWrongAnswer: (id: string) => void;
	markUnitComplete: (unitId: string) => void;
	setLanguageMode: (mode: LanguageMode) => void;
	isSaved: (id: string) => boolean;
	isWrong: (id: string) => boolean;
	isCompleted: (unitId: string) => boolean;
}

export const useLearningStore = create<LearningState>()(
	persist(
		(set, get) => ({
			savedQuestions: [],
			wrongAnswers: [],
			completedUnits: [],
			languageMode: "ko-only" as LanguageMode,

			saveQuestion: (id) =>
				set((s) =>
					s.savedQuestions.includes(id) ? s : { savedQuestions: [...s.savedQuestions, id] }
				),

			unsaveQuestion: (id) =>
				set((s) => ({ savedQuestions: s.savedQuestions.filter((q) => q !== id) })),

			addWrongAnswer: (id) =>
				set((s) => (s.wrongAnswers.includes(id) ? s : { wrongAnswers: [...s.wrongAnswers, id] })),

			removeWrongAnswer: (id) =>
				set((s) => ({ wrongAnswers: s.wrongAnswers.filter((q) => q !== id) })),

			markUnitComplete: (unitId) =>
				set((s) =>
					s.completedUnits.includes(unitId) ? s : { completedUnits: [...s.completedUnits, unitId] }
				),

			setLanguageMode: (mode) => set({ languageMode: mode }),

			isSaved: (id) => get().savedQuestions.includes(id),
			isWrong: (id) => get().wrongAnswers.includes(id),
			isCompleted: (unitId) => get().completedUnits.includes(unitId),
		}),
		{
			name: "a11ycert-learning",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
