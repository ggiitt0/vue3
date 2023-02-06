import service from "@/utils/request";
export function getRouters() {
  return service({
    url: "/getRouters",
    method: "GET",
  });
}