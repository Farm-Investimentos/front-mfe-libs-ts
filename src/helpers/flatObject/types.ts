export interface FlattenedRecord<T> extends Record<string, T>{};

export interface FlattenedRecordList<T> extends Record<string, T | FlattenedRecord<T> | FlattenedRecordList<T>>{};