/**
 * @deprecated Mesmo motivo do helpers/exportHandler: existia só para dar tempo do
 * downloadFileHandler abrir a nova aba. Use downloadFileWithAuth (helpers/download)
 * diretamente no service do MFE; não precisa de aviso nem delay artificial.
 */
const exportHandler = {
	methods: {
		async exportHandler(callback: Function) {

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
		},
	},
};

export default exportHandler;
