import { post, get } from "../utils/request";

// 获取验证码接口
const _postCode = (data) => post("/code", data);

//手机验证码登陆接口
const _postPhoneLogin = (data) => post("/phoneLogin", data);

//获取教师权限
const _getUserPermission = (data) => get("/schoolLogin", data);

//获取学校路由
const _postSchoolRouter = (data) => post("/schoolRouter", data);

//获取申请管理
const _ApplicationManagement = (data) => get('/ApplicationManagement', data)

//获取教师申请
const _TeacherManagement = (data) => get('/TeacherManagement', data)


const _OnceAnalyse = (data) => get('/onceAnalyse', data)

export { _postCode, _postPhoneLogin, _getUserPermission, _postSchoolRouter, _ApplicationManagement, _TeacherManagement, _OnceAnalyse };
