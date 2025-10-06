import { defineStore } from 'pinia';

interface UserAccessState {
	currentUserRoles: Record<string, number>;
	currentRouteRole: string | null;
	internalUser: boolean | null;
}

export const useUserAccessStore = defineStore('userAccess', {
	state: (): UserAccessState => ({
		currentUserRoles: {},
		currentRouteRole: null,
		internalUser: null,
	}),

	getters: {
		getCurrentUserRoles: (state) => state.currentUserRoles,
		getCurrentRouteRole: (state) => state.currentRouteRole,
		getInternalUser: (state) => state.internalUser,
	},

	actions: {
		updateCurrentUserRoles(roles: Record<string, number>) {
			this.currentUserRoles = roles;
		},

		updateCurrentRouteRole(role: string) {
			this.currentRouteRole = role;
		},

		updateInternalUser(status: boolean) {
			this.internalUser = status;
		},
	},
});

