<script setup lang="ts">
import { ref } from 'vue'

const downloadPDF = () => {
	console.log('Download do PDF da fatura #INV-001')
}
</script>

<template>
	<v-container class="py-8 px-0">
		<v-sheet class="pa-8 rounded mx-auto" max-width="680" elevation="10">
			<div class="d-flex flex-wrap align-center mb-4">
				<v-tooltip location="left">
					<template #activator="{ props }">
						<v-btn
							v-bind:="props"
							variant="text"
							color="primary"
							class="mr-4"
							size="small"
							icon="mdi-arrow-left"
							to="/invoices"
						>
						</v-btn>
					</template>
					<span>Voltar</span>
				</v-tooltip>

				<div class="d-flex align-center">
					<v-icon class="mr-2" color="success">mdi-invoice-text-check</v-icon>
					<h1 class="text-h4 font-weight-medium mr-4">Fatura #INV-001</h1>
				</div>

				<v-chip color="success" variant="flat" label>
					<span class="font-weight-medium text-white">Aprovado</span>
				</v-chip>

				<v-spacer></v-spacer>

				<v-btn
					variant="outlined"
					prepend-icon="mdi-download"
					@click="downloadPDF"
				>
					PDF
				</v-btn>
			</div>

			<p class="text-grey-lighten-1 mb-6">Criada em 30/03/2025 às 14:30</p>

			<v-row>
				<v-col cols="12">
					<v-sheet class="pa-4 mb-6 rounded" border="sm">
						<h2 class="text-h6 font-weight-medium mb-4">
							Informações da Fatura
						</h2>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">ID da Fatura</span>
							<span class="">#INV-001</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Valor</span>
							<span class="">R$ 1.500,00</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Data de Criação</span>
							<span class="">30/03/2025 14:30</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Última Atualização</span>
							<span class="">30/03/2025 14:35</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Descrição</span>
							<span class="">Compra Online #123</span>
						</div>
					</v-sheet>

					<v-sheet class="pa-4 rounded" border="sm">
						<h2 class="text-h6 font-weight-medium mb-4">Método de Pagamento</h2>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Tipo</span>
							<span class="">Cartão de Crédito</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Últimos Dígitos</span>
							<span class="">**** **** **** 1234</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Titular</span>
							<span class="">João da Silva</span>
						</div>
					</v-sheet>
				</v-col>

				<v-col cols="12">
					<v-sheet class="pa-4 mb-6 rounded" border="sm">
						<h2 class="text-h6 font-weight-medium mb-4">Status da Transação</h2>

						<v-timeline side="end">
							<v-timeline-item :key="1" dot-color="success" size="small">
								<template #icon>
									<v-icon size="20" color="#fff">mdi-check</v-icon>
								</template>
								<div class="d-flex align-center">
									<div class="d-flex flex-column">
										<h4 class="font-weight-medium">Fatura Criada</h4>
										<p class="text-grey-lighten-1">30/03/2025 14:30</p>
									</div>
								</div>
							</v-timeline-item>

							<v-timeline-item :key="2" dot-color="success" size="small">
								<template #icon>
									<v-icon size="20" color="#fff">mdi-check</v-icon>
								</template>
								<div class="d-flex align-center">
									<div class="d-flex flex-column">
										<h4 class="font-weight-medium">Pagamento Processado</h4>
										<p class="text-grey-lighten-1">30/03/2025 14:32</p>
									</div>
								</div>
							</v-timeline-item>

							<v-timeline-item :key="3" dot-color="success" size="small">
								<template #icon>
									<v-icon size="20" color="#fff">mdi-check</v-icon>
								</template>
								<div class="d-flex align-center">
									<div class="d-flex flex-column">
										<h4 class="font-weight-medium">Transação Aprovada</h4>
										<p class="text-grey-lighten-1">30/03/2025 14:35</p>
									</div>
								</div>
							</v-timeline-item>
						</v-timeline>
					</v-sheet>

					<v-sheet class="pa-4 rounded" border="sm">
						<h2 class="text-h6 font-weight-medium mb-4">Dados Adicionais</h2>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">ID da Conta</span>
							<span class="">ACC-12345</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">IP do Cliente</span>
							<span class="">192.168.1.1</span>
						</div>

						<div class="d-flex justify-space-between py-2">
							<span class="text-grey-lighten-1">Dispositivo</span>
							<span class="">Desktop - Chrome</span>
						</div>
					</v-sheet>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>
