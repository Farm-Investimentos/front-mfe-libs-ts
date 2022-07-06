import vuetify from '.';

describe('vuetify', () => {
	it('should have theme', () => {
		expect(vuetify.theme).toBeDefined();
		expect(vuetify.theme.themes.light).toBeDefined();
	});

	it('should have secondary theme color', () => {
		expect(vuetify.theme.themes.light.secondary.base).toEqual('#00B493');
	});
});
