import formatHour from '.';

describe('formatHour', () => {
	it('should return empty string when the input is empty string or null', () => {
		const date = formatHour('');

		const nullDate = formatHour(null);

		expect(date).toBe('');

		expect(nullDate).toBe('');
	});

	it('should return formatted hour', () => {
		const date = formatHour('2023-04-18T20:58:34.157');

		expect(date).toBe('20:58');
	});
});
