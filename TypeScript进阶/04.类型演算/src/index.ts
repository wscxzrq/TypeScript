// typeof
const a:string = 'asdff'

let b:typeof a;

class User {
    loginId:string
    loginPwd:string
}

// function createUser(cls:typeof User):User {
//     return new cls();
// }

// const u = createUser(User)

const u = new User();
const u2 = u

const A = User;
new A();


// keyof
interface User {
    loginId:string
    loginPwd:string
    age:number
}

interface Article {
    title:string
    publishDate:Date
}

function printUserPropery(obj:User,prop: keyof User) {
    console.log(obj[prop]);
}

const c:User = {
    loginId: "",
    loginPwd: "",
    age: 0
}

printUserPropery(c,'loginId')

// in
type UserString = {
    [p in keyof User ]:User[p]
}

const d:UserString = {
    loginId:'',
    loginPwd:'',
    age:1
}

type UserReadonly = {
   readonly [p in keyof User]:User[p]
}

const e:UserReadonly = {
    loginId: "",
    loginPwd: "",
    age: 0
}
// e.age = 1 // 只读报错


// 可选的
type UserPartial = {
    [p in keyof User]?:User[p]
}

const f:UserPartial = {

}

// 搭配泛型使用
type partial<T> = {
    [p in keyof T]?:T[p]
}

const g:partial<Article> = {

}