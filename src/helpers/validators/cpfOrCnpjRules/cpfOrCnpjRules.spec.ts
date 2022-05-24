import cpfOrCnpjRules from '.';

describe('CPF or CNPJ valid', () => {
	it('Should validate CNPJ', () => {
		expect(cpfOrCnpjRules('35177988000143')).toBeTruthy();
	});

	it('Should validate invalid CNPJ', () => {
		expect(cpfOrCnpjRules('34641369000109')).toBeFalsy();
	});

	it('Should validate CPF', () => {
		expect(cpfOrCnpjRules('99713313062')).toBeTruthy();
	});

	it('Should validate invalid CPF', () => {
		expect(cpfOrCnpjRules('99713313069')).toBeFalsy();
	});
});
