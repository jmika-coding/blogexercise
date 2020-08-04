import * as knex from "knex"
import {RequestBodyPost, RequestBodyDefault} from "models/Post"

export class PostRepository {
  constructor(private knex: knex) {}

  getAll = () => this.knex.select().from('post');

  delete = (postIdToDelete: number) => this.knex('post').where('id', postIdToDelete).del()

  createOne = (requestBody: RequestBodyPost) => this.knex('post').insert({ title: requestBody.title, post: requestBody.post, likes: requestBody.likes })

  updateOne = (requestParamsId: number, requestBody: RequestBodyDefault, keyDecoded: string) => this.knex('post').where('id', requestParamsId).update({[keyDecoded]: requestBody[keyDecoded]})

}
