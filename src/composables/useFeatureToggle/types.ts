export interface FeatureRecord extends Record<string, boolean>{};

export interface FeatureRecordList extends Record<string, boolean | FeatureRecord | FeatureRecordList>{};