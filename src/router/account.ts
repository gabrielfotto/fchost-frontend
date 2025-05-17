const routes = {
	path: '/',
	meta: {
		requiresAuth: false,
	},
	component: () => import('@/layouts/blank/BlankLayout.vue'),
	children: [
		{
			name: '',
			path: '/account/create',
			component: () => import('@/pages/create-account.vue'),
		},
	],
}

export default routes
