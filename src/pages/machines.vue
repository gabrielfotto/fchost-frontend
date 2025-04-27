<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
							:headers="[]"
							:items="[]"
							:items-per-page-options="[
								{ value: 10, title: '10' },
								{ value: 25, title: '25' },
								{ value: 50, title: '50' },
							]"
						></v-data-table>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
