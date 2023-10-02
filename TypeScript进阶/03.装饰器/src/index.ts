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


function test2(str:string) {
    return function (target:new (...args:any[]) => object) {
        console.log('target',target)
    } 
}
@test2('这是一个类')
class B {

}

type constructor = new (...args:any[]) => object

function d1() {
    console.log('d1');
    return function(target:constructor) {
        console.log('d1 decorator');
    }
}

function d2() {
    console.log('d2');
    return function(target:constructor) {
        console.log('d2 decorator');
    }
}

@d1()
@d2()
class C {

}