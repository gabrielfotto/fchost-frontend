import axios from 'axios'

import { useCookie } from '@/composables/useCookie'
import { ACC_KEY } from '@/constants'

const cookie = useCookie()

const api = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'X-Api-Key': 'beb81bdc06d706629f9c966ac497be7c',
	},
})

api.interceptors.request.use(async request => {
	const { apiKey } = cookie.get(ACC_KEY) || {}
	if (apiKey) {
		request.headers['X-Api-Key'] = apiKey
	}

	return request
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

export async function getAccountBalance(accountId: number) {
	const { data } = await api.get(`accounts/${accountId}`)
	return parseFloat(data?.balance)
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

export async function getMachines(pagination?: any) {
	const { data } = await api.get('machines')
	return data
}

export async function rentMachine(machineId: number) {
	const { data } = await api.post(`machines/${machineId}/rent`)
	return data
}

export async function getRentedMachines() {
	const { data } = await api.get('machines')
	return data
}

export default api
