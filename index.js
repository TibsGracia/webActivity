var http = require('http');
var add = require('./addFile.js');
var display = require('./displayTbl.js');

http.createServer(function (req, res) {
    add.addFile(req, res);
    display.displayTbl(req, res);
}).listen(8080);