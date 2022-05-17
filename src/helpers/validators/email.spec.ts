import { email } from '.';

describe('email', () => {
	it('Should validate email', () => {
		expect(email('teste@teste.com')).toBeTruthy();
	});

	it('Should validate invalid email', () => {
		expect(email('teste.com')).toBeFalsy;
	});

	it('Should validate null', () => {
		expect(email(null)).toBeFalsy;
	});
});
