import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import CartList, { vars } from '../components/cartList'
import CurrencyList from '../components/currencyList'

import { ALL_CURRENCIES_QUERY, ALL_PRODUCTS_QUERY } from '../gql/index'

import { initializeApollo, addApolloState } from '../lib/apolloClient'

const ProductsPage = () => {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Cart Page</h1>
			{/* <CurrencyList /> */}
			<CartList />
		</div>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: ALL_CURRENCIES_QUERY,
	})

	// await apolloClient.query({
	// 	query: ALL_PRODUCTS_QUERY,
	// 	variables: vars,
	// })

	return addApolloState(apolloClient, {
		props: {},
		revalidate: 1,
	})
}

export default ProductsPage
