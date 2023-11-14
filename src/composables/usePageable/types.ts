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
	/**
	 * Human-readable page. Value to be used in the template (to be presentable to final user)
	 * 
	 * Will be always pagination.pageNumber + 1
	 */
	page: ComputedRef<number>;
	/**
	 * All computed parameters until now in a URLSearchParams string format
	 * 
	 * Example: page=0&limit=10&search=abc
	 */
	queryValidParams: string;
	pagination: Ref<Pagination>;
	onChangePageLimit: (pageLimit: number) => void;
	onChangePage: (page: number) => void;
	onSort: (sort: VuetifyTableSort | `${string}_${VuetifyTableSort['descending']}`) => void;
	onApplyFilters: (data?: Ref<PureFilters>, complement?: boolean) => void;
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
	/**
	 * Set to true when you want to lazy apply your filters, like apply many filters only in a click of a button
	 * 
	 * Use @type {UsePageable.onApplyFilters} to trigger the mutation
	 */
	lazyApplyFilters?: boolean;
}