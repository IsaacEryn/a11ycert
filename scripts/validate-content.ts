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
import type { DomainGroup, QuizQuestion } from "../src/lib/content/types";

// extra-questions까지 병합된 최종 콘텐츠를 검증
const cpaccDomains = getCertContent("cpacc").domains;
const wasDomains = getCertContent("was").domains;

const errors: string[] = [];

function checkPair(label: string, pair: { ko: string; en: string } | undefined) {
	if (!pair || !pair.ko?.trim() || !pair.en?.trim()) {
		errors.push(`${label}: ko/en 짝 누락 또는 빈 문자열`);
	}
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

function reportDistribution(cert: string, domains: DomainGroup[]) {
	const byDomain: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
	for (const d of domains) for (const u of d.units) byDomain[d.domain] += u.questions.length;
	const total = Object.values(byDomain).reduce((a, b) => a + b, 0);
	console.log(
		`  ${cert.toUpperCase()}: 총 ${total}문항 — D1 ${byDomain[1]} / D2 ${byDomain[2]} / D3 ${byDomain[3]}`
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
}
const glossaryIds = new Set<string>();
for (const term of glossaryTerms) {
	if (glossaryIds.has(term.id)) errors.push(`glossary id 중복: ${term.id}`);
	glossaryIds.add(term.id);
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
