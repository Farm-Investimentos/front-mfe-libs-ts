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
	const extendedMatch = disposition.match(/filename\*=(?:UTF-8'')?"?([^";]+)"?/i);
	const simpleMatch = disposition.match(/filename=(?:UTF-8'')?"?([^";]+)"?/i);

	if (extendedMatch) {
		try {
			return decodeURIComponent(extendedMatch[1]);
		} catch {
			return simpleMatch ? simpleMatch[1] : fallback;
		}
	}

	return simpleMatch ? simpleMatch[1] : fallback;
}
