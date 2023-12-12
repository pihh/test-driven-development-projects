var express = require("express");
const { transformResponse } = require("../utils/response");
var request = require('request');
var router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/app", function (req, res, next) {
  res.json(transformResponse({ message: "Application running" }));
});

// router.get("/external", async function (req, res, next) {
//   console.log('xxxxxxxxxx')
//   new Promise((resolve, reject) => {
//     return request({
//       uri: "https://anapioficeandfire.com/api/characters/583",
//       function(error, response, body) {
//         console.log({error,response,body});
//         if (!error && response.statusCode === 200) {
//           resolve(body);
//         } else {
//           reject(error);
//         }
//       },
//     });
//   }).then(response => res.json(transformResponse({response}))).catch(ex => res.json(transformResponse({ex},false)))

// });

module.exports = router;
