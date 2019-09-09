
exports.addFile = function (request, response) {
    var fs = require('fs');
    request.on('data', function (data) {
        var mydata = JSON.parse(data);
        var file = mydata.subject.split(" ").join('-');
        fs.appendFile(file + '.csv', mydata.name + ', ' + mydata.email + ', ' + mydata.course + '\n', function (err) {
            if (err) throw err;
            console.log('Saved!');

        });
        request.on('end', function () {
            response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
        });
    });
};

