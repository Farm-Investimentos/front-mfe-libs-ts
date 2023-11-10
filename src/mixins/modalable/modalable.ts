const modalableMixin = {
	props: {
		value: {
			required: true,
		},
		modelValue: {
			required: true,
		},
	},
	computed: {
		inputVal: {
			get() {
				return (this as any).value;
			},
			set(val: any) {
				(this as any).$emit('input', val);
				(this as any).$emit('update:modelValue', val);
			},
		},
	},
	methods: {
		close() {
			(this as any).inputVal = false;
		},
	},
};

export default modalableMixin;
