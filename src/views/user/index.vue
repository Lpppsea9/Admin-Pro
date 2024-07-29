<template>
	<div>
		<el-form :inline="true" class="search-form" :model="searchData">
			<el-form-item label="用户名称">
				<el-input v-model="searchData.nickName" placeholder="请输入用户名称"></el-input>
			</el-form-item>

			<el-form-item label="用户角色">
				<el-select v-model="searchData.role">
					<el-option :key="0" label="全部" :value="0" />
					<el-option
						v-for="item in roleWithAuthList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					/>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearchUser">查询</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="userList" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="180" />
			<el-table-column prop="nickName" label="用户昵称" width="180" />
			<el-table-column prop="role" label="用户角色">
				<template #default="scope">
					<el-button v-for="item in scope.row.role" :key="item.role" link type="primary" size="small">
						{{ item.roleName }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="role" label="操作">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<el-dialog v-model="editShow" title="编辑用户信息" :close-on-click-modal="false">
		<el-form :model="editUser">
			<el-form-item label="用户昵称" label-width="120px">
				<el-input v-model="editUser.nickName" class="w192" autocomplete="off" />
			</el-form-item>

			<el-form-item label="用户角色" label-width="120px">
				<el-select v-model="editUser.role" multiple class="m-2" size="large" placeholder="请选择角色">
					<el-option
						v-for="item in roleWithAuthList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					/>
				</el-select>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="editShow = false">取消</el-button>
				<el-button type="primary" @click="ensureEditUser">修改</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import { IQueryUser, IUserEdit, IRoleWithAuth, IUser } from '@/types/common';

const searchData = reactive<IQueryUser>({
	nickName: '',
	role: 0
});

const editShow = ref(false);
const editUser = reactive<IUserEdit>({
	id: 0,
	nickName: '',
	role: [],
	userName: ''
});

// 角色权限列表
let roleWithAuthList = ref<IRoleWithAuth[]>([]);
// 用户列表
let userList = ref<IUser[]>([]);

onMounted(() => {
	fetchUserList();
	fetchRoleList();
});

watch([() => searchData.nickName, () => searchData.role], () => {
	if (searchData.nickName === '' || searchData.role === 0) {
		fetchUserList();
	}
});

const handleSearchUser = () => {
	let res: IUser[] = [];
	if (searchData.nickName || searchData.role) {
		if (searchData.nickName) {
			res = userList.value.filter((item) => {
				return item.nickName.indexOf(searchData.nickName) > -1;
			});
			console.log(searchData.nickName);
		}
		if (searchData.role) {
			res = searchData.nickName ? res : userList.value;
			res = res.filter((item) => {
				return item.role.find((value) => {
					return value.role === searchData.role;
				});
			});
		}
	} else {
		res = userList.value;
	}

	userList.value = res;
};

const fetchUserList = () => {
	getUserList()
		.then((res) => {
			userList.value = res.data;
		})
		.catch((err) => {});
};

const fetchRoleList = () => {
	getRoleList()
		.then((res) => {
			roleWithAuthList.value = res.data;
		})
		.catch((err) => {});
};

const handleEditUser = (row: IUser) => {
	editShow.value = true;
	Object.assign(editUser, {
		...row,
		role: row.role.map((item) => item.role)
	});

	console.log('editUser', editUser);
};

const ensureEditUser = () => {
	editShow.value = false;
	let obj: IUser = userList.value.find((item) => item.id === editUser.id)!;
	console.log('oo', obj);
	obj.nickName = editUser.nickName;
	obj.role = [];
	console.log(editUser);
	roleWithAuthList.value.forEach((element) => {
		if (editUser.role.find((value) => value === element.roleId)) {
			obj.role.push({
				role: element.roleId,
				roleName: element.roleName
			});
		}
	});
};
</script>
