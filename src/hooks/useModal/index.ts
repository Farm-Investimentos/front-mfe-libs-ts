export default function (
	props: any,
	vueFunctions: { emit: Function; computed: Function },
) {
	const inputVal = vueFunctions.computed({
		get() {
			return props.modelValue;
		},
		set(val: any) {
			vueFunctions.emit('update:modelValue', val);
		},
	});

	const close = () => (inputVal.value = false);

	return { inputVal, close };
}
