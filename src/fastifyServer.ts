import fastify from 'fastify'
const server = fastify();

import routes from './routes'

server.register(require('fastify-formbody'))
server.register(routes)

const start = async () => {
    try {
        await server.listen(3000)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()
