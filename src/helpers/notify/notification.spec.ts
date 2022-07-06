/**
 * @jest-environment jsdom
 */

import { StatusEnum } from '../../interfaces/IRequestStatus';
import notification from './notification';

describe('notification', () => {
	it('Should return a custom event', () => {
		const spyObj = jest.spyOn(window, 'dispatchEvent');
		expect(notification(StatusEnum.SUCCESS, 'a')).toBeTruthy();
		expect(spyObj).toHaveBeenCalled();
	});
});
