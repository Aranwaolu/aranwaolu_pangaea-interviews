import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import styled from 'styled-components'

import ProductList from '../views/productsList'
import CartList from '../components/cartList'
import useModal from '../components/useModal'

import { ALL_CURRENCIES_QUERY, ALL_PRODUCTS_QUERY } from '../gql/index'

import { initializeApollo, addApolloState } from '../lib/apolloClient'

const CartIcon = styled.a`
	font-size: 16px;
	color: #7a7a7a;
	display: flex;
	justify-content: flex-end;
	margin: 30px;

	&:hover {
		cursor: pointer;
	}
`

const ProductsPage = () => {
	const { isShown, toggle } = useModal()

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Products</h1>
			<CartIcon
				onClick={() => {
					toggle()
				}}
			>
				SHOW CART
			</CartIcon>
			<ProductList toggle={toggle} />
			<CartList isShown={isShown} hide={toggle} />
		</div>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: ALL_CURRENCIES_QUERY,
	})

	// might hash it out or check how USD can be replaced
	// this make something conflicting
	await apolloClient.query({
		query: ALL_PRODUCTS_QUERY,
		variables: { currency: 'USD' },
	})

	return addApolloState(apolloClient, {
		props: {},
		revalidate: 1,
	})
}

export default ProductsPage
