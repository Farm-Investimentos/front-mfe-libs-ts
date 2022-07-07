import routeRole from './routeRole';

describe('routeRole', () => {
	let mockVue = {
		mixin: (args) => {
			Object.keys(args).forEach((k) => (mockVue[k] = args[k]));
		},
	};

	beforeEach(() => {
		routeRole(
			mockVue,
			() => ({}),
			() => ({}),
			'spec',
		);
	});
	it('should have methods', () => {
		expect(mockVue.methods).toBeDefined();
	});

	it('should have methods method', () => {
		expect(mockVue.methods.checkAccess).toBeDefined();
		expect(mockVue.methods.listenToUserRolesChange).toBeDefined();
	});

	it('should have computed method', () => {
		expect(mockVue.computed.canWrite).toBeDefined();
	});

	describe('Computed methods', () => {
		it('should computed canWrite', () => {
			expect(mockVue.computed.canWrite()).toBeFalsy();
		});
	});
});
