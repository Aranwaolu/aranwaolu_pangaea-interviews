import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { ALL_PRODUCTS_QUERY } from '../gql/index'
import Product from '../components/product'
import styled from 'styled-components'

const ProductDisplay = styled.div`
	// width: 100vw;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: left;
	margin: 0 auto;
`

const ProductList = ({ toggle }) => {
	const [skip, setSkip] = useState(false)
	const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, {
		variables: { currency: 'USD' },
	})

	// // change this
	// useEffect(() => {
	// 	if (!loading && !data) {
	// 		setSkip(true)
	// 	}
	// }, [data, loading])

	return (
		<ProductDisplay>
			{error && loading && <div>No product to display</div>}
			{data &&
				data.products.map((product) => (
					<Product key={product.id} product={product} toggle={toggle} />
				))}
		</ProductDisplay>
	)
}

export default ProductList
