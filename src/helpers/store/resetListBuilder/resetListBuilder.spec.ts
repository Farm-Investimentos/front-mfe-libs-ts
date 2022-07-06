import resetListBuilder from './resetListBuilder';

describe('resetListBuilder', () => {
	it('should create object for basic values', () => {
		const r = resetListBuilder('a');
		expect(r).toBeDefined();
		expect(r.setResetA).toBeInstanceOf(Function);
	});
});
