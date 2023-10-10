import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, MinLength } from 'class-validator'
export class Movie {
    @IsNotEmpty({message:'电影名称不可以为空'})
    @Type(() => String) // 在运行阶段控制类型
    public name:string;

    @IsNotEmpty({message:'电影类型不可以为空'})
    @ArrayMinSize(1,{message:'电影类型至少存在一个'})
    @IsArray({message:'电影类型必须是数组'})
    @Type(() => String) // 如果需要字符串数组 则写中每一项的类型
    public types:string[];

    @IsNotEmpty({message:'上映地区不可以为空'})
    @ArrayMinSize(1,{message:'上映地区至少存在一个'})
    @IsArray({message:'上映地区必须是数组'})
    @Type(() => String)
    public areas:string[];

    @IsNotEmpty({message:'时长不可以为空'})
    @IsInt({message:'时长必须是整数'})
    @Min(1,{message:'时长最小一分钟'})
    @Max(999999,{message:'时长过长'})
    @Type(() => Number)
    public timeLong:number;

    @IsNotEmpty({message:'是否热映不可以为空'})
    @Type(() => Boolean)
    public isHot:boolean;

    @IsNotEmpty({message:'是否即将上映不可以为空'})
    @Type(() => Boolean)
    public isComing:boolean;

    @IsNotEmpty({message:'是否是经典影片不可以为空'})
    @Type(() => Boolean)
    public isClasic:boolean;

    @Type(() => String)
    public description?:string; // 简介

    @Type(() => String)
    public poster:string; // 海报
}