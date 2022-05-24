export default (date: string): string => {
	const dateParts = date.split('/');
	const dateObject = new Date(
		+dateParts[2],
		+dateParts[1] - 1,
		+dateParts[0],
	);
	return dateObject.toISOString();
};
