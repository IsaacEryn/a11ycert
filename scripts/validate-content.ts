/**
 * scripts/validate-content.ts
 *
 * 콘텐츠 데이터 무결성 검증:
 *  - 단원/문항/용어의 {ko, en} 짝이 모두 비어있지 않은지
 *  - objectives/content 배열 ko·en 길이 일치
 *  - 문항 id 전역 유니크, answer 유효, 선지 4개, 해설 존재
 *  - messages/ko.json ↔ en.json 키 집합 완전 일치
 *  - 도메인별 문항 수 리포트 (모의시험 배분 가시화)
 *
 * 실행: npm run validate:content  (= npx tsx scripts/validate-content.ts)
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { getCertContent } from "../src/lib/content";
import { glossaryTerms } from "../src/lib/content/glossary";
import { unitReferences } from "../src/lib/content/references";
import type { DomainGroup, QuizQuestion, UnitReference } from "../src/lib/content/types";

// extra-questions까지 병합된 최종 콘텐츠를 검증
const cpaccDomains = getCertContent("cpacc").domains;
const wasDomains = getCertContent("was").domains;

const errors: string[] = [];

function checkPair(label: string, pair: { ko: string; en: string } | undefined) {
	if (!pair || !pair.ko?.trim() || !pair.en?.trim()) {
		errors.push(`${label}: ko/en 짝 누락 또는 빈 문자열`);
	}
}

function checkReferences(label: string, refs: UnitReference[] | undefined) {
	if (!refs) return;
	if (refs.length === 0) errors.push(`${label}: references 빈 배열`);
	refs.forEach((r, i) => {
		checkPair(`${label} references[${i}] label`, r.label);
		if (!r.url?.startsWith("https://")) errors.push(`${label} references[${i}]: url은 https:// 로 시작해야 함 (${r.url})`);
	});
}

function validateDomains(cert: string, domains: DomainGroup[]): QuizQuestion[] {
	const questions: QuizQuestion[] = [];
	for (const d of domains) {
		checkPair(`${cert} domain ${d.domain} title`, d.title);
		checkPair(`${cert} domain ${d.domain} weight`, d.weight);
		for (const u of d.units) {
			checkPair(`${u.id} title`, u.title);
			checkPair(`${u.id} summary`, u.summary);
			if (u.objectives.ko.length !== u.objectives.en.length) {
				errors.push(`${u.id}: objectives ko(${u.objectives.ko.length}) ≠ en(${u.objectives.en.length})`);
			}
			if (u.content.ko.length !== u.content.en.length) {
				errors.push(`${u.id}: content ko(${u.content.ko.length}) ≠ en(${u.content.en.length})`);
			}
			u.objectives.ko.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} objectives.ko[${i}] 빈 문자열`); });
			u.objectives.en.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} objectives.en[${i}] 빈 문자열`); });
			u.content.ko.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} content.ko[${i}] 빈 문자열`); });
			u.content.en.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} content.en[${i}] 빈 문자열`); });

			// sections/content 상호배타 + 섹션 무결성
			if (u.sections) {
				if (u.sections.length === 0) errors.push(`${u.id}: sections 빈 배열`);
				if (u.content.ko.length > 0 || u.content.en.length > 0) {
					errors.push(`${u.id}: sections가 있으면 content는 빈 배열이어야 함 (이중 소스 방지)`);
				}
				u.sections.forEach((sec, si) => {
					checkPair(`${u.id} sections[${si}] heading`, sec.heading);
					if (sec.paragraphs.ko.length !== sec.paragraphs.en.length) {
						errors.push(`${u.id} sections[${si}]: paragraphs ko(${sec.paragraphs.ko.length}) ≠ en(${sec.paragraphs.en.length})`);
					}
					if (sec.paragraphs.ko.length === 0) errors.push(`${u.id} sections[${si}]: paragraphs 비어 있음`);
					sec.paragraphs.ko.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} sections[${si}].ko[${i}] 빈 문자열`); });
					sec.paragraphs.en.forEach((s, i) => { if (!s.trim()) errors.push(`${u.id} sections[${si}].en[${i}] 빈 문자열`); });
					sec.codeExamples?.forEach((ex, ei) => {
						checkPair(`${u.id} sections[${si}].codeExamples[${ei}] caption`, ex.caption);
						if (!ex.code?.trim()) errors.push(`${u.id} sections[${si}].codeExamples[${ei}]: code 빈 문자열`);
						if (!["html", "css", "js"].includes(ex.lang)) errors.push(`${u.id} sections[${si}].codeExamples[${ei}]: lang '${ex.lang}' 유효하지 않음`);
					});
					checkReferences(`${u.id} sections[${si}]`, sec.references);
				});
			} else if (u.available && u.content.ko.length === 0) {
				errors.push(`${u.id}: 활성 단원인데 content와 sections가 모두 비어 있음`);
			}
			checkReferences(u.id, u.references);
			questions.push(...u.questions);
		}
	}
	return questions;
}

function validateQuestions(all: QuizQuestion[]) {
	const seen = new Set<string>();
	for (const q of all) {
		if (seen.has(q.id)) errors.push(`문항 id 중복: ${q.id}`);
		seen.add(q.id);
		checkPair(`${q.id} question`, q.question);
		checkPair(`${q.id} explanation`, q.explanation);
		if (!["a", "b", "c", "d"].includes(q.answer)) errors.push(`${q.id}: answer '${q.answer}' 유효하지 않음`);
		for (const key of ["a", "b", "c", "d"] as const) {
			checkPair(`${q.id} option ${key}`, q.options?.[key]);
		}
	}
}

function collectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
	return Object.entries(obj).flatMap(([k, v]) =>
		v !== null && typeof v === "object"
			? collectKeys(v as Record<string, unknown>, `${prefix}${k}.`)
			: [`${prefix}${k}`]
	);
}

function validateMessages() {
	const root = path.resolve(__dirname, "..");
	const ko = JSON.parse(fs.readFileSync(path.join(root, "messages/ko.json"), "utf8"));
	const en = JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf8"));
	const koKeys = new Set(collectKeys(ko));
	const enKeys = new Set(collectKeys(en));
	for (const k of koKeys) if (!enKeys.has(k)) errors.push(`messages: en.json에 '${k}' 누락`);
	for (const k of enKeys) if (!koKeys.has(k)) errors.push(`messages: ko.json에 '${k}' 누락`);
}

function unitParagraphCount(u: { content: { ko: string[] }; sections?: { paragraphs: { ko: string[] } }[] }): number {
	if (u.sections) return u.sections.reduce((sum, s) => sum + s.paragraphs.ko.length, 0);
	return u.content.ko.length;
}

function reportDistribution(cert: string, domains: DomainGroup[]) {
	const byDomain: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
	let paragraphs = 0;
	let units = 0;
	let refs = 0;
	let codeExamples = 0;
	for (const d of domains)
		for (const u of d.units) {
			byDomain[d.domain] += u.questions.length;
			paragraphs += unitParagraphCount(u);
			units += 1;
			refs += (u.references?.length ?? 0) + (u.sections?.reduce((sum, s) => sum + (s.references?.length ?? 0), 0) ?? 0);
			codeExamples += u.sections?.reduce((sum, s) => sum + (s.codeExamples?.length ?? 0), 0) ?? 0;
		}
	const total = Object.values(byDomain).reduce((a, b) => a + b, 0);
	console.log(
		`  ${cert.toUpperCase()}: ${units}단원 · 본문 ${paragraphs}문단 · 참고링크 ${refs}개 · 코드예제 ${codeExamples}개 · 총 ${total}문항 — D1 ${byDomain[1]} / D2 ${byDomain[2]} / D3 ${byDomain[3]}`
	);
}

// ── 실행 ──────────────────────────────────────────────────────────────────────
const cpaccQuestions = validateDomains("cpacc", cpaccDomains);
const wasQuestions = validateDomains("was", wasDomains);
validateQuestions([...cpaccQuestions, ...wasQuestions]);

for (const term of glossaryTerms) {
	checkPair(`glossary ${term.id} term`, term.term);
	checkPair(`glossary ${term.id} definition`, term.definition);
	if (!term.certs?.length) errors.push(`glossary ${term.id}: certs 비어 있음`);
	if (term.aliases) {
		if (term.aliases.length === 0) errors.push(`glossary ${term.id}: aliases 빈 배열`);
		term.aliases.forEach((a, i) => {
			if (!a.trim()) errors.push(`glossary ${term.id}: aliases[${i}] 빈 문자열`);
		});
	}
}
const glossaryIds = new Set<string>();
for (const term of glossaryTerms) {
	if (glossaryIds.has(term.id)) errors.push(`glossary id 중복: ${term.id}`);
	glossaryIds.add(term.id);
}

// references.ts 고아 키 검사 — 존재하지 않는 unitId에 링크가 매달리지 않도록
{
	const unitIds = new Set(
		[...cpaccDomains, ...wasDomains].flatMap((d) => d.units.map((u) => u.id))
	);
	for (const key of Object.keys(unitReferences)) {
		if (!unitIds.has(key)) errors.push(`references: 존재하지 않는 단원 id '${key}'`);
	}
}

validateMessages();

console.log("도메인별 문항 분포:");
reportDistribution("cpacc", cpaccDomains);
reportDistribution("was", wasDomains);
console.log(`용어집: ${glossaryTerms.length}개`);

if (errors.length > 0) {
	console.error(`\n검증 실패 — ${errors.length}건:`);
	for (const e of errors) console.error(`  ✗ ${e}`);
	process.exit(1);
}

console.log("\n✓ 콘텐츠 검증 통과");
