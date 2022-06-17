import simpleBuilder from '.';

describe('simpleBuilder', () => {
	it('Should return an object with keys changed', () => {
		const m = simpleBuilder({ a: 'A', b: 'B' })({ a: 1, b: 2, c: 3 });
		expect(m).toHaveProperty('A');
		expect(m.A).toEqual(1);
		expect(m).not.toHaveProperty('c');
	});
});
