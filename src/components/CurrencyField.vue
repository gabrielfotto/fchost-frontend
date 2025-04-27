<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCurrencyInput, CurrencyDisplay } from 'vue-currency-input'

const emits = defineEmits(['update:modelValue', 'click:clear'])
const props = defineProps({
	modelValue: null,
	currency: {
		type: String,
		default: 'BRL',
	},
	locale: {
		type: String,
		default: 'pt-BR',
	},
	prefix: {
		type: String,
		default: 'R$',
	},
	precision: {
		type: Number,
		default: 2,
	},
})

const defaultCurrencyOptions = {
	locale: props.locale || 'pt-BR',
	currency: props.currency,
	currencyDisplay: CurrencyDisplay.hidden,
	hideCurrencySymbolOnFocus: false,
	hideGroupingSeparatorOnFocus: false,
	autoDecimalDigits: true,
	precision: props.precision,
	valueRange: {
		min: 0,
	},
}

const prefix = computed(() => {
	return props.currency === 'BRL'
		? 'R$'
		: props.currency === 'USD'
		? '$'
		: props.prefix
})

const locale = computed(() => {
	return props.currency === 'BRL'
		? 'pt-BR'
		: props.currency === 'USD'
		? 'en-US'
		: props.locale
})

const { inputRef, formattedValue, setValue, numberValue, setOptions } =
	useCurrencyInput(defaultCurrencyOptions, false)

watch(locale, value => {
	setOptions({
		...defaultCurrencyOptions,
		locale: value,
	})
})

watch(
	() => props.modelValue,
	value => {
		setValue(value || null)
	}
)

watch(numberValue, value => {
	emits('update:modelValue', value)
})
</script>

<template>
	<v-text-field
		ref="inputRef"
		v-bind="props"
		v-model="formattedValue"
		:prefix="prefix"
		@click:clear="
			() => {
				emits('update:modelValue', null)
				emits('click:clear')
			}
		"
	/>
</template>
