import pageable from './pageable';

describe('pageable', () => {
	it('should have methods', () => {
		expect(pageable.methods).toBeDefined();
	});

	it('should have redoSearchFirstPage method', () => {
		expect(pageable.methods.redoSearchFirstPage).toBeDefined();
	});

	describe('Computed properties', () => {
		expect(pageable.computed.currentPage.get).toBeDefined();
		const p: any = {
			...pageable.computed.currentPage,
			filters: { page: 0 },
		};
		pageable.computed.currentPage = p;
		expect(pageable.computed.currentPage.get()).toEqual(1);
	});

	it('Should hable enable search methods', () => {
		expect(pageable.methods.enableSearch).toBeDefined();
		expect(pageable.methods.disableSearch).toBeDefined();
	})
});
