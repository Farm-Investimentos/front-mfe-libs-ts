import actions from './actions';
const { updateCurrentFilters } = actions;

describe('search actions', () => {
	let commitFn: (type: string, payload?: any) => void;

	beforeEach(() => {
		commitFn = jest.fn();
	});
	describe('updateCurrentFilters', () => {
		it('should commit', () => {
			updateCurrentFilters(
				{ commit: commitFn },
				{ filters: {}, key: 'test', showFilters: true },
			);
			expect(commitFn).toHaveBeenCalled();
		});
	});
});
