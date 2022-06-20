/**
 * Install components in Vue instance
 * @module
 * @param {Vue} - the Vue instance
 * @param {components} - components's list
 */

export default (Vue: any, components: any) => {
	Object.keys(components).forEach((key) => {
		const component = components[key];
		if (component.extendOptions && component.extendOptions.name) {
			Vue.component(component.extendOptions.name, component);
		}
		Vue.component(key, component);
	});
};
