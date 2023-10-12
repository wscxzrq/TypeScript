import { Type } from "class-transformer"
import { IsInt, Min } from "class-validator"
import { BaseEntitly } from "./BaseEntitly"

// 查询条件类
export class SearchCondition extends BaseEntitly{
    /**
     * 页码，从 1 开始
     */
    @IsInt({message:'页码必须是整数'})
    @Min(1,{message:'页码最小值是 1'})
    @Type(() => Number)
    public page:number = 1

    /**
     * 页容量（每页的记录条数）
     */
    @IsInt({message:'页容量必须是整数'})
    @Min(1,{message:'页容量最小值是 1'})
    @Type(() => Number)
    public limit:number = 10

    /**
     * 搜索关键字
     */
    public key:string = ''

    public static transform(plainObject:object):SearchCondition {
        return super.baseTransform(SearchCondition,plainObject);
    }
}