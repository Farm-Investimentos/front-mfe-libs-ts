import queryString from '.';

describe('queryString', () => {
	it('Should return a query string', () => {
		const filters = {
			testea: 1,
			b: 2,
			c: 3,
		};
		const mappings = {
			testea: 'alterado',
		};
		const m = queryString(filters, mappings);
		expect(m).toContain('alterado');
	});

	it('Should return a query string without undefined items', () => {
		const filters = {
			testea: 1,
			testeb: null,
			testec: '',
			tested: undefined,
		};
		const m = queryString(filters, {});
		expect(m).toContain('testea');
		expect(m).not.toContain('testeb');
		expect(m).not.toContain('testec');
		expect(m).not.toContain('tested');
	});
});
