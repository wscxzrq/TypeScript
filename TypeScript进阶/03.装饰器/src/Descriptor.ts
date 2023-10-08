import 'reflect-metadata';

const key = Symbol.for('descriptor') // 描述

export function descriptor(decription:string) {
    return Reflect.metadata(key,decription)
}

export function printObj (obj:any) {
    const cons = Object.getPrototypeOf(obj);
    /**
     * 获取类上 key 值为 descriptor 的元数据
    */
    if(Reflect.hasMetadata(key,cons.constructor)) {
        console.log(Reflect.getMetadata(key,cons.constructor))
    }else {
        console.log(cons.constructor.name);
    }

    for (const k in obj) {
        if(Reflect.hasMetadata(key,obj,k)) {
            console.log(`\t${Reflect.getMetadata(key,obj,k)}:${obj[k]}`);
        }else {
            console.log(`\t${k}:${obj[k]}`);
        }
    }
}