var fileSystemModule = require("fs");
function displayIndexPage(postData, res) 
{
    fileSystemModule.readFile("./Index.html", function (err, data) {
        //console.log('adsfadsfadsfasdf');
        if (err) {
            res.writeHead(500, "{Content-Type : text/plain}");
            res.write("Following Error Occured {0}", err);
            res.end();
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data, 'utf-8');
    });
}

exports.displayIndexPage = displayIndexPage;