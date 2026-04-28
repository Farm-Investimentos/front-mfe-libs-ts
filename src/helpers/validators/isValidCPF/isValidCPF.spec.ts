import isValidCPF from '.';

describe('Is Valid CPF', () => {
	it('Should validate CPF', () => {
		expect(isValidCPF('99713313062')).toBeTruthy();
	});

	it('Should validate invalid CPF', () => {
		expect(isValidCPF('99713313069')).toBeFalsy;
	});

	it('Should validate CPF with mask', () => {
		expect(isValidCPF('997.133.130-62')).toBeTruthy();
	});

	it('Should invalidate CPF with mask and wrong DV', () => {
		expect(isValidCPF('997.133.130-69')).toBeFalsy();
	});
});
