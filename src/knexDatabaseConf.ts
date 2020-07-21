import * as Knex from 'knex'

const database = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'blog'
    }
}

export const knex = Knex(database);
