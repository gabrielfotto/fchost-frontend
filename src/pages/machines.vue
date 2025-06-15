<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { TAccountMachine } from '@/types/machines'
import {
	getAccountRentedMachines,
	registerAccountMachineUsage,
} from '@/services/api'

import { useNotify } from '@/composables/useNotify'
import { toCurrency } from '@/utils/to-currency'

const { notifyError, notifySuccess } = useNotify()

const rentedMachinesHeaders = ref<any>([
	{
		title: 'Name',
		key: 'name',
		sortable: false,
	},
	{
		title: 'vCPU',
		key: 'vcpu',
		sortable: false,
		align: 'end',
	},
	{
		title: 'RAM',
		key: 'ram',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Disk',
		key: 'storage',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Price/Hour',
		key: 'pricePerHour',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Total Spent',
		key: 'totalUsageCost',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Total Hours',
		key: 'totalUsageHours',
		sortable: false,
		align: 'end',
	},
	{
		title: 'Status',
		key: 'status',
		sortable: false,
	},
])

const rentedMachines = ref<TAccountMachine[]>([])
const isFetchingRentedMachines = ref(false)

const isRegisteringAccountMachineUsage = ref(false)
const registeringAccountMachineUsageIndex = ref(-1)

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

async function handleRegisterAccountMachineUsage(
	event: Event,
	accountMachineId: number,
	machineStatus: string,
) {
	event.preventDefault()
	isRegisteringAccountMachineUsage.value = true
	try {
		const status = machineStatus === 'on' ? 'off' : 'on'
		await registerAccountMachineUsage(accountMachineId, status)

		rentedMachines.value[registeringAccountMachineUsageIndex.value].status =
			status

		notifySuccess('Machine updated')
	} catch (error: any) {
		notifyError(
			error?.response?.data?.message || 'Error to register machine usage',
		)
	} finally {
		isRegisteringAccountMachineUsage.value = false
		registeringAccountMachineUsageIndex.value = -1
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
					<h1 class="text-h4 font-weight-medium mb-1">Rented Machines</h1>
				</div>

				<v-btn
					color="primary"
					variant="flat"
					prepend-icon="mdi-plus"
					to="/machines/rent"
				>
					Rent Machine
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

							<template #item.name="{ item }">
								<span class="font-weight-medium">{{ item.machine.name }}</span>
							</template>

							<template #item.vcpu="{ item }">
								<span>{{ item.machine.vcpu }}</span>
							</template>

							<template #item.ram="{ item }">
								<span>{{ item.machine.ram }}</span>
							</template>

							<template #item.storage="{ item }">
								<span>{{ item.machine.storage }} GB</span>
							</template>

							<template #item.pricePerHour="{ item }">
								<span>{{
									toCurrency(item.machine.pricePerHour, {
										currency: 'USD',
										fractionDigits: 4,
									})
								}}</span>
							</template>

							<template #item.totalUsageCost="{ item }">
								<span>{{
									toCurrency(item.totalUsageCost, {
										currency: 'USD',
										fractionDigits: 4,
									})
								}}</span>
							</template>

							<template #item.totalUsageHours="{ item }">
								<span v-if="parseFloat(String(item.totalUsageHours)) == 0"
									>-</span
								>
								<span v-else-if="parseFloat(String(item.totalUsageHours)) < 1"
									>Less than 1h</span
								>
								<span v-else-if="Math.floor(item.totalUsageHours) === 1"
									>{{ Math.floor(item.totalUsageHours) }} h</span
								>
								<span v-else>{{ Math.floor(item.totalUsageHours) }} hs</span>
							</template>

							<template #item.status="{ item, index }">
								<v-switch
									@click="
										(event: Event) => {
											registeringAccountMachineUsageIndex = index
											handleRegisterAccountMachineUsage(
												event,
												item.id,
												item.status,
											)
										}
									"
									:model-value="item.status"
									:label="item.status.toUpperCase()"
									:color="item.status === 'on' ? 'success' : ''"
									true-value="on"
									false-value="off"
									:loading="
										isRegisteringAccountMachineUsage &&
										registeringAccountMachineUsageIndex === index
											? 'warning'
											: false
									"
									:disabled="
										isRegisteringAccountMachineUsage &&
										registeringAccountMachineUsageIndex === index
									"
									hide-details
								>
									<template #label="{ label }">
										<span class="font-weight-medium">{{ label }}</span>
									</template>
								</v-switch>
							</template>
						</v-data-table>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
