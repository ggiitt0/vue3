import { getRouters } from "@/api/menu"
import constantRoutes from '@/router'
const modules = import.meta.glob('./../../views/**/*.vue')

const permissions = {
  state:{
    routes:[],//路由

		menuList: [],//菜单

		isCollapse: false,//折叠菜单

    subItem:[]//回显菜单
  },
  mutations:{
    SET_ROUTES: (state, routes) => {
      state.routes = constantRoutes.concat(routes)
    },
    SET_MENULIST: (state, list) => {
      state.menuList = list
    },
    SET_SUBITEM: (state, list) => {
      state.subItem = list
    },
  },
  actions:{
    GreateRoutes({commit}){
      return new Promise((resolve,reject)=>{
        getRouters().then((res)=>{
          resolve(res)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
  }
}
export const loadView=(view)=>{
  let res;
  for(const path in modules){
    const dir = path.split('views/')[1].split(".vue")[0]
    if(dir === view){
      res = () => modules[path]();
    }
  }
  return res;
}
export default permissions