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
			meta: {
				title: '项目介绍',
				isShow: true
			},
			children: []
		},
		{
			path: '/auth',
			name: 'authPage',
			component: () => import('@/views/auth/index.vue'),
			meta: {
				title: '权限模块',
				isShow: true
			},
			children: []
		},
		{
			path: '/role',
			name: 'rolePage',
			component: () => import('@/views/role/index.vue'),
			meta: {
				title: '角色模块',
				isShow: true
			},
			children: []
		},
		{
			path: '/user',
			name: 'userPage',
			component: () => import('@/views/user/index.vue'),
			meta: {
				title: '用户模块',
				isShow: true
			},
			children: []
		}
	]
};
