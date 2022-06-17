import installComponents from './installComponents';

describe('installComponents', () => {
	it('should install once', () => {
		const _Vue = {
			component: () => {},
		};
		const spyObj = jest.spyOn(_Vue, 'component');
		installComponents(_Vue, {
			a: {},
		});
		expect(spyObj).toHaveBeenCalledTimes(1);
	});

	it('should install twice when extended name is provided', () => {
		const _Vue = {
			component: () => {},
		};
		const spyObj = jest.spyOn(_Vue, 'component');
		installComponents(_Vue, {
			b: {
				extendOptions: {
					name: 'teste_b',
				},
			},
		});
		expect(spyObj).toHaveBeenCalledTimes(2);
	});
});
