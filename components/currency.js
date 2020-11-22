import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Select from 'react-select'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import { ALL_PRODUCTS_QUERY } from '../gql/index'

import { convertToArrayOfObjects, checkCurrency } from '../utils/index'
import { getCart } from '../utils/cart'

const DropDownContainer = styled('div')`
	width: 10.5em;
	margin: 0 auto;
`

const DropDownHeader = styled('div')`
	margin-bottom: 0.8em;
	padding: 0.4em 2em 0.4em 1em;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
	font-weight: 500;
	font-size: 1.3rem;
	color: #3faffa;
	background: #ffffff;
`

const DropDownListContainer = styled('div')``

const DropDownList = styled('ul')`
	padding: 0;
	margin: 0;
	height: 120px;
	padding-left: 1em;
	background: #ffffff;
	border: 2px solid #e5e5e5;
	box-sizing: border-box;
	color: #3faffa;
	font-size: 1.3rem;
	font-weight: 500;
	&:first-child {
		padding-top: 0.8em;
	}
`

const ListItem = styled('li')`
	list-style: none;
	margin-bottom: 0.8em;
`

const customStyles = {
	option: (provided, state) => ({
		...provided,
		width: 100,
		border: 'none',
		color: 'light black',
		opacity: 0.8,
		padding: 10,
		margin: 0,
	}),
	control: (provided) => ({
		...provided,
		width: 100,
		background: 'transparent',
		outline: 'none',
		color: '#7a7a7a',
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: '#7a7a7a',
	}),
}

const CurrencyDropDown = ({ headValue, currencyList, handleCurrencyChange }) => {
	// headvalue is also the selected value for the currency
	const [headvalue, setheadvalue] = useState(headValue)

	const options = convertToArrayOfObjects(currencyList.currency)

	const handleChange = (e) => {
		setheadvalue(e)
	}

	//maybe readQuery...
	return (
		<div>
			<Select
				placeholder={headvalue}
				value={options.find((obj) => obj.value === headvalue)}
				onChange={(obj) => {
					handleChange(obj.value)
					handleCurrencyChange(obj.value)
				}}
				options={options}
				styles={customStyles}
			/>
		</div>
	)
}

export default CurrencyDropDown
