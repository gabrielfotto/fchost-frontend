<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { toCurrency } from '@/utils/to-currency'
import { useNotify } from '@/composables/useNotify'

import { addAccountBalance } from '@/services/api/resources'

const { notifyError, notifySuccess } = useNotify()

const router = useRouter()

const validationSchema = yup.object({
	amount: yup.string().required('Field required'),
	cardNumber: yup.string().required('Field required'),
	expiryDate: yup.string().required('Field required'),
	cvv: yup.string().required('Field required'),
	cardholderName: yup.string().required('Field required'),
})

const { meta, errors, defineField, handleSubmit, isSubmitting } = useForm({
	validationSchema,
	initialValues: {
		amount: 0,
		cardNumber: '5555 5555 5555 5557',
		expiryDate: '10/30',
		cvv: '445',
		cardholderName: 'FCHost LLC - Test',
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
		router.push('/invoices')
		notifySuccess('Request sent')
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Request error')
	}
})
</script>

<template>
	<v-container class="py-8 px-0">
		<v-sheet class="pa-8 rounded-lg mx-auto" max-width="580" elevation="10">
			<div class="d-flex flex-wrap justify-space-between align-center mb-6">
				<div>
					<h1 class="text-h4 font-weight-medium mb-1">Add balance</h1>
					<span class="fs-14"
						>Fill in the details below to process a new payment</span
					>
				</div>
			</div>

			<v-form @submit.prevent="handleSubmitForm">
				<v-row>
					<v-col cols="12">
						<v-label class="mb-2 font-weight-medium">Amount</v-label>
						<CurrencyField
							v-model="amount"
							density="compact"
							currency="USD"
							locale="en-US"
							prefix="$"
							placeholder="0.00"
							variant="outlined"
							class="mb-4"
							clearable
							autofocus
							:error-messages="errors.amount"
							:disabled="isSubmitting"
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
							<p class="font-weight-medium mb-4">Card Details</p>
							<v-label class="mb-2 font-weight-medium">Card Number</v-label>
							<v-text-field
								v-model="cardNumber"
								v-maska="'#### #### #### ####'"
								density="compact"
								placeholder="0000 0000 0000 0000"
								variant="outlined"
								class="mb-4"
								append-inner-icon="mdi-credit-card-outline"
								readonly
								:error-messages="errors.cardNumber"
								:disabled="isSubmitting"
							></v-text-field>

							<v-row>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium"
										>Expiration Date</v-label
									>
									<v-text-field
										v-model="expiryDate"
										v-maska="'##/##'"
										density="compact"
										placeholder="MM/AA"
										variant="outlined"
										class="mb-4"
										readonly
										:error-messages="errors.expiryDate"
										:disabled="isSubmitting"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-label class="mb-2 font-weight-medium">CVV</v-label>
									<v-text-field
										v-model="cvv"
										v-maska="'###'"
										density="compact"
										placeholder="123"
										variant="outlined"
										class="mb-4"
										readonly
										:error-messages="errors.cvv"
										:disabled="isSubmitting"
									></v-text-field>
								</v-col>
							</v-row>

							<v-label class="mb-2 font-weight-medium">Name on Card</v-label>
							<v-text-field
								v-model="cardholderName"
								density="compact"
								placeholder="Como aparece no cartão"
								variant="outlined"
								readonly
								:error-messages="errors.cardholderName"
								:disabled="isSubmitting"
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
							<p class="">{{ toCurrency(amount, { currency: 'USD' }) }}</p>
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
								{{ toCurrency(amount, { currency: 'USD' }) }}
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
						Process Payment
					</v-btn>
				</div>
			</v-form>
		</v-sheet>
	</v-container>
</template>
