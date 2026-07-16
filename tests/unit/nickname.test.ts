import { describe, it, expect } from "vitest";
import { isReservedNickname } from "@/lib/nickname";

describe("isReservedNickname", () => {
	it.each([
		"관리자", "총관리자", "관 리 자", "Ad.min", "ADMIN123",
		"운영자님", "어드민", "a11ycert 공식", "Moderator", "staff_kim",
		"adm in x", "administr",
	])("차단: %s", (name) => {
		expect(isReservedNickname(name)).toBe(true);
	});

	it.each(["이삭", "학습자-3f2a1b", "민준", "접근성지킴이", "dev_isaac"])(
		"허용: %s",
		(name) => {
			expect(isReservedNickname(name)).toBe(false);
		}
	);
});
