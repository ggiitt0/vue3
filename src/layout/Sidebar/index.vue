<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getRouters } from "@/api/menu";
import SubItem from "./components/SubItem.vue";
import Logo from "./components/Logo.vue";
import { handleRouter } from "@/utils";
import store from "@/store";
const route = useRoute();
const loading = ref(false);
const menuList = reactive({data:[]});
onMounted(async () => {
  loading.value = true;
  try {
    // 获取菜单
    const res = await getRouters();
    if (!res.data) return;
    const dynamicRouter = handleRouter(res.data.data, []);
    store.commit('SET_MENULIST',dynamicRouter)
    menuList.data=res.data.data
    console.log(menuList);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    class="menu"
    :style="{ width: isCollapse ? '65px' : '220px' }"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="loadingSvg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.01)"
  >
    <Logo :is-collapse="isCollapse"></Logo>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#ffffff"
        text-color="#bdbdc0"
        active-text-color="#fff"
      >
        <SubItem :menuList="menuList.data"></SubItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="less">
.menu {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  .logo {
    box-sizing: border-box;
    height: 55px;
    border-bottom: 1px solid #282a35;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    span {
      font-size: 22px;
      font-weight: bold;
      color: #dadada;
      white-space: nowrap;
    }
    img {
      width: 30px;
      object-fit: contain;
      margin-right: 8px;
    }
  }
  .el-scrollbar {
    height: calc(100% - 55px);
    .el-menu {
      flex: 1;
      overflow: auto;
      overflow-x: hidden;
      border-right: none;
    }
  }
}
.el-menu,
.el-menu--popup {
  .el-menu-item {
    &.is-active {
      background-color: #060708;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        content: "";
      }
    }
  }
}
.menu-href {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #bdbdc0;
  text-decoration: none;
}
</style>
