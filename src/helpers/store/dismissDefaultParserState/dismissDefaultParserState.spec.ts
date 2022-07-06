import dismissDefaultParserState from '.';

describe('dismissDefaultParserState', () => {
	it('should dismiss state', () => {
		const fn = jest.fn();
		const r = dismissDefaultParserState(fn, 'key');
		expect(fn).toHaveBeenCalledTimes(3);
	});
});
