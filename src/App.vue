<script setup>
import { ElConfigProvider } from "element-plus";
</script>
<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<style lang="less" scoped></style>
