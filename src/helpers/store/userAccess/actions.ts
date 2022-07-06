import { ICommit } from 'interfaces/ICommit';

export default {
	updateCurrentUserRoles({ commit }: ICommit, roles: Record<string, any>) {
		commit('setCurrentUserRoles', roles);
	},

	updateCurrentRouteRole({ commit }: ICommit, role: string) {
		commit('setCurrentRouteRole', role);
	},

	updateInternalUser({ commit }: ICommit, status: boolean) {
		commit('setInternalUser', status);
	},
};
