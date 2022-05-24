import brl from '.';

describe('Brl formatter', () => {
	it('Should validate brl number', () => {
		expect(brl(10)).toContain('R$10');
	});

	it('Should not validate brl number', () => {
		expect(brl(null)).toBeNull();
	});
});
