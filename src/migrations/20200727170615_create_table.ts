import * as Knex from "knex";

exports.up = async function (knex: Knex): Promise<any> {
  await knex.schema.raw(`CREATE TABLE blog (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post TEXT NOT NULL,
      likes INT,
      comment VARCHAR(255)
    );`);
};

exports.down = async function (knex: Knex): Promise<any> {
  await knex.schema.raw("DROP TABLE IF EXISTS blog;");
};
