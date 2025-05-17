import type { App } from 'vue'

import CurrencyField from '@/components/shared/CurrencyField.vue'

export function registerGlobalComponents(app: App): void {
	app.component('CurrencyField', CurrencyField)
}
