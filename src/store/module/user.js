import { getInfo, login, loginOut } from "@/api/user";
import { setToken, getToken, removeToken } from "../../utils/auth";
const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],//角色
    permissions: [],//权限
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_AVATAR(state, img) {
      state.avatar = img;
    },
    SET_ROLRS(state, roles) {
      state.roles = roles;
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            if (res.data.code == 200) {
              // const { access_token, time } = res.data;
              const {token} = res.data;
              setToken(token);
              commit("SET_TOKEN", token);
            }
            resolve(res.data)
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.data;
            commit("SET_NAME", user.name || "");
            commit("SET_AVATAR", user.avatar || "");
            commit("SET_ROLRS", user.roles || ["ROLE_DEFAULT"]);
            commit("SET_PERMISSIONS", user.permissions || []);
            resolve(res)
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // LoginOut({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     loginOut()
    //       .then(() => {
    //         commit("SET_TOKEN", "");
    //         commit("SET_ROLES", []);
    //         commit("SET_PERMISSIONS", []);
    //         removeToken();
    //         resolve();
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
  },
};

export default user