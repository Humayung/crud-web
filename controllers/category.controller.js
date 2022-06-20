const Category = require("../models/Category");
const db = require("../database");

module.exports = {
  create: async (req, res) => {
    const userSession = req.session.user;
    if (!userSession) return res.render("author/login");
    return res.render("category/create");
  },

  store: async (req, res) => {
    const data = await Category.create({
      name: req.body.category,
    });

    res.redirect("/posts");
  },
};
