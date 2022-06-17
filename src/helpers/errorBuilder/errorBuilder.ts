/**
 * Receives an http error and returns an error parsed and ready to be used in the views,
 * because that are backends with that throws errors with different structures
 * @module
 * @param {error} - an http error (from axios or other that implements same interface)
 * @return {Object} error parsed and ready to be used in the views/components
 */

import { ErrorType } from "./type";

export default (error: any): any => {
	const err = <any> {};

	if (error.code === 'ECONNABORTED') {
		err.message = 'timeout';
		err.code = error.code;
		return err;
	}

	if (error.response) {
		err.httpStatus = error.response.status;

		if (error.response.data) {
			const { data } = error.response;
			if (data && data.data) {
				err.message = data.data;
			}
			if (data && data.message) {
				err.message = data.message;
			}
			if (data.errors && data.errors.length === 1) {
				err.message = data.errors[0];
			}
			if (data.errors && data.errors.length > 1) {
				err.message = data.errors
					.map((item: any) => {
						if (!item) return 'Erro inesperado';

						if (item.defaultMessage) return item.defaultMessage;
						return item;
					})
					.join('. ');
			}
		}
	}

	if (err.message && err.message.message) {
		err.message = err.message.message;
	}

	const errorBuilder: ErrorType = err;

	return errorBuilder;
};
