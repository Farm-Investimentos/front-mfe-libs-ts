import mutations from './mutations';
const { setInternalUser } = mutations;

describe('userAccess mutations', () => {
	let state: Record<string, any>;
	beforeEach(() => {
		state = { internalUser: null };
	});
	describe('setInternalUser', () => {
		it('should set to true', () => {
			setInternalUser(state, true);
			expect(state.internalUser).toBeTruthy();
		});

		it('should set to false', () => {
			setInternalUser(state, false);
			expect(state.internalUser).toBeFalsy();
		});
	});
});
