import type { App } from 'vue'

import CurrencyField from '@/components/CurrencyField.vue'

export function registerGlobalComponents(app: App): void {
	app.component('CurrencyField', CurrencyField)
}
