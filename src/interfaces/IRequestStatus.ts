export enum StatusEnum {
	START = 'START',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	IDLE = 'IDLE',
}

export interface IRequestStatus {
	type: StatusEnum;
	result: any;
	message: string;
}
