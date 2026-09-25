/**
 * @jest-environment jsdom
 */
import { downloadFileWithAuth } from './downloadFileWithAuth';

/**
 * jsdom (ambiente de teste) não implementa Blob.prototype.text(), disponível em
 * navegadores reais desde 2020. Simula o contrato que downloadFileWithAuth espera
 * de um corpo de erro em blob, sem depender da API real de Blob.
 */
function fakeBlobBody(content: string) {
	return { text: () => Promise.resolve(content) };
}

describe('downloadFileWithAuth', () => {
	const originalCreateObjectURL = window.URL.createObjectURL;
	const originalRevokeObjectURL = window.URL.revokeObjectURL;

	beforeEach(() => {
		window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
		window.URL.revokeObjectURL = jest.fn();
		jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation();
	});

	afterEach(() => {
		window.URL.createObjectURL = originalCreateObjectURL;
		window.URL.revokeObjectURL = originalRevokeObjectURL;
		jest.restoreAllMocks();
	});

	it('busca o blob com responseType e dispara o download com o nome do Content-Disposition', async () => {
		const blob = new Blob(['conteudo']);
		const client = {
			get: jest.fn().mockResolvedValue({
				data: blob,
				headers: { 'content-disposition': 'attachment; filename="relatorio.xlsx"' },
			}),
		};

		await downloadFileWithAuth(client, '/v1/export', 'fallback.xlsx', { timeout: 60000 });

		expect(client.get).toHaveBeenCalledWith('/v1/export', {
			responseType: 'blob',
			timeout: 60000,
			params: undefined,
		});
		expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
	});

	it('usa o fallbackName quando o backend não informa Content-Disposition', async () => {
		const client = {
			get: jest.fn().mockResolvedValue({ data: new Blob(['x']), headers: {} }),
		};

		const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click');

		await downloadFileWithAuth(client, '/v1/export', 'fallback.xlsx');

		expect(clickSpy).toHaveBeenCalled();
	});

	it('converte o corpo do erro de Blob para JSON antes de propagar', async () => {
		const errorBody = fakeBlobBody(JSON.stringify({ message: 'Falha ao gerar arquivo' }));
		const error: any = { response: { status: 400, data: errorBody } };
		const client = { get: jest.fn().mockRejectedValue(error) };

		let caught: any;
		try {
			await downloadFileWithAuth(client, '/v1/export', 'fallback.xlsx');
		} catch (e) {
			caught = e;
		}

		expect(caught).toBe(error);
		expect(caught.response.data.message).toBe('Falha ao gerar arquivo');
	});

	it('mantem o corpo original quando o erro nao e JSON valido', async () => {
		const errorBody = fakeBlobBody('nao e json');
		const error: any = { response: { status: 500, data: errorBody } };
		const client = { get: jest.fn().mockRejectedValue(error) };

		let caught: any;
		try {
			await downloadFileWithAuth(client, '/v1/export', 'fallback.xlsx');
		} catch (e) {
			caught = e;
		}

		expect(caught).toBe(error);
		expect(caught.response.data).toBe(errorBody);
	});

	it('propaga o erro normalmente quando nao ha corpo em Blob', async () => {
		const error = new Error('timeout');
		const client = { get: jest.fn().mockRejectedValue(error) };

		let caught: any;
		try {
			await downloadFileWithAuth(client, '/v1/export', 'fallback.xlsx');
		} catch (e) {
			caught = e;
		}

		expect(caught).toBe(error);
	});
});
