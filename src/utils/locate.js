// 第一种方案：使用浏览器的定位api, 问题是需要翻墙
// function locate() {
//   navigator.geolocation
//   if ('geolocation' in navigator) {
//     const options = {
//       enableHighAccuracy: true, //是否尝试更精确地读取纬度和经度，移动设备上，这可能要使用手机上的GPS，这会消耗移动设备更多的电量，定位所需时间也会更长，默认为false
//       maximumAge: 30000,  //缓存时间
//       timeout: 30000, //等待响应的最大时间，默认是0毫秒，表示无穷时间
//     }
//     locate = function () {
//       return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition((position) => {
//           console.log(position)
//           resolve(position)
//         }, (e) => {
//           console.log(e)
//           reject(e)
//         }, options)
//       })
//     }
//   } else {
//     locate = function () {
//       return Promise.reject('positioning is not support')
//     }
//   }
//   return locate()
// }

locate().then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

export default function () {
  return new Promise((result))
}
