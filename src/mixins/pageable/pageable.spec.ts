import pageable from '.';

describe('pageable', () => {
	describe('Methods properties', () => {
		it('should have methods', () => {
			expect(pageable.methods).toBeDefined();
		});

		describe('redoSearchFirstPage', () => {
			it('should have redoSearchFirstPage method', () => {
				expect(pageable.methods.redoSearchFirstPage).toBeDefined();
			});
		});
	});

	describe('Computed properties', () => {
		describe('currentPage', () => {
			it('should have currentPage computed', () => {
				expect(pageable.computed.currentPage.get).toBeDefined();
			});
		});
	});
});
