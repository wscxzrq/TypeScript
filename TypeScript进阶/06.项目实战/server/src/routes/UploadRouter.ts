// 文件上传
import * as Express from "express";
import * as multer from 'multer';
import * as path from 'path'; // 处理路径的模块
const router = Express.Router();
const upload = multer({dest:path.resolve(__dirname,'../../public/upload')});

router.post('/',async (req,res) => {

})

export default router