import { gql, useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { ALL_CURRENCIES_QUERY, ALL_PRODUCTS_QUERY, ALL_PRODUCTS_QUERY_2 } from '../gql/index'
import { getCart, removeFromCart, updateCart } from '../utils/cart'

import CurrencyDropDown from '../components/currency'
import { convertToArrayOfObjects, checkCurrency } from '../utils/index'

import Cart, { EmptyCart } from '../components/cart'
import styled from 'styled-components'
// import Product from '../components/product'

const Wrapper = styled.div`
	z-index: 10;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	// background-color: rgba(219, 219, 217, 0.3);
`

const Modal = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	padding: 30px;
	background-color: #f2f2ef;
	height: 100vh;
	z-index: 20;
	justify-content: flex-end;
	align-items: space-between;
	position: fixed;
	overflow-x: hidden;
	overflow-y: auto;
	top: 0;
	right: 0;

	@media only screen and (max-width: 768px) {
		width: 80%;
	}
`

const CloseButton = styled.button`
	font-size: 16px;
	font-weight: 500;
	color: grey;
	border: 1px solid grey;
	border-radius: 15px;
	margin: 20px 0px;

	&:focus,
	&:hover {
		cursor: pointer;
	}
`

const TopRow = styled.div`
	font-size: 16px;
	font-weight: 500;
	color: grey;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const PriceTag = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: 20px;
	font-weight: 500;
	margin: 30px 0px;
	border-top: 2px solid grey;
`

const CartList = ({ isShown, hide }) => {
	const [cart, setcart] = useState([])

	const [selectedCurrency, setselectedCurrency] = useState([])
	const { loading: currencyLoading, error: currencyError, data: currencyData } = useQuery(
		ALL_CURRENCIES_QUERY
	)

	const [
		getNewPrices,
		{ loading: productsLoading, error: productsError, data: productsData },
	] = useLazyQuery(ALL_PRODUCTS_QUERY_2, {
		variables: { currency: selectedCurrency },
	})

	const dynamicModalClass = () => (isShown ? { display: 'block' } : '')

	let headValueCurrency = 'USD'
	if (typeof localStorage !== 'undefined') {
		const dummyCart = getCart()
		if (dummyCart && dummyCart.cartItems.length !== 0) {
			headValueCurrency = dummyCart.currency
		}
	}

	useEffect(() => {
		setcart(getCart())
	}, [isShown]) //check this very well

	const handleRemove = (product) => {
		// This updates the cart by removing the item,
		// then, gets the newly updated cart for display again...
		removeFromCart(product)
		setcart(getCart())
	}

	const handleCartChange = () => {
		setcart(getCart())
	}

	const handleCurrencyChange = (selectedValue) => {
		setselectedCurrency(selectedValue)

		getNewPrices()

		let newProductsFetch = getCart()

		if (productsData && newProductsFetch) {
			let currencyCheck = checkCurrency(cart.currency, selectedValue)

			// Then update the cart
			if (currencyCheck == false) {
				updateCart(selectedValue, productsData)
			}

			// Bug here...
			// setcart(getCart())
			handleCartChange() // still buggy
		}
	}

	return isShown ? (
		<Wrapper>
			<Modal style={dynamicModalClass()}>
				<div>
					<TopRow>
						<CloseButton onClick={hide}> &times;</CloseButton>
						<p>Your Cart</p>
					</TopRow>
					{currencyData && (
						<CurrencyDropDown
							currencyList={currencyData}
							handleCurrencyChange={handleCurrencyChange}
							headValue={headValueCurrency}
						/>
					)}{' '}
					{currencyError || (currencyLoading && <CurrencyDropDown />)}
				</div>

				<div>
					{cart &&
						cart.cartItems.length !== 0 &&
						cart.cartItems.map((product) => (
							<Cart
								key={product.id}
								cartItem={product}
								handleRemove={() => {
									handleRemove(product)
								}}
								handleCartChange={handleCartChange}
							/>
						))}
					{cart && cart.cartItems.length == 0 && <EmptyCart>Your cart is empty</EmptyCart>}
				</div>

				<div>
					{cart && cart.cartItems.length !== 0 && (
						<PriceTag>
							<p>Total: </p>
							<p>
								{cart.currency} {cart.cartTotal}
							</p>
						</PriceTag>
					)}
					{cart.cartItems.length == 0 && <div></div>}
				</div>
			</Modal>
		</Wrapper>
	) : null
}

export default CartList
