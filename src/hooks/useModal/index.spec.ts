import useModal from './';
describe('useModal', () => {
	it('should set inputVal to false when close is called', () => {
		const props = {
			modelValue: 'initialValue',
		};

		const emitMock = jest.fn();
		const computedMock = () => ({
			get: () => props.modelValue,
			set: (val: any) => {
				emitMock('update:modelValue', val);
			},
		});

		const vueFunctionsMock = {
			emit: emitMock,
			computed: computedMock,
		};

		const { inputVal, close } = useModal(props, vueFunctionsMock);

		// Call close function
		close();

		// Check if inputVal is set to false
		expect(inputVal.value).toBe(false);
	});
});
