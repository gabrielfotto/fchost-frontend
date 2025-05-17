<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
					<h1 class="text-h4 font-weight-medium mb-1">Machines</h1>
				</div>

				<div :style="{ height: '36px' }"></div>
			</div>

			<v-row>
				<v-col v-for="(machine, machineIndex) in machines" cols="12">
					<v-sheet class="pb-4 pt-4 px-6 rounded-lg border" max-width="100%">
						<v-row>
							<v-col cols="12" md="2">
								<div class="d-flex align-center justify-center">
									<v-icon size="128" color="primary">mdi-server</v-icon>
								</div>
							</v-col>
							<v-col cols="12" md="6">
								<div class="d-flex flex-column">
									<h2 class="text-h4 font-weight-bold mb-2">
										{{ machine.name }}
									</h2>
									<div class="mb-2">
										<v-chip
											color="success"
											size="small"
											variant="outlined"
											class="mr-2 font-weight-medium"
											>Disponível</v-chip
										>
									</div>
									<v-divider class="my-2"></v-divider>
									<v-row>
										<v-col cols="4">
											<div>
												<div class="text-subtitle-1 font-weight-medium">
													vCPU
												</div>
												<div class="text-body-1 d-flex align-center">
													<v-icon class="mr-1">mdi-cpu-64-bit</v-icon>
													{{ machine.vcpu }}
												</div>
											</div>
										</v-col>

										<v-col cols="4">
											<div>
												<div class="text-subtitle-1 font-weight-medium">
													RAM
												</div>
												<div class="text-body-1 d-flex align-center">
													<v-icon class="mr-1">mdi-memory</v-icon>
													{{ machine.ram }} GB
												</div>
											</div>
										</v-col>

										<v-col cols="4">
											<div>
												<div class="text-subtitle-1 font-weight-medium">
													Disco
												</div>
												<div class="text-body-1 d-flex align-center">
													<v-icon class="mr-1">mdi-harddisk</v-icon>
													{{ machine.storage }} GB
												</div>
											</div>
										</v-col>
									</v-row>
								</div>
							</v-col>

							<v-col
								cols="12"
								md="4"
								class="d-flex flex-column justify-space-between"
							>
								<div class="d-flex align-center justify-end">
									<div class="d-flex flex-column align-end">
										<div class="text-h4 font-weight-bold text-primary">
											{{
												toCurrency(machine.pricePerHour, {
													currency: 'USD',
													fractionDigits: 4,
												})
											}}
										</div>
										<div
											class="text-caption text-medium-emphasis font-weight-medium"
										>
											por hora
										</div>
									</div>
									<v-divider vertical class="mx-6"></v-divider>
									<div class="d-flex flex-column align-end">
										<div class="text-h4 font-weight-bold text-primary">
											{{
												toCurrency(machine.pricePerHour * 720, {
													currency: 'USD',
												})
											}}
										</div>
										<div
											class="text-caption text-medium-emphasis font-weight-medium"
										>
											por mês
										</div>
									</div>
								</div>

								<div class="mt-4">
									<v-btn
										block
										color="primary"
										size="large"
										elevation="1"
										class="text-capitalize font-weight-bold"
										@click="() => handleRentMachine(machine.id)"
										:loading="
											isRentingMachine && machineIndex === selectedMachineIndex
										"
										:disabled="
											selectedMachineIndex !== -1 &&
											machineIndex !== selectedMachineIndex
										"
									>
										<v-icon left class="mr-1">mdi-cloud-plus</v-icon>
										Alugar
									</v-btn>
								</div>
							</v-col>
						</v-row>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
