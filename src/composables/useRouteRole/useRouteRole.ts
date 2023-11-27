import { ref, computed } from 'vue';

import type { Store } from 'vuex';

import {
	CURRENT_ROUTE_ROLE_GETTER_KEY,
	CURRENT_USER_ROLES_GETTER_KEY,
	UPDATE_CURRENT_ROUTE_ROLE_KEY,
	UPDATE_INTERNAL_USER_KEY,
} from './constants';

export default function useRouteRoule(
	store: Store<any>,
	route: any,
	moduleName: string,
) {
	let { roleKey } = route.meta;
	const userHasAccess = ref(true);

	const currentRouteRole = computed(
		() => store.getters[`${moduleName}/${CURRENT_ROUTE_ROLE_GETTER_KEY}`],
	);
	const currentUserRoles = computed(
		() => store.getters[`${moduleName}/${CURRENT_USER_ROLES_GETTER_KEY}`],
	);
	const canWrite = computed(() => currentRouteRole.value === 'WRITE');
	const rolesPath = computed(() =>
		roleKey.split('.').map((item: string) => {
			if (item.indexOf(':') === 0) {
				return route.params[item.split(':')[1]];
			}
			return item;
		}),
	);

	function checkAccess() {
		if (!roleKey) {
			store.dispatch(`${moduleName}/${UPDATE_CURRENT_ROUTE_ROLE_KEY}`, 0);
			userHasAccess.value = false;
			return;
		}

		roleKey = rolesPath.value.join('.');

		const isOpenRoute = !roleKey || !currentUserRoles.value;

		if (isOpenRoute) {
			store.dispatch(
				`${moduleName}/${UPDATE_CURRENT_ROUTE_ROLE_KEY}`,
				'WRITE',
			);
			userHasAccess.value = true;
			return;
		}

		const routeRole = currentUserRoles.value[roleKey];
		const hasRouteRole = routeRole && routeRole > 0;

		if (hasRouteRole) {
			store.dispatch(
				`${moduleName}/${UPDATE_CURRENT_ROUTE_ROLE_KEY}`,
				routeRole === 2 ? 'WRITE' : 'READ',
			);
			userHasAccess.value = true;
			return;
		}

		store.dispatch(`${moduleName}/${UPDATE_CURRENT_ROUTE_ROLE_KEY}`, 0);
		userHasAccess.value = false;
	}
	function listenToUserRolesChange() {
		window.addEventListener('CURRENT_USER_ROLES', (data: any) => {
			store.dispatch(
				`${moduleName}/${UPDATE_CURRENT_ROUTE_ROLE_KEY}`,
				data.detail.message,
			);
			checkAccess();
		});
		window.addEventListener('CURRENT_USER_INTERNAL', (data: any) => {
			store.dispatch(
				`${moduleName}/${UPDATE_INTERNAL_USER_KEY}`,
				data.detail.message,
			);
		});
	}

	return {
		canWrite,
		currentRouteRole,
		currentUserRoles,
		checkAccess,
		listenToUserRolesChange,
	};
}
