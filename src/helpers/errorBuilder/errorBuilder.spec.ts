import errorBuilder from '.';

describe('ErrorBuilder', () => {
	it('Should return error for timeout/abort', () => {
		const r = errorBuilder({
			code: 'ECONNABORTED',
		});
		expect(r.code).toEqual('ECONNABORTED');
		expect(r.message).toEqual('timeout');
	});

	it('Should return error', () => {
		const r = errorBuilder({
			response: {
				status: 401,
			},
		});
		expect(r.httpStatus).toEqual(401);
	});

	it('Should return error', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					data: 'some error',
				},
			},
		});
		expect(r.message).toEqual('some error');
	});

	it('Should return complex error ', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					data: { message: 'some error' },
				},
			},
		});
		expect(r.message).toEqual('some error');
	});

	it('Should return error for array', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors: ['some error', 'some error'],
				},
			},
		});
		expect(r.message).toEqual('some error. some error');
	});

	it('Should return error for array in message', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					message: ['a', 'b'],
				},
			},
		});
		expect(r.message).toEqual('a. b');
	});

	it('Should return error for single array', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors: ['some error'],
				},
			},
		});
		expect(r.message).toEqual('some error');
	});

	it('Should return default message for empty array value', () => {
		const errors = ['some error', '', 'dasdas'];

		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors,
				},
			},
		});
		expect(r.message).toEqual('some error. Erro inesperado. dasdas');
	});

	it('Should return error for multiple array length', () => {
		const errors = ['some error', 'dasdas'];

		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors,
				},
			},
		});
		expect(r.message).toEqual(errors.join('. '));
	});

	it('Should return error for multiple array length with object', () => {
		const errors = [
			{ defaultMessage: 'some error' },
			{ defaultMessage: 'dasdas' },
		];

		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors,
				},
			},
		});
		expect(r.message).toEqual(
			errors.map((v) => v.defaultMessage).join('. '),
		);
	});

	it('Should separate by a different character when options are used', () => {
		const options = {
			separator: ', ',
		};

		const errors = ['some error', 'dasdas'];

		const r = errorBuilder(
			{
				response: {
					status: 401,
					data: {
						errors,
					},
				},
			},
			options,
		);
		expect(r.message).toEqual(errors.join(options.separator));
	});

	it('Should remove html markup', () => {
		const r = errorBuilder({
			response: {
				status: 401,
				data: {
					errors: ['some error <strong>with html</strong>'],
				},
			},
		});
		expect(r.message).toEqual('some error with html');
	});
});
