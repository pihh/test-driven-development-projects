const env = process.env;
const jwt = require("jsonwebtoken");
const User = require("../resources/users/user.model");
const { unauthenticated } = require("./response");
const transform = require("jsonpath-object-transform");
const Role = require("../resources/roles/role.model");

const jwtSign = function (next, user) {
  let token;
    
  try {
    //Creating jwt token
    token = jwt.sign({ id: user.dataValues.id }, env.JWT_KEY, {
      expiresIn: "10000000000h",
    });

  } catch (err) {
    // console.log(err,env)
    const error = new Error("Failed to sign the token.");
    next(error);
    return false;
  }
  return { token };
};

const validateToken = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, env.JWT_KEY);
    const userId = decodedToken.id;
    const user = User.findById(userId, {
      include: { model: Role, as: "role" },
    });
    if (user.token !== token || !token) {
      return unauthenticated(next);
    } else {
     
      const userTemplate = {
        id: "$.id",
        role: "$.role.dataValues.id",
      };
      var result = transform(user, userTemplate);
 
      req.user = result;
    }
  } catch (ex) {
    return unauthenticated(next);
  }
};

const decodeUser = async function(req){
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, env.JWT_KEY);
    const userId = decodedToken.id;
    const user = await User.findByPk(userId, {
      include: { model: Role, as: "role" },
    });
    if (user.dataValues.token !== token || !token) {
      throw new Error('Invalid credentials')
    } else {
     
      const userTemplate = {
        id: "$.id",
        role: "$.role.dataValues.id",
      };
      var result = transform(user.dataValues, userTemplate);
      req.user = result;
      return result
    }
}

module.exports = {
  validateToken,
  jwtSign,
  decodeUser
};
