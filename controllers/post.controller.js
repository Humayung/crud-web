const Post = require("../models/Post");
const db = require("../database");

module.exports = {
  index: async (req, res) => {
    const userSession = req.session.user;
    if (!userSession) return res.render("author/login");
    const [posts, metadata] = await db.query(
      "SELECT Posts.id, Posts.content, Posts.date, Posts.title, Authors.username as 'author', Categories.name as 'category' FROM Posts INNER JOIN Authors ON Authors.id=Posts.author_id INNER JOIN Categories ON Categories.id=Posts.category_id"
    );
    return res.render("post/index", {
      posts,
    });
  },

  edit: async (req, res) => {
    const [categories, metadata1] = await db.query(
      "SELECT * FROM `Categories` WHERE 1"
    );
    const [post, metadata2] = await db.query(
      `SELECT * FROM Posts WHERE id=${req.query.id}`
    );

    console.log("this is", post[0]);
    return res.render("post/edit", { categories, post });
  },

  create: async (req, res) => {
    const userSession = req.session.user;
    if (!userSession) return res.render("author/login");
    const [categories, metadata] = await db.query(
      "SELECT * FROM `Categories` WHERE 1"
    );
    if (categories.length == 0) {
      return res.render("category/create");
    }
    return res.render("post/create", { categories });
  },

  delete: async (req, res) => {
    await Post.destroy({ where: { id: req.query.id } });
    return res.redirect('/posts')
  },

  update: async (req, res) => {
    const userSession = req.session.user;
    if (!userSession) return res.render("author/login");
    Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        author_id: req.session.user,
        category_id: req.body.category_id,
      },
      { where: { id: req.body.id } }
    );
    console.log("adasdadasd ", req.body);
    const [posts, metadata] = await db.query(
      "SELECT Posts.id, Posts.content, Posts.date, Posts.title, Authors.username as 'author', Categories.name as 'category' FROM Posts INNER JOIN Authors ON Authors.id=Posts.author_id INNER JOIN Categories ON Categories.id=Posts.category_id"
    );
    return res.render("post/index", {
      posts,
    });
  },

  store: async (req, res) => {
    const data = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user,
      category_id: req.body.category_id,
      date: new Date(),
    });

    res.redirect("/posts");
  },
};
