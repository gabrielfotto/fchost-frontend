<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useNotify } from '@/composables/useNotify'

import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const { notifyError } = useNotify()

const isAccCreated = computed(() => route.query?.acc)

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
		<v-sheet width="560" class="pa-8 rounded" elevation="10">
			<div class="d-flex flex-wrap justify-center align-center mb-6">
				<div class="text-center">
					<h1 class="text-h4 font-weight-medium mb-1">Autenticação Gateway</h1>
					<span class="fs-14">Insira sua API Key para acessar o sistema</span>
				</div>
			</div>

			<v-card-text>
				<v-form @submit.prevent="handleSubmitForm">
					<v-row>
						<v-col cols="12">
							<p class="font-weight-medium mb-2">API Key *</p>
							<v-text-field
								v-model="apiKey"
								autofocus
								clearable
								class="rounded-r-0"
								density="compact"
								placeholder="Digite sua API Key"
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

					<v-row v-if="isAccCreated">
						<v-col cols="12">
							<v-alert density="comfortable" type="success" variant="outlined">
								<template #title>
									<h4 class="font-weight-medium mb-2">Conta criada!</h4>
								</template>
								<template #text>
									<div class="d-flex flex-column">
										<p class="fs-16">
											Sua chave de API foi enviada para o seu e-mail.
										</p>
										<br />
										<p class="fs-16">
											Não se esqueça de verificar também a caixa de spam ou lixo
											eletrônico.
										</p>
									</div>
								</template>
							</v-alert>
						</v-col>
					</v-row>

					<v-card class="mt-6" variant="flat">
						<div class="d-flex align-center mb-2">
							<v-icon color="primary" class="mr-2"
								>mdi-information-outline</v-icon
							>
							<span class="font-weight-medium">Não tem conta?</span>
						</div>
						<v-btn
							block
							class="mt-6"
							variant="tonal"
							color="primary"
							size="large"
							to="/account/create"
							:disabled="isSubmitting"
							>Criar conta</v-btn
						>
					</v-card>
				</v-form>
			</v-card-text>
		</v-sheet>
	</v-container>
</template>
