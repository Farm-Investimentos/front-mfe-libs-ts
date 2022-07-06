import mutationsBuilder from './mutationsBuilder';

describe('mutationsBuilder', () => {
	it('should create object for basic values', () => {
		const r = mutationsBuilder(['a', 'b', 'c']);
		expect(r).toBeDefined();
		expect(r.setA).toBeInstanceOf(Function);
	});
});
