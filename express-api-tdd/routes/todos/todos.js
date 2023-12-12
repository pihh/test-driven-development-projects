var express = require("express");
var db = require("../../db");
const {
  transformResponse,
  notFound,
  missingRequiredArgs,
} = require("../../utils/response");

var router = express.Router();

/* GET todos listing. */
router.get("/", async function (req, res, next) {
  const data = await db.sequelize.models.Todo.findAll();
  res.json(transformResponse(data));
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const data = await db.sequelize.models.Todo.findByPk(id);
  if (notFound(next, data)) return;
  res.json(transformResponse(data));
});

router.post("/", async function (req, res, next) {
  try {
    const name = req.body.name;

    if (missingRequiredArgs(next, req, [{ name: "name", type: "string" }]))
      return;

    const completed = false;

    const data = await db.sequelize.models.Todo.create({ name, completed });
    res.json(transformResponse(data));
  } catch (ex) {
    return queryFailure(next, ex);
  }
});

router.patch("/:id", async function (req, res, next) {
  const id = req.params.id;
  delete req.body.id;
  // const name = req.body.name; 
  // const completed = "completed" in req.body ? req.body.completed : undefined;

  const data = await db.sequelize.models.Todo.update(
    req.body,
    { where: { id: id } }
  );
  res.json(transformResponse(data));
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  const data = await db.sequelize.models.Todo.destroy({ where: { id: id } });
  res.json(transformResponse(data));
});

module.exports = router;
