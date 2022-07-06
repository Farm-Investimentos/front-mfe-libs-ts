/**
 * Create state object for basic values,
 * with keys based on a list of keys
 * and the default value null or array
 * @module
 * @param {Array<string>} keys - list of state's keys
 * @returns {basicKeysState} - object with key/value pairs
 */
export default (keys: Array<string>): Record<string, any> => {
	const basicKeysState: Record<string, any> = {};
	keys.forEach(
		(key) => (basicKeysState[key] = key.endsWith('List') ? [] : null),
	);
	return basicKeysState;
};
