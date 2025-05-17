<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'

import api from '@/services/api'
import { useNotify } from '@/composables/useNotify'

const { notifyError, notifySuccess } = useNotify()

import type { TTransaction } from '@/types/transaction'
import { toCurrency } from '@/utils/to-currency'

const transactionsHeaders = ref<any>([
	// {
	// 	title: 'ID',
	// 	key: 'id',
	// 	sortable: false,
	// },
	{
		title: 'Data',
		key: 'createdAt',
		sortable: false,
	},
	{
		title: 'Tipo',
		key: 'type',
		sortable: false,
	},
	{
		title: 'Valor',
		key: 'value',
		sortable: false,
		align: 'end',
	},
	// {
	// 	title: 'Ações',
	// 	key: 'actions',
	// 	sortable: false,
	// },
])

const transactions = ref<TTransaction[]>()
const isFetchingInvoices = ref(false)

async function handleFetchInvoices() {
	isFetchingInvoices.value = true
	try {
		const { data } = await api.get('transactions')
		transactions.value = data.data
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Error to get transactions')
	} finally {
		isFetchingInvoices.value = false
	}
}

onMounted(async () => {
	await handleFetchInvoices()
})
</script>

<template>
	<v-container class="py-8 px-0">
		<v-sheet class="pa-8 rounded mx-auto" elevation="10">
			<div class="d-flex flex-wrap justify-space-between align-center mb-6">
				<div>
					<h1 class="text-h4 font-weight-medium mb-1">Transações</h1>
				</div>
			</div>

			<v-sheet class="rounded" border="sm">
				<v-data-table
					:headers="transactionsHeaders"
					:items="transactions"
					:items-per-page-options="[
						{ value: 10, title: '10' },
						{ value: 25, title: '25' },
						{ value: 50, title: '50' },
					]"
					:loading="isFetchingInvoices"
				>
					<template #loading>
						<v-skeleton-loader type="table-row@6"></v-skeleton-loader>
					</template>

					<template #item.createdAt="{ item }">
						<span>{{ format(new Date(item.createdAt), 'dd/MM/yyyy') }}</span>
					</template>

					<template #item.type="{ item }">
						<span>{{ item.type }}</span>
					</template>

					<template #item.value="{ item }">
						<span class="font-weight-medium">{{
							toCurrency(item.value, { currency: 'USD', fractionDigits: 4 })
						}}</span>
					</template>
				</v-data-table>
			</v-sheet>
		</v-sheet>
	</v-container>
</template>
