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

	it('Should work with random string key', () => {
		const spyObj = jest.spyOn(window, 'dispatchEvent');
		const randomKey = window.btoa(Math.random().toString().substring(2))
		expect(notification(randomKey, 'test')).toBeTruthy();
		expect(spyObj).toHaveBeenCalled();
	});

	it('Must have correct parameters if key is ANALYTICS_EVENTS', () => {
		const spyObj = jest.spyOn(window, 'dispatchEvent');
		expect(notification('ANALYTICS_EVENTS', { event: 'event', payload: { event_label: '' } })).toBeTruthy();
		expect(spyObj).toHaveBeenCalled();
	});

	it('Must have correct parameters if key is HTTP_ERROR', () => {
		const spyObj = jest.spyOn(window, 'dispatchEvent');
		expect(notification('HTTP_ERROR', { event: '' })).toBeTruthy();
		expect(spyObj).toHaveBeenCalled();
	});
});
