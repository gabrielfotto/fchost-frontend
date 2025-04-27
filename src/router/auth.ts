const routes = {
	path: '/',
	meta: {
		requiresAuth: false,
	},
	redirect: '/',
	component: () => import('@/layouts/blank/BlankLayout.vue'),
	children: [
		{
			name: '',
			path: '/',
			component: () => import('@/pages/auth.vue'),
		},
	],
}

export default routes
