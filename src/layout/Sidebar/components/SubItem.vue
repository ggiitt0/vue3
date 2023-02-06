<script setup>
defineProps({
  menuList: Array,
});
</script>
<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <!-- 父级存在子元素 -->
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 0"
      :index="subItem.path"
    >
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubItem :menuList="subItem.children" />
    </el-sub-menu>
    <!-- 父级没有子元素 -->
    <el-menu-item v-else :index="subItem.path">
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <!-- 子级不是链接 -->
      <template v-if="!subItem.isLink" #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <!-- 子级是链接 -->
      <template v-else #title>
        <a class="menu-href" :href="subItem.isLink" target="_blank">{{
          subItem.meta.title
        }}</a>
      </template>
    </el-menu-item>
  </template>
</template>
