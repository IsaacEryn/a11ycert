import type { DomainGroup, StudyUnit, QuizQuestion } from "./types";
import { cpaccDomains } from "./cpacc-units";
import { wasDomains } from "./was-units";
import { cpaccExtraQuestions, wasExtraQuestions } from "./questions/extra-questions";
import { cpaccExtraUnits } from "./cpacc-extra-units";
import { wasExtraUnits } from "./was-extra-units";

export type Cert = "cpacc" | "was";

export const CERTS: readonly Cert[] = ["cpacc", "was"] as const;

export function isCert(value: string): value is Cert {
	return value === "cpacc" || value === "was";
}

export interface CertContent {
	domains: DomainGroup[];
	units: StudyUnit[];
	getUnit: (id: string) => StudyUnit | undefined;
	getAllUnitIds: () => string[];
}

/** 단원 파일 비대화 방지용 추가 문항(questions/extra-questions.ts)을 단원에 병합 */
function withExtraQuestions(
	domains: DomainGroup[],
	extras: Record<string, QuizQuestion[]>
): DomainGroup[] {
	return domains.map((d) => ({
		...d,
		units: d.units.map((u) =>
			extras[u.id]?.length ? { ...u, questions: [...u.questions, ...extras[u.id]] } : u
		),
	}));
}

/** 신규 단원({cert}-extra-units.ts)을 해당 도메인에 병합 후 order 정렬 */
function withExtraUnits(domains: DomainGroup[], extraUnits: StudyUnit[]): DomainGroup[] {
	if (extraUnits.length === 0) return domains;
	return domains.map((d) => {
		const extras = extraUnits.filter((u) => u.domain === d.domain);
		if (extras.length === 0) return d;
		return { ...d, units: [...d.units, ...extras].sort((a, b) => a.order - b.order) };
	});
}

function buildCertContent(domains: DomainGroup[]): CertContent {
	const units = domains.flatMap((d) => d.units);
	return {
		domains,
		units,
		getUnit: (id) => units.find((u) => u.id === id),
		getAllUnitIds: () => units.map((u) => u.id),
	};
}

const contentByCert: Record<Cert, CertContent> = {
	cpacc: buildCertContent(
		withExtraQuestions(withExtraUnits(cpaccDomains, cpaccExtraUnits), cpaccExtraQuestions)
	),
	was: buildCertContent(
		withExtraQuestions(withExtraUnits(wasDomains, wasExtraUnits), wasExtraQuestions)
	),
};

/** cert별 콘텐츠(단원·도메인·문항) 접근 지점 — cpacc/was 분기를 한 곳으로 집약 */
export function getCertContent(cert: Cert): CertContent {
	return contentByCert[cert];
}

/** 활성 단원의 전체 퀴즈 문항 (소속 단원의 domain 주입) */
export function getCertQuestions(cert: Cert): QuizQuestion[] {
	return contentByCert[cert].domains
		.flatMap((d) => d.units)
		.filter((u) => u.available)
		.flatMap((u) => u.questions.map((q) => ({ ...q, domain: q.domain ?? u.domain })));
}
