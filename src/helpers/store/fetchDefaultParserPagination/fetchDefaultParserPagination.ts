/**
 * Action used to parse data from a paginated list with a DTO helper function
 * and mutate the state and a request state, based on
 * a state key
 * @module
 * @param {Function} commit - the store's commit function
 * @param {Object} data - the data to be parsed
 * @param {Function} parser - the parser function
 * @param {string} key - the state's key
 */

type FetchDefaultParserPaginationResponse = {
	result: Object;
	totalPages: number;
};

export default (
	commit: Function,
	data: Record<string, any>,
	parser: Function | null,
	key: string,
): FetchDefaultParserPaginationResponse => {
	const result = parser
		? data.data.content.map((item: Object) => parser(item))
		: data.data.content;
	const totalPages = data.data.totalPages || data.data.pageable.totalPages;

	commit(`set${key}`, result);
	commit(`set${key}TotalPages`, totalPages);
	commit(`set${key}RequestStatus`, 'SUCCESS');
	return { result, totalPages };
};
