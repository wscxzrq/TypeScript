import {printObj, descriptor } from "./Descriptor";
import 'reflect-metadata';

@descriptor('用户')
class User {
    @descriptor('账号')
    loginId:string
    @descriptor('密码')
    loginPwd:string
}

const u = new User();
u.loginId = 'abc'
u.loginPwd = '123'
printObj(u)

// @descriptor('文章')
// class Article {
//     @descriptor('标题')
//     title:string

//     @descriptor('内容')
//     content:string

//     @descriptor('日期')
//     date:Date
// }

// const ar = new Article();
// ar.title = 'xxx';
// ar.content = 'wjefklwejfkwjefwlfjwelfjwf';
// ar.date = new Date();
// printObj(ar)

// @Reflect.metadata('a','一个类')
// class A {
//     @Reflect.metadata('prop','一个属性')
//     prop1:string
// }


// const obj = new A();
/**
 * 第一个重载入 取类的元数据信息
 * 第一个参数取元数据 
 */
// console.log("Reflect.getMetadata('a',obj)",Reflect.getMetadata('a', A))

/**
 * 第二个重载 取属性的元数据信息
 * 第一个参数 key 值 第二个参数对象 第三个参数 属性名称
 */

// console.log(Reflect.getMetadata('prop',obj,'prop1'));
