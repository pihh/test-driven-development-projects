const express = require("express");
const router = express.Router();
const axios = require("axios");
const transform = require('jsonpath-object-transform');
const AuthMiddleware = require('../middleware/auth')
const { transformResponse } = require("../utils/response");
const { PermissionAdminMiddleware, PermissionEditorMiddleware } = require("../middleware/permissions");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/app", function (req, res, next) {
  res.json(transformResponse({ message: "Application running" }));
});

router.get("/test-error", function (req, res, next) {
  throw new Error("Test error recieved");
});

router.get("/external", async function (req, res, next) {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  res.json(transformResponse(response.data));
});



router.get("/test-authenticated",AuthMiddleware, async function (req, res, next) {

  res.json(transformResponse({authenticated:true}));
});


router.get("/test-permission-admin",PermissionAdminMiddleware, async function (req, res, next) {

  res.json(transformResponse({admin:true}));
});

router.get("/test-permission-editor",PermissionEditorMiddleware, async function (req, res, next) {

  res.json(transformResponse({editor:true}));
});


router.get("/reshape", function(req,res,next){
  var template = {
    foo: ['$.some.crazy', {
      bar: '$.example'
    }]
  };
  
  var data = {
    some: {
      crazy: [
        {
          example: 'A'
        },
        {
          example: 'B'
        }
      ]
    }
  };
  
  var result = transform(data, template);
  res.json(transformResponse(result));
})

module.exports = router;
