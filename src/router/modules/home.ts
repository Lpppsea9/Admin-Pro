export default {
	path: '/',
	name: 'Layout',
	component: () => import('@/layout/index.vue'),
	meta: {
		roles: ['common', 'admin'],
		parentRouter: 'Layout'
	},
	children: [
		{
			path: '/',
			name: 'homePage',
			component: () => import('@/views/home/index.vue'),
			meta: {
				title: '项目介绍',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/p',
			name: 'ParentPage',
			meta: {
				isShow: true,
				title: '父菜单',
				parentRouter: 'Layout'
			},
			children: [
				{
					path: '/p/child1',
					name: 'Child1',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单1',
						parentRouter: 'ParentPage'
					}
				},
				{
					path: '/p/child2',
					name: 'Child2',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单2',
						parentRouter: 'ParentPage'
					}
				},
				{
					path: '/p/child3',
					name: 'Child3',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单3',
						parentRouter: 'ParentPage'
					}
				},
				{
					path: '/p/child4',
					name: 'Child4',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单4',
						parentRouter: 'ParentPage'
					}
				},
				{
					path: '/p/child5',
					name: 'Child5',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单5',
						parentRouter: 'ParentPage'
					}
				},
				{
					path: '/p/child6',
					name: 'Child6',
					component: () => import('@/components/auto/childComp.vue'),
					meta: {
						isShow: true,
						title: '子菜单6',
						parentRouter: 'ParentPage'
					}
				}
			]
		},
		{
			path: '/project',
			name: 'ProjectPage',
			component: () => import('@/views/project/index.vue'),
			meta: {
				title: '项目模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/auth',
			name: 'authPage',
			component: () => import('@/views/auth/index.vue'),
			meta: {
				title: '权限模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/role',
			name: 'rolePage',
			component: () => import('@/views/role/index.vue'),
			meta: {
				title: '角色模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/user',
			name: 'userPage',
			component: () => import('@/views/user/index.vue'),
			meta: {
				title: '用户模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		}
	]
};
