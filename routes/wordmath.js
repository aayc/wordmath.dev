const { PythonShell } = require('python-shell')
var express = require('express');
var router = express.Router();
var py_options = {
  mode: "text",
  pythonOptions: ["-u"],
  pythonPath: process.env.PYTHONPATH || "routes/word2vec/env/bin/python3"
}
var pyshell = new PythonShell("routes/word2vec/inference.py", py_options)
pyshell.once('message', function (message) {
  console.log(message)
})

router.get('/', function (req, res, next) {
  let eq = req.query.eq

  pyshell.send(eq);
  pyshell.once('message', function (message) {
    output = message.split(";").map(s => s.split(":"))
    result = {}
    for (let i = 0; i < output.length; i++) {
      result[output[i][0]] = output[i][1]
    }
    res.send(result);
  })
});

module.exports = router;
