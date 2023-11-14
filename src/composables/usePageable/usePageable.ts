import { ref, computed, watch, Ref } from 'vue';

import type { UsePageable, Pagination, usePageableProps, VuetifyTableSort, PureFilters } from './types';
import { Split } from 'types/split';

export function usePageable(props: usePageableProps, paginationModel: Pagination): UsePageable {
	const canDoSearch = ref(true);
	const lazyFilters = ref(props.lazyFilters || false);
	const pagination = ref(paginationModel);
	const filterCurrent = ref(props.filters?.value || {});
	const sortCurrent: Ref<usePageableProps['sort'] | null> = ref(props.sort || null);
	const isOpenFilter = ref(false);
	const isFilterCounter = ref(false);
	const lowercaseSort = ref(props.lowercaseSort || false);

	const page = computed(() => (pagination.value?.pageNumber || 0) + 1);

	const hasSort = computed(() => sortCurrent.value !== undefined && sortCurrent.value !== null);
	const hasFilter = computed(() => filterCurrent.value !== undefined && filterCurrent.value !== null);

	const hasAnyFilter = computed(() => hasFilter.value && Object.values(filterCurrent.value).filter(Boolean).length);
	const hasAnySort = computed(() => hasSort.value && Object.values(sortCurrent.value!).filter(Boolean).length);

	function getValidParams() {
		return {
			page: pagination.value.pageNumber,
			limit: pagination.value.pageSize,
			...(hasAnyFilter.value ? filterCurrent.value : {}),
			...(hasAnySort.value ? sortCurrent.value : {}),
		};
	}

	function onChangePageLimit(newPageLimit: number) {
		pagination.value.pageSize = newPageLimit;
		pagination.value.pageNumber = 0;
		if (canDoSearch) {
			props.callbackFn(getValidParams);
		}
	}

	function onChangePage(newPage: number) {
		pagination.value.pageNumber = newPage - 1;
		if (canDoSearch) {
			props.callbackFn(getValidParams);
		}
	}

	function getOrderByKey() {
		return lowercaseSort.value ? 'orderby' : 'orderBy';
	}

	function onSortTable(tableSort: Parameters<UsePageable['onSortTable']>[number]) {
		if (!tableSort) {
			throw new Error('No sort was provided.');
		}

		if(typeof tableSort === 'string'){
			const [orderBy, order] = tableSort.split('_') as Split<typeof tableSort, '_'>;
			tableSort = {
				field: orderBy,
				descending: order
			}
		}
		
		// @ts-expect-error
		sortCurrent.value[getOrderByKey()] = tableSort.field;
		// @ts-expect-error
		sortCurrent.value.order = tableSort.descending;
		if (canDoSearch) {
			props.callbackFn(getValidParams);
		}
	}

	function onApplyFilter(data: PureFilters) {
		filterCurrent.value = {
			...data,
		};
		pagination.value.pageNumber = 0;
		if (canDoSearch) {
			props.callbackFn(getValidParams);
		}
	}

	function onFiltersApplied(data: boolean) {
		isFilterCounter.value = data;
	}

	watch(filterCurrent, () => {
		pagination.value.pageNumber = 0;
		if (lazyFilters.value) return;
		
		props.callbackFn(getValidParams);
	}, { deep: true });

	return {
		page,
		pagination,
		isOpenFilter,
		isFilterCounter,
		onChangePageLimit,
		onChangePage,
		onSortTable,
		onApplyFilter,
		onFiltersApplied,
	};
}
