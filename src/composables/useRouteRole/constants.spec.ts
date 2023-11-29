import Vue from 'vue';
import VueRouter from 'vue-router';

import type { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export const moduleName = 'userAccess';

export const loadedCurrentUserRoles = { 'spec.read': 1, 'spec.write': 2 };

export const customEvents = {
	CURRENT_USER_ROLES: new window.CustomEvent('CURRENT_USER_ROLES', {
		detail: {
			message: loadedCurrentUserRoles,
		},
	}),
	CURRENT_USER_INTERNAL: new window.CustomEvent('CURRENT_USER_INTERNAL', {
		detail: {
			message: true,
		},
	}),
};

export const routes = [
	{
		name: 'SpecNoMetaRoute',
		path: '/no-meta',
	},
	{
		name: 'SpecReadRoute',
		path: '/spec/read',
		meta: {
			roleKey: 'spec.read',
		},
	},
	{
		name: 'SpecWriteRoute',
		path: '/spec/write',
		meta: {
			roleKey: 'spec.write',
		},
	},
] as RouteConfig[];

export const router = new VueRouter({
	routes,
});
