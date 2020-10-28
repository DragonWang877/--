// 时间戳
const time = (url = "") => {
    let time = new Date().getTime();
    let newUrl = "";
    url ? (newUrl = `${url}&_t=${time}`) : (newUrl = `${url}?_t=${time}`);
    return newUrl;
};


// 随机验证码
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}



export {
    time,
    random
}