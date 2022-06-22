import fetchDefaultParserPagination from './fetchDefaultParserPagination';

describe('fetchDefaultParserPagination', () => {
	it('should call the commit function', () => {
		const commit = jest.fn();
		fetchDefaultParserPagination(
			commit,
			{ data: { content: [] } },
			null,
			'anything',
		);
		expect(commit.mock.calls.length).toBe(3);
	});

    it('should call the parser function', () => {
		const parser = jest.fn();
		fetchDefaultParserPagination(
			() => {},
			{ data: { content: [1] } },
			parser,
			'anything',
		);
		expect(parser.mock.calls.length).toBe(1);
	});

});
