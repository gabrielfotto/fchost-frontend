import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './auth'
import invoiceRoutes from './invoice'

import { useAuthStore } from '@/stores/auth'

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/:pathMatch(.*)*',
		// 	component: () => import('@/views/authentication/Error.vue'),
		// },
		authRoutes,
		invoiceRoutes,
	],
})

router.beforeEach(async (to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/']
	const authRequired = !publicPages.includes(to.path)
	const auth: any = useAuthStore()

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (authRequired && !auth.user) {
			auth.returnUrl = to.fullPath
			return next('/')
		} else next()
	} else {
		next()
	}
})
