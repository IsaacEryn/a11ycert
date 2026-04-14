"use client";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
}

export default function MobileMenuToggle({
  isOpen,
  onToggle,
  label,
}: MobileMenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      aria-label={label}
      className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus-visible:outline-2"
    >
      <span
        className={[
          "block w-5 h-0.5 bg-gray-700 transition-transform duration-200",
          isOpen ? "translate-y-2 rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "block w-5 h-0.5 bg-gray-700 transition-opacity duration-200",
          isOpen ? "opacity-0" : "",
        ].join(" ")}
      />
      <span
        className={[
          "block w-5 h-0.5 bg-gray-700 transition-transform duration-200",
          isOpen ? "-translate-y-2 -rotate-45" : "",
        ].join(" ")}
      />
    </button>
  );
}
