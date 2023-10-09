
// Partial 可选
interface User {
    age:number
    name:string
}

let u:Partial<User>;
u = {}

// Required 必填
let a:Required<User>
// a = {} // 必填报错

// Readonly 只读
let b:Readonly<User>
// b.age = '' // 只读报错

// Exclude 剔除
{
    type T = '男'|'女'|null|undefined;
    type NEWT = Exclude<T,null|undefined>
}

// Extract 保留
{
    type T = '男'|'女'|null|undefined;
    type NEWT = Extract<T,null|undefined>
}

// NonNullable 剔除类型中的 null 和 undefined 也可是使用 str! 非空断言实现
{
    type str = string | null | undefined;
    type strNotEmpty = NonNullable<str>
}

// ReturnType 获取函数返回值
{
    type func = () => number
    type returnType = ReturnType<func>

    // 演算一个函数的返回值
    function sum(a:string,b:string) {
        return a + b
    }
    let a:ReturnType<typeof sum>
}

// InstanceType 获取构造函数的返回类型
{
    class User {

    }
    let u:InstanceType<typeof User>

    // 约束构造函数
    class User2 {
        loginId:string
    }
    type twoParamsConstructor = new (arg1:any,arg2:any) => User2
    const A:twoParamsConstructor = class Test extends User2{
        // 鸭子变形法 类的参数可以少不能多
        // constructor(a:any,b:any,c:any){}

        constructor(a:any,b:any){
            super()
        }
    }
    
    type Inst = InstanceType<twoParamsConstructor>
}