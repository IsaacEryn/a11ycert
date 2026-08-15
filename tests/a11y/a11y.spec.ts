import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * 주요 페이지 WCAG 자동 검사 (axe-core).
 * 자동 도구는 전체 기준의 일부만 검출한다 — 수동 검토의 대체가 아님.
 */
const PAGES = [
	{ name: "홈", path: "/ko" },
	{ name: "학습 단원", path: "/ko/cpacc/study/cpacc-1-1" },
	{ name: "모의 퀴즈", path: "/ko/cpacc/quiz" },
	{ name: "용어집", path: "/ko/glossary" },
	{ name: "모의시험 인트로", path: "/ko/cpacc/mock-exam" },
];

/** 1.4.10 리플로우 — 320px 폭에서 가로 스크롤이 생기면 안 된다. */
for (const path of ["/ko", "/en"]) {
	test(`리플로우 320px: 홈 (${path})`, async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 800 });
		await page.goto(path);
		await page.waitForLoadState("networkidle");
		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
		}));
		expect(scrollWidth, `가로 스크롤 ${scrollWidth - clientWidth}px 초과`).toBeLessThanOrEqual(clientWidth);
	});
}

for (const { name, path } of PAGES) {
	test(`axe: ${name} (${path})`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState("networkidle");
		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
			.analyze();
		expect(
			results.violations,
			results.violations
				.map((v) => `${v.id}: ${v.help} — ${v.nodes.length}개 노드`)
				.join("\n")
		).toEqual([]);
	});
}
