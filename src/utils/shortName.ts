export function shortName(name: string) {
	const text = name.split(' ');
	if (text.length > 1) {
		return text[0].slice(0, 1) + text[1].slice(0, 1);
	} else {
		return text[0].slice(0, 1);
	}
}
