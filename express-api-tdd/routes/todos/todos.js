var express = require('express');
var db = require('../../db');
const { transformResponse } = require('../../utils/response');

var router = express.Router();

/* GET todos listing. */
router.get('/', async function(req, res, next) {
  const data = await db.sequelize.models.Todo.findAll();
  res.json(transformResponse(data))
});
router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  const data = await db.sequelize.models.Todo.findByPk(id);
  res.json(transformResponse(data))
});

router.post('/', async function(req, res, next) {
  const name = req.body.name;
  const completed = false;

  const data = await db.sequelize.models.Todo.create({name,completed})
  res.json(transformResponse(data));
});

router.patch('/:id', async function(req, res, next) {
  const id = req.params.id
  const name = req.body.name;

  const data = await db.sequelize.models.Todo.update(
    { name },
    { where: { id: id } }
  )
  res.json(transformResponse(data));
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id
  const data = await db.sequelize.models.Todo.destroy({where:{id:id}})
  res.json(transformResponse(data));
});

module.exports = router;
