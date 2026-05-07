"use client";

import { useState, useRef, useEffect } from "react";
import { usePrefs, type Theme, type FontScale, type Motion } from "@/lib/prefs/PrefsContext";

interface Props {
  locale: string;
}

const THEME_OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "라이트", icon: "☀" },
  { value: "dark", label: "다크", icon: "☾" },
  { value: "hc", label: "고대비", icon: "◑" },
];
const FS_OPTIONS: { value: FontScale; label: string }[] = [
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
];
const MOTION_OPTIONS: { value: Motion; label: string }[] = [
  { value: "full", label: "일반" },
  { value: "reduced", label: "줄이기" },
];

export default function ModeMenu({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { theme, fs, motion, setTheme, setFs, setMotion } = usePrefs();
  const isKo = locale === "ko";

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        panelRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const themeIcon = THEME_OPTIONS.find((o) => o.value === theme)?.icon ?? "☀";

  return (
    <div className="mode-menu" data-open={open ? "true" : "false"}>
      <button
        ref={triggerRef}
        className="mode-menu__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={isKo ? "표시 설정" : "Display settings"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{themeIcon}</span>
        <span>{isKo ? "설정" : "Settings"}</span>
      </button>

      <div
        ref={panelRef}
        className="mode-menu__panel"
        role="dialog"
        aria-label={isKo ? "표시 설정" : "Display settings"}
      >
        {/* Theme */}
        <div className="mode-menu__group">
          <p className="mode-menu__label" id="mode-theme-label">
            {isKo ? "테마" : "Theme"}
          </p>
          <div className="seg" role="group" aria-labelledby="mode-theme-label">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                aria-pressed={theme === opt.value}
                onClick={() => setTheme(opt.value)}
              >
                <span aria-hidden="true">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font scale */}
        <div className="mode-menu__group">
          <p className="mode-menu__label" id="mode-fs-label">
            {isKo ? "글자 크기" : "Font size"}
          </p>
          <div className="seg" role="group" aria-labelledby="mode-fs-label">
            {FS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                aria-pressed={fs === opt.value}
                onClick={() => setFs(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Motion */}
        <div className="mode-menu__group">
          <p className="mode-menu__label" id="mode-motion-label">
            {isKo ? "모션" : "Motion"}
          </p>
          <div className="seg" role="group" aria-labelledby="mode-motion-label">
            {MOTION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                aria-pressed={motion === opt.value}
                onClick={() => setMotion(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
