import capitalize from './capitalize';

describe('capitalize', () => {
	it('should capitalize string', () => {
		expect(capitalize('name')).toEqual('Name');
	});

	it('should return blank for anything else than string', () => {
		expect(capitalize('')).toBeFalsy;
	});
});
