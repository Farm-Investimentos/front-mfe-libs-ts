import defaultDateFormat from '../defaultDateFormat/defaultDateFormat';

export default (
	range: Array<string>,
	field: string,
	obj: Record<string, any>,
	sufixes = ['', '_fim'],
): Record<string, any> | undefined => {
	if (!range || range.length < 1) {
		delete obj.filters[field + sufixes[0]];
		delete obj.filters[field + sufixes[1]];
		return;
	}

	obj.filters[field + sufixes[0]] = range[0];

	if (range.length > 1) {
		obj.filters[field + sufixes[1]] = range[1];
	}

	if (range.length > 1 && range[1] !== range[0]) {
		obj.filters[field + sufixes[1]] = range[1];

		const reverse = new Date(range[0]) > new Date(range[1]);
		if (reverse) {
			const proxy = obj.filters[field + sufixes[1]];
			obj.filters[field + sufixes[1]] = obj.filters[field + sufixes[0]];
			obj.filters[field + sufixes[0]] = proxy;
		}
		obj[field + 'Range'] =
			defaultDateFormat(obj.filters[field + sufixes[0]]) +
			' a ' +
			defaultDateFormat(obj.filters[field + sufixes[1]]);
	} else {
		obj[field + 'Range'] = defaultDateFormat(obj.filters[field]);
	}
	return obj[field + 'Range'];
};
