import {Server, IncomingMessage, ServerResponse} from 'http'
import {FastifyInstance, FastifyLoggerInstance, FastifyRequest} from 'fastify'
import * as t from 'io-ts'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { isRight } from 'fp-ts/lib/Either'

import {RouteGenericInterface, RequestGenericInterfaceForPost, RequestBodyValuesTypePost, requestBody, RequestBodyValuesTypePut} from "../models/Post"
import {PostRepository} from "persistances/PostRepository"

// Routes
export function PostRoutes (server:FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>, opts: {post: PostRepository}, next: any) {
  server.route({method: 'GET', url: '/posts', handler: async () => opts.post.getAll() });

  server.route({method: 'DELETE', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) => {
    try{
      await opts.post.delete(request.params.id)
      return "Post " + request.params.id + " deleted\n"
    } catch(error) {
      if(error) { return console.error(error); }
    }
  }});

  server.route({method: 'POST', url: '/posts', handler: async (request:FastifyRequest<RequestGenericInterfaceForPost, Server, IncomingMessage>) => {
    try {
      if(isRight(RequestBodyValuesTypePost.decode(request.body))) {
        await opts.post.createOne(request.body)
      } else {throw new Error("Invalid type in body")}
      return "Post created\n"
    } catch(error) {
      if(error) { return error; }
    }
  }});

  server.route({method: 'PUT', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) => {
    try {
      // failure handler
      const onLeft = (errors: t.Errors): string => `${errors.length} error(s) found`
      // success handler
      const onRight = (s: string) => s

      await Promise.all(Object.keys(request.body).map(async key => {
        const keyDecoded = pipe(requestBody.decode(key), fold(onLeft,  onRight))
        if(isRight(requestBody.decode(key)) && isRight(RequestBodyValuesTypePut.decode(request.body))){
          await opts.post.updateOne(request.params.id, request.body, keyDecoded)
        } else { throw new Error("Invalid type in body") }
      }))
      return "Post " + request.params.id + " updated\n"
    } catch(error) {
      if(error) { return error; }
    }
  }});

  next();
};
