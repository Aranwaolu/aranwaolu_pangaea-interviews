import { gql, useQuery } from '@apollo/client'

export const ALL_CURRENCIES_QUERY = gql`
	query allCurrencies {
		currency
	}
`

export const ALL_PRODUCTS_QUERY = gql`
	query allProducts($currency: Currency!) {
		products {
			id
			title
			price(currency: $currency)
			image_url
		}
	}
`

// second products query
export const ALL_PRODUCTS_QUERY_2 = gql`
	query allProducts($currency: Currency!) {
		products {
			id
			title
			price(currency: $currency)
			image_url
		}
	}
`
