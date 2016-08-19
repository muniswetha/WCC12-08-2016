function route(pathRequested, handlerList, postData, res) 
{
    if (typeof handlerList[pathRequested] == 'function')
        handlerList[pathRequested](postData, res);
    else {
        res.writeHead(404, "{Content-Type : text/html}");
        res.write("Requested page could not be found");
        res.end();
    }

}
exports.route = route;