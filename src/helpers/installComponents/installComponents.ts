/**
 * Install components in Vue instance
 * @module
 * @param {Vue} - the Vue instance
 * @param {components} - components's list
 */

import htmlTags from '../../consts/htmlTags';

export default (Vue: any, components: Record<string, any>): void => {
	Object.keys(components).forEach((key) => {
		const component = components[key];
		if (component.extendOptions && component.extendOptions.name) {
			Vue.component(component.extendOptions.name, component);
		}
		if (component?.name?.indexOf('farm-') === 0) {
			Vue.component(component.name, component);
		}
		if (!htmlTags.includes(key.toLowerCase()))
			Vue.component(key, component);
	});
};
