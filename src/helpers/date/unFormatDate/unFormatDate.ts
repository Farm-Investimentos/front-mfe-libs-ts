export default (date: string): string | null => {
	if (!date) return null;

	const [day, month, year] = date.split('/');
	return `${year}-${month}-${day}`;
};
