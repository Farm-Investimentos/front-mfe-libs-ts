export default {
	setCurrentUserRoles: (
		state: Record<string, any>,
		_currentUserRoles: Record<string, any>,
	) => (state.currentUserRoles = _currentUserRoles),
	setCurrentRouteRole: (
		state: Record<string, any>,
		_currentRouteRole: string,
	) => (state.currentRouteRole = _currentRouteRole),
	setInternalUser: (state: Record<string, any>, internalUser: boolean) =>
		(state.internalUser = internalUser),
};
