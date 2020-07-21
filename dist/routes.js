"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexDatabaseConf_1 = require("./knexDatabaseConf");
const t = require("io-ts");
const Either_1 = require("fp-ts/lib/Either");
const pipeable_1 = require("fp-ts/lib/pipeable");
const Either_2 = require("fp-ts/lib/Either");
// Interfaces for request of post and put and delete routes
const Params = t.type({ id: t.number });
const isRequestBody = (s) => s === "post" || s === "likes" || s === "comment";
// Type<A, O, I>
const requestBody = new t.Type("string", isRequestBody, (input, context) => isRequestBody(input) ? t.success(input) : t.failure(input, context), t.identity);
;
// Routes
async function default_1(server) {
    server.route({ method: 'GET', url: '/posts', handler: async () => knexDatabaseConf_1.knex.select().from('blog') });
    server.route({ method: 'DELETE', url: '/posts/:id', handler: async (request) => {
            try {
                await knexDatabaseConf_1.knex('blog').where('id', request.params.id).del();
                return "Post " + request.params.id + " deleted\n";
            }
            catch (error) {
                if (error) {
                    return console.error(error);
                }
            }
        }
    });
    server.route({ method: 'POST', url: '/posts', handler: async (request) => {
            try {
                await knexDatabaseConf_1.knex('blog').insert({ post: request.body.post, likes: request.body.likes, comment: request.body.comment });
                return "Post created\n";
            }
            catch (error) {
                if (error) {
                    return console.error(error);
                }
            }
        }
    });
    server.route({ method: 'PUT', url: '/posts/:id', handler: async (request) => {
            try {
                // failure handler
                const onLeft = (errors) => `${errors.length} error(s) found`;
                // success handler
                const onRight = (s) => s;
                await Promise.all(Object.keys(request.body).map(async (key) => {
                    const keyDecoded = pipeable_1.pipe(requestBody.decode(key), Either_1.fold(onLeft, onRight));
                    if (Either_2.isRight(requestBody.decode(key))) {
                        await knexDatabaseConf_1.knex('blog').where('id', request.params.id).update({ [keyDecoded]: request.body[keyDecoded] });
                    }
                    else {
                        throw new Error("Invalid type in body");
                    }
                }));
                return "Post " + request.params.id + " updated\n";
            }
            catch (error) {
                if (error) {
                    return error;
                }
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map