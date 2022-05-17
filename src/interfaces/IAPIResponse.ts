export interface IAPIResponse<T> {
	data: {
		content: T;
		empty: boolean;
	};
	errors: Array<any>;
}
