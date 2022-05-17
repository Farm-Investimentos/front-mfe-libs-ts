import { IAPIResponse } from './IAPIResponse';

export interface IPageableAPIResponse<T> extends IAPIResponse<T> {
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	totalElements: number;
	totalPages: number;
}
