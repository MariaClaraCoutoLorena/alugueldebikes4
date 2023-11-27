import express from 'express'
import json from 'express'
import {Request, Response, NextFunction} from 'express'
// import Router from 'router'

const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.set('acess-control-allow-origin', '*')
    res.set('acess-control-allow-headers', '*')
    res.set('acess-control-allow-methods', '*')
    next()
}

const contentType = (req: Request, res: Response, next: NextFunction): void => {
    res.type('json')
    next()
}
const port = 3000
const server = express()
server.use(json())
server.use(cors)
server.use(contentType)
// const router = Router()
// server.use('/api', router)

server.get('/', (req,res)=>{
    res.send('hello world!')
})

server.post('/api/users')
server.listen(port, () =>{
    console.log('Example port ${port}')
})

export default server