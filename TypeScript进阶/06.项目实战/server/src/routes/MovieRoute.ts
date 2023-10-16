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

router.post('/', async (req,res) => {
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)) {
        ResponseHelper.sendError(result,res);
    }else {
        ResponseHelper.sendData(result,res);
    }
})

router.put('/',(req,res) => {
    res.send('put 请求')
})

router.delete('/',(req,res) => {
    res.send('delete 请求')
})

export default router