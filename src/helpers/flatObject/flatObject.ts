export function flatObject<T = any>(obj: any): Record<string, T> {
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