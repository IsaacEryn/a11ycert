"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function MobileSheet({ open, onClose, title, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="mobile-sheet" data-open={open ? "true" : "false"} role="dialog" aria-modal="true" aria-label={title}>
      <div className="mobile-sheet__backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        className="mobile-sheet__panel"
        tabIndex={-1}
      >
        <div className="mobile-sheet__handle" aria-hidden="true" />
        <div className="mobile-sheet__head">
          <span className="mobile-sheet__title">{title}</span>
          <button
            className="mobile-sheet__close"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
