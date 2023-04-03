export default (
	_Vue: any,
	mapGetters: Function,
	mapActions: Function,
	moduleName: string,
) => {
	_Vue.mixin({
		data() {
			return {
				userHasAccess: true,
			};
		},
		computed: {
			...mapGetters(moduleName, {
				currentRouteRole: 'currentRouteRole',
				currentUserRoles: 'currentUserRoles',
				internalUser: 'internalUser',
			}),
			canWrite() {
				return this.currentRouteRole === 'WRITE';
			},
		},
		methods: {
			...mapActions(moduleName, {
				updateCurrentUserRoles: 'updateCurrentUserRoles',
				updateCurrentRouteRole: 'updateCurrentRouteRole',
				updateInternalUser: 'updateInternalUser',
			}),
			checkAccess() {
				const rolesList = this.currentUserRoles;
				let { roleKey } = this.$route.meta;

				if (!roleKey.split('.')) {
					this.updateCurrentRouteRole(0);
					this.userHasAccess = false;
					return;
				}

				const rolesPath = roleKey.split('.').map((item: string) => {
					if (item.indexOf(':') === 0) {
						return this.$route.params[item.split(':')[1]];
					}
					return item;
				});
				roleKey = rolesPath.join('.');

				if (!roleKey || !rolesList) {
					this.updateCurrentRouteRole('WRITE');
					this.userHasAccess = true;
					return;
				}
				const routeRole = rolesList[roleKey];

				if (routeRole && routeRole > 0) {
					this.updateCurrentRouteRole(
						routeRole === 2 ? 'WRITE' : 'READ',
					);
					this.userHasAccess = true;
					return;
				}
				this.updateCurrentRouteRole(0);
				this.userHasAccess = false;
			},
			listenToUserRolesChange() {
				window.addEventListener('CURRENT_USER_ROLES', (data: any) => {
					this.updateCurrentUserRoles(data.detail.message);
					this.checkAccess();
				});
				window.addEventListener(
					'CURRENT_USER_INTERNAL',
					(data: any) => {
						this.updateInternalUser(data.detail.message);
					},
				);
			},
		},
	});
};
