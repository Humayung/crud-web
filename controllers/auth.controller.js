const Author = require("../models/Author");
const db = require("../database");
module.exports = {
  login: async (req, res) => {
    return res.render("author/login");
  },
  dologin: async (req, res) => {
    const [loginData, metadata] = await db.query(
      `SELECT * FROM Authors WHERE username = '${req.body.username}' and password ='${req.body.password}'`
    );
    console.log(req.body);
    if (loginData.length > 0) {
      req.session.user = loginData[0].id;
      console.log("userrrrrr ", req.session.user);
      const [posts, metadata] = await db.query(
        "SELECT Posts.content, Posts.date, Posts.title, Authors.username as 'author', Categories.name as 'category' FROM Posts INNER JOIN Authors ON Authors.id=Posts.author_id INNER JOIN Categories ON Categories.id=Posts.category_id"
      );
      return res.render("index", {
        posts,
      });
    } else {
      console.log("password wrong");
      return res.render("author/login");
    }
  },
  signup: async (req, res) => {
    return res.render("author/signup");
  },

  store: async (req, res) => {
    console.log(req.body);
    const data = await Author.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.redirect("/author/login");
  },
};
