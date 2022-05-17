/**
 * Validades if a string matches an e-mail pattern
 * @module
 * @param {string} value - the string to be matched
 * @returns {boolean} valid or not
 */
export default (value: string | null): boolean => {
	if (!value) {
		return false;
	}
	const pattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(value.trim()) || false;
};
