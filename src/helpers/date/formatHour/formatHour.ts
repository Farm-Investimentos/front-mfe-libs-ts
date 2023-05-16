const format = new Intl.DateTimeFormat('pt-BR', {
	hour: 'numeric',
	minute: 'numeric',
});

function formatHour(date: string | null): string {
	if (!date) {
		return '';
	}

	return format.format(new Date(date));
}

export default formatHour;
