/**
 * Capitalize a string
 * @module
 * @param {string} s - the string to be capitalized
 * @returns {string | boolean} new string, capitalized
 */
export default (s: string): string | boolean => {
	if (s.length <= 0) return false;
	return s.charAt(0).toUpperCase() + s.slice(1);
};
