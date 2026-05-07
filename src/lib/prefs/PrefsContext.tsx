"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { migrateV1 } from "@/lib/store/migrate-v1";

export type Theme = "light" | "dark" | "hc";
export type FontScale = "s" | "m" | "l" | "xl";
export type Motion = "full" | "reduced";

export interface Prefs {
  theme: Theme;
  fs: FontScale;
  motion: Motion;
}

interface PrefsContextValue extends Prefs {
  setTheme: (t: Theme) => void;
  setFs: (f: FontScale) => void;
  setMotion: (m: Motion) => void;
}

const KEY = "a11ycert.prefs.v1";

const defaultPrefs: Prefs = { theme: "light", fs: "m", motion: "full" };

const PrefsContext = createContext<PrefsContextValue>({
  ...defaultPrefs,
  setTheme: () => {},
  setFs: () => {},
  setMotion: () => {},
});

function readStorage(): Prefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Prefs;
  } catch {}
  const theme: Theme =
    (window.matchMedia("(prefers-contrast: more)").matches && "hc") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const motion: Motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "reduced"
    : "full";
  return { theme, fs: "m", motion };
}

function writeStorage(p: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

function applyToRoot(p: Prefs) {
  const r = document.documentElement;
  r.setAttribute("data-theme", p.theme);
  r.setAttribute("data-fs", p.fs);
  r.setAttribute("data-motion", p.motion);
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);

  useEffect(() => {
    migrateV1();
    const p = readStorage();
    setPrefs(p);
    applyToRoot(p);
  }, []);

  const patch = useCallback((update: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...update };
      writeStorage(next);
      applyToRoot(next);
      return next;
    });
  }, []);

  return (
    <PrefsContext.Provider
      value={{
        ...prefs,
        setTheme: (t) => patch({ theme: t }),
        setFs: (f) => patch({ fs: f }),
        setMotion: (m) => patch({ motion: m }),
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  return useContext(PrefsContext);
}
