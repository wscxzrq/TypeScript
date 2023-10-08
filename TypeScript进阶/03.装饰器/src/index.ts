// import { IsNotEmpty, MaxLength, MinLength, validate } from 'class-validator';
import 'reflect-metadata';
// class RegUser {
//     @IsNotEmpty({message:'账号不能为空'})
//     @MinLength(5,{message:'账号至少五个字符'})
//     @MaxLength(12,{message:'账号最多12 个字符'})
//     loginId:string
//     loginPwd:string
//     @MinLength(0,{message:'年龄的最小值只能是 0'})
//     @MaxLength(100,{message:'年龄的最大值只能是 100'})
//     age:number
//     gender:'男'|'女'
// }

// const post = new RegUser();
// post.loginId = ''
// post.age = -1
// validate(post).then(errors => {
//     console.log('errors',errors)
// })



import axios from "axios";
import { Type, plainToClass } from "class-transformer";

class User {
    id: number
    firstName: string
    lastName: string
    @Type(() => Number)
    age: number

    getName() {
        return this.firstName + ' ' + this.lastName;
    }

    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}
axios.get('https://api.jsonserve.com/SQDyh4').then(res => res.data).then((users:User[]) => {
    const us = plainToClass(User,users)
    for (const u of us) {
        // const user = plainToClass(User,u);
        // console.log('user.getName()',user.getName(),user.isAdult())
        console.log(typeof u.age,u.age);
        
    }
})