/**
 * Reset state's values for a key representing a list
 * @param {commit} - the store's commit function
 * @param {key} - key from the state representing the list, it's totalPages and the request status
 */
export default (commit: Function, key: string): boolean => {
	commit(`set${key}`, []);
	commit(`set${key}TotalPages`, null);
	commit(`set${key}RequestStatus`, 'IDLE');
	return true;
};
