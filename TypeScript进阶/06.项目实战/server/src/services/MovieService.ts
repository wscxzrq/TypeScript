import { Movie } from './../entities/Movie';
import { IMovie } from './../db/MovieSchema';
import { MovieModel } from "../db";
import { SearchCondition } from '../entities/searchConditions';
import { ISearchResult, SearchResult } from '../entities/CommonTypes';

export class MovieService {
    public static async add (movie:Movie):Promise<IMovie | string[]> {
        // 1.转换类型
        movie = Movie.transForm(movie);
        // 2.数据验证
        const errors = await movie.validateThis();
        if(errors.length > 0) {
            return errors;
        }
        // 3.添加到数据库
        return await MovieModel.create(movie);
    }

    public static async edit(id:string,movie:Movie):Promise<string[]> {
        // 1.转换类型
        const movieObj = movie = Movie.transForm(movie);
        // 2.数据验证
        const errors = await movie.validateThis(true);
        if(errors.length > 0) {
            return errors;
        }
        // 3.修改数据库
        await MovieModel.updateOne({_id:id},movie);
        return errors
    }

    public static async delete(id:string):Promise<void> {
        await MovieModel.deleteOne({_id:id});
    }

    public static async findById(id:string):Promise<IMovie | null> {
        return await MovieModel.findById({_id:id});
    } 

    /**
     * 根据条件查询数据
     * @param condition page limit key
     */
    public static async find(condition:SearchCondition):Promise<ISearchResult<IMovie>> {
        // 1.转换类型
        const SearchObj = SearchCondition.transform(condition);
        // 2.数据验证
        const errors = await SearchObj.validateThis(true);
        if(errors.length > 0) {
            return {
                count:0,
                data:[],
                errors
            }
        }
        // 3.没有错误 查询
        const movies = await MovieModel.find({
            name:{$regex:new RegExp(SearchObj.key)}, // 模糊查询
        }).skip((SearchObj.page - 1) * SearchObj.limit).limit(SearchObj.limit); // 跳过多少跳数据,取出多少条
        const count = await MovieModel.find({
            name:{$regex:new RegExp(SearchObj.key)}
        }).countDocuments();
        return {
            count,
            data: movies,
            errors:[]
        }
    }
}