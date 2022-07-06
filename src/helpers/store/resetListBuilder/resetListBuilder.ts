import { capitalize } from '../../string';

/**
 * Create a mutation to reset state values from a lists (the list and TotalPages);
 * Based on the state key provided, updated the state
 * @module
 * @param {string} key - key from the state represnting the list and its totalPages
 */
export default (key: string) => {
	const keyCapitalized = capitalize(key);
	return {
		[`setReset${keyCapitalized}`]: (state: Record<string, any>) => {
			state[key] = [];
			state[`${key}TotalPages`] = null;
		},
	};
};
