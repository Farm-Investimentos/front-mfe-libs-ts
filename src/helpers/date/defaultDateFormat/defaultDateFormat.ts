/**
 * Transforms an ISO Date to DD/MM/YYYY
 *
 * @module
 * @param {date} - the data (blob)
 * @param {name} - name from the generated file
 * @return {String} formatted date
 */
export default (date: string): string | null => {
	const options = {
		timeZone: 'UTC',
	};
	return date ? new Date(date).toLocaleDateString('pt-BR', options) : null;
};
