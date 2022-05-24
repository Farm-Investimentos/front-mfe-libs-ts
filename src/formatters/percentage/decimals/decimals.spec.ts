import decimals from '.';

describe('calculateWithDecimals', () => {
	it('Should return 100', () => {
		expect(decimals(1, 1)).toEqual(100);
	});

	it('Should return 75', () => {
		expect(decimals(3, 4)).toEqual(75);
	});

	it('Should return decimals', () => {
		expect(decimals(8, 9)).toEqual('88.9');
	});

	it('Should not return decimals', () => {
		expect(decimals(8, 9, 0)).toEqual('89');
	});

	it('Should not 0 for any invalid calculation', () => {
		expect(decimals('a', 9)).toEqual('0');
	});
});
