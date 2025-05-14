const routes = {
	path: '/transactions',
	meta: {
		requiresAuth: true,
	},
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
