/** 검색어 매칭 부분을 <mark>로 강조 — 문자열 분할 방식(innerHTML 미사용) */
export default function Highlight({ text, query }: { text: string; query: string }) {
	const q = query.trim();
	if (!q) return <>{text}</>;

	const lower = text.toLowerCase();
	const needle = q.toLowerCase();
	const parts: React.ReactNode[] = [];
	let cursor = 0;

	while (cursor < text.length) {
		const idx = lower.indexOf(needle, cursor);
		if (idx === -1) {
			parts.push(text.slice(cursor));
			break;
		}
		if (idx > cursor) parts.push(text.slice(cursor, idx));
		parts.push(<mark key={idx}>{text.slice(idx, idx + needle.length)}</mark>);
		cursor = idx + needle.length;
	}

	return <>{parts}</>;
}
