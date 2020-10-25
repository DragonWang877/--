import {  post, get } from "../uitls/request"


//获取验证码接口
const postCode = (data) => post("/tell" , data)

//手机号登入接口
const postTellLogin = (data) => post("/tellLogin" , data)

//获取学校接口
const getSchoolList = (data) => get("/schoolList" , data)

//权限管理接口
const postLoginSchool = (data) => post("/loginSchool" , data)

//教师申请
const gerTeacher = (data) => get("/teacher" , data)

export { postCode, postTellLogin, getSchoolList, postLoginSchool, gerTeacher }