/**
 * @jest-environment jsdom
 */

import notificationWrapper from './notificationWrapper';

describe('notificationWrapper', () => {
	it('Should return SUCCESS', () => {
		expect(notificationWrapper('SUCCESS', 'a', 'b')).toBeTruthy();
	});
});
