import { GettersResponse } from './types';

export default {
	currentFiltersFromKey:
		(state: Record<string, any>) =>
		(key: string): GettersResponse => {
			if (!state.currentFilters) {
				return null;
			}
			if (state.currentFilters.key !== key) {
				return null;
			}
			const { filters, showFilters } = state.currentFilters;
			return { filters, showFilters };
		},
};
