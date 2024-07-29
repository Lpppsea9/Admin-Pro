<template>
	<el-container>
		<el-header>
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-active="activeMenu" class="el-menu-vertical-demo" router>
					<!-- <el-menu-item index="/">项目介绍</el-menu-item>
					<el-menu-item index="/user"> 用户列表 </el-menu-item>
					<el-menu-item index="/role"> 角色列表 </el-menu-item>
					<el-menu-item index="/auth"> 权限列表 </el-menu-item> -->
					<template v-for="menu in menuList" :key="menu.path">
						<el-sub-menu v-if="menu.children" :index="menu.path">
							<template #title>{{ menu.meta!.title }}</template>
							<el-menu-item v-for="subMenu in menu.children" :key="subMenu.path" :index="subMenu.path">
								{{ subMenu.meta!.title }}
							</el-menu-item>
						</el-sub-menu>
						<el-menu-item v-else :index="menu.path">
							<span> {{ menu.meta!.title }}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</el-aside>
			<el-main>
				<el-breadcrumb :separator-icon="ArrowRight">
					<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
					<el-breadcrumb-item>promotion management</el-breadcrumb-item>
					<el-breadcrumb-item>promotion list</el-breadcrumb-item>
					<el-breadcrumb-item>promotion detail</el-breadcrumb-item>
				</el-breadcrumb>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
// const menuList = router.getRoutes().filter((rItem) => {
// 	return rItem.meta.isShow;
// });
const menuList = router.options.routes[0].children!.filter((item) => item.meta?.isShow);
const activeMenu = route.path;
</script>

<style lang="less" scoped>
.el-header {
	padding: 0;
	margin-bottom: 5px;
}

.el-container {
	height: 100%;

	.el-menu {
		height: 100%;
	}
}

.el-breadcrumb {
	margin-bottom: 10px;
}
</style>
