/**
 * Open a new page & download selected file
 * @module
 * @param {string} url - url to download file
 * @returns {Promise} - open a new page to download selected file & return a modal warning that a file is being downloaded
 */

export default (url: string): Promise<unknown> => {
	const token = window.localStorage.getItem('Token');
	const href = `${url}&token=${token}`;
	window.open(href, '_blank');

	return new Promise((resolve) => {

		resolve({
			data: {
				content: 'Download do arquivo foi iniciado na aba aberta',
				status: 200,
			},
		});

	});
};
