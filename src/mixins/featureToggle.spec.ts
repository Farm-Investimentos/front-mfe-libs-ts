import { flatObject } from './featureToggle';

describe('flatObject', () => {
	it('should flat an object methods', () => {
		const flat = flatObject({ a: { b: { c: 1 } } });
		expect(flat['a.b.c']).toEqual(1);
	});
});
