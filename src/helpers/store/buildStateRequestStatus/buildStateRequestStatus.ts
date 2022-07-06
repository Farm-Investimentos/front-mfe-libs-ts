/**
 * Create state object for Requests Status,
 * with keys based on a list of keys
 * and the default value IDLE
 * @module
 * @param {keys} - list of state's keys
 */
export default (keys: Array<string>): Record<string, any> => {
	const state: Record<string, any> = {};
	keys.forEach((item) => {
		state[item] = 'IDLE';
	});
	return state;
};
