exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("blog")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("blog").insert([
        { id: 1, title: "Title 1", post: "Post 1", likes: 3 },
        { id: 2, title: "My Title", post: "My Post", likes: 5 },
        { id: 3, title: "A title", post: "A Post", likes: 2 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex("comment").insert([
        { id: 1, postId: 1, comment: "A comment" },
        { id: 2, postId: 2, comment: "Another comment" },
        { id: 3, postId: 1, comment: "Comment" },
      ]);
    });
};
