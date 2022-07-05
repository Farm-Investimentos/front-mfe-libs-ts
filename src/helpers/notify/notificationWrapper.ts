import notification from './notification';
import { StatusEnum } from '../../interfaces/IRequestStatus';
/**
 * Notify success or error event, wrapping notification function
 *
 * @module
 * @param {value} - string or object with the notification type
 * @param {successLabel} - success label
 * @param {errorLabel} - error label
 */
export default (value: any, successLabel: string, errorLabel: string) => {
	if (value.type === 'ERROR') {
		notification(
			StatusEnum.ERROR,
			`Ocorreu um erro ao ${errorLabel}: ${value.message}`,
		);
		return 'ERROR';
	}
	if (value === 'SUCCESS' || value.type === 'SUCCESS') {
		notification(StatusEnum.SUCCESS, `${successLabel} com sucesso`);
		return 'SUCCESS';
	}
};
