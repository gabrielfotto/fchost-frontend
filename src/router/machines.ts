const routes = {
	path: '/machines',
	meta: {
		requiresAuth: true,
	},
	// redirect: '/invoices/list',
	component: () => import('@/layouts/full/FullLayout.vue'),
	children: [
		{
			name: '',
			path: '/machines',
			component: () => import('@/pages/machines.vue'),
		},
		{
			name: '',
			path: '/machines/rent',
			component: () => import('@/pages/rent-machine.vue'),
		},
	],
}

export default routes
