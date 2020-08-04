import * as knex from "knex"
import {RequestBodyDefault} from "models/Post"
import {RequestBodyPost} from "models/Comment"

export class CommentRepository {
  constructor(private knex: knex) {}

  getAll = (requestParamsIdPost: number) => this.knex.select().from('comment').where('post_id', requestParamsIdPost);

  delete = (postIdToDelete: number) => this.knex('comment').where('id', postIdToDelete).del()

  createOne = (requestParamsIdPost: number, requestBody: RequestBodyPost) => this.knex('comment').insert({ post_id: requestParamsIdPost, comment: requestBody.comment })

  updateOne = (requestParamsId: number, requestBody: RequestBodyDefault) => this.knex('comment').where('id', requestParamsId).update({comment: requestBody.comment})

}
