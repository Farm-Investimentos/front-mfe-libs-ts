import isValidCNPJ from '.';

describe('Is Valid CNPJ', () => {
	it('Should validate CNPJ', () => {
		expect(isValidCNPJ('63577361000115')).toBeTruthy();
	});

	it('Should validate invalid CNPJ', () => {
		expect(isValidCNPJ('63577361000119')).toBeFalsy;
	});
});
