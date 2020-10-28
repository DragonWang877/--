import { post, get } from "@/utils/request.js";

//获取验证码接口
const postCode = (data) => post("/huoqu", data);
// 校验
const postJiao = (data) => post("/douban", data)

// 获取学校列表
const getSchoolList = (data) => get("/schoolList", data);

// 获取权限列表
const postSchoolRouter = (data) => post('/schoolRouter', data);

// 获取申请列表
const getteacherApply = (data) => get('/teacherApply', data);

// 获取教师信息
const getTeacherMass = (data) => get('/teacherList', data);

//单次分析页面数据
const getOnceMass = (data) => get('/onceMassage', data);

export { postCode, postJiao, getSchoolList, postSchoolRouter, getteacherApply, getTeacherMass, getOnceMass }