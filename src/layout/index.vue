<script setup>
import Menu from "./Sidebar/index.vue";
</script>

<template>
  <div class="layout">
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-main>
        <router-view v-slot="{ Component, route }">
          <!-- <transition appear name="fade-transform" mode="out-in"> -->
            <keep-alive :include="cacheRouter">
              <component :is="Component" :key="route.path"></component>
            </keep-alive>
          <!-- </transition> -->
        </router-view>
    </el-main>
  </div>
</template>

<style scoped lang="less">
.layout {
  height: 100%; 
}
.el-aside {
  height: 100%;
  display: inline-block;
  background-color: rgb(3, 250, 250);
}
.el-main {
  width: calc(100% - 300px);
  display: inline-block !important;
  height: 100%;
  background-color: rgb(239, 246, 252);
}
</style>
