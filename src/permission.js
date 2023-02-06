import { ElMessage } from "element-plus";
import router from "./router";
import store from "./store";
import { getToken } from "./utils/auth";
const whiteList = ["/login", "/error"];
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // to.meta.title && store.dispatch("settings/setTitle", to.meta.title);
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (store.state.user.roles.length === 0) {
        store
          .dispatch("GetUserInfo")
          .then(() => {
            store.dispatch("GreateRoutes").then(({data}) => {
              // 根据roles权限生成可访问的路由表
              data.data.forEach((route) => {
                if (route.path.slice(0,1)==="/") {//不是http/https走这个
                  console.log(route);
                  router.addRoute(route); // 动态添加可访问路由表
                }
              });
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
          })
          .catch((err) => {
            store.dispatch("LogOut").then(() => {
              ElMessage.error(err);
              next({ path: "/" });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
  }
});
