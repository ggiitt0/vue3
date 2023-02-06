import service from "@/utils/request";
export function login(name, password) {
  return service({
    url: "/login",
    headers: {
      isToken: false,
    },
    method: "POST",
    data: { name, password },
  });
}
export function getInfo() {
  return service({
    url: "/userInfo",
    method: "GET",
  });
}
export function loginOut() {
  return service({
    url: "/loginOut",
    method: "DELETE",
  });
}
