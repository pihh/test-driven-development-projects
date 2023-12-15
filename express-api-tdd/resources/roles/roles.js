var express = require("express");
const RoleModel = require("../roles/role.model");
var router = express.Router();
const {
  transformResponse,
} = require("../../utils/response");


/* GET todos listing. */
router.get("/", async function (req, res, next) {
  const data = await RoleModel.findAll();
  res.json(transformResponse(data));
});

module.exports = router;