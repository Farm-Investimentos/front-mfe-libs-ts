import { StateType } from './types';

export default {
	setCurrentFilters(
		state: Record<string, any>,
		{ key, filters, showFilters }: StateType,
	): void {
		state.currentFilters = { key, filters, showFilters };
	},
};
