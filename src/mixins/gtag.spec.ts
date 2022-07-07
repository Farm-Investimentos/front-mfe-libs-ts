import { gtagMixins } from './gtag';

describe('gtagMixins', () => {
	let gtag;
	beforeEach(() => {
		gtag = gtagMixins('origin');
		gtagMixins.$gtag = {
			event: () => ({}),
		};
	});

	it('should have methods', () => {
		expect(gtag.methods).toBeDefined();
	});

	it('should have tagExportEvent method', () => {
		expect(gtag.methods.tagExportEvent).toBeDefined();
	});
});
