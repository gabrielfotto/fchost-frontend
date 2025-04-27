<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const invoice = ref({
	value: '',
	description: '',
})

const payment = ref({
	cardNumber: '',
	expiryDate: '',
	cvv: '',
	cardholderName: '',
})

const calculateSubtotal = () => {
	const value = parseFloat(invoice.value.value.replace(',', '.')) || 0
	return value
}

const calculateFee = () => {
	return calculateSubtotal() * 0.02
}

const calculateTotal = () => {
	return calculateSubtotal() + calculateFee()
}

const formatCurrency = (value: number) => {
	return value.toFixed(2).replace('.', ',')
}

const processPayment = () => {
	console.log('Processando pagamento:', {
		invoice: invoice.value,
		payment: payment.value,
		total: calculateTotal(),
	})
}

const cancel = () => {
	invoice.value = { value: '', description: '' }
	payment.value = {
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		cardholderName: '',
	}

	router.push('/invoices/list')
}
</script>

<template>
	<v-container class="py-8">
		<v-sheet class="pa-8 rounded-lg mx-auto" max-width="580" elevation="10">
			<v-card-title class="text-h4 px-0 mx-0 font-weight-medium">
				Criar Nova Fatura
			</v-card-title>
			<v-card-subtitle class="mb-6 px-0 mx-0">
				Preencha os dados abaixo para processar um novo pagamento
			</v-card-subtitle>

			<v-form @submit.prevent="processPayment">
				<v-row>
					<v-col cols="12">
						<v-label class="mb-2 font-weight-medium">Valor</v-label>
						<v-text-field
							v-model="invoice.value"
							density="compact"
							prefix="R$"
							placeholder="0,00"
							variant="outlined"
							hide-details
							class="mb-4"
						></v-text-field>

						<v-label class="mb-2 font-weight-medium">Descrição</v-label>
						<v-textarea
							v-model="invoice.description"
							density="compact"
							placeholder="Descreva o motivo do pagamento"
							variant="outlined"
							hide-details
							no-resize
						></v-textarea>
					</v-col>

					<v-col cols="12">
						<v-sheet class="pa-4 rounded" border="sm">
							<p class="font-weight-medium mb-4">Dados do Cartão</p>
							<v-label class="mb-2 font-weight-medium"
								>Número do Cartão</v-label
							>
							<v-text-field
								v-model="payment.cardNumber"
								density="compact"
								placeholder="0000 0000 0000 0000"
								variant="outlined"
								hide-details
								class="mb-4"
								append-inner-icon="mdi-credit-card-outline"
							></v-text-field>

							<v-row>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium"
										>Data de Expiração</v-label
									>
									<v-text-field
										v-model="payment.expiryDate"
										density="compact"
										placeholder="MM/AA"
										variant="outlined"
										hide-details
										class="mb-4"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium">CVV</v-label>
									<v-text-field
										v-model="payment.cvv"
										density="compact"
										placeholder="123"
										variant="outlined"
										hide-details
										class="mb-4"
									></v-text-field>
								</v-col>
							</v-row>

							<v-label class="mb-2 font-weight-medium">Nome no Cartão</v-label>
							<v-text-field
								v-model="payment.cardholderName"
								density="compact"
								placeholder="Como aparece no cartão"
								variant="outlined"
								hide-details
							></v-text-field>
						</v-sheet>
					</v-col>
				</v-row>

				<v-sheet class="mt-6 pa-4 rounded" border="sm">
					<v-row class="py-2">
						<v-col cols="6">
							<p class="">Subtotal</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="">R$ {{ formatCurrency(calculateSubtotal()) }}</p>
						</v-col>
					</v-row>
					<v-row class="py-2">
						<v-col cols="6">
							<p class="">Taxa de Processamento (2%)</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="">R$ {{ formatCurrency(calculateFee()) }}</p>
						</v-col>
					</v-row>
					<v-divider class="border-opacity-25"></v-divider>
					<v-row class="py-2">
						<v-col cols="6">
							<p class="font-weight-medium">Total</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-weight-medium">
								R$ {{ formatCurrency(calculateTotal()) }}
							</p>
						</v-col>
					</v-row>
				</v-sheet>

				<div class="d-flex justify-end mt-6">
					<v-btn variant="flat" class="mr-4" @click="cancel"> Cancelar </v-btn>
					<v-btn
						color="primary"
						variant="flat"
						type="submit"
						prepend-icon="mdi-lock"
					>
						Processar Pagamento
					</v-btn>
				</div>
			</v-form>
		</v-sheet>
	</v-container>
</template>
