import * as knex from "knex"
import {RequestBodyPost, RequestBodyDefault} from "models/Post"

export class PostRepository {
  constructor(private knex: knex) {}

  getAll = () => this.knex.select().from('blog');

  delete = (postIdToDelete: number) => this.knex('blog').where('id', postIdToDelete).del()

  createOne = (requestBody: RequestBodyPost) => this.knex('blog').insert({ post: requestBody.post, likes: requestBody.likes, comment: requestBody.comment })

  updateOne = (requestParamsId: number, requestBody: RequestBodyDefault, keyDecoded: string) => this.knex('blog').where('id', requestParamsId).update({[keyDecoded]: requestBody[keyDecoded]})

}
