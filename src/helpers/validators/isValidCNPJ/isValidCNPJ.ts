/**
 * Validades if a string matches an document valid
 * @module
 * @param {string} cnpj - the string to be matched
 * @returns {boolean} valid or not
 */

const CNPJ_LENGTH = 14;
const CNPJ_BASE_LENGTH = 12;
const CNPJ_MASK_CHARS = /[./-]/g;
const CNPJ_INVALID_CHARS = /[^a-zA-Z0-9./-]/;
const CNPJ_UNMASKED_PATTERN = /^[A-Z0-9]{12}\d{2}$/;
const CNPJ_REPEATED_CHARS = /^([A-Z0-9])\1{13}$/;
const FIRST_DV_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const SECOND_DV_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

const normalizeCNPJ = (cnpj: string): string => cnpj.replace(CNPJ_MASK_CHARS, '').toUpperCase();

const getCharacterValue = (char: string): number => char.charCodeAt(0) - '0'.charCodeAt(0);

const calculateDV = (value: string, weights: number[]): number => {
	const total = value
		.split('')
		.reduce((sum, char, index) => sum + getCharacterValue(char) * weights[index], 0);
	const remainder = total % 11;

	return remainder < 2 ? 0 : 11 - remainder;
};

export default (cnpj: string): boolean => {
	if (!cnpj || CNPJ_INVALID_CHARS.test(cnpj)) {
		return false;
	}

	const normalizedCNPJ = normalizeCNPJ(cnpj);

	if (normalizedCNPJ.length !== CNPJ_LENGTH) {
		return false;
	}

	if (!CNPJ_UNMASKED_PATTERN.test(normalizedCNPJ)) {
		return false;
	}

	if (CNPJ_REPEATED_CHARS.test(normalizedCNPJ)) {
		return false;
	}

	const cnpjBase = normalizedCNPJ.substring(0, CNPJ_BASE_LENGTH);
	const firstDV = calculateDV(cnpjBase, FIRST_DV_WEIGHTS);
	const secondDV = calculateDV(`${cnpjBase}${firstDV}`, SECOND_DV_WEIGHTS);

	return normalizedCNPJ.endsWith(`${firstDV}${secondDV}`);
};
