export interface ICommit {
	commit: (type: string, payload?: any) => void;
}
