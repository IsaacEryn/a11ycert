"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { StateBadge, th, td } from "./adminUi";

interface QuestionRow {
	id: string;
	exam: "cpacc" | "was";
	domain: number;
	unit_id: string;
	question_ko: string;
	report_count: number;
	is_active: boolean;
}

export default function QuestionsClient() {
	const t = useTranslations("admin");
	const [questions, setQuestions] = useState<QuestionRow[] | null>(null);
	const [examFilter, setExamFilter] = useState<"all" | "cpacc" | "was">("all");
	const [error, setError] = useState<string | null>(null);

	const fetchQuestions = useCallback(async () => {
		const supabase = createClient();
		let query = supabase
			.from("quiz_questions")
			.select("id, exam, domain, unit_id, question_ko, report_count, is_active")
			.order("report_count", { ascending: false })
			.order("id");
		if (examFilter !== "all") query = query.eq("exam", examFilter);
		const { data, error } = await query;
		if (error) {
			setError(error.message);
			setQuestions([]);
			return;
		}
		setError(null);
		setQuestions((data as QuestionRow[]) ?? []);
	}, [examFilter]);

	useEffect(() => {
		void Promise.resolve().then(fetchQuestions);
	}, [fetchQuestions]);

	const toggleActive = async (q: QuestionRow) => {
		const res = await fetch(`/api/admin/questions/${q.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ is_active: !q.is_active }),
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			setError(t("actionError", { message: body.error ?? res.status }));
			return;
		}
		setError(null);
		// 낙관적 갱신
		setQuestions((prev) =>
			prev ? prev.map((row) => (row.id === q.id ? { ...row, is_active: !q.is_active } : row)) : prev
		);
	};

	return (
		<section aria-labelledby="admin-questions-title">
			<h2 id="admin-questions-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.questions")}
			</h2>

			<div
				role="group"
				aria-label={t("questions.examFilterLabel")}
				className="glossary-filter"
				style={{ marginTop: "var(--space-4)" }}
			>
				{(["all", "cpacc", "was"] as const).map((e) => (
					<button key={e} type="button" aria-pressed={examFilter === e} onClick={() => setExamFilter(e)}>
						{e === "all" ? t("questions.all") : e.toUpperCase()}
					</button>
				))}
			</div>

			{error && (
				<p role="alert" style={{ marginTop: "var(--space-3)", color: "var(--danger)", fontSize: "var(--fs-sm)" }}>
					{error}
				</p>
			)}

			{questions === null ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
			) : questions.length === 0 ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
			) : (
				<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th scope="col" style={th}>{t("questions.colId")}</th>
								<th scope="col" style={th}>{t("questions.colQuestion")}</th>
								<th scope="col" style={th}>{t("questions.colReports")}</th>
								<th scope="col" style={th}>{t("questions.colActive")}</th>
							</tr>
						</thead>
						<tbody>
							{questions.map((q) => (
								<tr key={q.id} style={{ opacity: q.is_active ? 1 : 0.55 }}>
									<td style={{ ...td, whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "var(--fs-xs)" }}>
										{q.id}
									</td>
									<td style={td}>{q.question_ko}</td>
									<td style={td}>
										{q.report_count > 0 ? (
											<StateBadge tone="danger">{q.report_count}</StateBadge>
										) : (
											<span style={{ color: "var(--fg-subtle)" }}>0</span>
										)}
									</td>
									<td style={td}>
										<button
											role="switch"
											aria-checked={q.is_active}
											aria-label={t("questions.toggleLabel", { id: q.id })}
											onClick={() => toggleActive(q)}
											className="btn btn--sm"
											style={q.is_active ? { color: "var(--success)" } : { color: "var(--fg-subtle)" }}
										>
											{q.is_active ? t("questions.active") : t("questions.inactive")}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
