import getters from './getters';
const { currentFiltersFromKey } = getters;

describe('search getters', () => {
	let state: Record<string, any>;
	beforeEach(() => {
		state = { key: 'a' };
	});
	describe('currentFiltersFromKey', () => {
		it('should get value', () => {
			expect(currentFiltersFromKey(state)).toBeDefined();
		});
	});
});
