import type { FlattenedRecord, FlattenedRecordList } from "./types";

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
export function flatObject<T = unknown>(obj: FlattenedRecord<T>): FlattenedRecordList<T> {
	let flatObj: FlattenedRecordList<T> = {};
	let path: string[] = [];

	function recursiveFlattening(recordToFlatten: T | FlattenedRecordList<T>) {
		if (recordToFlatten !== Object(recordToFlatten)) {
			return (flatObj[path.join('.')] = recordToFlatten);
		}

		for (const key in recordToFlatten as FlattenedRecordList<T>) {
			if (key in (recordToFlatten as FlattenedRecordList<T>)) {
				path.push(key);
				recursiveFlattening((recordToFlatten as FlattenedRecordList<T>)[key]);
				path.pop();
			}
		}
	}

	recursiveFlattening(obj);
	return flatObj;
}