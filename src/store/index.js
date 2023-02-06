import { createStore } from 'vuex'
import user from './module/user'
import permissions from './module/permission'
const store =  createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    permissions
  }
})
export default store