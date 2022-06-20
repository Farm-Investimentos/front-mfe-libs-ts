/**
 * @jest-environment jsdom
 */
import localStorageWrapper from '.';

describe('localStorageWrapper', () => {
	it('should build the wrapper', () => {
		expect(localStorageWrapper).toBeDefined();
	});

	it('setItem to storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.setItem('test', 'test')).toBeTruthy;
	});

	it('getItem from storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.getItem('test', 'test')).toBe('test');
	});

	it('setItem to storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.clearKey('test')).toBeTruthy;
	});

	it('setItem to storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.clear).toBeTruthy;
	});
});
