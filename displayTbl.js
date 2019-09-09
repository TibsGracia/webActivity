exports.displayTbl = function (request, response) {
    var url = require('url');
    var fs = require('fs');
    var q = url.parse(request.url, true);
    var filename = "." + q.pathname;
    console.log(q.pathname)

    if (q.pathname == "/") {
        filename += 'index.html';
        fs.readFile(filename, function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                return response.end("404 Not Found");
            }
            response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
            response.write(data);
            return response.end();
        });
    }
    else if (q.pathname.toLowerCase().slice(0, 6) == "/class") {
        var len = q.pathname.toLowerCase().length;
        var path = q.pathname.slice(1, len).split("/");
        var file = path[1];

        fs.readFile(file + '.csv', 'utf8', function (err, data) {
            var tr = '<tbody>';
            var close = '</tbody></div</body></html>';
            var table =
                '<!DOCTYPE html>' +
                '<html><style>body {background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9xVjS1Bt_uIZ44Pug4VBhuvOxGVw_SBrq3dSwATYzPbt65NEP");background-repeat: no-repeat;background-position: center center;background-size: cover;background-attachment: fixed;}html,body {height: 100%;margin-left: 10px;margin-right: 10px;}' +
                '.table  {width: 80%;margin:auto;border-radius: 25px;padding: 30px;background-color: #fff;position: relative;box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 20px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);}' + 'h1 { font-family: cursive; text-align:center}' + 'tbody tr:hover {background-color: #ddd;}' +
                'td, th {width: 4%;text-align: center; padding:20px;font-family:Arial;font-size: 20px;}' + 'thead{background-color: skyblue;}' +
                '</style><body><div class="table"><h1>CLASS LIST</h1><table></h1><thead><tr><th>NAME</th><th>EMAIL</th><th>COURSE & YEAR</th></tr></thead>';
            var info = data.split('\n').join(',');
            var content = info.split(',');
            console.log(content);
            var len = content.length - 1;
            var counter = 0;
            console.log(len);
            for (var i = 0; i < len / 3; i++) {
                tr += '<tr><td>' + content[counter] + '</td><td>' + content[counter + 1] + '</td><td>' + content[counter + 2] + '</td></tr>';
                counter += 3;
            }
            table += tr + close;
            response.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
            response.write(table);
            console.log(table);
            response.end();
            console.log(err);
        });

    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end("404 Not Found");
    }
}