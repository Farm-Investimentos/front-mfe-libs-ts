import gettersBuilder from '.';

describe('gettersBuilder', () => {
	it('should create object for basic values', () => {
		const r = gettersBuilder(['a', 'b', 'c']);
		expect(r).toBeDefined();
		expect(r.a).toBeInstanceOf(Function);
	});
});
