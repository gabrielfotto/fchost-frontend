<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getMachines, rentMachine } from '@/services/api'
import type { TMachine } from '@/types/machines'

import { useNotify } from '@/composables/useNotify'
import { toCurrency } from '@/utils/to-currency'

const router = useRouter()
const { notifyError, notifySuccess } = useNotify()

const machines = ref<TMachine[]>([])
const isRentingMachine = ref(false)
const selectedMachineIndex = ref(-1)

async function handleGetMachines() {
	try {
		const data = await getMachines()
		machines.value = data.data
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Error to get machines')
	}
}

async function handleRentMachine(machineId: number) {
	isRentingMachine.value = true
	try {
		await rentMachine(machineId)
		router.push('/machines')
		notifySuccess('The machine has been rented')
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Error to rent machine')
	} finally {
		selectedMachineIndex.value = -1
		isRentingMachine.value = false
	}
}

onMounted(async () => {
	await handleGetMachines()
})
</script>

<template>
	<v-container class="py-8 px-0">
		<v-sheet class="pa-8 rounded-lg mx-auto" elevation="10">
			<div class="d-flex flex-wrap justify-space-between align-center mb-6">
				<div>
					<h1 class="text-h4 font-weight-medium mb-1">Máquinas Disponíveis</h1>
				</div>

				<div :style="{ height: '36px' }"></div>
			</div>

			<v-row>
				<v-col v-for="(machine, machineIndex) in machines" cols="12" md="3">
					<v-sheet class="pb-4 pt-2 px-6 rounded-lg border" elevation="0">
						<v-card-title class="text-h5 px-0 mx-0 font-weight-medium">
							{{ machine.name }}
						</v-card-title>

						<div class="d-flex flex-column">
							<div class="d-flex align-center justify-space-between">
								<span>vCPU</span>
								<span class="font-weight-medium">{{ machine.vcpu }}</span>
							</div>
							<v-divider class="my-1"></v-divider>
							<div class="d-flex align-center justify-space-between">
								<span>RAM</span>
								<span class="font-weight-medium">{{ machine.ram }} GB</span>
							</div>
							<v-divider class="my-1"></v-divider>
							<div class="d-flex align-center justify-space-between">
								<span>Disco</span>
								<span class="font-weight-medium">{{ machine.storage }} GB</span>
							</div>

							<v-divider class="my-1"></v-divider>
							<div class="d-flex align-center justify-space-between">
								<span>Preço/hora</span>
								<span class="font-weight-medium">{{
									toCurrency(machine.pricePerHour, { currency: 'USD' })
								}}</span>
							</div>
							<v-btn
								class="mt-6"
								block
								color="primary"
								@click="() => handleRentMachine(machine.id)"
								:loading="
									isRentingMachine && machineIndex === selectedMachineIndex
								"
								:disabled="
									selectedMachineIndex !== -1 &&
									machineIndex !== selectedMachineIndex
								"
								>Alugar</v-btn
							>
						</div>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
