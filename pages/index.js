import Link from 'next/link'
import Head from '../components/head'

import { initializeApollo, addApolloState } from '../lib/apolloClient'

const IndexPage = () => {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Index Page - Welcome</h1>
			<Link href='/products'>Go to the products page</Link>
		</div>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	return addApolloState(apolloClient, {
		props: {},
		revalidate: 1,
	})
}

export default IndexPage
