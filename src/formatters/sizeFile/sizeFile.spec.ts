import { sizeOf } from './sizeFile';
describe('sizeFile', () => {
	describe('sizeOf', () => {
		it('should return 0 bytes', () => {
			expect(sizeOf(0)).toBe('0.00 B');
		});

		it('should return KiloBytes', () => {
			expect(sizeOf(100000)).toBe('97.66 KB');
		});

		it('should return MegaBytes', () => {
			expect(sizeOf(100000000)).toBe('95.37 MB');
		});
	});
});
