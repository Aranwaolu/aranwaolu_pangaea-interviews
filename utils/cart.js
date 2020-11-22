export const getCart = () => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')

	const currency = cart[0]
	let cartTotal = 0

	if (cart.length > 1) {
		const cartItems = [...cart]

		cartItems.splice(0, 1)
		cartItems.forEach((obj) => {
			cartTotal += obj.price * obj.quantity
		})

		return {
			currency,
			cartItems,
			cartTotal,
		}
	} else {
		return { currency, cartItems: [], cartTotal }
	}
}

export const addItemToCart = (cartItemToAdd, quantity, currency = 'USD') => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')

	if (cart.length == 0) {
		cart.push(currency)
	} else if (cart[0] && cart[0] !== currency) {
		cart.splice(0, 1, currency) // this doesn't care if the price value is different
	}

	let existingCartItem = cart.some((cartItem) => cartItem.id === cartItemToAdd.id)

	if (existingCartItem) {
		let cartItem = cart.find((cartItem) => cartItem.id === cartItemToAdd.id)
		if (cartItem.quantity >= 10) {
			cartItem.quantity = cartItem.quantity
		} else {
			cartItem.quantity += 1
		}
	} else {
		cart = [...cart, { ...cartItemToAdd, quantity: 1 }]
	}

	localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (item) => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let existingCartItem = cart.some((cartItem) => cartItem.id === item.id)

	if (existingCartItem) {
		let index = cart.findIndex((cartItem) => cartItem.id === item.id)
		cart.splice(index, 1)
		localStorage.setItem('cart', JSON.stringify(cart))
	}
}

export const removeOneQuantityOfItem = (item) => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let existingCartItem = cart.some((cartItem) => cartItem.id === item.id)

	if (existingCartItem) {
		let cartItem = cart.find((cartItem) => cartItem.id === item.id)
		cartItem.quantity -= 1
	}
	localStorage.setItem('cart', JSON.stringify(cart))
}

export const decreaseQuantity = (item) => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let existingCartItem = cart.some((cartItem) => cartItem.id === item.id)

	if (existingCartItem) {
		let cartItem = cart.find((cartItem) => cartItem.id === item.id)

		if (cartItem.quantity > 0) {
			cartItem.quantity -= 1
		} else {
			cartItem.quantity = 0
		}
	}
	localStorage.setItem('cart', JSON.stringify(cart))
}

export const increaseQuantity = (item) => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let existingCartItem = cart.some((cartItem) => cartItem.id === item.id)

	if (existingCartItem) {
		let cartItem = cart.find((cartItem) => cartItem.id === item.id)

		if (cartItem.quantity >= 10) {
			cartItem.quantity = cartItem.quantity
		} else {
			cartItem.quantity += 1
		}
	}
	localStorage.setItem('cart', JSON.stringify(cart))
}

export const getQuantityOfOneItem = () => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let existingCartItem = cart.some((cartItem) => cartItem.id === item.id)

	if (existingCartItem) {
		let cartItem = cart.find((cartItem) => cartItem.id === item.id)
		return cartItem.quantity
	}
}

export const updateCart = (currencySelected, newProductsData) => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')

	// Check that the cart is not empty
	if (cart.length > 1) {
		console.log(cart)
		if (cart[0] !== currencySelected) {
			cart[0] = currencySelected
		}

		let newProducts = newProductsData.products // new full array

		let cartItems = [...cart]
		cartItems.splice(0, 1)

		// Update the cart
		cartItems.forEach((objOldCart) => {
			let id = objOldCart.id

			// using the above id, find object in new full array with the same id
			let newObj = newProducts.find((obj) => {
				return obj.id === id
			})

			objOldCart.price = newObj.price
		})

		const newCart = [cart[0], ...cartItems]

		localStorage.setItem('cart', JSON.stringify(newCart))
	}
}
