export function toCurrency(value: number, noDecimal = false) {
	const currencyValue = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value)

	if (noDecimal) {
		return currencyValue.slice(0, -3)
	}

	return currencyValue
}
