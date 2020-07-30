import * as knex from "knex"
import {RequestBodyDefault} from "models/Post"
import {RequestBodyPost} from "models/Comment"

export class CommentRepository {
  constructor(private knex: knex) {}

  getAll = (requestParamsIdPost: number) => this.knex.select().from('comment').where('postId', requestParamsIdPost);

  delete = (postIdToDelete: number) => this.knex('comment').where('id', postIdToDelete).del()

  createOne = (requestParamsIdPost: number, requestBody: RequestBodyPost) => this.knex('comment').insert({ postId: requestParamsIdPost, comment: requestBody.comment })

  updateOne = (requestParamsId: number, requestBody: RequestBodyDefault) => this.knex('comment').where('id', requestParamsId).update({comment: requestBody.comment})

}
