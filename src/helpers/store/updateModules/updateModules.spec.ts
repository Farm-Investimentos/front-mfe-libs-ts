import Vue from 'vue';
import Vuex, { GetterTree, ModuleTree, Store } from 'vuex';
import updateModules from './updateModules';

Vue.use(Vuex);

type genericStateType = typeof genericState;

const genericState = {
	count: 1,
};

const mutations = {
	INCREMENT_COUNT(state: genericStateType) {
		state.count++;
	},
};

const getters: GetterTree<genericStateType, any> = {
	multipliedBy2: (state) => state.count * 2,
	multipliedBy5: (state) => state.count * 5,
	multipliedBy10: (state) => state.count * 10,
};

const root = {
	state: genericState,
	mutations,
};

const getModules = (): ModuleTree<genericStateType> => {
	return {
		operations: {
			namespaced: true,
			state: genericState,
			getters,
		},
		wallet: {
			namespaced: true,
			state: genericState,
			getters,
		},
	};
};

describe('updateModules', () => {
	let store: Store<genericStateType>;
	beforeEach(() => {
		const modules = getModules();

		store = new Vuex.Store({
			...root,
			modules,
		});
	});

	describe('updates', () => {
		it('should add a new getter in a single module', () => {
			const name = 'operations';

			const updates = [
				{
					name,
					replaces: {
						getters: {
							multiplyBy100: (state: genericStateType) =>
								state.count * 100,
						},
					},
				},
			];

			expect(store.getters).not.toHaveProperty(`${name}/multiplyBy100`);

			updateModules(store, ...updates);

			expect(store.getters).toHaveProperty(`${name}/multiplyBy100`);
			expect(store.getters[`${name}/multiplyBy100`]).toEqual(
				genericState.count * 100,
			);
		});

		it('should add new getters to multiple modules', () => {
			const operationsModuleName = 'operations';
			const walletModuleName = 'wallet';

			const multipliedBy100Getter = {
				name: 'multipliedBy100',
				fn: jest.fn((state: genericStateType) => state.count * 100),
			};

			const multipliedBy200Getter = {
				name: 'multipliedBy200',
				fn: jest.fn((state: genericStateType) => state.count * 200),
			};

			const operationsGetterAccess = `${operationsModuleName}/${multipliedBy100Getter.name}`;
			const walletGetterAccess = `${walletModuleName}/${multipliedBy200Getter.name}`;

			const updates = [
				{
					name: operationsModuleName,
					replaces: {
						getters: {
							[multipliedBy100Getter.name]:
								multipliedBy100Getter.fn,
						},
					},
				},
				{
					name: walletModuleName,
					replaces: {
						getters: {
							[multipliedBy200Getter.name]:
								multipliedBy200Getter.fn,
						},
					},
				},
			];

			expect(store.getters).not.toHaveProperty(operationsGetterAccess);
			expect(store.getters).not.toHaveProperty(walletGetterAccess);

			updateModules(store, ...updates);

			expect(store.getters).toHaveProperty(operationsGetterAccess);
			expect(store.getters).toHaveProperty(walletGetterAccess);

			expect(store.getters[operationsGetterAccess]).toEqual(100);

			expect(store.getters[walletGetterAccess]).toEqual(200);
		});
	});

	describe('failures', () => {
		it('should throw error if module doesnt exist', () => {
			const update = {
				name: 'wrongName',
				replaces: {
					getters: {
						a: () => {},
					},
				},
			};

			expect(store.getters.a).not.toBeDefined();

			expect(() => updateModules(store, update)).toThrow(ReferenceError);
		});
	});
});
