export default (valor: number, maximumFractionDigits = 2): string | null => {
	if (valor !== 0 && !valor) {
		return null;
	}
	return valor
		.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: maximumFractionDigits,
			maximumFractionDigits,
		})
		.replace(/\s/g, '');
};
