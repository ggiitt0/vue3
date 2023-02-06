import jsCookie from "js-cookie";

const TokenKey="Admin-Token"

export function getToken(){
  return jsCookie.get(TokenKey)
}
export function setToken(token,time){
  return jsCookie.set(TokenKey,token,{expires:time})
}
export function removeToken(){
  return jsCookie.remove(TokenKey)
}