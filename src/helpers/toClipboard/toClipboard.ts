export default (message: string): Promise<unknown> =>
	new Promise((resolve: Function, reject: Function) => {
		const permissionName = 'clipboard-write' as PermissionName;
		navigator.permissions.query({ name: permissionName }).then((result) => {
			if (result.state === 'granted' || result.state === 'prompt') {
				navigator.clipboard.writeText(message).then(
					() => {
						resolve();
					},
					() => {
						reject();
					},
				);
			}
		});
	});
