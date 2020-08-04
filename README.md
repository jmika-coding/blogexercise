# blogexercise

Launch first:
* `npm install`

All the code is in `/src`

There is three configurations files `tsconfig.json` to use node with typescript, a small `package.json` for execution and `.env` for server port and database configuration

To launch project:
  * `npm run build`
  * `npm run start`

As this is only the backend, to use it without frontend, you could use curl

Exemple (in JSON, for correct type validation POST and PUT):
  * `curl --header "Content-Type: application/json" -X GET http://localhost:3000/posts -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X POST --data '{"title":"My First Title", "post":"My First Post", "likes":10}' http://localhost:3000/posts -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X DELETE http://localhost:3000/posts/3 -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X PATCH --data '{"post":"My Modified Post", "likes":20}' http://localhost:3000/posts/4 -H "Origin: http://localhost"`

For comments of a post:
  * `curl --header "Content-Type: application/json" -X GET http://localhost:3000/comments?postId=2 -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X POST --data '{"comment":"A comment"}' http://localhost:3000/comments?postId=2 -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X DELETE http://localhost:3000/comments/3 -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X PATCH --data '{"comment":"My Modified Comment"}' http://localhost:3000/comments/4 -H "Origin: http://localhost"`

The database configuration is defined in `configKnex.ts`, we use mysql but can change.
The table name as well as the database for this project is "blog"

Other commands:
  * `npm run start-seeds` to seed the database, put test data in it
  * `npm run start-save-logs` to save logs in a file instead of printing to console
  * `npm run start:watch` to start app and restart when change in files (for developpement)

Technologies used: We use `nodemon` for restarting when change, `pino` as logger included in `fastify`, `knex` for managing `mysql` database, `fp-ts`, `io-ts` for functionnal programming and check type at runtime, `fastify-cors` for cors validation
