import modalable from './modalable';

describe('modalable', () => {
	it('should have methods', () => {
		expect(modalable.methods).toBeDefined();
	});

	it('should have close method', () => {
		expect(modalable.methods.close).toBeDefined();
	});
});
