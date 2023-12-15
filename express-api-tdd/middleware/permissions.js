
const { noPermissions } = require('../utils/response');
const { decodeUser } = require('../utils/token');

const Permission = async (req, res, next, role_id) => {
  try {

    const user = await decodeUser(req)
    if(!user.role == role_id){
      return noPermissions(next)
    }else{
      next();
    }

  } catch(ex) {

    return noPermissions(next)
  }
};

const PermissionAdminMiddleware =async (req, res, next) => {
  return Permission(req,res,next,3);
};
const PermissionEditorMiddleware =async (req, res, next) => {
  return Permission(req,res,next,2);
};
module.exports = {
  PermissionAdminMiddleware,
  PermissionEditorMiddleware,
}