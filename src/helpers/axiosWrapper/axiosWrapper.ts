import {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosStatic,
} from 'axios';

/**
 * Wrapper for axios (or other http client that implements same interface)
 * The wrapper adds business logic, such as request & responso interceptors, bearer token, etc..
 * And returns an axios instace ready to be used in the microfrontends
 * @module
 * @param {httpClient} - http client object (axios)
 * @param {notification} - notification function called inside interceptors
 * to add communication between microfrontends
 * @param {baseURL} - the default base url used in the requests
 * @return {Object} axios client ready for use
 */
export default (httpClient: any, notification: Function, baseURL: string) => {
	const fullfilledRequest = (config: AxiosRequestConfig) => {
		notification('LOADING_START');
		const token = localStorage.getItem('Token');
		if (config.headers !== undefined) {
			config.headers.authorization = `Bearer ${token}`;
		}

		return config;
	};

	const fullfilledResponse = (response: AxiosResponse) => {
		notification('LOADING_END');
		return response;
	};

	const errorResponse = (err: AxiosError) => {
		notification('LOADING_END');
		if (err.response && err.response.status === 401) {
			notification('UNAUTHORIZED', { err });
			throw err;
		}
		throw err;
	};

	const buildInstance = (_httpClient: AxiosStatic): any => {
		const instancia = _httpClient.create({
			baseURL,
			timeout: 20 * 1000,
		});

		instancia.interceptors.request.use(
			(c) => fullfilledRequest(c),
			(err) => Promise.reject(err),
		);

		instancia.interceptors.response.use(fullfilledResponse, errorResponse);
		console.log('instancia', instancia);
		return instancia;
	};

	return buildInstance(httpClient);
};
