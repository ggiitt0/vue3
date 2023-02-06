<template>
	<div class="logo">
		<img src="@/assets/logo.png" alt="logo" />
		<!-- <span v-show="!isCollapse">不错诶</span> -->
	</div>
</template>

<script setup>
// defineProps({
//   isCollapse:Boolean
// });
</script>
<style scoped lang="less">
.logo{
	width: 60px;
	img{
		width: 100%;
		height: 100%;
	}
}
</style>


