/**
 * @jest-environment jsdom
 */
import { downloadBlob } from './downloadBlob';

describe('downloadBlob', () => {
	const originalCreateObjectURL = window.URL.createObjectURL;
	const originalRevokeObjectURL = window.URL.revokeObjectURL;

	beforeEach(() => {
		window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
		window.URL.revokeObjectURL = jest.fn();
	});

	afterEach(() => {
		window.URL.createObjectURL = originalCreateObjectURL;
		window.URL.revokeObjectURL = originalRevokeObjectURL;
		jest.clearAllMocks();
	});

	it('cria um link, dispara o clique e revoga a URL do blob', () => {
		const blob = new Blob(['conteudo']);
		const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation();

		downloadBlob(blob, 'arquivo.xlsx');

		expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
		expect(clickSpy).toHaveBeenCalled();
		expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');

		clickSpy.mockRestore();
	});
});
