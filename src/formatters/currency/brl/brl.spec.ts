import brl from '.';

describe('Brl formatter', () => {
	it('Should validate brl number', () => {
		expect(brl(10)).toContain('R$10');
		expect(brl(102.4)).toContain('R$102,40');
	});
	

	it('Should not validate brl number', () => {
		expect(brl(null)).toBeNull();
	});
});
