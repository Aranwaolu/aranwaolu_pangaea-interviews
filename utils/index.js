export const convertToArrayOfObjects = (array) => {
	const newArrayOfObjects = []

	array.forEach((element) => {
		const obj = { label: element, value: element }
		newArrayOfObjects.push(obj)
	})

	return newArrayOfObjects
}

export const checkCurrency = (array, currency) => {
	console.log(array[0], currency)
	return array[0] == currency
}
