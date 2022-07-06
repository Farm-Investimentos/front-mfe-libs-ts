export default (
	_item: { response: Record<string, any>; date: Date },
	_date: Date,
	_cacheValidity: number,
) => {
	if (!_item || !_item.response || !_item.date) {
		return false;
	}

	const diffTime = Math.round(
		(_date.getTime() - _item.date.getTime()) / 1000,
	);

	return diffTime < _cacheValidity;
};
