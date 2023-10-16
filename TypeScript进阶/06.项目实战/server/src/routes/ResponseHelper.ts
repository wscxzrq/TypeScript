import { ISearchResult } from './../entities/CommonTypes';
import { Response } from "express";

// 响应帮助类
export class ResponseHelper {
    /**
     * 响应一个错误
     * @param error 错误消息
     * @param res 响应器
     */
    public static sendError(error:string | string[],res:Response) {
        let err:string;
        if(Array.isArray(error)) {
            err = error.join(',');
        }else {
            err = error;
        }
        // 完成响应
        res.send({
            err,
            data:null,
        })
    }

    /**
     * 响应一个正常的数据
     * @param data 数据对象
     * @param res 响应器
     */
    public static sendData(data:any,res:Response) {
        res.send({
            err:'',
            data
        })
    }

    /**
     * 响应分页数据
     * @param result 分页数据对象 
     * @param res 响应器
     */
    public static sendPageData<T>(result:ISearchResult<T>,res:Response) {
        if(result.errors.length > 0) {
            // 有错误
            this.sendError(result.errors,res)
        }else {
            res.send({
                err:'',
                data:result.data,
                total:result.count
            })
        }
    }
}