<template>
	<div>
		about
		<ElForm ref="formRef"></ElForm>
		<tag text="tt" theme="red"></tag>
	</div>
</template>
<script setup lang="ts">
import { ElForm } from 'element-plus';
import { ref } from 'vue';
import { useCompRef } from '@/hooks/useCompRef';

// const formRef = ref<InstanceType<typeof ElForm>>();
const formRef = useCompRef<typeof ElForm>();
// formRef.value?
</script>
