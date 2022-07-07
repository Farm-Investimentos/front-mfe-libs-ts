import exportHandler from './exportHandler';

describe('exportHandler', () => {
	it('should have methods', () => {
		expect(exportHandler.methods).toBeDefined();
	});

	it('should have exportHandler method', () => {
		expect(exportHandler.methods.exportHandler).toBeDefined();
	});
});
