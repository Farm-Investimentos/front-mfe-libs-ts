/**
 * Validades if a string matches a CPF/CNPJ pattern
 * @module
 * @param {string} value - the string to be matched
 * @returns {Boolean} valid or not
 */
export default (value: string): boolean => {
	const pattern =
		/(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$)/i;
	return pattern.test(value) || false;
};
