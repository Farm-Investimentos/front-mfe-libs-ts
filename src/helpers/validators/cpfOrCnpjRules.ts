/**
 * Validades if a string matches an document valid
 * @module
 * @param {string} value - the string to be matched
 * @returns {boolean} valid or not
 */

import isValidCPF from './isValidCPF';
import isValidCNPJ from './isValidCNPJ';

export default (value: string): boolean =>
	isValidCPF(value) || isValidCNPJ(value);
