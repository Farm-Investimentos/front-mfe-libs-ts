import fetchDefaultParser from './fetchDefaultParser';

describe('fetchDefaultParser', () => {
	it('should return the same data', () => {
		const r = fetchDefaultParser(() => {}, { a: 1 }, null, 'anything');
		expect(r).toBeDefined();
	});

	it('should call the commit function', () => {
		const commit = jest.fn();
		fetchDefaultParser(commit, { a: 1 }, null, 'anything');
		expect(commit.mock.calls.length).toBe(2);
	});

	it('should call the parser function', () => {
		const commit = jest.fn();
		const parser = jest.fn();
		fetchDefaultParser(commit, { a: 1 }, parser, 'anything');
		expect(parser).toHaveBeenCalled();
	});
});
