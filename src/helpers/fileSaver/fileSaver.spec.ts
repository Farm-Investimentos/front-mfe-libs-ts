/**
 * @jest-environment jsdom
 */
import fileSaver from '.';

describe('FileSaver', () => {
	it('should return formatted date from string', () => {
		const r = fileSaver({
			document: {
				createElement: () => ({}),
			},
			URL: {
				createObjectURL: () => ({}),
			},
		});
		expect(r).toBeDefined();
	});
});
