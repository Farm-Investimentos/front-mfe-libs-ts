import buildStateListResult from '.';

describe('buildStateListResult', () => {
	it('should create object for state list', () => {
		const r = buildStateListResult(['someKey'])['someKey'];
		expect(r.totalPages).toBeDefined();
		expect(r.total).toBeDefined();
		expect(r.results).toBeDefined();
	});
});
