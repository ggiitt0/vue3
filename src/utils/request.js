import axios from "axios";
import { getToken } from "./auth";
import errorCode from "./errorCode";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { useStore } from "vuex";
import { saveAs } from "file-saver";

const store = useStore;
axios.defaults.headers["Content-Type"] = "application/json";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
});
service.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer" + getToken();
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (res) => {
    console.log(res);
    // 无状态码默认200成功
    const code = res.data.code || 200;
    const msg = errorCode[code] || res.data.msg;
    if (
      res.request.responseType === "blob" ||
      res.request.response === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      ElMessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      ElMessage({
        message: msg,
        type: "error",
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      ElNotification.error({
        title: msg,
      });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + err);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export function download(url, data, fileName) {
  service({
    url: url,
    method: "POST",
    data: data,
    responseType: "blob",
  }).then((res) => {
    if (res.code == 200) {
      const blob = new Blob([res.data]);
      if (navigator.msSaveBlob) {
        // 兼容IE
        navigator.msSaveBlob(blob, fileName);
      } else {
        // saveAs(blob, fileName);
        const url = window.URL.createObjectURL(blob);
        saveAs(url, fileName);
      }
    } else {
      ElMessage({
        message: errorCode[res.code] || res.data.msg,
        type: "error",
      });
    }
  });
}
export function upload(url,data){
  // 注意一定要是post方式上传
    const file = new FormData()
    file.append("file",data.file.file)//file是blob数据
    const config = {
      headers:{"Content-Type":"multipart/from-data"}
    }
    axios.post(url,file,config).then((res)=>{
      // console.log(res);
      resolve()
    }).catch((err)=>{
      reject(err)
  })
}
export default service;
