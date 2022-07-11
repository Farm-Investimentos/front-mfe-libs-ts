/* eslint no-restricted-syntax: "error" */
/* eslint no-prototype-builtins: "error" */

export function flatObject(obj: any) {
	let flatObj: any = {};
	let path: Array<any> = [];

	function dig(objDig: any) {
		if (objDig !== Object(objDig)) {
			return (flatObj[path.join('.')] = objDig);
		}

		for (const key in objDig) {
			if (Object.prototype.hasOwnProperty.call(objDig, key)) {
				path.push(key);
				dig(objDig[key]);
				path.pop();
			}
		}
	}

	dig(obj);
	return flatObj;
}

export default (_vue: any, client: any) => {
	let flatFeaturesRules: any = {};
	_vue.mixin({
		methods: {
			async loadFeatures(name: any) {
				const { data } = await client.get(`/features/${name}.json`);
				flatFeaturesRules = flatObject(data);
			},
			isFeatureEnabled(key: string) {
				if (!key) {
					return true;
				}
				return flatFeaturesRules[key] || false;
			},
		},
	});
};
