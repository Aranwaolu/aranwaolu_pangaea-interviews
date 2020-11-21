import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { ALL_CURRENCIES_QUERY } from '../gql/index'

import CurrencyDropDown from '../components/currency'

// this should move to cart

const CurrencyList = () => {
	const { loading, error, data } = useQuery(ALL_CURRENCIES_QUERY)

	return (
		<div>
			{error && loading && <CurrencyDropDown />}
			{data && <CurrencyDropDown currencyList={data} />}
		</div>
	)
}

export default CurrencyList
