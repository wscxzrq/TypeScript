// 文件上传
import * as Express from "express";
import * as multer from 'multer';
import * as path from 'path'; // 处理路径的模块
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

// 文件保存的配置
const storage = multer.diskStorage({
    // 文件存储位置
    destination:path.resolve(__dirname,'../../public/upload'),
    filename: function (req, file, cb) {
        // 文件名是啥
        const time = new Date().getTime();
        // 后缀名是啥
        const originalFileName = file.originalname;
        const extname = path.extname(originalFileName) // 读取文件后缀名
        // 设置文件的全称
        cb(null, time + extname);
    }
})

const allowedExtensions = ['.jpg','.png','.gif','.bmp','jiff']; // 白名单
const upload = multer({ 
    storage,
    limits:{
        fileSize:1024 * 1024 // 文件最大 1M
    },
    fileFilter:function(req,file,cb) {
        const ext = path.extname(file.originalname);
        if(allowedExtensions.includes(ext)) {
            cb(null,true);
        }else {
            cb(new Error('文件类型不正确'));
        }
    }
}).single('imgfile');


router.post('/',(req,res) => {
    upload(req,res, err => {
        if(err) {
            // 发生错误
            ResponseHelper.sendError(err.message,res);
        }else {
            // 上传成功
            const url = `/upload/${req.file?.filename}`
            ResponseHelper.sendData(url,res);
        }
    })
})

export default router