const { Sequelize } = require("Sequelize");
const db = require('../database');
const Post = require("../models/Post");
module.exports = {
  index: async (req, res) => {
    const [posts, metadata] = await db.query(
      "SELECT Posts.content, Posts.date, Posts.title, Authors.username as 'author', Categories.name as 'category' FROM Posts INNER JOIN Authors ON Authors.id=Posts.author_id INNER JOIN Categories ON Categories.id=Posts.category_id"
    );
    return res.render("index", {
      posts,
    });
  },
};
