import axios from 'axios';
import CacheClient from './cacheClient';

describe('Cache Client', () => {
	describe('CacheClient', () => {
		it('Should return Promise when request a new url', () => {
			const cacheClient = CacheClient(axios);
			expect(async () => {
				await cacheClient.get('/a', {});
			}).toBeDefined();
			expect(async () => {
				await cacheClient.get('/b', {
					cache: {},
				});
			}).toBeDefined();
			expect(async () => {
				await cacheClient.get('/c', {
					cache: { maxAge: 10 },
				});
			}).toBeDefined();
		});
	});
});
