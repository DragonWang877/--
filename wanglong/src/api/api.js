import { post, get } from "../utils/request";

// 获取验证码接口
const _postCode = (data) => post("/code", data);

//手机验证码登陆接口
const _postPhoneLogin = (data) => post("/phoneLogin", data);

//获取教师权限
const _getUserPermission = (data) => get("/schoolLogin",data);

//获取学校路由
const _postSchoolRouter = (data) => post("/schoolRouter",data);

//获取教师管理
const _teacherApply = (data) => get('/teacherApply',data)

export { _postCode , _postPhoneLogin , _getUserPermission , _postSchoolRouter, _teacherApply};
