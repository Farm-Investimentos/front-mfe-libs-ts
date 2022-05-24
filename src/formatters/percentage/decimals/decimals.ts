export default (
	value1: number | string,
	value2: number | string,
	decimals = 1,
): string | number => {
	if (value1 === 0 || value2 === 0) {
		return 0;
	}
	if (Number.isNaN(+value1) || Number.isNaN(+value2)) {
		return '0';
	}
	const p = (+value1 / +value2) * 100;

	if (Math.round(p) === p) {
		return p;
	}
	return p.toFixed(decimals);
};
