var express = require("express");
var TodoModel = require("./todo.model")
var AuthMiddleware = require('../../middleware/auth');
const {
  transformResponse,
  notFound,
  missingRequiredArgs,
} = require("../../utils/response");

var router = express.Router();

/* GET todos listing. */
router.get("/", async function (req, res, next) {
  const data = await TodoModel.findAll();
  res.json(transformResponse(data));
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const data = await TodoModel.findByPk(id);
  if (notFound(next, data)) return;
  res.json(transformResponse(data));
});

router.post("/", AuthMiddleware,async function (req, res, next) {
// router.post("/",AuthMiddleware, async function (req, res, next) {
  try {
    const name = req.body.name;

    if (missingRequiredArgs(next, req, [{ name: "name", type: "string" }]))
      return;

    const completed = false;
    const UserId = req.user.id
    const data = await TodoModel.create({ name, completed ,UserId});
    res.json(transformResponse(data));
  } catch (ex) {
    return queryFailure(next, ex);
  }
});

router.patch("/:id", AuthMiddleware,async function (req, res, next) {
  const id = req.params.id;
  const UserId = req.user.id
  delete req.body.id;
  const data = await TodoModel.update(
    req.body,
    { where: { id: id, UserId: UserId } }
  );
  if (notFound(next, data[0])) return;
  res.json(transformResponse(data));
});

router.delete("/:id", AuthMiddleware,async function (req, res, next) {
// router.delete("/:id",AuthMiddleware, async function (req, res, next) {
  const id = req.params.id;
  const UserId = req.user.id
  const data = await TodoModel.destroy({ where: { id: id, UserId } });
  res.json(transformResponse(data));
});

module.exports = router;
