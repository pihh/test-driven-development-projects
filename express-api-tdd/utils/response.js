
const createHttpError = require("http-errors");
function transformResponse(data = {}, success = true) {
  return {
    success,
    data,
  };
}

function notFound(next, data) {
  if (!data) {
    next(createHttpError(404, { message: "Not found" }));
    return true;
  }
  return false;
}

function missingRequiredArgs(next, req, config = []) {
  for (let arg of config) {
    if (typeof req.body[arg.name] !== arg.type) {
      next(
        createHttpError(402, {
          message: `Required argument: "${arg.name}" is not a ${arg.type}`,
        })
      );
      return true;
    }
  }
  return false;
}
function queryFailure(next, err) {
  return next(
    createHttpError(402, {
      message: err,
    })
  );
}

async function queryDb(next, callback) {
  try {
    return await callback();
  } catch (err) {
    return queryFailure(err);
  }
}

function unauthenticated(next) {
  return next(
    createHttpError(401, {
      message: "Unauthorized",
    })
  );
}
function noPermissions(next) {
  return next(
    createHttpError(401, {
      message: "Invalid permissions",
    })
  );
}
module.exports = {
  transformResponse,
  notFound,
  missingRequiredArgs,
  queryFailure,
  queryDb,
  unauthenticated,
  noPermissions
};
