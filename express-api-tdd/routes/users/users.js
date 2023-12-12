var express = require("express");
var env = require('../../env');
const {
  transformResponse,
  queryFailure,
  missingRequiredArgs,
} = require("../../utils/response");
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
var router = express.Router();

const jwtSign = function (next, user) {
  let token;
  try {
    //Creating jwt token
    token = jwt.sign({ id: user.id }, env.jwtKey, {
      expiresIn: "10000000000h",
    });
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    next(error);
    return false;
  }
  return { token };
};
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const data = await UserModel.findAll();
  res.json(transformResponse(data));
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      missingRequiredArgs(next, req, [
        {
          name: "name",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "password",
          type: "string",
        },
      ])
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

    const data = await UserModel.create({ name, email, password });
    const token = jwtSign(next, data);
    if (!token) return;

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
  )  {
    return;
  }
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ where: { email: email,password:password } });

  } catch (ex){

    return next(
      createHttpError(404, {
        message: "Error! Something went wrong.",
      })
    );
  }

  const token = jwtSign(next, existingUser);
  if (!token) return;

  res.json(transformResponse(token));
});
module.exports = router;
