/**
 * Extrai o nome do arquivo do header Content-Disposition de uma resposta
 * axios, com fallback quando o header não vem ou não casa com o padrão.
 * Suporta o formato `filename*=UTF-8''...` (RFC 5987) além do `filename="..."`.
 * @module
 * @param {headers} - Headers da resposta HTTP (ex.: response.headers do axios).
 * @param {fallback} - Nome usado quando o header não vem ou não casa com o padrão.
 */
export function fileNameFromHeaders(
	headers: Record<string, any> | undefined,
	fallback: string
): string {
	const disposition = headers?.['content-disposition'] || '';
	const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
	return match ? decodeURIComponent(match[1]) : fallback;
}
