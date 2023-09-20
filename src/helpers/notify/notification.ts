import { StatusEnum } from '../../interfaces/IRequestStatus';

/**
 * Dispatch global event to enable communcation between microfrontends
 *
 * @module
 * @param {type} - type of the event (ERROR/SUCCESS/START)
 * @param {message} - message to br broadcasted
 */
interface INotificationMessage {
	title: string
	message: string
}

interface INotificationSpecificEvents {
	'ANALYTICS_EVENTS': { action: string },
}

type BaseNotification = string | INotificationMessage

type NotificationCategoryKeys = keyof INotificationSpecificEvents;

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
