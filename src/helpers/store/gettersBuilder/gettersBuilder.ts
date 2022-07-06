/**
 * Create a list of getters (functions) based on a list os state keys
 * @module
 * @param {Array<string>} attributes - the state keys
 * @returns {getters} - array of functions
 */
export default (attributes: Array<string>): Record<string, Function> => {
	const getters: Record<string, Function> = {};
	attributes.forEach((attr) => {
		getters[attr] = (state: Record<string, any>) => state[attr];
	});
	return getters;
};
