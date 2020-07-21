# blogexercise

All the code is in `/src`

There is two configurations files `tsconfig.json` to use node with typescript and a small `package.json` for execution

To lunch project:
  * `npm run build`
  * `npm run start`
  
As this is only the backend, to use it without frontend, you could use curl

Exemple:
  * `curl -X "GET" http://localhost:3000/posts`
  * `curl -X "POST" --data "post="My%20First%20Post&likes=10&comment=A%20comment" http://localhost:3000/posts`
  * `curl -X "DELETE" http://localhost:3000/posts/3`
  * `curl -X "PUT" --data "post=My%20Modyfied%20Post&likes=20" http://localhost:3000/posts/4`
  
The database configuration is defined in `knexDatabaseConf.ts`, we use mysql but can change, the table name as well as the database for this project is "blog" 
