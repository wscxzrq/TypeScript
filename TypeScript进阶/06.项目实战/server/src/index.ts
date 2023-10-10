// 数据库
// express
// 验证：class-validator

import 'reflect-metadata'
import { validate } from 'class-validator'
import { Movie } from "./entities/Movie";
import { plainToClass } from 'class-transformer';
const m:any = {};
m.name = 123;
m.types = [1,2,3];
// 将 plain object 转换为一个 Movie 对象
const movie = plainToClass(Movie,m as object);
// movie.name = 23123
console.log('movie',movie)
validate(m).then(errors => {
    console.log('errors',errors)
})