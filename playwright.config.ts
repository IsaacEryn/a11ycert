import { defineConfig } from "@playwright/test";

/**
 * 접근성 자동 검사 전용 설정 — `npm run test:a11y`
 * 로컬: `npm run build && npx next start`를 먼저 실행하거나 webServer 자동 기동 사용.
 */
export default defineConfig({
	testDir: "tests/a11y",
	timeout: 60_000,
	use: {
		baseURL: process.env.A11Y_BASE_URL ?? "http://localhost:3000",
	},
	webServer: process.env.A11Y_BASE_URL
		? undefined
		: {
				command: "npx next start --port 3000",
				url: "http://localhost:3000/ko",
				reuseExistingServer: true,
				timeout: 60_000,
			},
});
