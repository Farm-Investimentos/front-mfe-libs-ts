import { createPinia, setActivePinia } from 'pinia';
import { useUserAccessStore } from './userAccess';

describe('useUserAccessStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('should initialize with default state', () => {
		const store = useUserAccessStore();

		expect(store.currentUserRoles).toEqual({});
		expect(store.currentRouteRole).toBeNull();
		expect(store.internalUser).toBeNull();
	});

	describe('getters', () => {
		it('should return currentUserRoles', () => {
			const store = useUserAccessStore();
			const roles = { 'admin.users': 2 };
			store.currentUserRoles = roles;

			expect(store.getCurrentUserRoles).toEqual(roles);
		});

		it('should return currentRouteRole', () => {
			const store = useUserAccessStore();
			store.currentRouteRole = 'WRITE';

			expect(store.getCurrentRouteRole).toBe('WRITE');
		});

		it('should return internalUser', () => {
			const store = useUserAccessStore();
			store.internalUser = true;

			expect(store.getInternalUser).toBe(true);
		});
	});

	describe('actions', () => {
		it('should update currentUserRoles', () => {
			const store = useUserAccessStore();
			const roles = { 'admin.users': 2, 'admin.products': 1 };

			store.updateCurrentUserRoles(roles);

			expect(store.currentUserRoles).toEqual(roles);
		});

		it('should update currentRouteRole', () => {
			const store = useUserAccessStore();

			store.updateCurrentRouteRole('READ');

			expect(store.currentRouteRole).toBe('READ');
		});

		it('should update internalUser', () => {
			const store = useUserAccessStore();

			store.updateInternalUser(true);

			expect(store.internalUser).toBe(true);
		});

		it('should update internalUser to false', () => {
			const store = useUserAccessStore();
			store.internalUser = true;

			store.updateInternalUser(false);

			expect(store.internalUser).toBe(false);
		});
	});
});

