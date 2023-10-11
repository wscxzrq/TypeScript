import Mongoose from 'mongoose'
import { Movie } from '../entities/Movie'
/**
 * 提供数据库校验规则
 * @param Mongoose.Document 提供常用函数与组件 ID
 * @param Movie 提供接口规则
 */
export interface IMovie extends Movie, Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMovie>({
    name:String,
    types:[String],
    areas:[String],
    timeLong:Number,
    isHot:Boolean,
    isComing:Boolean,
    isClasic:Boolean,
    description:String,
    poster:String
},{
    versionKey:false, // 不生成版本号
}) 

export default Mongoose.model<IMovie>('Movie',movieSchema);