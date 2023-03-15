export default function (str: string | null) {
	if (str === null || str === '') return false;
	else str = str.toString();

	// Regular expression to identify HTML tags in
	// the input string. Replacing the identified
	// HTML tag with a null string.
	return str.replace(/(<([^>]+)>)/gi, '');
}
