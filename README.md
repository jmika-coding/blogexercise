# blogexercise

All the code is in `/src`

There is two configurations files `tsconfig.json` to use node with typescript and a small `package.json` for execution

To lunch project:
  * `npm run build`
  * `npm run start`

As this is only the backend, to use it without frontend, you could use curl

Exemple (in JSON, for correct type validation POST and PUT):
  * `curl --header "Content-Type: application/json" -X GET http://localhost:3000/posts -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X POST --data '{"post":"My First Post", "likes":10, "comment":"A comment"}' http://localhost:3000/posts -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X DELETE http://localhost:3000/posts/3 -H "Origin: http://localhost"`
  * `curl --header "Content-Type: application/json" -X PUT --data '{"post":"My Modified Post", "likes":20}' http://localhost:3000/posts/4 -H "Origin: http://localhost"`

The database configuration is defined in `knexDatabaseConf.ts`, we use mysql but can change, the table name as well as the database for this project is "blog"
