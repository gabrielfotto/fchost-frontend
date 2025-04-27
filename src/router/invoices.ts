const routes = {
	path: '/',
	meta: {
		requiresAuth: true,
	},
	// redirect: '/invoices/list',
	component: () => import('@/layouts/full/FullLayout.vue'),
	children: [
		{
			name: '',
			path: '/account/balance/add',
			component: () => import('@/pages/add-balance.vue'),
		},
		{
			name: '',
			path: '/invoices',
			component: () => import('@/pages/invoices.vue'),
		},
		{
			name: '',
			path: '/invoices/view',
			component: () => import('@/pages/invoice-view.vue'),
		},
	],
}

export default routes
