import isCacheValid from './isCacheValid';

describe('IsCacheValid', () => {
	describe('IsCacheValid function', () => {
		it('Should check if cache is valid', () => {
			expect(
				isCacheValid(
					{ date: new Date(), response: {} },
					new Date(),
					10,
				),
			).toBeTruthy();
		});
	});
});
