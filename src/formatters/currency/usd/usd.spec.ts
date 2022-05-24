import usd from '.';

describe('Dolar formatter', () => {
	it('Should validate valid number', () => {
		expect(usd(12345678)).toEqual('$12,345,678.00');
	});
});
