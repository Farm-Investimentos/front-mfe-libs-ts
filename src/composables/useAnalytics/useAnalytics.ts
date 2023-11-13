import { notification } from '../..';

import { AnalyticsNotificationParams, UseAnalytics, UseAnalyticsProps } from './types';

const INITIAL_STATE = { store: null, DEBUG_MODE: false };

export function useAnalytics<State>({
	store,
	DEBUG_MODE,
}: UseAnalyticsProps<State> = INITIAL_STATE): UseAnalytics {
	function trigger(data: AnalyticsNotificationParams): void {
		const dataAnalytics = {
			event: data.event,
			payload: {
				action: data?.action || 'click',
				product: 'unidentified',
				...(data?.payload ?? {}),
			},
		};

		if (store) {
			const selectedProductGetterKey = Object.keys(store.getters).find(key =>
				key.includes('selectedProduct')
			);

			const getter = store.getters[selectedProductGetterKey as typeof store.getters]?.register?.name

			dataAnalytics.payload.product = getter || dataAnalytics.payload.product;
		}

		if (DEBUG_MODE) {
			console.table(dataAnalytics);
			return;
		}

		notification('ANALYTICS_EVENT', dataAnalytics);
	}
	
	return {
		trigger,
	};
}
