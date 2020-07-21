"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const Knex = require("knex");
const database = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'blog'
    }
};
exports.knex = Knex(database);
//# sourceMappingURL=knexDatabaseConf.js.map