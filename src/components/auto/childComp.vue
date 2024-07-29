<template>
	<div class="content-wrap">
		<span ref="tagRef" class=""></span>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	text: {
		type: String,
		default: null
	},
	theme: {
		type: String,
		default: ''
	}
});

const tagRef = ref<HTMLElement>();
onMounted(() => {
	setText();
	setTheme();
});

function setText() {
	tagRef.value!.innerHTML = props.text;
}

function setTheme() {
	tagRef.value!.style.background = props.theme;
}
</script>

<style lang="less" scoped>
.content-wrap {
	background-color: var(--cs-color-dark-black);
}
</style>
