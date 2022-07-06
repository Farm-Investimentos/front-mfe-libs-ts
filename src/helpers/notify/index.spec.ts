import { notification, notificationWrapper } from '.';

describe('index', () => {
	it('should have notification', () => {
		expect(notification).toBeInstanceOf(Function);
	});
    it('should have notificationWrapper', () => {
		expect(notificationWrapper).toBeInstanceOf(Function);
	});
});
