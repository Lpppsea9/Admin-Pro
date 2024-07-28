<template>
	<div class="wrap-content">
		<el-form :inline="true" :model="searchData" class="search-form">
			<el-form-item label="项目名称">
				<el-input v-model="searchData.title"></el-input>
			</el-form-item>
			<el-form-item label="项目详情">
				<el-input v-model="searchData.introduce"></el-input>
			</el-form-item>
			<el-form-item label="项目详情">
				<el-button type="primary" @click="onSearchGoods">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border style="width: 100%">
			<el-table-column prop="id" label="序号" width="180"></el-table-column>
			<el-table-column prop="title" label="名称" width="180"></el-table-column>
			<el-table-column prop="introduce" label="详情"></el-table-column>
		</el-table>
		<el-pagination
			class="pagination"
			background
			layout="prev, pager, next, sizes"
			:total="searchData.dataCount"
			:page-size="searchData.pageSize"
			:page-sizes="[5, 10, 15, 20]"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { getProjectsList } from '@/api/project';
const userStore = useUserStore();

interface IProject {
	id: number;
	userId: number;
	title: string;
	introduce: string;
}

let projectList = ref<IProject[]>([]);
let searchData = reactive({
	title: '',
	introduce: '',
	currentPage: 1,
	dataCount: 1,
	pageSize: 5
});

const dataList = computed(() =>
	projectList.value.slice(
		(searchData.currentPage - 1) * searchData.pageSize,
		searchData.currentPage * searchData.pageSize
	)
);

onMounted(() => {
	fetchData();
});

function fetchData() {
	getProjectsList({}).then((res) => {
		projectList.value = res.data;
		searchData.dataCount = res.data.length;
	});
}

const onSearchGoods = () => {
	let res: IProject[] = [];
	if (searchData.title || searchData.introduce) {
		if (searchData.title) {
			res = projectList.value.filter((value) => {
				return value.title.indexOf(searchData.title) !== -1;
			});
		}
		if (searchData.introduce) {
			res = projectList.value.filter((value) => {
				return value.introduce.indexOf(searchData.introduce) !== -1;
			});
		}
	} else {
		res = projectList.value;
	}
	projectList.value = res;
	searchData.currentPage = 1;
	searchData.dataCount = projectList.value.length;
};

function handleCurrentChange(page: number) {
	searchData.currentPage = page;
}

function handleSizeChange(size: number) {
	searchData.pageSize = size;
}

// 解决搜索的问题
watch([() => searchData.title, () => searchData.introduce], () => {
	if (!searchData.title && !searchData.introduce) {
		fetchData();
	}
});
</script>
