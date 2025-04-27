<script setup lang="ts">
import { ref } from 'vue'

const apiKey = ref('')

const submitForm = () => {
	console.log('Enviando API Key:', apiKey.value)
}
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
				<v-form @submit.prevent="submitForm">
					<p class="font-weight-medium mb-2">API Key</p>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="apiKey"
								density="compact"
								placeholder="Digite sua API Key"
								hide-details
								class="rounded-r-0"
							>
								<template #append>
									<v-btn
										color="primary"
										height="48"
										width="100%"
										class="rounded-l-0"
										type="submit"
										:disabled="!apiKey"
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
