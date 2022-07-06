import { StatusEnum } from '../../interfaces/IRequestStatus';

/**
 * Dispatch global event to enable communcation between microfrontends
 *
 * @module
 * @param {type} - type of the event (ERROR/SUCCESS/START)
 * @param {message} - message to br broadcasted
 */
export default (
	type: StatusEnum,
	message: string,
): CustomEvent<{
	message: string;
}> => {
	const customEvent = new CustomEvent(type, {
		detail: {
			message,
		},
	});
	window.dispatchEvent(customEvent);
	return customEvent;
};
