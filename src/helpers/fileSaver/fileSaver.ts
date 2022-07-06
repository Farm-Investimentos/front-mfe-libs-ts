/**
 * FileSaver used to generate file from blob
 * and download it
 * @module
 * @param {data} - the data (blob)
 * @param {type} - content-type
 * @param {name} - name from the generated file
 */

const fileSaver =
	(windowWrapper: Window & typeof globalThis) =>
	(data: any, type?: string, name?: string): HTMLAnchorElement => {
		const blob = new Blob([data], { type });
		const link = windowWrapper.document.createElement('a');
		link.href = windowWrapper.URL.createObjectURL
			? windowWrapper.URL.createObjectURL(blob)
			: '';
		link.download = name || '';
		link.click();
		return link;
	};

export default fileSaver(window);
