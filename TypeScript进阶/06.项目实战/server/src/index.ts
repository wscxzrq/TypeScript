// 数据库
// express
// 验证：class-validator

import { validate } from 'class-validator'
import { Movie } from "./entities/Movie";

const m = new Movie();
validate(m).then(errors => {
    console.log('errors',errors)
})