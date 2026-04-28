import isValidCNPJ from '.';

describe('Is Valid CNPJ', () => {
	it('Should validate CNPJ', () => {
		expect(isValidCNPJ('63577361000115')).toBeTruthy();
	});

	it('Should validate invalid CNPJ', () => {
		expect(isValidCNPJ('63577361000119')).toBeFalsy();
	});

	it('Should validate alphanumeric CNPJ without mask', () => {
		expect(isValidCNPJ('12ABC34501DE35')).toBeTruthy();
	});

	it('Should validate alphanumeric CNPJ with mask', () => {
		expect(isValidCNPJ('12.ABC.345/01DE-35')).toBeTruthy();
	});

	it('Should validate lowercase alphanumeric CNPJ', () => {
		expect(isValidCNPJ('12.abc.345/01de-35')).toBeTruthy();
	});

	it('Should invalidate alphanumeric CNPJ with wrong DV', () => {
		expect(isValidCNPJ('12ABC34501DE36')).toBeFalsy();
	});
});
