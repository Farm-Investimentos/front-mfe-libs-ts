import { IPageableAPIResponse } from '../../../interfaces/IPageableAPIResponse';

/**
 * Retrieves the first item from an array, iside the default repsonse structure
 * @module
 */
export default (data: Pick<IPageableAPIResponse<Array<any> | any>, 'data'>) => {
	if (data.data.content.length > 0) return data.data.content[0];
	return null;
};
