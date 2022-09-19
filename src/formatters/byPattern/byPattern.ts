export const byPattern = (str: string | null, pattern: string): string => {
	if (!str) {
		return '';
	}
	let i = 0;
	const padded = pattern.replace(/#/g, () => {
		return str[i++];
	});
	return padded;
};
