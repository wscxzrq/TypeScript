import 'reflect-metadata'
import * as Express from 'express';
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRouter'
import * as  history from 'connect-history-api-fallback'
const app = Express();
app.use(history())
// 当请求 /upload 路径的时候，请求的是 public/upload 这个文件夹中的东西
app.use('/upload',Express.static("public/upload"))
// 当请求 / 路径的时候，请求的是 public/upload 这个文件夹中的东西
app.use('/',Express.static("public/build"))
 
/**
 * connect-history-api-fallback
 * 由于 react 是单页应用，使用的是H5的 history API 所以当路由发生改变以后刷新页面会出现找不到文件的情况
 * 使用 connect-history-api-fallback 库 来处理
 * 无论访问的地址是什么，都会被映射为 http://localhost:3000/index.html
 * 发生映射的条件
 *  1. 请求是一个 GET 请求
 *  2. 请求头里有一个 accept 必须是 text/html
 *  3. 不是一个直接对文件的请求
 *  4. 有没匹配到自定义规则
 */

app.use('/api/movie',MovieRouter)

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的 JSON 格式数据

// 文件上传
app.use('/api/upload',UploadRouter)

app.listen(3000)