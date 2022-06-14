export const sizeOf = (bytes: number): string => {
	if (bytes === 0) {
		return '0.00 B';
	}
	const value = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, value)).toFixed(2)} ${' KMGTP'.charAt(
		value,
	)}B`;
};
