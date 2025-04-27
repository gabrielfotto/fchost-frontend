<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getAccountRentedMachines } from '@/services/api'
import { useNotify } from '@/composables/useNotify'

const { notifyError, notifySuccess } = useNotify()

const rentedMachinesHeaders = ref<any>([
	{
		title: 'Nome',
		key: 'name',
		sortable: false,
	},
	{
		title: 'vCPU',
		key: 'vcpu',
		sortable: false,
	},
	{
		title: 'RAM',
		key: 'ram',
		sortable: false,
	},
	{
		title: 'Preço/hora',
		key: 'pricePerHour',
		sortable: false,
	},
	{
		title: 'Gasto',
		key: 'cost',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Status',
		key: 'status',
		sortable: false,
	},
])

const rentedMachines = ref([])
const isFetchingRentedMachines = ref(false)

async function handleFetchRentedMachines() {
	isFetchingRentedMachines.value = true
	try {
		const data = await getAccountRentedMachines()
		rentedMachines.value = data.data
	} catch (error: any) {
		notifyError(
			error?.response?.data?.message || 'Error to get rented machines',
		)
	} finally {
		isFetchingRentedMachines.value = false
	}
}

onMounted(async () => {
	await handleFetchRentedMachines()
})
</script>

<template>
	<v-container class="py-8 px-0">
		<v-sheet class="pa-8 rounded-lg mx-auto" elevation="10">
			<div class="d-flex flex-wrap justify-space-between align-center mb-6">
				<div>
					<h1 class="text-h4 font-weight-medium mb-1">Máquinas Alugadas</h1>
				</div>

				<v-btn
					color="primary"
					variant="flat"
					prepend-icon="mdi-plus"
					to="/machines/rent"
				>
					Alugar Máquina
				</v-btn>
			</div>

			<v-row>
				<v-col cols="12">
					<v-sheet class="rounded" border="sm">
						<v-data-table
							:headers="rentedMachinesHeaders"
							:items="rentedMachines"
							:items-per-page-options="[
								{ value: 10, title: '10' },
								{ value: 25, title: '25' },
								{ value: 50, title: '50' },
							]"
							:loading="isFetchingRentedMachines"
						>
							<template #loading>
								<v-skeleton-loader type="table-row@10"></v-skeleton-loader>
							</template>

							<template #item.status="{ item }">
								<v-switch
									:model-value="false"
									label="off loading"
									loading="warning"
								></v-switch>
							</template>
						</v-data-table>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
