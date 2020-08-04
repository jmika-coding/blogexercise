import * as Knex from "knex";

exports.up = async function (knex: Knex): Promise<any> {
  await knex.schema.raw(`CREATE TABLE post (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      post TEXT NOT NULL,
      likes INT
    );`);

  await knex.schema.raw(`CREATE TABLE comment (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT,
      comment VARCHAR(255),
      FOREIGN KEY (post_id) REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE
    );`);
};

exports.down = async function (knex: Knex): Promise<any> {
  await knex.schema.raw("DROP TABLE IF EXISTS comment;");
  await knex.schema.raw("DROP TABLE IF EXISTS post;");
};
