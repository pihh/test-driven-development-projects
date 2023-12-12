const jwt = require('jsonwebtoken');
const { unauthenticated } = require('../utils/response');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretkeyappearshere');
    const userId = decodedToken.id;
    if(!userId){
      return unauthenticated(next)
    }else{
      next();
    }

  } catch(ex) {

    return unauthenticated(next)
  }
};