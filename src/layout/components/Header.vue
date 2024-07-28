<template>
	<div class="header">
		<div class="flex-center">logo区域</div>
		<div class="flex-grow"></div>
		<div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user>{{ userName }}</div>
		<div class="flex-center m05 color-dark-black" @click="handerSetting">
			<i-ep-setting class="icon-action"></i-ep-setting>
		</div>
		<div>
			<el-drawer v-model="isShowSetting" :show-close="false" :with-header="false">
				<div class="setting-header">
					<h2>项目配置</h2>
					<i-ep-close class="icon-action" @click="handerClose"></i-ep-close>
				</div>
				<div class="out">
					<el-button type="primary" @click="handerLogout">登出</el-button>
				</div>
			</el-drawer>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStoreHook } from '@/store/user';

const router = useRouter();
const userStore = useUserStoreHook();
const userName = userStore.username;
let isShowSetting = ref(false);

function handerSetting() {
	isShowSetting.value = true;
}

function handerClose() {
	isShowSetting.value = false;
}

function handerLogout() {
	sessionStorage.removeItem('userInfo');
	router.push('/login');
}
</script>
<style lang="less" scoped>
.header {
	display: flex;
	padding: 0 15px;
	width: 100%;
	height: 60px;
	box-shadow: 0 0 20px rgb(195 223 252 / 40%);

	.menu {
		width: max-content;
		height: 100%;
	}
	// 去除菜单底部边框
	.el-menu--horizontal {
		border-bottom: none;
	}
}

.setting-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.icon-action {
	cursor: pointer;
}

.out {
	display: flex;
	justify-content: center;
}
</style>
