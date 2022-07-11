import { ICommit } from 'interfaces';
import { StateType } from './types';

export default {
	updateCurrentFilters(
		{ commit }: ICommit,
		{ key, filters, showFilters }: StateType,
	): void {
		commit('setCurrentFilters', { key, filters, showFilters });
	},
};
