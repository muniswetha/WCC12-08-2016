var http = require('http');
var url = require('url');
var queryString = require('querystring');

var port = 8888;

var startServer = function (route, handlerList) 
{
    http.createServer(
        function (req, res) 
        {
            var pathRequested = url.parse(req.url).pathname;
            var parsedQueryString = queryString.parse(url.parse(req.url).query);
            var postData = parsedQueryString;

            req.addListener("data",function (postDataChunck) 
            {
                postData += postDataChunck;   
            });
            
            req.addListener("end", function () 
            {
                route(pathRequested, handlerList, postData, res);
            });

        }).listen(port);
}

exports.startServer = startServer;