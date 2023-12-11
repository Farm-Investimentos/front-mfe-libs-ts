/**
 * @jest-environment jsdom
 */

import Vue from 'vue';
import Vuex, { type Store } from 'vuex';
import VueRouter from 'vue-router';

import { useRouteRole } from '.';
import { UPDATE_CURRENT_USER_ROLES_KEY } from './constants';
import defaultUserAccessStore from '../../helpers/store/userAccess';

Vue.use(Vuex);
Vue.use(VueRouter);

const moduleName = 'userAccess';

const loadedCurrentUserRoles = { 'spec.read': 1, 'spec.write': 2 };

const customEvents = {
	CURRENT_USER_ROLES: new window.CustomEvent('CURRENT_USER_ROLES', {
		detail: {
			message: loadedCurrentUserRoles,
		},
	}),
	CURRENT_USER_INTERNAL: new window.CustomEvent('CURRENT_USER_INTERNAL', {
		detail: {
			message: true,
		},
	}),
};

const router = new VueRouter({
	routes: [
		{
			name: 'SpecNoMetaRoute',
			path: '/no-meta',
		},
		{
			name: 'SpecReadRoute',
			path: '/spec/read',
			meta: {
				roleKey: 'spec.read',
			},
		},
		{
			name: 'SpecWriteRoute',
			path: '/spec/write',
			meta: {
				roleKey: 'spec.write',
			},
		},
	],
});

describe('routeRole', () => {
	let store: Store<any>;

	beforeEach(async () => {
		if (router.currentRoute.name !== 'SpecNoMetaRoute') {
			await router.push({ name: 'SpecNoMetaRoute' });
		}

		store = new Vuex.Store({
			modules: {
				[moduleName]: {
					...defaultUserAccessStore,
					state: () => ({ ...defaultUserAccessStore.state }),
				},
			},
		});
	});

	describe('check access', () => {
		it('should have correct default values on store', () => {
			const { currentRouteRole, currentUserRoles, internalUser } =
				useRouteRole(store, router.currentRoute, moduleName);

			expect(currentRouteRole.value).toBe(null);
			expect(currentUserRoles.value).toStrictEqual([]);
			expect(internalUser.value).toBe(null);
		});

		it('should have no access if meta roleKey is not present in route', async () => {
			const {
				currentRouteRole,
				currentUserRoles,
				internalUser,
				userHasAccess,
				canWrite,
				checkAccess,
			} = useRouteRole(store, router.currentRoute, moduleName);

			expect(canWrite.value).toBeFalsy();
			expect(userHasAccess.value).toBeTruthy();
			expect(currentRouteRole.value).toBe(
				defaultUserAccessStore.state.currentRouteRole,
			);
			expect(currentUserRoles.value).toStrictEqual(
				defaultUserAccessStore.state.currentUserRoles,
			);
			expect(internalUser.value).toBeFalsy();

			checkAccess();

			expect(canWrite.value).toBeFalsy();
			expect(userHasAccess.value).toBeFalsy();
			expect(currentRouteRole.value).toBe(0);
			expect(currentUserRoles.value).toStrictEqual(
				defaultUserAccessStore.state.currentUserRoles,
			);
			expect(internalUser.value).toBeFalsy();
		});

		it('should have read access if meta roleKey is present and equal to 1', async () => {
			// Update user roles (simulate fetch them from API)
			store.dispatch(
				`${moduleName}/${UPDATE_CURRENT_USER_ROLES_KEY}`,
				loadedCurrentUserRoles,
			);

			await router.push({ name: 'SpecReadRoute' });

			const {
				currentRouteRole,
				currentUserRoles,
				internalUser,
				userHasAccess,
				canWrite,
				checkAccess,
			} = useRouteRole(store, router.currentRoute, moduleName);

			// simulate checkAccess running after each route change
			checkAccess();

			expect(canWrite.value).toBeFalsy();
			expect(userHasAccess.value).toBeTruthy();
			expect(currentRouteRole.value).toBe('READ');
			expect(currentUserRoles.value).toStrictEqual(
				loadedCurrentUserRoles,
			);
			expect(internalUser.value).toBeFalsy();
		});

		it('should have write access if meta roleKey is present and equal to 2', async () => {
			// Update user roles (simulate fetch them from API)
			store.dispatch(
				`${moduleName}/${UPDATE_CURRENT_USER_ROLES_KEY}`,
				loadedCurrentUserRoles,
			);

			await router.push({ name: 'SpecWriteRoute' });

			const {
				currentRouteRole,
				currentUserRoles,
				internalUser,
				userHasAccess,
				canWrite,
				checkAccess,
			} = useRouteRole(store, router.currentRoute, moduleName);

			// simulate checkAccess running after each route change
			checkAccess();

			expect(canWrite.value).toBeTruthy();
			expect(userHasAccess.value).toBeTruthy();
			expect(currentRouteRole.value).toBe('WRITE');
			expect(currentUserRoles.value).toStrictEqual(
				loadedCurrentUserRoles,
			);
			expect(internalUser.value).toBeFalsy();
		});
	});

	describe('listen to user role changes', () => {
		it('should update user roles after window custom event', async () => {
			const { currentUserRoles, listenToUserRolesChange } = useRouteRole(
				store,
				router.currentRoute,
				moduleName,
			);

			expect(currentUserRoles.value).toStrictEqual([]);

			listenToUserRolesChange();

			// Simulate user role change watch
			window.dispatchEvent(customEvents.CURRENT_USER_ROLES);

			expect(currentUserRoles.value).toStrictEqual(
				loadedCurrentUserRoles,
			);
		});

		it('should update user internal state after window custom event', async () => {
			const { internalUser, listenToUserRolesChange } = useRouteRole(
				store,
				router.currentRoute,
				moduleName,
			);

			listenToUserRolesChange();

			expect(internalUser.value).toBeFalsy();

			// Simulate user role change watch
			window.dispatchEvent(customEvents.CURRENT_USER_INTERNAL);

			expect(internalUser.value).toBeTruthy();
		});
	});
});
