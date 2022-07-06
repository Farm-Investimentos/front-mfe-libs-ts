import { AxiosInstance } from 'axios';
import isCacheValid from './isCacheValid';

const defaultCacheValidity = 30;
/**
 * Receives an http client (axios interface)
 * and creates a wrapper for the get method that will cache the request
 * @module
 * @param {Object} - an http client
 * @return {Object} http client
 */

export default function (client: AxiosInstance) {
	const cacheStorage: Record<string, any> = {};

	return {
		get: async (url: string, params: Record<string, any>) => {
			const date = new Date();
			const cachedDataItem = cacheStorage[url];

			const maxAge =
				params && params.cache && params.cache.maxAge
					? params.cache.maxAge
					: defaultCacheValidity;

			const isValid = isCacheValid(cachedDataItem, date, maxAge);

			if (isValid) {
				return new Promise((resolve) => {
					resolve(cachedDataItem.response);
				});
			}
			try {
				const response = await client.get(url, params);
				cacheStorage[url] = { response, date };
				return new Promise((resolve) => resolve(response));
			} catch (e) {
				return new Promise((_, reject) => reject(e));
			}
		},
	};
}
