var express = require("express");

const {
  transformResponse,
  queryFailure,
  missingRequiredArgs,
} = require("../../utils/response");

const RoleModel = require("../roles/role.model");
const TodoModel = require("../todos/todo.model");
const UserModel = require("./user.model");

const createHttpError = require("http-errors");
const { jwtSign } = require("../../utils/token");
var router = express.Router();


/* GET users listing. */
router.get("/", async (req, res, next) => {
  const data = await UserModel.findAll({
    include: [{ model: RoleModel, as: "role" }, TodoModel],
  });
  
  res.json(transformResponse(data.map(el => {
    delete el.dataValues.token;
    return el
  })));
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      missingRequiredArgs(
        next,
        req,
        ["name", "email", "password"].map((el) => {
          return {
            name: el,
            type: "string",
          };
        })
      )
    )
      return;

    
    try {
      let user = await UserModel.findOne({ where: { email: email } });
      if (user) {
        return next(
          createHttpError(404, {
            message: "Email address already in use",
          })
        );
      }
    } catch (ex) {}
    const data = await UserModel.create(
      {
        name,
        email,
        password,
        role_id:1
      }
    );
    const token = jwtSign(next, data);
    if (!token) return;
    await data.update(token);
    await data.save();
    res.json(transformResponse(token));
  } catch (ex) {
    return queryFailure(next, ex);
  }
});
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
 
  if (
    missingRequiredArgs(next, req, [
      {
        name: "email",
        type: "string",
      },
      {
        name: "password",
        type: "string",
      },
    ])
  ) {
    return;
  }
  let existingUser;
  try {
    existingUser = await UserModel.findOne({
      where: { email: email, password: password },
    });
  } catch (ex) {
    return next(
      createHttpError(404, {
        message: "Error! Unable to find user with that email or password.",
      })
    );
  }
 
  const token = jwtSign(next, existingUser);
  if (!token) return;
  await existingUser.update(token);
  await existingUser.save();
  res.json(transformResponse(token));
});
module.exports = router;
