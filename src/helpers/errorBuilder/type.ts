export type ErrorType = {
	type: string;
	code: string;
	message: string;
	httpStatus: string;
};

export type ErrorBuilderOptions = {
	separator?: string;
};
