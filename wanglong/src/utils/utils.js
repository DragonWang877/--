// 时间戳封装
const time = (url) => {
  let t = new Date().getTime();
  let newUrl = url.split('?');
  newUrl.length > 1 ? url = `${url}&_a=${t}` : url = `${url}?_a=${t}`;
  return url;
}

//随机数封装
const random = (min,max) => {
  return Math.floor(Math.random() * (max - min) + min);
}


export { 
  time,
  random 
}