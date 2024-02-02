import type { Store } from 'vuex';

/*
	We should extract Parameters from notification passing generic type,
	but isn't allowed extracting return using typeof with generics for this typescript version
	So this type is a workaround and we should rely on Parameters extraction from notification (only available on TS >= 4.7.4):
	type AnalyticsNotificationParams = Parameters<typeof notification<'ANALYTICS_EVENT'>>[1] & { action: string };
*/
export type AnalyticsNotificationParams = {
	event: Gtag.EventNames | (string & {});
	action?: string;
	payload: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
};

export type UseAnalytics = {
	trigger: (data: AnalyticsNotificationParams) => void;
};

export type UseAnalyticsProps<State = unknown> = { store: Store<State> | null; DEBUG_MODE?: boolean };
