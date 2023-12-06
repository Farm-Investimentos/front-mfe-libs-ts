/**
 * @jest-environment jsdom
 */

import exportHandler from '.';

describe('exportHandler', () => {
	beforeEach(() => jest.useFakeTimers());

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('should have methods', () => {
		expect(exportHandler.methods).toBeDefined();
	});

	it('should have exportHandler method', () => {
		expect(exportHandler.methods.exportHandler).toBeDefined();
	});

	it('should have been called window.dispatchEvent and callback after exportHandler call', () => {
		const callback = jest.fn();
		const windowSpy = jest.spyOn(window, 'dispatchEvent');

		exportHandler.methods.exportHandler(callback);

		jest.runAllTimers();

		expect(windowSpy).toHaveBeenCalled();
		expect(callback).toHaveBeenCalled();
	});
});
