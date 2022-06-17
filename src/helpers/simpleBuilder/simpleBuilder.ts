/**
 * Function that receives a list of keys, hoist it, and returns a function that is used
 * to create an object with key/pair values based on the hoisted list
 * @module
 */
export default (defaultKeys: any) => (rawData: any) =>
	Object.fromEntries(
		Object.keys(defaultKeys).map((key) => [
			[defaultKeys[key]],
			rawData[key],
		]),
	);
