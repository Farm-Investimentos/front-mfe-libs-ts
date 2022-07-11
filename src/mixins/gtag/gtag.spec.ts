import gtagMixins from '.';

describe('gtagMixins', () => {
	let gtag: Record<string, any>;
	beforeEach(() => {
		gtag = gtagMixins('origin');
	});

	it('should have methods', () => {
		expect(gtag.methods).toBeDefined();
	});

	it('should have tagExportEvent method', () => {
		expect(gtag.methods.tagExportEvent).toBeDefined();
	});
});
