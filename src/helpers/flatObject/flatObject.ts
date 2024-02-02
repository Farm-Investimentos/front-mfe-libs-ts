import type { FlattenedRecordList, RecordListToFlatten, RecordToFlatten } from "./types";

/**
 * Flatten an object joining nested keys into string.
 * 
 * @example
 * ```js
 * const input = {
 * 	key: {
 * 		nestedKey: true
 * 	},
 * 	secondKey: {
 * 		nestedKey: {
 * 			deepNestedKey: 123
 * 		}
 * 	}
 * }
 * 
 * const output = flatObject(input)
 * 
 * // output:
 * {
 * 	'key.nestedKey': true
 * 	'secondKey.nestedKey.deepNestedKey': 123
 * }
 * ```
 */
export function flatObject<T = unknown>(obj: RecordListToFlatten<T>): FlattenedRecordList<T> {
	let flatObj: FlattenedRecordList<T> = {};
	let path: string[] = [];

	function recursiveFlattening(recordToFlatten: RecordToFlatten<T>) {
		const isARecordListToFlatten = (value: RecordToFlatten<T>): value is RecordListToFlatten<T> => value === Object(value)

		if (!isARecordListToFlatten(recordToFlatten)) {
			return (flatObj[path.join('.')] = recordToFlatten);
		}

		for (const key in recordToFlatten) {
			if (key in recordToFlatten) {
				path.push(key);
				recursiveFlattening(recordToFlatten[key]);
				path.pop();
			}
		}
	}

	recursiveFlattening(obj);
	return flatObj;
}