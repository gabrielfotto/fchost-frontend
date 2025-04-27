<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { toCurrency } from '@/utils/to-currency'
import { useNotify } from '@/composables/useNotify'

import { addAccountBalance } from '@/services/api'

const { notifyError, notifySuccess } = useNotify()

const router = useRouter()

const validationSchema = yup.object({
	amount: yup.string().required('Campo obrigatório'),
	cardNumber: yup.string().required('Campo obrigatório'),
	expiryDate: yup.string().required('Campo obrigatório'),
	cvv: yup.string().required('Campo obrigatório'),
	cardholderName: yup.string().required('Campo obrigatório'),
})

const { meta, errors, defineField, handleSubmit, isSubmitting } = useForm({
	validationSchema,
	initialValues: {
		amount: 0,
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		cardholderName: '',
	},
})

const [amount] = defineField('amount')
const [cardNumber] = defineField('cardNumber')
const [expiryDate] = defineField('expiryDate')
const [cvv] = defineField('cvv')
const [cardholderName] = defineField('cardholderName')

const handleSubmitForm = handleSubmit(async values => {
	try {
		await addAccountBalance(values)
		notifySuccess('Request sent')
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Error')
	}
})
</script>

<template>
	<v-container class="py-8">
		<v-sheet class="pa-8 rounded-lg mx-auto" max-width="580" elevation="10">
			<v-card-title class="text-h4 px-0 mx-0 font-weight-medium">
				Adicionar saldo
			</v-card-title>
			<v-card-subtitle class="mb-6 px-0 mx-0">
				Preencha os dados abaixo para processar um novo pagamento
			</v-card-subtitle>

			<v-form @submit.prevent="handleSubmitForm">
				<v-row>
					<v-col cols="12">
						<v-label class="mb-2 font-weight-medium">Valor</v-label>
						<CurrencyField
							v-model="amount"
							density="compact"
							prefix="R$"
							placeholder="0,00"
							variant="outlined"
							class="mb-4"
							clearable
							:error-messages="errors.amount"
						></CurrencyField>

						<!-- <v-label class="mb-2 font-weight-medium">Descrição</v-label>
						<v-textarea
							v-model="invoice.description"
							density="compact"
							placeholder="Descreva o motivo do pagamento"
							variant="outlined"
							no-resize
						></v-textarea> -->
					</v-col>

					<v-col cols="12">
						<v-sheet class="pa-4 rounded" border="sm">
							<p class="font-weight-medium mb-4">Dados do Cartão</p>
							<v-label class="mb-2 font-weight-medium"
								>Número do Cartão</v-label
							>
							<v-text-field
								v-model="cardNumber"
								density="compact"
								placeholder="0000 0000 0000 0000"
								variant="outlined"
								class="mb-4"
								append-inner-icon="mdi-credit-card-outline"
								v-maska="'#### #### #### ####'"
								clearable
								:error-messages="errors.cardNumber"
							></v-text-field>

							<v-row>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium"
										>Data de Expiração</v-label
									>
									<v-text-field
										v-model="expiryDate"
										density="compact"
										placeholder="MM/AA"
										variant="outlined"
										class="mb-4"
										v-maska="'##/##'"
										clearable
										:error-messages="errors.expiryDate"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium">CVV</v-label>
									<v-text-field
										v-model="cvv"
										density="compact"
										placeholder="123"
										variant="outlined"
										class="mb-4"
										v-maska="'###'"
										clearable
										:error-messages="errors.cvv"
									></v-text-field>
								</v-col>
							</v-row>

							<v-label class="mb-2 font-weight-medium">Nome no Cartão</v-label>
							<v-text-field
								v-model="cardholderName"
								density="compact"
								placeholder="Como aparece no cartão"
								variant="outlined"
								clearable
								:error-messages="errors.cardholderName"
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
							<p class="">{{ toCurrency(0) }}</p>
						</v-col>
					</v-row>
					<!-- <v-row class="py-2">
						<v-col cols="6">
							<p class="">Taxa de Processamento (2%)</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="">R$ {{ formatCurrency(calculateFee()) }}</p>
						</v-col>
					</v-row>
					<v-divider class="border-opacity-25"></v-divider> -->
					<v-row class="py-2">
						<v-col cols="6">
							<p class="font-weight-medium">Total</p>
						</v-col>
						<v-col cols="6" class="text-right">
							<p class="font-weight-medium">
								{{ toCurrency(0) }}
							</p>
						</v-col>
					</v-row>
				</v-sheet>

				<div class="d-flex justify-end mt-6">
					<!-- <v-btn variant="flat" class="mr-4" @click="cancel"> Cancelar </v-btn> -->
					<v-btn
						color="primary"
						variant="flat"
						type="submit"
						prepend-icon="mdi-lock"
						:disabled="!meta.valid"
						:loading="isSubmitting"
					>
						Processar Pagamento
					</v-btn>
				</div>
			</v-form>
		</v-sheet>
	</v-container>
</template>
