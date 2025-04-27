<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { format, isAfter, isBefore } from 'date-fns'

import api from '@/services/api'
import type { TInvoice } from '@/types/invoice'
import { toCurrency } from '@/utils/to-currency'
import { EInvoiceStatus } from '@/enums/invoice-status'

const dateMask = { mask: '##/##/####' }

const isBeginDateMenuActive = ref()
const isEndDateMenuActive = ref()

const filters = reactive({
	status: 'Todos',
	beginDate: null,
	endDate: null,
	search: null,
})

const formattedBeginDate = computed(() =>
	filters.beginDate ? format(filters.beginDate, 'dd/MM/yyyy') : '',
)

const formattedEndDate = computed(() =>
	filters.endDate ? format(filters.endDate, 'dd/MM/yyyy') : '',
)

const allowedEndDates = computed(() => (d: any) => {
	if (filters.beginDate) {
		return !isBefore(d, filters.beginDate) && !isAfter(d, new Date())
	}

	return !isAfter(d, new Date())
})

const statusOptions = ['Todos', 'Aprovado', 'Pendente', 'Rejeitado']

const headers = ref<any>([
	{
		title: 'ID',
		key: 'id',
		sortable: false,
	},
	{
		title: 'Data',
		key: 'createdAt',
		sortable: false,
	},
	{
		title: 'Descrição',
		key: 'description',
		sortable: false,
	},
	{
		title: 'Valor',
		key: 'amount',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Cartão',
		key: 'cardLastDigits',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Status',
		key: 'status',
		sortable: false,
	},
	{
		title: 'Ações',
		key: 'actions',
		sortable: false,
	},
])

const invoices = ref<TInvoice[]>([])

// Funções auxiliares
const getStatusColor = (status: string) => {
	switch (status) {
		case EInvoiceStatus.APPROVED:
			return 'success'
		case EInvoiceStatus.PENDING:
			return '#F59E0B'
		case EInvoiceStatus.REJECTED:
			return '#EF4444'
		default:
			return '#F59E0B'
	}
}

const getStatusText = (status: string) => {
	switch (status) {
		case EInvoiceStatus.APPROVED:
			return 'Aprovada'
		case EInvoiceStatus.PENDING:
			return 'Pendente'
		case EInvoiceStatus.REJECTED:
			return 'Rejeitada'
		default:
			return 'Pendente'
	}
}

async function handleFetchInvoices() {
	const { data } = await api.get('invoices')
	invoices.value = data.data
}

onMounted(async () => {
	await handleFetchInvoices()
})
</script>

<template>
	<v-container class="py-8 px-0" max-width="1200">
		<v-sheet class="pa-8 rounded mx-auto" elevation="10">
			<div class="d-flex flex-wrap justify-space-between align-center mb-6">
				<div>
					<h1 class="text-h4 font-weight-medium mb-1">Faturas</h1>
					<p class="text-grey-lighten-1">
						Gerencie suas faturas e acompanhe os pagamentos
					</p>
				</div>

				<v-btn
					color="primary"
					variant="flat"
					prepend-icon="mdi-plus"
					to="/invoices/create"
				>
					Nova Fatura
				</v-btn>
			</div>

			<v-sheet class="pa-4 mb-6 rounded" border="sm">
				<v-row align="center">
					<v-col cols="12" sm="6" md="3">
						<v-label class="mb-2 font-weight-medium">Status</v-label>
						<v-select
							v-model="filters.status"
							density="compact"
							:items="statusOptions"
							variant="outlined"
							hide-details
						></v-select>
					</v-col>

					<v-col cols="12" sm="6" md="3">
						<v-label class="mb-2 font-weight-medium">Data Inicial</v-label>
						<v-menu
							v-model="isBeginDateMenuActive"
							:close-on-content-click="false"
						>
							<template #activator="{ props }">
								<v-text-field
									v-bind="props"
									:model-value="formattedBeginDate"
									density="compact"
									placeholder="dd/mm/aaaa"
									prepend-inner-icon="mdi-calendar-range"
									hide-details
									clearable
									v-maska:[dateMask]
									@click:clear="filters.beginDate = null"
									@input="(value: string) => {}"
								></v-text-field>
							</template>

							<v-date-picker
								v-model="filters.beginDate"
								color="primary"
								header="Selecione"
							></v-date-picker>
						</v-menu>
					</v-col>

					<v-col cols="12" sm="6" md="3">
						<v-label class="mb-2 font-weight-medium">Data Final</v-label>
						<v-menu
							v-model="isEndDateMenuActive"
							:close-on-content-click="false"
						>
							<template #activator="{ props }">
								<v-text-field
									v-bind="props"
									:model-value="formattedEndDate"
									density="compact"
									placeholder="dd/mm/aaaa"
									prepend-inner-icon="mdi-calendar-range"
									hide-details
									clearable
									v-maska:[dateMask]
									@click:clear="filters.endDate = null"
									@input="(value: string) => {}"
								></v-text-field>
							</template>

							<v-date-picker
								v-model="filters.endDate"
								color="primary"
								header="Selecione"
								:allowed-dates="d => allowedEndDates(d)"
							></v-date-picker>
						</v-menu>
					</v-col>

					<v-col cols="12" sm="6" md="3">
						<v-label class="mb-2 font-weight-medium">Buscar</v-label>
						<v-text-field
							v-model="filters.search"
							density="compact"
							placeholder="ID ou descrição"
							variant="outlined"
							hide-details
							append-inner-icon="mdi-magnify"
						></v-text-field>
					</v-col>
				</v-row>
			</v-sheet>

			<v-sheet class="rounded" border="sm">
				<v-data-table
					:headers="headers"
					:items="invoices"
					:items-per-page-options="[
						{ value: 10, title: '10' },
						{ value: 25, title: '25' },
						{ value: 50, title: '50' },
					]"
				>
					<template #loading>
						<v-skeleton-loader type="table-row@6"></v-skeleton-loader>
					</template>

					<template #item.createdAt="{ item }">
						<span>{{ format(new Date(item.createdAt), 'dd/MM/yyyy') }}</span>
					</template>

					<template #item.description="{ item }">
						<span>{{ item.description }}</span>
					</template>

					<template #item.amount="{ item }">
						<span class="font-weight-medium">{{
							toCurrency(item.amount)
						}}</span>
					</template>

					<template #item.cardLastDigits="{ item }">
						<div class="d-flex align-center justify-end">
							<span class="mr-1">****</span>
							<span class="mr-1">****</span>
							<span class="mr-1">****</span>
							<span class="font-weight-medium">
								{{ item.cardLastDigits }}
							</span>
						</div>
					</template>

					<template #item.status="{ item }">
						<v-chip label :color="getStatusColor(item.status)">
							<span class="font-weight-medium">{{
								getStatusText(item.status)
							}}</span>
						</v-chip>
					</template>

					<template #item.actions="{ item }"></template>
				</v-data-table>
			</v-sheet>
		</v-sheet>
	</v-container>
</template>
