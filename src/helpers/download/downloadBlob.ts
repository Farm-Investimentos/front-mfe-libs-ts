/**
 * Baixa um arquivo a partir de um blob (ex.: response.data de uma request
 * axios com responseType: 'blob').
 * @module
 * @param {blobData} - Os dados do arquivo em formato blob.
 * @param {fileName} - O nome que o arquivo terá ao ser baixado.
 */
export function downloadBlob(blobData: Blob, fileName: string): void {
	const downloadUrl = window.URL.createObjectURL(blobData);
	const link = document.createElement('a');
	link.href = downloadUrl;
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(downloadUrl);
}
