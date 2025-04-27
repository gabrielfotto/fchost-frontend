import { defineStore } from 'pinia'
import type { NotifyOptionsType } from '@/types/notify'

const defaultOptions = {
	timeout: 7000,
}

export const useNotifyStore = defineStore({
	id: 'notify',
	state: () => ({
		snackbar: {
			visible: false,
			message: '',
			color: 'primary',
			timeout: 7000,
		},
	}),

	actions: {
		success(message: string, options?: NotifyOptionsType) {
			this.snackbar = {
				...defaultOptions,
				...options,
				message,
				visible: true,
				color: 'success',
			}
		},

		error(message: string, options?: NotifyOptionsType) {
			this.snackbar = {
				...defaultOptions,
				...options,
				message,
				visible: true,
				color: 'error',
			}
		},
	},
})
