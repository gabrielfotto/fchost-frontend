<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useNotify } from '@/composables/useNotify'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { notifyError } = useNotify()

const validationSchema = yup.object({
	apiKey: yup.string().required('Campo obrigatório'),
})

const { meta, errors, defineField, handleSubmit, isSubmitting } = useForm({
	validationSchema,
	initialValues: {
		apiKey: '',
	},
})

const [apiKey] = defineField('apiKey')

const handleSubmitForm = handleSubmit(async ({ apiKey }) => {
	try {
		await authStore.login(apiKey)
	} catch (error: any) {
		notifyError(error?.response?.data?.message || 'Error')
	}
})
</script>

<template>
	<v-container class="d-flex align-center justify-center" style="height: 100%">
		<v-sheet width="600" class="pa-8 rounded" elevation="10">
			<v-card-title class="text-center text-h4 font-weight-medium">
				Autenticação Gateway
			</v-card-title>
			<v-card-subtitle class="text-center mb-6">
				Insira sua API Key para acessar o sistema
			</v-card-subtitle>

			<v-card-text>
				<v-form @submit.prevent="handleSubmitForm">
					<p class="font-weight-medium mb-2">API Key *</p>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="apiKey"
								density="compact"
								placeholder="Digite sua API Key"
								class="rounded-r-0"
								:error-messages="errors.apiKey"
								:disabled="isSubmitting"
							>
								<template #append>
									<v-btn
										color="primary"
										height="48"
										width="100%"
										class="rounded-l-0"
										type="submit"
										:disabled="!meta.valid"
										:loading="isSubmitting"
									>
										<v-icon>mdi-arrow-right</v-icon>
									</v-btn>
								</template>
							</v-text-field>
						</v-col>
					</v-row>

					<v-card class="mt-6 pa-4" variant="outlined">
						<div class="d-flex align-center mb-2">
							<v-icon color="primary" class="mr-2"
								>mdi-information-outline</v-icon
							>
							<span class="font-weight-medium">Como obter uma API Key?</span>
						</div>
						<p class="text-grey-lighten-1 text-body-2">
							Para obter sua API Key, você precisa criar uma conta de
							comerciante. Entre em contato com nosso suporte para mais
							informações.
						</p>
					</v-card>
				</v-form>
			</v-card-text>
		</v-sheet>
	</v-container>
</template>
