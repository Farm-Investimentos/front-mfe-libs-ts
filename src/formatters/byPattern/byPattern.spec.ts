import byPattern from './';

describe('byPattern', () => {
	describe('byPattern', () => {
		it('should return formatted', () => {
			expect(byPattern('1234456', '####-#/##')).toBe('1234-4/56');
			expect(byPattern('abcd', '##-##')).toBe('ab-cd');
		});
		it('should return blank if null', () => {
			expect(byPattern(null, '####-#/##')).toBe('');
		});
	});
});
