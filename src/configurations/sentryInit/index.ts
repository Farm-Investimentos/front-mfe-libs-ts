export default (
	Vue: any,
	init: any,
	browserTracing: any,
	routerInstrumentation: any,
	router: any,
) => {
	const sentryDns = (window as any).FARM.SENTRY.DNS;
	const sentryEnv = (window as any).FARM.SENTRY.ENV;

	if (!sentryDns) {
		return null; // this drops the event and nothing will be sent to sentry
	}

	init({
		Vue,
		dsn: sentryDns,
		environment: sentryEnv,
		integrations: [
			new browserTracing({
				routingInstrumentation: routerInstrumentation(router),
			}),
		],
		tracesSampleRate: 1.0,
	});
};
