"use client";

import { useTranslations } from "next-intl";

/** admin 테이블 공용 셀 스타일 */
export const th: React.CSSProperties = {
	padding: "var(--space-2)",
	borderBottom: "1px solid var(--divider)",
	textAlign: "left",
	fontSize: "var(--fs-xs)",
	color: "var(--fg-subtle)",
	fontWeight: 600,
	whiteSpace: "nowrap",
};

export const td: React.CSSProperties = {
	padding: "var(--space-2)",
	borderBottom: "1px solid var(--divider)",
	fontSize: "var(--fs-sm)",
	verticalAlign: "top",
};

export function StateBadge({ tone, children }: { tone: "info" | "warn" | "danger" | "success" | "muted"; children: React.ReactNode }) {
	const colors: Record<string, { bg: string; fg: string }> = {
		info: { bg: "var(--accent-soft)", fg: "var(--accent-soft-fg)" },
		warn: { bg: "var(--warning-soft)", fg: "var(--warning)" },
		danger: { bg: "var(--danger-soft)", fg: "var(--danger)" },
		success: { bg: "var(--success-soft)", fg: "var(--success)" },
		muted: { bg: "var(--bg-muted)", fg: "var(--fg-subtle)" },
	};
	const c = colors[tone];
	return (
		<span
			style={{
				display: "inline-block",
				borderRadius: 999,
				padding: "1px 8px",
				fontSize: "var(--fs-xs)",
				fontWeight: 600,
				background: c.bg,
				color: c.fg,
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</span>
	);
}

interface PaginationProps {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
	const t = useTranslations("admin");
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	if (total <= pageSize) return null;

	return (
		<nav
			aria-label={t("pageInfo", { page, totalPages, total })}
			style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}
		>
			<button className="btn btn--sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
				{t("prev")}
			</button>
			<span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }} aria-live="polite">
				{t("pageInfo", { page, totalPages, total })}
			</span>
			<button className="btn btn--sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
				{t("next")}
			</button>
		</nav>
	);
}
