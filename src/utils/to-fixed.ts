export function toFixed(value: number, digits = 2) {
	return Number(Number(value).toFixed(digits))
}
