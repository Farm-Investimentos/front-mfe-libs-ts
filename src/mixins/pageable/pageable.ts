const pageable = {
	data() {
		return {
			canDoSearch: true,
		};
	},
	methods: {
		onChangeLimitPerPage(newLimit: number) {
			(this as any).filters.limit = newLimit;
			if ((this as any).canDoSearch) this.redoSearchFirstPage();
		},
		onChangePage(newPage: number) {
			(this as any).filters.page = newPage - 1;
			if ((this as any).canDoSearch) (this as any).doSearch();
		},
		redoSearchFirstPage() {
			if ((this as any).filters.page !== 0) {
				(this as any).filters.page = 0;
				return;
			}
			(this as any).doSearch();
		},
		searchListener(data: any) {
			const value =
				(this as any).filters[(this as any).filterInputKey] || '';
			(this as any).filters = {
				...data,
				limit: (this as any).lastSearchFilters.limit,
				page: (this as any).lastSearchFilters.page,
			};
			(this as any).filters[(this as any).filterInputKey] = value;
			(this as any).redoSearchFirstPage();
		},
		filterInputChanged(value: string) {
			(this as any).filters[(this as any).filterInputKey] = value;
			const disableFilterInpuChangeMinLength = (this as any).disableFilterInpuChangeMinLength;
			if(value === '' || disableFilterInpuChangeMinLength || value.length >= 3) {
				(this as any).redoSearchFirstPage();
			}
		},
		enableSearch() {
			(this as any).canDoSearch = true;
		},
		disableSearch() {
			(this as any).canDoSearch = false;
		},
		checkStateOnMount(key: string) {
			if (!this.hasQueryParams()) {
				return false;
			}
			const currentFilters = (this as any).currentFiltersFromKey(key);
			if (currentFilters) {
				this.disableSearch();
				const filters = {
					...currentFilters.filters,
					page: currentFilters.filters.page,
				};
				(this as any).filters = { ...filters };
				(this as any).initFiltersValues = { ...filters };
				(this as any).filter = currentFilters.showFilters;

				(this as any).$nextTick(() => {
					this.enableSearch();
				});
				return true;
			}
			return false;
		},
		checkUrlQueryOnMount() {
			if ((this as any).$route.query && (this as any).$route.query.page) {
				(this as any).filters = {
					...(this as any).$route.query,
					page: parseInt((this as any).$route.query.page, 10),
					limit: parseInt((this as any).$route.query.limit, 10),
				};

				if ((this as any).hasSort) {
					(this as any).hasSort.orderby = (
						this as any
					).$route.query.orderby;
					(this as any).hasSort.order = (
						this as any
					).$route.query.order;
				}

				return true;
			}
			return false;
		},
		hasQueryParams() {
			return Object.keys((this as any).$route.query).length > 0;
		},
		updateQueryInUrl() {
			const obj: any = {};
			Object.keys((this as any).filters).forEach((key) => {
				const value = (this as any).filters[key];
				if (Array.isArray(value)) {
					return (obj[key] = value.join(',').toString());
				}
				if (value !== undefined) obj[key] = value.toString();
			});
			if ((this as any).hasSort) {
				obj.orderby = (this as any).hasSort.orderby;
				obj.order = (this as any).hasSort.order;
			}

			if (
				JSON.stringify(obj) !==
				JSON.stringify((this as any).$route.query)
			) {
				(this as any).$router.replace({
					path: (this as any).$route.path,
					query: { path: (this as any).$route.query.path, ...obj },
				});
			}
		},
	},
	computed: {
		currentPage: {
			get() {
				return (this as any).filters.page + 1;
			},
		},
	},
};

export default pageable;
