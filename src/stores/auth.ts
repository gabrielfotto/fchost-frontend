import { defineStore } from 'pinia'
import { router } from '@/router'
import { useCookie } from '@/composables/useCookie'

import { validateAccountApiKey } from '@/services/api'

const ACC_KEY = '_fcpay_acc'

const cookie = useCookie()
const acc = cookie.get(ACC_KEY)

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		acc,
		returnUrl: null,
	}),

	actions: {
		async login(apiKey: string) {
			this.acc = await validateAccountApiKey(apiKey)
			cookie.set(ACC_KEY, JSON.stringify(this.acc))
			router.push(this.returnUrl || '/invoices/list')
		},

		logout() {
			this.acc = null
			cookie.remove(ACC_KEY)
			router.push('/')
		},
	},
})
