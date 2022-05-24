import isValidCPF from '.';

describe('Is Valid CPF', () => {
	it('Should validate CPF', () => {
		expect(isValidCPF('99713313062')).toBeTruthy();
	});

	it('Should validate invalid CPF', () => {
		expect(isValidCPF('99713313069')).toBeFalsy;
	});
});
