/**
 * 
 * @param target 被装饰的类
 * @returns 
 */
function test(target:new(...args:any[]) => object) {
   
}
@test
class A {
    prop1:string

    constructor(public prop2:string) {}
}

// const a = new A();
