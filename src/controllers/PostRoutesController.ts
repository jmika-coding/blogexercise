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
  server.route({method: 'GET', url: '/posts', handler: async (_, response) => response.code(200).header('Content-Type', 'application/json; charset=utf-8').send(await opts.post.getAll()) });

  server.route({method: 'DELETE', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, response) => {
    try{
      if(await opts.post.delete(request.params.id)) {
        return response.code(200).header('Content-Type', 'application/json; charset=utf-8').send({response: "Post " + request.params.id + " deleted"})
      } else { return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: "Nothing to delete"}) }
    } catch(error) {
      if(error) { throw new Error(error); }
    }
  }});

  server.route({method: 'POST', url: '/posts', handler: async (request:FastifyRequest<RequestGenericInterfaceForPost, Server, IncomingMessage>, response) => {
    try {
      if(isRight(RequestBodyValuesTypePost.decode(request.body)) && await opts.post.createOne(request.body)) {
        return response.code(201).header('Content-Type', 'application/json; charset=utf-8').send({response :"Post created"})
      } else { return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: "Invalid type or parameter send in body"}) }
    } catch(error) {
      if(error) { throw new Error(error); }
    }
  }});

  server.route({method: 'PUT', url: '/posts/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, response) => {
    try {
      // failure handler
      const onLeft = (errors: t.Errors): string => `${errors.length} error(s) found`
      // success handler
      const onRight = (s: string) => s

      await Promise.all(Object.keys(request.body).map(async key => {
        const keyDecoded = pipe(requestBody.decode(key), fold(onLeft,  onRight))
        if(isRight(requestBody.decode(key)) && isRight(RequestBodyValuesTypePut.decode(request.body)) && await opts.post.updateOne(request.params.id, request.body, keyDecoded)){
          return response.code(200).header('Content-Type', 'application/json; charset=utf-8').send({response: "Post " + request.params.id + " updated"})
        } else { return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: "Invalid type or parameter send in body"}) }
      }))
    } catch(error) {
      if(error) { throw new Error(error); }
    }
  }});

  next();
};
