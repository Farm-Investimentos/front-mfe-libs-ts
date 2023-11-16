import { ref, computed, watch, Ref } from 'vue';

import type { UsePageable, Pagination, usePageableProps } from './types';
import type { Split } from 'helpers/types/split';

export function usePageable(props: usePageableProps, paginationModel: Pagination): UsePageable {
	const canDoSearch = ref(true);
	const lazyApplyFilters = ref(props.lazyApplyFilters || false);
	const pagination = ref(paginationModel);
	const filterCurrent = ref(props.filters?.value || {});
	const sortCurrent: Ref<usePageableProps['sort'] | null> = ref(props.sort || null);
	const lowercaseSort = ref(props.lowercaseSort || false);

	const page = computed(() => (pagination.value?.pageNumber || 0) + 1);

	const hasSort = computed(() => sortCurrent.value !== undefined && sortCurrent.value !== null);
	const hasFilter = computed(() => filterCurrent.value !== undefined && filterCurrent.value !== null);

	const hasAnyFilter = computed(() => hasFilter.value && Object.values(filterCurrent.value).filter(Boolean).length);
	const hasAnySort = computed(() => hasSort.value && Object.values(sortCurrent.value!).filter(Boolean).length);

	const validParams = computed(() => ({
		page: pagination.value.pageNumber,
		limit: pagination.value.pageSize,
		...(hasAnyFilter.value ? filterCurrent.value : {}),
		...(hasAnySort.value ? sortCurrent.value : {}),
	}));

	const queryValidParams = computed(() => {
		const stringValues = Object.entries(validParams.value).reduce((accumulator, [key, value]) => {
			return {
				...accumulator,
				[key]: String(value)
			};
		}, {} as Record<string, string>)

		return new URLSearchParams(stringValues).toString()
	});

	function onChangePageLimit(newPageLimit: number) {
		pagination.value.pageSize = newPageLimit;
		pagination.value.pageNumber = 0;
		if (canDoSearch) {
			props.callbackFn(validParams.value);
		}
	}

	function onChangePage(newPage: number) {
		pagination.value.pageNumber = newPage - 1;
		if (canDoSearch) {
			props.callbackFn(validParams.value);
		}
	}

	function getOrderByKey() {
		return lowercaseSort.value ? 'orderby' : 'orderBy';
	}

	function onSort(tableSort: Parameters<UsePageable['onSort']>[number]) {
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
			props.callbackFn(validParams.value);
		}
	}

	function onApplyFilters(data: Parameters<UsePageable['onApplyFilters']>[0], complement: Parameters<UsePageable['onApplyFilters']>[1] = true) {
		const hasNewData = data && data.value && Object.values(data.value).filter(Boolean);

		filterCurrent.value = {
			...(complement ? { ...filterCurrent.value } : {}),
			...(hasNewData ? { ...data.value } : {}),
		};

		pagination.value.pageNumber = 0;
		if (canDoSearch) {
			props.callbackFn(validParams.value);
		}
	}

	watch(filterCurrent, () => {
		if (lazyApplyFilters.value) return;

		pagination.value.pageNumber = 0;
		
		props.callbackFn(validParams.value);
	}, { deep: true });

	return {
		page,
		pagination,
		queryValidParams: queryValidParams.value,
		onChangePageLimit,
		onChangePage,
		onSort,
		onApplyFilters
	};
}
