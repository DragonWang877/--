import router from './router/index'

let allrouter = ['/', '/login'];


const all = (data) => {
  data.forEach((item) => {
    if (item.children) {
      all(item.children)
    } else {
      allrouter.push(item.path)
    }
  })
}



router.beforeEach((to, from, next) => {

  const routers = JSON.parse(localStorage.getItem("router")) || [];
  allrouter = ['/', '/login'];
  if (routers.length === 0) {
    localStorage.clear();
  }
  all(routers);
  console.log(from,'from')
  if (allrouter.indexOf(to.path) >= 0) {
    next()
  } else {
    next(from.path)
    // router.go(-1);
    console.log('返回一层')
  }
})


export default router;