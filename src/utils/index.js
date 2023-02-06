// 路由递归生成一维数组
export function handleRouter(routerList, newArr) {
  routerList.forEach((item) => {
    typeof item === "object" && item.path && newArr.push(item.path);
    item.children &&
      item.children.length &&
      handleRouter(item.children, newArr);
  });
  return newArr;
};

// 扁平化数组
export function getFlatArr(arr) {
  return arr.reduce((pre, current) => {
    let flatArr = [...pre, current];
    if (current.children) {
      flatArr = [...flatArr, ...getFlatArr(current.children)];
    }
    return flatArr;
  }, []); 
}
// 只留自己想要的
// export function getMneuList(list,newArr){
//   list.forEach((item)=>{
//     typeof item==='object' && item.path && newArr.push()
//   })
//   return newArr
// }