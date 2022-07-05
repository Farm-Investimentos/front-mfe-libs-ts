/**
 * @jest-environment jsdom
 */

import notification from './notification';

describe('notification', () => {
	it('Should return a custom event', () => {
		const spyObj = jest.spyOn(window, 'dispatchEvent');
		expect(notification('SUCCESS', 'a')).toBeTruthy();
		expect(spyObj).toHaveBeenCalled();
	});
});
