export default (
	valor: number | null,
	maximumFractionDigits = 2,
): string | null => {
	if (valor !== 0 && !valor) {
		return null;
	}
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: maximumFractionDigits,
		maximumFractionDigits,
	})
		.format(valor)
		.replace(/\s/g, '');
};
