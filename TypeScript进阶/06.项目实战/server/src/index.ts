import 'reflect-metadata'
import * as Express from 'express';
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRouter'
const app = Express();
app.use('/api/movie',MovieRouter)
app.use(Express.json()); // 配置中间件，用于解析请求消息体中的 JSON 格式数据

// 文件上传
app.use('/api/upload',UploadRouter)

app.listen(3000)