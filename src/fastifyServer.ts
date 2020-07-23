import fastify from 'fastify'
const server = fastify();

import * as Knex from 'knex'

import {loadConfigAsync} from './config/configKnex'

import {PostRoutes} from './controllers/PostRoutesController'
import {PostRepository} from './persistances/PostRepository'

async function main(): Promise<{}>{

  const config = await loadConfigAsync('.env')
  const knex = Knex({
    client: String(config.client.client),
    connection: config.clientParameters
  })

  const postRepository = new PostRepository(knex);

  server.register(require('fastify-formbody'))
  server.register(PostRoutes, {post: postRepository})

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

  return await server.listen(Number(config.http.port))
}

main().catch((err) => {
  server.log.error("Fatal error in fastify server")
  server.log.error(err)
  process.exit(1)
})
