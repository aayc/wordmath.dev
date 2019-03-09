const { PythonShell } = require('python-shell')
var readline = require('readline')


var options = {
  mode: "text",
  pythonOptions: ["-u"],
  pythonPath: "env/bin/python3"
}
var pyshell = new PythonShell('test.py', options)
let i = 0

pyshell.on('message', function (message) {
  console.log("got " + message)
  i += 1
})

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', function (line) {
  pyshell.send(line)
});
