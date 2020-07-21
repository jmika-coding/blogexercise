import {knex} from './knexDatabaseConf'
import {Server, IncomingMessage, ServerResponse} from 'http'
import {FastifyInstance, FastifyLoggerInstance, FastifyRequest} from 'fastify'
import * as t from 'io-ts'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { isRight } from 'fp-ts/lib/Either'


// Interfaces for request of post and put and delete routes

const Params = t.type({ id: t.number })

interface RequestBodyDefault {
  [key: string]: string | number
}

const isRequestBody = (s: unknown): s is string => s === "post" || s === "likes" || s === "comment";

// Type<A, O, I>
const requestBody = new t.Type<string, string, unknown>(
  "string",
  isRequestBody,
  (input, context) => isRequestBody(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);

interface RequestGenericInterface {
  Params: t.TypeOf<typeof Params>;
  Body: RequestBodyDefault;
}

interface RouteGenericInterface extends RequestGenericInterface{};

// Routes
export default async function (server:FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>) {

  server.route({method: 'GET', url: '/posts', handler:  async () => knex.select().from('blog')})

  server.route({method: 'DELETE', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) => {
      try{
        await knex('blog').where('id', request.params.id).del()
        return "Post " + request.params.id + " deleted\n"
      } catch(error) {
        if(error) { return console.error(error); }
      }
    }
  })

  server.route({method: 'POST', url: '/posts', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) => {
      try {
        await knex('blog').insert({post: request.body.post, likes: request.body.likes, comment: request.body.comment})
        return "Post created\n"
      } catch(error) {
        if(error) { return console.error(error); }
      }
    }
  })

  server.route({method: 'PUT', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) => {
      try {
          // failure handler
          const onLeft = (errors: t.Errors): string => `${errors.length} error(s) found`
          // success handler
          const onRight = (s: string) => s

          await Promise.all(Object.keys(request.body).map(async key => {
            const keyDecoded = pipe(requestBody.decode(key), fold(onLeft,  onRight))
            if(isRight(requestBody.decode(key))){
              await knex('blog').where('id', request.params.id).update({[keyDecoded]: request.body[keyDecoded]})
            } else { throw new Error("Invalid type in body") }
        }))
        return "Post " + request.params.id + " updated\n"
      } catch(error) {
        if(error) { return error; }
      }
    }
  })
}
