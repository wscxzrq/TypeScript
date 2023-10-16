import 'reflect-metadata'
import * as Express from 'express';
import MovieRouter from './routes/MovieRoute'
const app = Express();
app.use('/api/movie',MovieRouter)

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的 JSON 格式数据
app.listen(3000)