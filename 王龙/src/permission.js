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
  allrouter = ['/', '/login', '/once/anlyze'];
  if (routers.length === 0) {
    localStorage.clear();
  }
  all(routers);
  if (allrouter.indexOf(to.path) >= 0) {
    next()
  } else {
    next(from.path)
    // router.go(-1);

  }
})


export default router;