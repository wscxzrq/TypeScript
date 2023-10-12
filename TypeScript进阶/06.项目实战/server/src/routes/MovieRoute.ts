import * as Express from 'express'
const router = Express.Router();

router.get('/',(req,res) => {
    
    res.send('get 请求');
})

router.post('/',(req,res) => {
    res.send('post 请求')
})

router.put('/',(req,res) => {
    res.send('put 请求')
})

router.delete('/',(req,res) => {
    res.send('delete 请求')
})

export default router