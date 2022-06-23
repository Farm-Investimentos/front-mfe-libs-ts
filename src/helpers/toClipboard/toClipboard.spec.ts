/**
 * @jest-environment jsdom
 */
import toClipboard from '.';

const writeTextMock = jest.fn();
const queryMock = jest.fn();
Object.assign(navigator, {
	clipboard: {
		writeText: writeTextMock,
	},
	permissions: {
		query: queryMock,
	},
});

describe('toClipboard', () => {
	it('Should return a promise', async () => {
		queryMock.mockResolvedValue({
			result: {
				state: 'granted',
			},
		});
		writeTextMock.mockResolvedValue(Promise.resolve());
		const m = toClipboard('message');
		expect(m).toBeInstanceOf(Promise);
	});
});
