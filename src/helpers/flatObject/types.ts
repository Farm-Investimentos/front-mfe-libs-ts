export interface FlattenedRecordList<T> extends Record<string, T>{};

export interface RecordListToFlatten<T> extends Record<string, T | FlattenedRecordList<T> | RecordListToFlatten<T>>{};

export type RecordToFlatten<T> = T | RecordListToFlatten<T>;