// 数据库
// express
// 验证：class-validator

import 'reflect-metadata'
import { MovieService } from './services/MovieService'
const m:any = {
    name:'23123',
    poster:'123123',
    timelong:33,
    types:['123']
}
MovieService.add(m).then(res => {
    if(Array.isArray(res)) {
        console.log('res',res)
    }else {
        console.log('res._id',res._id)
    }
})