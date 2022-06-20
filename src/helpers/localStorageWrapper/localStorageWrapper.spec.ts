/**
 * @jest-environment jsdom
 */
import localStorageWrapper from '.';

describe('localStorageWrapper', () => {
	it('should build the wrapper', () => {
		expect(localStorageWrapper).toBeDefined();
	});

	it('setItem at storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.setItem('test', 'test')).toBeTruthy;
	});

	it('getItem at storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.getItem('test')).toBe('test');
	});

	it('setItem at storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.setItem('test', 'test')).toBeTruthy;
	});

	it('clearkey at storage', () => {
		expect(localStorageWrapper).toBeDefined();
		expect(localStorageWrapper.clearKey('test')).toBeTruthy;
	});
});
