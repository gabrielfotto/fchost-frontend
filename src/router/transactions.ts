const routes = {
	path: '/transactions',
	meta: {
		requiresAuth: true,
	},
	// redirect: '/invoices/list',
	component: () => import('@/layouts/full/FullLayout.vue'),
	children: [
		{
			name: '',
			path: '/transactions',
			component: () => import('@/pages/transactions.vue'),
		},
	],
}

export default routes
