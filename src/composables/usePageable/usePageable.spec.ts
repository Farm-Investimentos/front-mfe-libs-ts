import { nextTick, ref } from 'vue';
import { usePageable } from '.';
import { Pagination, UsePageable } from './types';

describe('usePageable', () => {
	let pagination = ref({} as Pagination);

	beforeEach(() => {
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
			const callback = jest.fn();
	
			const { page } = usePageable({
				callbackFn: callback,
				keyInputSearch: ''
			}, pagination.value);
	
			expect(page.value).toBe(1);
			expect(callback).not.toBeCalled();
		});

		it('should update page', () => {
				const callback = jest.fn()

				const { onChangePage } = usePageable({
					callbackFn: callback,
					keyInputSearch: '',
				}, pagination.value);
	
				const pageToGo = 5
	
				onChangePage(pageToGo);
	
				expect(callback).toHaveBeenCalledWith({
					page: pageToGo - 1,
					limit: pagination.value.pageSize
				});
		})

		it('should update page limit and set page back to 1', () => {
				const callback = jest.fn()

				const { page, onChangePageLimit } = usePageable({
					callbackFn: callback,
					keyInputSearch: '',
				}, pagination.value);

				expect(pagination.value.pageSize).toBe(10);
	
				const newPageLimit = 5
	
				onChangePageLimit(newPageLimit);
				
				expect(page.value).toBe(1);
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith({
					page: page.value - 1,
					limit: newPageLimit
				});
		})
	})

	describe('filter test', () => {
		it('should update arbitrary filters and set page back to 1', async () => {
			const callbackFn = jest.fn();

			const filters = ref({
				testFilter: '123'
			})
	
			const { page } = usePageable({
				callbackFn,
				keyInputSearch: '',
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
	});

	describe('sort test', () => {
		it('should update sort with object and set page back to 1', () => {
			const callbackFn = jest.fn();

			const { page, onSortTable } = usePageable({
				callbackFn,
				keyInputSearch: '',
				sort: {
					order: '',
					orderBy: ''
				}
			}, pagination.value);

			onSortTable({
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
			const callbackFn = jest.fn();

			const { page, onSortTable } = usePageable({
				callbackFn,
				keyInputSearch: '',
				sort: {
					order: '',
					orderBy: ''
				}
			}, pagination.value);

			onSortTable('id_ASC');

			expect(page.value).toBe(1);
			expect(callbackFn).toHaveBeenCalledTimes(1);
			expect(callbackFn).toHaveBeenCalledWith({
				page: pagination.value.pageNumber,
				limit: pagination.value.pageSize,
				order: 'ASC',
				orderBy: 'id'
			});
		});
	});
});
