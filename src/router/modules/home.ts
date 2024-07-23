export default {
	path: '/',
	name: 'layout',
	component: () => import('@/layout/index.vue'),
	meta: {},
	children: [
		{
			path: '/',
			name: 'homePage',
			component: () => import('@/views/home/index.vue'),
			meta: {},
			children: []
		}
	]
};
