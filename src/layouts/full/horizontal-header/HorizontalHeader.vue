<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCustomizerStore } from '@/stores/customizer'

import { getAccountBalance } from '@/services/api/resources'

// Icon Imports
import { GridDotsIcon, Menu2Icon } from 'vue-tabler-icons'
import Logo from '../logo/Logo.vue'

// dropdown imports
import Navigations from '../vertical-header/Navigations.vue'
import RightMobileSidebar from '../vertical-header/RightMobileSidebar.vue'

import { useAuthStore } from '@/stores/auth'
import { toCurrency } from '@/utils/to-currency'

const authStore = useAuthStore()

const customizerStore = useCustomizerStore()
const appsdrawer = ref(false)
const priority = ref(customizerStore.setHorizontalLayout ? 0 : 0)

const accountBalance = ref()
const fetchAccountBalanceInterval = ref()

watch(priority, newPriority => {
	// yes, console.log() is a side effect
	priority.value = newPriority
})

async function handleGetAccountBalance() {
	if (!authStore.acc) {
		return
	}

	try {
		accountBalance.value = await getAccountBalance(authStore.acc.id)
	} catch (error) {}
}

onMounted(async () => {
	accountBalance.value = authStore.acc?.balance || 0
	await handleGetAccountBalance()

	fetchAccountBalanceInterval.value = setInterval(async () => {
		await handleGetAccountBalance()
	}, 60000)
})
</script>

<template>
	<v-app-bar
		elevation="10"
		:priority="priority"
		height="70"
		class="horizontal-header"
	>
		<div
			:class="
				customizerStore.boxed
					? 'maxWidth v-toolbar__content'
					: 'v-toolbar__content px-6'
			"
		>
			<div class="hidden-md-and-down">
				<!-- <Logo /> -->
				<span class="text-h2 font-weight-medium mr-4">FCHost</span>
			</div>
			<v-btn
				class="hidden-lg-and-up ms-3"
				icon
				rounded="sm"
				variant="flat"
				@click.stop="customizerStore.SET_SIDEBAR_DRAWER"
				size="small"
			>
				<Menu2Icon size="20" stroke-width="1.5" />
			</v-btn>

			<div class="hidden-md-and-down ml-6">
				<Navigations />
			</div>

			<v-spacer />
			<!-- ---------------------------------------------- -->
			<!-- translate -->
			<!-- ---------------------------------------------- -->
			<!-- <LanguageDD /> -->

			<div class="d-flex align-center">
				<v-chip
					:color="accountBalance === 0 ? 'error' : 'success'"
					variant="flat"
					label
					:style="{ height: '36px' }"
				>
					<span class="font-weight-medium"
						>Balance:
						{{ toCurrency(accountBalance, { currency: 'USD' }) }}</span
					>
				</v-chip>
				<v-btn
					:ripple="false"
					class="ml-3"
					to="/account/balance/add"
					variant="tonal"
				>
					<v-icon>mdi-plus</v-icon>
					<span>Add</span>
				</v-btn>
			</div>

			<v-divider vertical class="mx-6"></v-divider>

			<v-tooltip
				v-if="customizerStore.actTheme.includes('DARK')"
				location="bottom"
			>
				<template #activator="{ props }">
					<v-btn
						v-bind="props"
						@click="customizerStore.SET_THEME('PURPLE_THEME')"
						icon="mdi-white-balance-sunny"
						size="small"
					>
					</v-btn>
				</template>
				<span>Light</span>
			</v-tooltip>

			<v-tooltip v-else location="bottom">
				<template #activator="{ props }">
					<v-btn
						v-bind="props"
						@click="customizerStore.SET_THEME('DARK_PURPLE_THEME')"
						icon="mdi-moon-waxing-gibbous"
						size="small"
					>
					</v-btn>
				</template>
				<span>Dark</span>
			</v-tooltip>

			<!-- right sidebar -->
			<v-btn
				class="hidden-lg-and-up ml-3"
				icon
				rounded="sm"
				@click.stop="appsdrawer = !appsdrawer"
				variant="flat"
			>
				<GridDotsIcon size="17" stroke-width="1.5" />
			</v-btn>

			<v-btn
				color="error"
				variant="outlined"
				class="ml-4"
				@click="authStore.logout()"
			>
				<span>Logout</span>
				<v-icon end>mdi-logout</v-icon>
			</v-btn>
		</div>
	</v-app-bar>

	<v-navigation-drawer v-model="appsdrawer" location="right" temporary>
		<RightMobileSidebar />
	</v-navigation-drawer>
</template>
