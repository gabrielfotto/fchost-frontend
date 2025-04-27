import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'X-Api-Key': 'beb81bdc06d706629f9c966ac497be7c',
	},
})

export async function validateAccountApiKey(apiKey: string) {
	const { data } = await api.post(
		'accounts/api-key/validate',
		{},
		{
			headers: {
				'X-Api-Key': apiKey,
			},
		},
	)

	return data
}

export async function addAccountBalance({
	amount,
	cardNumber,
	expiryDate,
	cvv,
	cardholderName,
}: {
	amount: number
	cardNumber: string
	expiryDate: string
	cvv: string
	cardholderName: string
}) {
	const { data } = await api.post('invoices', {
		amount,
		description: 'add balance to account',
		paymentType: 'account-balance',
		card: {
			cardNumber,
			expiryDate,
			cvv,
			cardholderName,
		},
	})

	return data
}

export default api
