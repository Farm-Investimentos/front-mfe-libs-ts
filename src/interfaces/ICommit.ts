export type ICommit = {
	commit: (type: string, payload?: any) => void;
};
