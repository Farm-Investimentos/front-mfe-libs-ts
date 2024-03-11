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

	it('should be defined', () => {
		expect(exportHandler).toBeDefined();
	});

	it('should have been called window.dispatchEvent and callback after exportHandler call', () => {
		const callback = jest.fn();
		const windowSpy = jest.spyOn(window, 'dispatchEvent');

		exportHandler(callback);

		jest.runAllTimers();

		expect(windowSpy).toHaveBeenCalled();
		expect(callback).toHaveBeenCalled();
	});
});
