import Vue from 'vue';
import Vuex from 'vuex';
import { notification } from '../..';

import { useAnalytics } from '.';

Vue.use(Vuex);

jest.mock('../..', () => {
	return {
		notification: jest.fn()
	}
})

const moduleState = {
	selectedProduct: {
		register: {
			id: 34,
			name: 'CORTEVA'
		}
	}
}

const storeModules = {
	modules: {
		wallet: {
			namespaced: true,
			state: () => moduleState,
			getters: {
				selectedProduct(state: typeof moduleState) {
					return state.selectedProduct;
				}
			}
		}
	}
}

const store = new Vuex.Store<{ wallet: typeof moduleState }>(storeModules);

describe('useAnalytics', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call console.table on debug mode', () => {
		const consoleSpy = jest.spyOn(console, 'table').mockImplementation(jest.fn());
		const { trigger } = useAnalytics({ store: null, DEBUG_MODE: true });
		
		trigger({
			event: 'test',
			action: 'test',
			payload: {
				description: 'test',
			},
		});

		expect(consoleSpy).toHaveBeenCalled();
		expect(notification).not.toHaveBeenCalled();
	});

	it('should not call console.table if not in debug mode', () => {
		const consoleSpy = jest.spyOn(console, 'table');
		const { trigger } = useAnalytics({
			store: null
		});

		const triggerData = {
			event: 'test',
			action: 'test',
			payload: {
				description: 'test',
			},
		};

		trigger(triggerData);

		expect(consoleSpy).not.toHaveBeenCalled();
	});

	it('should have stored selectedProduct passed via store in final payload', () => {
		const { trigger } = useAnalytics({
			store
		});

		const triggerData = {
			event: 'test',
			action: 'test',
			payload: {
				description: 'test',
			},
		};

		trigger(triggerData);

		expect(notification).toHaveBeenCalledWith('ANALYTICS_EVENT', {
			event: triggerData.event,
			payload: {
				...triggerData.payload,
				action: triggerData.action,
				product: store.state.wallet.selectedProduct.register.name
			}
		});
	});

	it('should have unidentified product if store is null', () => {
		const { trigger } = useAnalytics({
			store: null
		});

		const triggerData = {
			event: 'test',
			action: 'test',
			payload: {
				description: 'test',
			},
		};

		trigger(triggerData);

		expect(notification).toHaveBeenCalledWith('ANALYTICS_EVENT', {
			event: triggerData.event,
			payload: {
				...triggerData.payload,
				action: triggerData.action,
				product: 'unidentified'
			}
		});
	});
});
