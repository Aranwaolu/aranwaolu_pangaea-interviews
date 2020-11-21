// // might have to rename components to uppercase
// // Using localStorage to persist data

// will be called on the button or + sign click

export const addItemToCart = (cartItemToAdd, quantity) => {
	let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

	let existingCartItem = cartItems.some((cartItem) => cartItem.id === cartItemToAdd.id)

	if (existingCartItem) {
		let cartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id)
		cartItem.quantity += 1
	} else {
		cartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }]
	}

	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

// export const addItemToCart = (cartItems, cartItemToAdd) => {
//     const itemExistInCart = cartItems.find(
//         cartItem => cartItem.id === cartItemToAdd.id
//     );

//     if (itemExistInCart) {
//         return cartItems.map(cartItem =>
//             cartItem.id === cartItemToAdd.id ? {…cartItem, quantity: cartItem.quantity + 1
//             } : cartItem
//         );
//     }
//     return […cartItems,
//       {…cartItemToAdd, quantity: 1}
//     ];
// };

// if (existingCartItem) {
// 	cartItems.find(cartItem =>
// 		cartItem.id === cartItemToAdd.id
// 			? [...cartItems, { ...cartItem, quantity: cartItem.quantity + 1 }]
// 			: [...cartItems]
// 	)
// } else {
// 	cartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }]
// }
