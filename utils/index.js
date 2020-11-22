export const convertToArrayOfObjects = (array) => {
	const newArrayOfObjects = []

	array.forEach((element) => {
		const obj = { label: element, value: element }
		newArrayOfObjects.push(obj)
	})

	return newArrayOfObjects
}

export const checkCurrency = (currencyInCart, currencyNewSelect) => {
	console.log(currencyInCart, currencyNewSelect)
	return currencyInCart == currencyNewSelect
}
