const routes = {
	path: '/invoices',
	meta: {
		requiresAuth: false,
	},
	redirect: '/invoices/create',
	component: () => import('@/layouts/full/FullLayout.vue'),
	children: [
		{
			name: '',
			path: '/invoices/create',
			component: () => import('@/pages/invoice-create.vue'),
		},
		{
			name: '',
			path: '/invoices/view',
			component: () => import('@/pages/invoice-view.vue'),
		},
		{
			name: '',
			path: '/invoices/list',
			component: () => import('@/pages/invoice-list.vue'),
		},
	],
}

export default routes
