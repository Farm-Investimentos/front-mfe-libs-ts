import { ComputedRef, Ref } from "vue";

export interface Pagination {
	pageNumber: number;
	pageSize: number;
	sort: null;
	totalElements: number;
	totalPages: number;
}

export interface VuetifyTableSort {
	field: string;
	descending: 'ASC' | 'DESC';
}

export interface UsePageable {
	page: ComputedRef<number>;
	pagination: any;
	isFilterCounter: Ref<boolean>;
	isOpenFilter: Ref<boolean>;
	onChangePageLimit: (pageLimit: number) => void;
	onChangePage: (page: number) => void;
	onSortTable: (sort: VuetifyTableSort | `${string}_${VuetifyTableSort['descending']}`) => void;
	onApplyFilter: Function;
	onFiltersApplied: Function;
}

export interface Sort {
	order: string;
	orderBy: string;
}

export interface LowercasedSort extends Record<Lowercase<keyof Sort>, string> {}

export interface PureFilters extends Record<string, string | number> {};

export interface usePageableProps {
	callbackFn: (filters: any) => void;
	filters?: Ref<PureFilters> | ComputedRef<PureFilters>;
	lowercaseSort?: boolean;
	sort?: Sort | LowercasedSort;
	lazyFilters?: boolean;
}