import { StatusEnum } from '../../interfaces/IRequestStatus';
import { BaseNotification, INotificationSpecificEvents, NotificationCategoryKeys } from './type';

/**
 * Dispatch global event to enable communcation between microfrontends
 *
 * @module
 * @param {type} - type of the event (ERROR/SUCCESS/START) or custom type
 * @param {message} - message to be broadcasted
 */
export default <T extends string | NotificationCategoryKeys>(
	type: T | StatusEnum | string,
	message?: T extends NotificationCategoryKeys ? INotificationSpecificEvents[T] : BaseNotification,
): CustomEvent<{
	message?: T extends NotificationCategoryKeys ? INotificationSpecificEvents[T] : BaseNotification;
}> => {
	const customEvent = new CustomEvent(type, {
		detail: {
			message,
		},
	});
	window.dispatchEvent(customEvent);
	return customEvent;
};
