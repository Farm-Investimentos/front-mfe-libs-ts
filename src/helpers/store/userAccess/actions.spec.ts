import actions from './actions';
const { updateInternalUser } = actions;

describe('userAccess actions', () => {
	let commitFn: (type: string, payload?: any) => void;

	beforeEach(() => {
		commitFn = jest.fn();
	});
	describe('updateInternalUser', () => {
		it('should commit', () => {
			updateInternalUser({ commit: commitFn }, true);
			expect(commitFn).toHaveBeenCalledWith('setInternalUser', true);
		});
	});
});
