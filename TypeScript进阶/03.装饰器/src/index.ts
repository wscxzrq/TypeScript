import 'reflect-metadata'
class MyMath {
    sum(a:number,
        @test
        b:number) {
        return a + b;
    }
}

// 参数装饰器
function test(target:any,method:string,index:number) {
    console.log(target);
    console.log(method);
    console.log(index);
}


// 关于 TS 自动注入的元数据

class User {
    @Reflect.metadata('a','账号')
    loginId:string
    @Reflect.metadata('b','年龄')
    age:number  
}