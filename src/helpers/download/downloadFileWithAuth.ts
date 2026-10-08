import { downloadBlob } from './downloadBlob';
import { fileNameFromHeaders } from './fileNameFromHeaders';

/**
 * Formato mínimo de client HTTP aceito por downloadFileWithAuth (compatível
 * com uma instância axios). A lib não depende de axios em runtime — quem
 * chama passa o client já configurado do próprio MFE (com o header
 * Authorization injetado via interceptor).
 */
export interface DownloadHttpClient {
	get(url: string, config?: Record<string, any>): Promise<{ data: any; headers?: Record<string, any> }>;
}

export interface DownloadFileWithAuthOptions {
	timeout?: number;
	params?: Record<string, any>;
}

/**
 * Baixa um arquivo autenticado via header Authorization (blob), em vez do
 * padrão antigo de token na URL (`window.open` + `&token=`). Extrai o nome
 * do arquivo do header Content-Disposition e trata erro cujo corpo chega
 * como Blob (comum quando responseType: 'blob' e o backend responde JSON
 * de erro), convertendo de volta para JSON antes de propagar.
 * @module
 * @param {client} - Client HTTP do MFE (instância axios já configurada com Authorization).
 * @param {url} - URL do endpoint de download.
 * @param {fallbackName} - Nome usado quando o backend não informa Content-Disposition.
 * @param {options} - timeout e params opcionais repassados ao client.
 */
export function downloadFileWithAuth(
	client: DownloadHttpClient,
	url: string,
	fallbackName: string,
	options: DownloadFileWithAuthOptions = {}
): Promise<void> {
	return client
		.get(url, {
			responseType: 'blob',
			timeout: options.timeout,
			params: options.params,
		})
		.then(response => {
			const fileName = fileNameFromHeaders(response.headers, fallbackName);
			downloadBlob(response.data, fileName);
		})
		.catch(async (error: any) => {
			const isBlobBody = typeof error?.response?.data?.text === 'function';
			if (isBlobBody) {
				try {
					error.response.data = JSON.parse(await error.response.data.text());
				} catch {
					// corpo do erro nao era JSON, mantem o Blob original
				}
			}
			throw error;
		});
}
