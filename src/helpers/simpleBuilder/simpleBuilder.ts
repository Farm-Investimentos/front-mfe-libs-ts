/**
 * Function that receives a list of keys, hoist it, and returns a function that is used
 * to create an object with key/pair values based on the hoisted list
 * @module
 */
export default (defaultKeys: Record<string, any>) =>
	(rawData: Record<string, any>) =>
		Object.fromEntries(
			Object.keys(defaultKeys).map((key) => [
				[defaultKeys[key]],
				rawData[key],
			]),
		);
