import brlPlain from './brlPlain';

describe('brlPlain formatter', () => {
	it('Should validate brlPlain number', () => {
		expect(brlPlain(10)).toContain('10');
	});

    it('Should not validate brlPlain number', () => {
		expect(brlPlain(null)).toBeNull();
	});
});
