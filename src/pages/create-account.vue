<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useNotify } from '@/composables/useNotify'

import { useAuthStore } from '@/stores/auth'

import { createAccount } from '@/services/api/resources'

const router = useRouter()
const authStore = useAuthStore()
const { notifyError } = useNotify()

const validationSchema = yup.object({
	name: yup.string().required('Field required'),
	email: yup.string().email('Email inválido').required('Field required'),
})

const { meta, errors, defineField, handleSubmit, isSubmitting } = useForm({
	validationSchema,
	initialValues: {
		name: '',
		email: '',
	},
})

const [name] = defineField('name')
const [email] = defineField('email')

const handleSubmitForm = handleSubmit(async ({ name, email }) => {
	try {
		await createAccount({
			name,
			email,
		})

		router.push('/?acc=1')
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
					<h1 class="text-h4 font-weight-medium mb-1">Create Account</h1>
				</div>
			</div>

			<v-card-text>
				<v-form @submit.prevent="handleSubmitForm">
					<v-row>
						<v-col cols="12">
							<p class="font-weight-medium mb-2">Name *</p>
							<v-text-field
								v-model="name"
								autofocus
								clearable
								class="rounded-r-0"
								density="compact"
								placeholder="Enter your name"
								:error-messages="errors.name"
								:disabled="isSubmitting"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12">
							<p class="font-weight-medium mb-2">Email *</p>
							<v-text-field
								v-model="email"
								clearable
								class="rounded-r-0"
								density="compact"
								placeholder="Enter your email"
								:error-messages="errors.email"
								:disabled="isSubmitting"
								@keypress.enter="handleSubmitForm"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12">
							<div class="d-flex justify-end">
								<v-btn
									color="primary"
									type="submit"
									size="large"
									:disabled="!meta.valid"
									:loading="isSubmitting"
								>
									<span>Create Account</span>
								</v-btn>
							</div>
						</v-col>
					</v-row>

					<v-card class="mt-6" variant="flat">
						<div class="d-flex align-center mb-2">
							<v-icon color="primary" class="mr-2"
								>mdi-information-outline</v-icon
							>
							<span class="font-weight-medium">Already have an account?</span>
						</div>
						<v-btn
							block
							class="mt-6"
							variant="tonal"
							color="primary"
							size="large"
							to="/"
							:disabled="isSubmitting"
							>Authenticate</v-btn
						>
					</v-card>
				</v-form>
			</v-card-text>
		</v-sheet>
	</v-container>
</template>
