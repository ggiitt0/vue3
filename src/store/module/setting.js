import defaultSettings from "@/settings";
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const {
  sideTheme,
  showSettings,
  topNav,
  tagsView,
  fixedHeader,
  sidebarLogo,
  dynamicTitle,
} = defaultSettings;

const state = {
  title: "",
  theme: storageSetting.theme || "#409EFF",
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  tagsView:
    storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader:
    storageSetting.fixedHeader === undefined
      ? fixedHeader
      : storageSetting.fixedHeader,
  sidebarLogo:
    storageSetting.sidebarLogo === undefined
      ? sidebarLogo
      : storageSetting.sidebarLogo,
  dynamicTitle:
    storageSetting.dynamicTitle === undefined
      ? dynamicTitle
      : storageSetting.dynamicTitle,
};
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};
const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
  setTitle({ commit }, title) {
    state.title = title;
    if (state.settings.dynamicTitle) {
      document.title = state.settings.title + " - " + defaultSettings.title;
    } else {
      document.title = defaultSettings.title;
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
