import { ModuleTree, Store } from 'vuex';
import { ModuleUpdate, GenericModule, ModuleKey } from './types';

const getChanges = (
	module: GenericModule,
	replaces: ModuleUpdate['replaces'],
) => {
	return Object.entries(replaces).reduce((accumulator, [key, value]) => {
		const mergedModule: GenericModule = {
			...module[key as ModuleKey],
			...value,
		};

		accumulator[key as ModuleKey] = mergedModule;

		return accumulator;
	}, <GenericModule>{});
};

/**
 * [USE ONLY IN TESTS]
 * Update one or more vuex modules using "hotUpdate" method to be possible mutate anything on store when testing
 * @module
 * @param {Store} store - store to be mutated
 * @param {ModuleUpdate[]} updates - a list of n updates to be performed into described modules
 */
export default (store: Store<any>, ...updates: ModuleUpdate[]) => {
	if (!updates.length) {
		return store;
	}

	// @ts-expect-error
	const registedModules = store._modules.root._children;

	const modules = updates.reduce((accumulator, update) => {
		if (!store.hasModule(update.name)) {
			throw new ReferenceError(
				`Module ${update.name} doesn't exist in this store`,
			);
		}

		const registeredModule: GenericModule =
			registedModules[update.name]._rawModule;

		const changes = getChanges(registeredModule, update.replaces);

		const module: GenericModule = {
			...registeredModule,
			...changes,
		};

		accumulator[update.name] = module;

		return accumulator;
	}, <ModuleTree<any>>{});

	store.hotUpdate({ modules });

	return modules;
};
