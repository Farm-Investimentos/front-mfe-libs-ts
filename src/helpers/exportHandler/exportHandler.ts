/**
 * @deprecated Existia para dar tempo do `downloadFileHandler` abrir a nova aba antes de
 * seguir o fluxo. Sem sentido com `downloadFileWithAuth` (helpers/download), que baixa o
 * blob na mesma aba e já retorna uma Promise que resolve/rejeita de acordo com a request real.
 */
export default async (callback: Function) => {
	const customEvent = new CustomEvent('SUCCESS', {
		detail: {
			message: {
				message: 'O download do arquivo iniciará em uma nova aba.',
				title: 'Aviso',
			},
		},
	});
	window.dispatchEvent(customEvent);

	setTimeout(() => {
		callback();
	}, 2900);
};
