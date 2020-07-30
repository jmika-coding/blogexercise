import * as t from 'io-ts'

import {Params} from "models/Post"

// Interfaces for request of post and put and delete routes

export interface RequestBodyPost { comment: t.TypeOf<typeof t.string>; }

export const Comment = t.type({ comment: t.string })
export type CommentParams = t.TypeOf<typeof Params>

export interface RequestGenericInterfaceForPost {
  Params: t.TypeOf<typeof Params>;
  Body: t.TypeOf<typeof Comment>;
}

export const RequestBodyValuesType = t.type({comment: t.string})
export type RequestBodyValuesType = t.TypeOf<typeof RequestBodyValuesType>
