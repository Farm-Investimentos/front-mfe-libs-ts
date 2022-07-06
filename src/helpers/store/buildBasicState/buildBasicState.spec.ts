import buildBasicState from '.';

describe('buildBasicState', () => {
	it('should create object for basic values', () => {
		const r = buildBasicState(['a', 'b', 'c', 'dList']);
		expect(r.a).toBeDefined();
		expect(r.dList).toBeDefined();
		expect(r.dList).toBeInstanceOf(Array);
	});
});
