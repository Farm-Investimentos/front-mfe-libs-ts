export default (message: string) =>
	new Promise((resolve: any, reject: any) => {
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
