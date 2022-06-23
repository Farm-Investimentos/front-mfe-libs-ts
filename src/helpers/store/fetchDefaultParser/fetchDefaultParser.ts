/**
 * Action used to parse data with a DTO helper function
 * and mutate the state and a request state, based on
 * a state key
 * @module
 * @param {Function} commit - the store's commit function
 * @param {Object} data - the data to be parsed
 * @param {Function} parser - the parser function
 * @param {string} key - the state's key
 */
export default (
	commit: Function,
	data: Object,
	parser: Function | null,
	key: string,
): Object => {
	const result = parser ? parser(data) : data;
	commit(`set${key}`, result);
	commit(`set${key}RequestStatus`, 'SUCCESS');
	return { result };
};
