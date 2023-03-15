import stripTags from './stripTags';

describe('stripTags', () => {
	test('should return false for empty string or null', () => {
		expect(stripTags(null)).toBe(false);
		expect(stripTags('')).toBe(false);
	});

	test('should strip HTML tags from string', () => {
		const input = '<p><b>Hello</b> world!</p>';
		const expectedOutput = 'Hello world!';
		expect(stripTags(input)).toBe(expectedOutput);
	});

	test('should not modify string without HTML tags', () => {
		const input = 'This is a plain text string.';
		expect(stripTags(input)).toBe(input);
	});
});
