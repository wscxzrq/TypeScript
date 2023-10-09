console.log();
console.error()

setTimeout(() => {
    
}, 0);

setInterval(() => {

},0)


import _ from 'lodash'
// const _ = require('lodash') // 因为 lodash 是使用 js 完成的第三方库，没有声明文件，所以无法使用 import 方式导入，可以使用 require 方式进行导入，但是会丧失类型检查

const newArr = _.chunk([1,2,3,4,5,6],2)
console.log('newArr',newArr)