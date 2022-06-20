/**
 * @jest-environment jsdom
 */
import toClipboard from '.';

describe('toClipboard', () => {
	it('Should return a promise', () => {
		const m = toClipboard('message');
		expect(m).toBeInstanceOf(Promise);
	});
});
