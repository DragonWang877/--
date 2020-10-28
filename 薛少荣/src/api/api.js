import {post} from '../utils/request'

// 获取验证码
const postcode = (data)=>post('/sendcode',data);

// 登录
const postlogin = (data)=>post('/code',data);

// 用户登录绑定学校
const postschool = (data)=>post('/oneschool',data);

// 用户点击确认获取学校权限
const postschoolApply = (data)=>post('/school',data);


// 获取教师数据
const postteacher = (data)=>post('/teacher',data);

// 获取教师管理数据
const postteachers = (data)=>post('/teachers',data);

// 获取单次分析数据
const postone = (data)=>post('/one',data);

export{
    postcode,postlogin,postschool,postschoolApply,postteacher,postteachers,postone
}