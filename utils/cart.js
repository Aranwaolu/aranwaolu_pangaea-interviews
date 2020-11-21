export const getCart = (full) => {
	if (full == 'Yes') {
		return JSON.parse(localStorage.getItem('cart'))
	} else {
		let cart = JSON.parse(localStorage.getItem('cart') || '[]')

		const cartTotal = totalCart()

		if (cart.length > 1) {
			cart.splice(0, 1)

			return {
				cart,
				cartTotal,
			}
		} else {
			return { cart: [], cartTotal }
		}
	}
}

export const addItemToCart = (cartItemToAdd, quantity, currency = 'USD') => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')

	if (cart.length == 0) {
		cart.push(currency)
	} else if (cart[0] && cart[0] !== currency) {
		cart.splice(0, 0, currency)
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

export const removeFromCart = (item, quantity) => {
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
	// include changing the physical value on the screen maybe?? or fetch it???
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

const updateCart = (currencySelected, newProductsData) => {
	/// thisssss!!!!
	// gets the cart from local storage
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')

	if (cart[0] !== currencySelected) {
		cart[0] = currencySelected
	}

	// now, compare and update
	let newProducts = newProductsData.newProducts

	// update the cart
	// return the cart to local storage and also for display?? or after that re-render??
}

export const totalCart = () => {
	let cart = JSON.parse(localStorage.getItem('cart') || '[]')
	let currency = cart[0]

	let total = 0
	if (cart.length > 1) {
		cart.splice(0, 1)
		cart.forEach((obj) => {
			total += obj.price * obj.quantity
		})

		return {
			currency,
			totalPrice: total,
		}
	} else {
		return {
			currency,
			totalPrice: total,
		}
	}
}
