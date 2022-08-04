import installComponents from './installComponents';

describe('installComponents', () => {
	it('Should install once when component name is html tag', () => {
		const _Vue = {
			component: () => {},
		};
		const spyObj = jest.spyOn(_Vue, 'component');
		installComponents(_Vue, {
			Line: {
				extendOptions: {
					name: 'teste_a',
				},
			},
		});
		expect(spyObj).toHaveBeenCalledTimes(1);
	});

	it('should install twice when extended name is provided and component name is not html tag', () => {
		const _Vue = {
			component: () => {},
		};
		const spyObj = jest.spyOn(_Vue, 'component');
		installComponents(_Vue, {
			random_name: {
				extendOptions: {
					name: 'teste_b',
				},
			},
		});
		expect(spyObj).toHaveBeenCalledTimes(2);
	});
});
