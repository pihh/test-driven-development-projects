

const { unauthenticated } = require('../utils/response');
const { decodeUser } = require('../utils/token');

module.exports = async (req, res, next) => {
  try {

    const user = await decodeUser(req)
    if(!user.id){
      return unauthenticated(next)
    }else{
      next();
    }

  } catch(ex) {

    return unauthenticated(next)
  }
};