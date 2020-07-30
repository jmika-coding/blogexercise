import {Server, IncomingMessage, ServerResponse} from 'http'
import {FastifyInstance, FastifyLoggerInstance, FastifyRequest} from 'fastify'
import { isLeft, isRight } from 'fp-ts/lib/Either'

import {RouteGenericInterface} from "../models/Post"
import {RequestGenericInterfaceForPost, RequestBodyValuesType} from "../models/Comment"
import {CommentRepository} from "persistances/CommentRepository"

// Routes /post_comment for comments of a post
export function CommentRoutes (server:FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>, opts: {postComment: CommentRepository}, next: any) {
  // id here is a postId
  server.route({method: 'GET', url: '/comments/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, response) => response.code(200).header('Content-Type', 'application/json; charset=utf-8').send(await opts.postComment.getAll(request.params.id)) });

  server.route({method: 'DELETE', url: '/comments/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, response) => {
    try{
      if(await opts.postComment.delete(request.params.id)) {
        return response.code(200).header('Content-Type', 'application/json; charset=utf-8').send({response: "Post " + request.params.id + " deleted"})
      } else { throw new ErrorEvent("Nothing to delete"); }
    } catch(error) {
      if(error instanceof ErrorEvent) { request.log.error(error); return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: error.message}); }
      else { throw new Error(error); }
    }
  }});

  // id here is a postId
  server.route({method: 'POST', url: '/comments/:id', handler: async (request:FastifyRequest<RequestGenericInterfaceForPost, Server, IncomingMessage>, response) => {
    try {
      console.log(request.body)
      if(isRight(RequestBodyValuesType.decode(request.body)) && await opts.postComment.createOne(request.params.id, request.body)) {
        return response.code(201).header('Content-Type', 'application/json; charset=utf-8').send({response :"Post created"})
      } else { throw new TypeError("Invalid type or parameter send in body") }
    } catch(error) {
        if(error instanceof TypeError) { request.log.error(error); return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: error.message}); }
        else { throw new Error(error); }
    }
  }});

  server.route({method: 'PUT', url: '/comments/:id', handler: async (request:FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, response) => {
    try {
      if(isLeft(RequestBodyValuesType.decode(request.body)) || !await opts.postComment.updateOne(Number(request.params.id), request.body)){
        throw new TypeError("Invalid type or parameter send in body")
      }
      return response.code(200).header('Content-Type', 'application/json; charset=utf-8').send({response: "Post " + request.params.id + " updated"})
    } catch(error) {
        if(error instanceof TypeError) { request.log.error(error); return response.code(400).header('Content-Type', 'application/json; charset=utf-8').send({error: error.message}); }
        else { throw new Error(error); }
    }
  }});

  next();
};
