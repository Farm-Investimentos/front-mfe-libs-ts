/**
 * Validades if a string matches an document valid
 * @module
 * @param {string} cpf - the string to be matched
 * @returns {boolean} valid or not
 */

export default (cpf: string): boolean => {
	if (cpf.length === 11) {
		const cpfArray = cpf.split('');

		let v1 = 0;
		let v2 = 0;
		let aux = false;

		for (let i = 1; cpfArray.length > i; i += 1) {
			if (cpfArray[i - 1] !== cpfArray[i]) {
				aux = true;
			}
		}

		if (aux === false) {
			return false;
		}

		for (let i = 0, p = 10; cpfArray.length - 2 > i; i += 1, p -= 1) {
			v1 += +cpfArray[i] * p;
		}

		v1 = (v1 * 10) % 11;

		if (v1 === 10) {
			v1 = 0;
		}

		const valor1 = parseInt(cpfArray[9], 10);

		if (v1 !== valor1) {
			return false;
		}

		for (let i = 0, p = 11; cpfArray.length - 1 > i; i += 1, p -= 1) {
			v2 += +cpfArray[i] * p;
		}

		v2 = (v2 * 10) % 11;

		if (v2 === 10) {
			v2 = 0;
		}

		const valor2 = parseInt(cpfArray[10], 10);

		if (v2 !== valor2) {
			return false;
		}
		return true;
	}
	return false;
};
