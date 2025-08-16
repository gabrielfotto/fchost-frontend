import { defineStore } from 'pinia'
import { router } from '@/router'
import { useCookie } from '@/composables/useCookie'

import { validateAccountApiKey } from '@/services/api/resources'
import { ACC_KEY } from '@/constants'

import type { TAccount } from '@/types/account'

const cookie = useCookie()
const acc = cookie.get(ACC_KEY)

type StateType = {
	acc: TAccount
	returnUrl: string | null
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: (): StateType => ({
		acc,
		returnUrl: null,
	}),

	actions: {
		async login(apiKey: string) {
			this.acc = await validateAccountApiKey(apiKey)
			cookie.set(ACC_KEY, JSON.stringify(this.acc))
			router.push(this.returnUrl || '/machines')
		},

		logout() {
			// @ts-ignore
			this.acc = null
			cookie.remove(ACC_KEY)
			router.push('/')
		},
	},
})
