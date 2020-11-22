import Link from 'next/link'
import styled, { css } from 'styled-components'
import React, { useState } from 'react'

import { addItemToCart } from '../utils/cart'

const ProductCard = styled.div`
	display: flex;
	flex-direction: column;
	// flex-wrap: wrap;
	width: 30%;
	justify-content: space-between;
	align-items: center;
	// margin: 60px;
	// flex-basis: 33.3333%;
	padding: 100px 10px;
	flex: 1 1 auto;
	background-color: #e2e6e3;

	@media only screen and (max-width: 768px) {
		width: 40%;
	}
`

const ProductImg = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: flex;
	width: ${(props) => (props.width ? props.width : '140px')};
	height: 140px;
`

const ProductDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	color: grey;
	margin: 20px 0;
`

const Title = styled.p`
	font-size: 16px;
`

const AddToCartButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	text-align: center;
	outline: none;
	margin: ${(props) => (props.margin ? props.margin : '0px')};
	padding: 18px 0px;
	background: #4b5548;
	transition: all 0.4s ease-in-out;
	color: ${(props) => (props.color ? props.color : 'white')};
	font-family: sans-serif;
	font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
	word-spacing: 1px;
	border: none;
	width: 180px;

	&:focus,
	&:hover {
		cursor: pointer;
	}
`

const Product = ({ product, toggle }) => {
	const handleCartButton = (product) => {
		addItemToCart(product)
		toggle() // make sure this refetchs the cart after adding the quantity...
	}

	return (
		<ProductCard key={product.id}>
			<ProductImg src={product.image_url} />
			<ProductDetails>
				<Title>{product.title}</Title>
				From ${product.price}
			</ProductDetails>

			<AddToCartButton
				onClick={() => {
					handleCartButton(product)
				}}
			>
				Add to Cart
			</AddToCartButton>
		</ProductCard>
	)
}

export default Product
