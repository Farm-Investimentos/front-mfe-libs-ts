import { fileNameFromHeaders } from './fileNameFromHeaders';

describe('fileNameFromHeaders', () => {
	it('extrai o nome do arquivo do formato filename="..."', () => {
		const headers = { 'content-disposition': 'attachment; filename="relatorio.xlsx"' };

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('relatorio.xlsx');
	});

	it('extrai o nome do arquivo do formato RFC 5987 filename*=UTF-8\'\'...', () => {
		const headers = {
			'content-disposition': "attachment; filename*=UTF-8''relat%C3%B3rio.xlsx",
		};

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('relatório.xlsx');
	});

	it('retorna o fallback quando o header não vem', () => {
		expect(fileNameFromHeaders(undefined, 'fallback.xlsx')).toBe('fallback.xlsx');
	});

	it('retorna o fallback quando o header não casa com o padrão esperado', () => {
		const headers = { 'content-disposition': 'inline' };

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('fallback.xlsx');
	});

	it('prioriza filename* quando filename e filename* estão presentes', () => {
		const headers = {
			'content-disposition':
				'attachment; filename="relatorio.xlsx"; filename*=UTF-8\'\'relat%C3%B3rio.xlsx',
		};

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('relatório.xlsx');
	});

	it('usa filename literal, sem decodificar, quando só filename está presente', () => {
		const headers = { 'content-disposition': 'attachment; filename="relatorio-100%.xlsx"' };

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('relatorio-100%.xlsx');
	});

	it('cai pra filename quando filename* tem codificação inválida', () => {
		const headers = {
			'content-disposition':
				'attachment; filename="relatorio.xlsx"; filename*=UTF-8\'\'relat%rio.xlsx',
		};

		expect(fileNameFromHeaders(headers, 'fallback.xlsx')).toBe('relatorio.xlsx');
	});
});
