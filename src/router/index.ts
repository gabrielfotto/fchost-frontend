import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './auth'
import machinesRoutes from './machines'
import invoicesRoutes from './invoices'
import transactionsRoutes from './transactions'

import { useAuthStore } from '@/stores/auth'

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/:pathMatch(.*)*',
		// 	component: () => import('@/views/authentication/Error.vue'),
		// },
		authRoutes,
		machinesRoutes,
		invoicesRoutes,
		transactionsRoutes,
	],
})

router.beforeEach(async (to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/']
	const authRequired = !publicPages.includes(to.path)
	const authStore: any = useAuthStore()

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (authRequired && !authStore.acc) {
			authStore.returnUrl = to.fullPath
			return next('/')
		} else next()
	} else if (authStore.acc) {
		next('/machines')
	} else {
		next()
	}
})
