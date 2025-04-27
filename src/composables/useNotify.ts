import { useNotifyStore } from '@/stores/notify'
import type { NotifyOptionsType } from '@/types/notify'

export function useNotify() {
	const notifyStore = useNotifyStore()

	function success(message: string, options?: NotifyOptionsType) {
		notifyStore.success(message, options)
	}

	function error(message: string, options?: NotifyOptionsType) {
		notifyStore.error(message, options)
	}

	return {
		notifySuccess: success,
		notifyError: error,
	}
}
