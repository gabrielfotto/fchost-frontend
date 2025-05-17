export function toCurrency(
	value: number,
	options?: { currency?: string; noDecimal?: boolean; fractionDigits?: number },
) {
	const currencyValue = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: options?.currency || 'BRL',
		minimumFractionDigits: options?.fractionDigits || 2,
	}).format(value)

	if (options?.noDecimal) {
		return currencyValue.slice(0, -3)
	}

	return currencyValue
}
