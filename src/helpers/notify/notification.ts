import { StatusEnum } from '../../interfaces/IRequestStatus';

/**
 * Dispatch global event to enable communcation between microfrontends
 *
 * @module
 * @param {type} - type of the event (ERROR/SUCCESS/START)
 * @param {message} - message to br broadcasted
 */
type NotificationCustomMessage = {
	title: string;
	message: string;
};

export default (
	type: StatusEnum | string,
	message?: NotificationCustomMessage | string,
): CustomEvent<{
	message?: NotificationCustomMessage | string;
}> => {
	const customEvent = new CustomEvent(type, {
		detail: {
			message,
		},
	});
	window.dispatchEvent(customEvent);
	return customEvent;
};
