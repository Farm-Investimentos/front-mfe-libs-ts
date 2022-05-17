/**
 * Validades if a string matches an document valid
 * @module
 * @param {string} cnpj - the string to be matched
 * @returns {boolean} valid or not
 */

export default (cnpj: string): boolean => {
	if (cnpj.length === 14) {
		const cnpjsArray = cnpj.split('');

		let v1 = 0;
		let v2 = 0;
		let aux = false;

		for (let i = 1; cnpjsArray.length > i; i += 1) {
			if (cnpjsArray[i - 1] !== cnpjsArray[i]) {
				aux = true;
			}
		}

		if (aux === false) {
			return false;
		}

		for (
			let i = 0, p1 = 5, p2 = 13;
			cnpjsArray.length - 2 > i;
			i += 1, p1 -= 1, p2 -= 1
		) {
			if (p1 >= 2) {
				v1 += +cnpjsArray[i] * p1;
			} else {
				v1 += +cnpjsArray[i] * p2;
			}
		}

		v1 %= 11;

		if (v1 < 2) {
			v1 = 0;
		} else {
			v1 = 11 - v1;
		}

		const valor1 = parseInt(cnpjsArray[12], 10);

		if (v1 !== valor1) {
			return false;
		}

		for (
			let i = 0, p1 = 6, p2 = 14;
			cnpjsArray.length - 1 > i;
			i += 1, p1 -= 1, p2 -= 1
		) {
			if (p1 >= 2) {
				v2 += +cnpjsArray[i] * p1;
			} else {
				v2 += +cnpjsArray[i] * p2;
			}
		}

		v2 %= 11;

		if (v2 < 2) {
			v2 = 0;
		} else {
			v2 = 11 - v2;
		}

		const valor2 = parseInt(cnpjsArray[13], 10);

		if (v2 !== valor2) {
			return false;
		}
		return true;
	}
	return false;
};
