import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export abstract class BaseEntitly {
    // 验证当前电影对象
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: skipMissing // 如果为 true 则跳过验证
        });
        const temp = errors.map(e => Object.values(e!.constraints!));
        const result: string[] = [];
        temp.forEach(t => {
            result.push(...t);
        })
        return result
    }

     /**
     * 平面对象转换 Movie 对象
     * extends new (...args:any) 约束构造函数
     * @param cls 转换的目标类，ClassConstructor<T> 可以约束构造函数
     * @param plainObject 平面对象
     */
     protected static baseTransform<T>(cls:ClassConstructor<T>,plainObject:object):T {
        if(plainObject instanceof cls) {
            return plainObject;
        }
        return plainToClass(cls,plainObject);
    }
}