// 电影相关的 ajax 请求
import axios from "axios";
import { IResponseData, IResponseError, IResponsePageData, ISearchConditions } from "./CommonType";
export interface IMovie {
    _id?:string
    name:string
    types:string[];
    areas:string[];
    timeLong:number;
    isHot:boolean;
    isComing:boolean;
    isClasic:boolean;
    description?:string; // 简介
    poster:string; // 海报
}

export class MovieService {
  // 添加函数
  public static async add(movie:IMovie):Promise<IResponseError | IResponseData<IMovie> > {
    const { data } = await axios.post('/api/movie',movie);
    return data
  }

  // 修改
  /**
   * Partial 类型演算，所有属性全部可选
   */
  public static async edit(id:string,movie:Partial<IMovie>):Promise<IResponseError | IResponseData<true> > {
    const { data } = await axios.put('/api/movie'+ id,movie);
    return data
  }

  // 删除
  public static async delete(id:string):Promise<IResponseError | IResponseData<true> > {
    const { data } = await axios.delete('/api/movie'+ id);
    return data
  }

  // 获取单个电影
  public static async getMovieById(id:string):Promise<IResponseData<IMovie | null> > {
    const { data } = await axios.get('/api/movie'+ id);
    return data
  }

  // 分页查找
  public static async getMovies(condition:ISearchConditions):Promise<IResponsePageData<IMovie> > {
    const { data } = await axios.get('/api/movie',{params:condition});
    return data
  }
  
}