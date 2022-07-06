export type LocalStorageWrapperReturn = {
	getItem: (key: string, defaultValue?: string) => any;
	setItem: (key: string, value: string) => boolean;
	clear: () => void;
	clearKey: (key: string) => void;
};
