const indexController = require("../controllers/index.controller");
const authController = require("../controllers/auth.controller");
const postController = require("../controllers/post.controller");
const categoryController = require("../controllers/category.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", indexController.index);

router.get("/posts", postController.index);
router.get("/posts/create", postController.create);
router.post("/posts/store", postController.store);
router.get("/posts/edit", postController.edit);
router.get("/posts/delete", postController.delete);
router.post("/posts/update", postController.update);

router.get("/category/create", categoryController.create);
router.post("/category/store", categoryController.store);

router.get("/author/login", authController.login);
router.post("/author/dologin", authController.dologin);
router.get("/author/signup", authController.signup);
router.post("/author/store", authController.store);

module.exports = router;
