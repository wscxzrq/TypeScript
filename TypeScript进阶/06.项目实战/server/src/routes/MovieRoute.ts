import * as Express from 'express'
import { MovieService } from '../services/MovieService';
import { ResponseHelper } from './ResponseHelper';
import { SearchCondition } from '../entities/searchConditions';
const router = Express.Router();

// 获取单个电影
router.get('/:id', async (req,res) => {
    try {
        const movieid =  req.params.id;
        const movie = await MovieService.findById(movieid);
        // 响应：服务器接口的响应格式往往是一种标准格式
        ResponseHelper.sendData(movie,res);
    }catch {
        ResponseHelper.sendData(null,res);
    }
})

// 获取多个电影
router.get('/', async (req,res) => {
    const result = await MovieService.find(req.query as unknown as SearchCondition);
    ResponseHelper.sendPageData(result,res)
})
// 添加电影
router.post('/', async (req,res) => {
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)) {
        ResponseHelper.sendError(result,res);
    }else {
        ResponseHelper.sendData(result,res);
    }
})
// 修改电影
router.put('/:id', async (req,res) => {
    try {
       const result = await MovieService.edit(req.params.id,req.body);
       if(result.length > 0) {
            ResponseHelper.sendError(result,res);
        } else {
            ResponseHelper.sendData(true ,res);
        }
    }catch {
        ResponseHelper.sendError("id 错误",res);
    }
})

// 删除电影
router.delete('/:id', async (req,res) => {
    try {
        const result = await MovieService.delete(req.params.id);
        ResponseHelper.sendData(true ,res);
     }catch {
         ResponseHelper.sendError("id 错误",res);
     }
})

export default router