exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("blog")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("blog").insert([
        { id: 1, post: "Post 1", likes: 3, comment: "A comment" },
        { id: 2, post: "My Post", likes: 5, comment: "Another comment" },
        { id: 3, post: "A Post", likes: 2, comment: "Comment" },
      ]);
    });
};
