<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useNotifyStore } from '@/stores/notify'
import { useCustomizerStore } from '@/stores/customizer'

const notifyStore = useNotifyStore()

const customizer = useCustomizerStore()
</script>

<template>
	<v-app :theme="customizer.actTheme">
		<RouterView />

		<v-snackbar
			v-model="notifyStore.snackbar.visible"
			:color="notifyStore.snackbar.color"
			:timeout="notifyStore.snackbar.timeout"
		>
			<span class="fs-16">{{ notifyStore.snackbar.message }}</span>
			<template #actions>
				<v-btn
					icon="mdi-close"
					size="small"
					@click="notifyStore.snackbar.visible = false"
				>
				</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>
