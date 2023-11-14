import { nextTick, ref } from 'vue';
import { usePageable } from '.';
import type { Pagination } from './types';

describe('usePageable', () => {
	let pagination = ref({} as Pagination);
	let callbackFn = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		pagination.value = {} as Pagination;

		pagination = ref({
			pageNumber: 0,
			pageSize: 10,
			sort: null,
			totalElements: 10,
			totalPages: 1
		} as Pagination)
	})

	describe('page test', () => {
		it('should have 1 page', () => {
			const { page } = usePageable({
				callbackFn,
			}, pagination.value);
	
			expect(page.value).toBe(1);
			expect(callbackFn).not.toBeCalled();
		});

		it('should update page', () => {
				const { onChangePage } = usePageable({
					callbackFn,
				}, pagination.value);
	
				const pageToGo = 5
	
				onChangePage(pageToGo);
	
				expect(callbackFn).toHaveBeenCalledWith({
					page: pageToGo - 1,
					limit: pagination.value.pageSize
				});
		})

		it('should update page limit and set page back to 1', () => {
				const { page, onChangePageLimit } = usePageable({
					callbackFn,
				}, pagination.value);

				expect(pagination.value.pageSize).toBe(10);
	
				const newPageLimit = 5
	
				onChangePageLimit(newPageLimit);
				
				expect(page.value).toBe(1);
				expect(callbackFn).toHaveBeenCalledTimes(1);
				expect(callbackFn).toHaveBeenCalledWith({
					page: page.value - 1,
					limit: newPageLimit
				});
		})
	})

	describe('filter test', () => {
		it('should update arbitrary filters and set page back to 1', async () => {
			const filters = ref({
				testFilter: '123'
			})
	
			const { page } = usePageable({
				callbackFn,
				filters
			}, pagination.value);
	
			expect(filters.value.testFilter).toBe('123');

			filters.value.testFilter = '321';

			await nextTick();

			expect(page.value).toBe(1);
			expect(filters.value.testFilter).toBe('321');
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				...filters.value
			});
		});

		it('should LAZILY update arbitrary filters and not update page back to 0 at first', async () => {
			const initialPage = 4;
			const filters = ref({
				testFilter: '123'
			})

			pagination.value.pageNumber = initialPage;
	
			const { page, onApplyFilters } = usePageable({
				callbackFn,
				filters,
				lazyApplyFilters: true
			}, pagination.value);

			filters.value.testFilter = '321';

			await nextTick();

			expect(callbackFn).not.toHaveBeenCalled();
			expect(page.value).toBe(pagination.value.pageNumber + 1);

			onApplyFilters()

			expect(page.value).toBe(1);
			expect(filters.value.testFilter).toBe('321');
			expect(callbackFn).toHaveBeenCalledTimes(1)
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				...filters.value
			});
		});

		it('should LAZILY replace all arbitrary filters', async () => {
			const initialPage = 4;
			const filters = ref({
				testFilter: '123'
			})
			const newTestFilters = ref({
				newTestFilters: 'abc'
			})

			pagination.value.pageNumber = initialPage;
	
			const { page, onApplyFilters } = usePageable({
				callbackFn,
				filters,
				lazyApplyFilters: true
			}, pagination.value);

			await nextTick();

			expect(callbackFn).not.toHaveBeenCalled();
			expect(page.value).toBe(pagination.value.pageNumber + 1);

			onApplyFilters(newTestFilters, false);

			expect(page.value).toBe(1);
			expect(callbackFn).toHaveBeenCalledTimes(1)
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				...newTestFilters.value
			});
		});
	});

	describe('sort test', () => {
		it('should update sort with object and set page back to 1', () => {
			const { page, onSort } = usePageable({
				callbackFn,
				sort: {
					order: '',
					orderBy: ''
				}
			}, pagination.value);

			onSort({
				field: 'id',
				descending: 'ASC'
			})

			expect(callbackFn).toHaveBeenCalledTimes(1);
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				order: 'ASC',
				orderBy: 'id'
			});
		});

		it('should update sort with splitted string and set page back to 1', () => {
			const { page, onSort } = usePageable({
				callbackFn,
				sort: {
					order: '',
					orderBy: ''
				}
			}, pagination.value);

			onSort('id_ASC');

			expect(page.value).toBe(1);
			expect(callbackFn).toHaveBeenCalledTimes(1);
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				order: 'ASC',
				orderBy: 'id'
			});
		});

		it.todo('should have lowercased sort values');
	});

	describe('utilities', () => {
		it('should have correct queryValidParams in string format', () => {
			const filters = ref({
				testFilter: '123'
			})
	
			const { queryValidParams } = usePageable({
				callbackFn,
				filters
			}, pagination.value);
	
			expect(queryValidParams).toEqual('page=0&limit=10&testFilter=123')
		})
	})
});
