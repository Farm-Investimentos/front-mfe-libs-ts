/**
 * Creates an query string based on an object and a list of keys used to transform the parameter
 * name into a parameter expected by the API
 * @module
 * @param {any} filters - filters selected to add like querystring at URL
 * @param {any} mappings - especific filter update
 */
export default (filters: any, mappings: any) =>
	Object.keys(filters)
		.filter(
			(key) =>
				filters[key] !== '' &&
				filters[key] !== null &&
				filters[key] !== undefined,
		)
		.map(
			(key) => (mappings[key] ? mappings[key] : key) + '=' + filters[key],
		)
		.join('&');
