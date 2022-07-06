import getters from './getters';
const { internalUser } = getters;

describe('userAccess getters', () => {
	let state: Record<string, any>;
	beforeEach(() => {
		state = { internalUser: true };
	});
	describe('internalUser', () => {
		it('should get value', () => {
			expect(internalUser(state)).toEqual(state.internalUser);
		});
	});
});
