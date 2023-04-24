import { Module } from 'vuex';

interface ModuleUpdate {
	name: string; // module name, used to find module in store
	replaces: Partial<GenericModule>; // changes to be made
}
type GenericModule = Module<any, any>;
type ModuleKey = keyof GenericModule;

export { ModuleUpdate, GenericModule, ModuleKey };
