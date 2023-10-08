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

// AOP

class RegUser {
    loginId:string

    loginPwd:string

    age:number

    pid:string

    /**
     * 将用户保存到数据库
    */
    save () {
        // 验证处理
         
        // 通过后保存数据库
    }
}
