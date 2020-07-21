import fastify from 'fastify'
const server = fastify();

import routes from './routes'

server.register(require('fastify-formbody'))
server.register(routes)

server.register(require('fastify-cors'), {
  origin: (origin:any, cb:any) => {
  if(/localhost/.test(origin)){
    //  Request from localhost will pass
    cb(null, true)
    return
  }
  cb(new Error("Not allowed"), false)
}
})

const start = async () => {
    try {
        await server.listen(3000)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()
