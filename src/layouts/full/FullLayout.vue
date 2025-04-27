<script setup lang="ts">
import { RouterView } from 'vue-router'
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue'
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue'
import HorizontalHeader from './horizontal-header/HorizontalHeader.vue'
import HorizontalSidebar from './horizontal-sidebar/HorizontalSidebar.vue'
import Customizer from './customizer/Customizer.vue'
import { useCustomizerStore } from '../../stores/customizer'
import { pl, zhHans } from 'vuetify/locale'

import { useNotifyStore } from '@/stores/notify'

const notifyStore = useNotifyStore()

const customizer = useCustomizerStore()
</script>

<template>
	<v-locale-provider>
		<v-app
			:theme="customizer.actTheme"
			:class="[
				customizer.actTheme,
				customizer.mini_sidebar ? 'mini-sidebar' : '',
				customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
				customizer.setBorderCard ? 'cardBordered' : '',
			]"
		>
			<Customizer />
			<VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
			<VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
			<HorizontalHeader v-if="customizer.setHorizontalLayout" />
			<HorizontalSidebar v-if="customizer.setHorizontalLayout" />

			<v-main>
				<v-container fluid class="page-wrapper pb-sm-15 pb-10">
					<div :class="customizer.boxed ? 'maxWidth' : ''">
						<RouterView />
						<!-- <v-btn
							class="customizer-btn"
							size="large"
							icon
							variant="flat"
							color="primary"
							@click.stop="
								customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)
							"
						>
							<SettingsIcon />
						</v-btn> -->
					</div>
				</v-container>
			</v-main>

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
	</v-locale-provider>
</template>
