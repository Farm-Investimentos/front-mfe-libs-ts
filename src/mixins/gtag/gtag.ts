const gtagMixins = (origin: string) => ({
	methods: {
		tagExportEvent({ page, format }: { page: string; format: string }) {
			(this as any).$gtag.event('export', {
				format,
				page,
				origin,
			});
		},
	},
});

export default gtagMixins;
