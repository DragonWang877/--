import router from './router/router'

// let arr = [{
//         name: "成绩分析",
//         children: [{
//             name: "单词分析",
//             path: "/ASingleAnalysis",
//         }, ],
//     },
//     {
//         name: "学校管理",
//         children: [{
//                 name: "教师管理",
//                 path: "/teacher",
//             },
//             {
//                 name: "申请管理",
//                 path: "/applyfor",
//             },
//         ],
//     },
// ]

let newArr = ['/', '/login'];

function getname(data) {
    data.forEach((item) => {
        if (item.children) {
            getname(item.children)
        } else {
            newArr.push(item.path)
        }
    })
}


router.beforeEach((to, from, next) => {
    let arr = JSON.parse(localStorage.getItem('router')) || [];
    newArr = ['/', '/login'];

    if (arr.length === 0) {
        localStorage.clear()
    }

    getname(arr)
    // console.log(to.path, from.path)
    if (newArr.indexOf(to.path) !== -1) {
        next()
    } else {
        router.go(-1)
    }
})

export default router