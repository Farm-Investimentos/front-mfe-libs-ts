export type StateType = {
	key: string;
	filters: Record<string, any>;
	showFilters: boolean;
};

export type GettersResponse = {
	filters: any;
	showFilters: any;
} | null;
