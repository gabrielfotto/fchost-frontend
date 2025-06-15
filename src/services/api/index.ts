import axios, { AxiosError, type AxiosResponse } from 'axios'

import { useCookie } from '@/composables/useCookie'
import { ACC_KEY } from '@/constants'
import { useAuthStore } from '@/stores/auth'

const cookie = useCookie()

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(async request => {
	const { apiKey } = cookie.get(ACC_KEY) || {}
	if (apiKey) {
		request.headers['X-Api-Key'] = apiKey
	}

	return request
})

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.status === 401) {
			const authStore: any = useAuthStore()
			authStore.logout()
		}

		return error
	},
)

export default api
