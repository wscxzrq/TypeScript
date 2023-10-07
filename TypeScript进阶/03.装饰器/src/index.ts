/**
 * 成员装饰器d
 * @param target 修饰实例属性的时候target 是类的 prototpye 修饰静态属性的时候 target 是 类的构造函数
 * @param key  被装饰的属性属性名
 */
function d(target:any,key:string) {
    console.log(target,key)

    if(!target.__props) {
        target.__props = [];
    }
    target.__props.push(key);
}

// 通过函数调用方式实现的成员装饰器 也称为装饰器工厂
// function d () {
//     return function(target:any,key:string) {
//         console.log(target,key)
//     }
// }

class A {
    @d
    // @d()
    prop1:string

    @d
    // @d()
    static prop2:string
}

console.log('A.prototype',(A.prototype as any).__props)

const a = new A();
console.log((a as any).__props);

console.log('----------------------------------------------');


/**
 * 方法装饰器
 * @param target  修饰实例方法的时候target 是类的 prototpye 修饰静态属性的时候 target 是 类的构造函数
 * @param key  被装饰的方法名
 * @param descriptor  修饰符对象
 */
// function enumerable() { 
//     return function(target:any,key:string,descriptor:PropertyDescriptor) {
//         console.log(target,key,descriptor);
//         if(key === 'method1') {
//             // 方法的修饰符对象默认是不可以遍历的，在修饰器中可以修改为参与遍历
//             descriptor.enumerable = true
//         }
//     }
// }

function enumerable(target:any,key:string,descriptor:PropertyDescriptor) { 
    console.log(target,key,descriptor);
    if(key === 'method1') {
        // 方法的修饰符对象默认是不可以遍历的，在修饰器中可以修改为参与遍历
        descriptor.enumerable = true
    }
}
function useless(target:any,key:string,descriptor:PropertyDescriptor) {
    descriptor.value = function() {
        console.warn(`${key}已过期`); 
    }
}
class B {
    @enumerable
    @useless
    method1() {
        console.log('method1')
    }

    @enumerable
    method2() {

    }

}

const b = new B();

for (const key in b) {
    console.log('b',key)
}

b.method1()