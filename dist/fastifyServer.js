"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const server = fastify_1.default();
const routes_1 = require("./routes");
server.register(require('fastify-formbody'));
server.register(routes_1.default);
const start = async () => {
    try {
        await server.listen(3000);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=fastifyServer.js.map